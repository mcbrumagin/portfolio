/* TODO
var collection = Meteor.CrudCollection(..., {
    post: function () {
        var query = Session.get('post-search') || {}
        return collection.find(query, {
            sort: {dateModified: -1}
        }).fetch()
    },
    date: function () {
        return this.dateModified.toLocaleString()
    },
    content: function () {
        return NextMark.convertMarkdown(this.content)
    }
}
*/
var isSuperUser = function (name) {
    var superUser = Meteor.users.find({
        isSuperUser: true
    }).fetch()[0]

    return superUser
    && superUser.profile
    && superUser.profile.name
    && superUser.profile.name === name
}
Meteor.methods({isSuperUser: isSuperUser})
Meteor.checkSuperUser = function () {
    var user = Meteor.user()
    if (user) {
        var name = user.profile.name
        if (Meteor.isClient) {
            Meteor.call('isSuperUser', name, function (err, res) {
                var result = err || res || false
                Session.set('isSuperUser', result)
            })
        } else {
            return isSuperUser(name)
        }
    } else {
        Session.set('isSuperUser', false)
        return false
    }
}

Meteor.isSuperUser = function () {
    return Meteor.checkSuperUser()
        || Session.get('isSuperUser')
}

var timeout = null
var dataRenderId = 1

var util = {
    debounce: (time, fn) => {
        var timeout
        return (...$) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => fn(...$), time)
        }
    },
    escapeHtml: () => {}
}

var helpers = {
    date: function () {
        return this.dateModified.toLocaleString()
    },
    content: function () {
        return NextMark.convertMarkdown(this.content)
    },
    preview: util.debounce(10, e => {
        if (!window.isNotFirst) {
            window.isNotFirst = true
            $('.new-post-preview').fadeIn()
            $('button[name=expand]').after(250).fadeIn().go()
        }

        var _ = $(e.currentTarget)
            .closest('form')
            .getChildHtml({
                title: '[name=title]',
                content: '[name=content]'
            })

        //_.content = _.content.replace(/\?/g, '&quest;')
        _.content = NextMark.convertMarkdown(_.content)
        _.date = new Date().toLocaleString()

        $(e.currentTarget)
            .closest('.overlay')
            .setChildHtml({
                '.date': _.date,
                '.title': _.title,
                '.content': _.content
            })

        var liveViewId = $(e.currentTarget)
            .closest('[data-live-view-id]')
            .data('live-view-id')

        if (liveViewId) {
            Meteor.call('updateLiveView', {
                id: liveViewId,
                title: _.title,
                content: _.content
            }, function (err, res) {
                if (err) {
                    Meteor.log.error({
                        message: 'An error occurred when updating the LiveView',
                        error: err
                    })
                } else Meteor.log.trace(res)
            })
        }
    }),
    click: {
        expand: function (e) {

            var $elem = $(e.currentTarget)
            var $form = $elem.closest('[data-id]')
            var postId = $form.data('id')

            Meteor.call('newLiveView', postId, function (err, res) {
                if (err) {
                    Meteor.log.error({
                        message: 'An error occurred when creating a new LiveView',
                        error: err
                    })
                } else {
                    // TODO/VERIFY: store in session
                    // (so that the server can reset it on disconnect)

                    var liveViewIds = Session.get('liveViewIds')
                    if (!liveViewIds) liveViewIds = [res]
                    else liveViewIds.push(res)
                    Session.set('liveViewIds')

                    $form.attr('data-live-view-id', res)
                    $elem.parent().remove()

                    var endpoint = '/liveview/' + res

                    // TODO: New window, not tab
                    window.open(window.location.origin + endpoint)
                }
            })
        },
        close: function (e) {
            window.isNotFirst = false
            $(e.currentTarget)
                .closest('.overlay')
                .fadeOut()
                .after(500).remove().go()
        },
        maximize: function (e) {
            var pane = $(e.currentTarget)
                .closest('.overlay')
                .find('> *:first-child')

            pane.data('position', {
                top: pane.css('top'),
                left: pane.css('left'),
                right: pane.css('right'),
                bottom: pane.css('bottom')
            }).css({
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                height: 'auto',
                width: 'auto',
                overflow: 'auto'
            })
        },
        restoreDown: function (e) {
            var pane = $(e.currentTarget)
                .closest('.overlay')
                .find('> *:first-child')

            var position = pane.data('position')

            pane.css({
                position: 'relative',
                top: position.top,
                left: position.left,
                right: position.right,
                bottom: position.bottom,
                height: 'auto',
                width: 'auto',
                overflow: 'auto'
            })
        },
        minimize: function (e) {
            $(e.currentTarget)
                .closest('.overlay')
                .find('> *:first-child')
                .css({
                    position: 'absolute',
                    top: 'auto',
                    left: 0,
                    right: 'auto',
                    bottom: 0,
                    height: '3.6rem',
                    width: '25rem',
                    overflow: 'hidden'
                })
        }
    }
}

Meteor.CrudCollection('post', ['title', 'content'], {
    template: 'blog'
}, function (collection) {
    return {
        post: function () {
            var query = Session.get('post-search') || {}
            return collection.find(query, {
                sort: {dateModified: -1}
            }).fetch()
        },
        date: helpers.date,
        content: helpers.content
    }
}, {
    "input #post-search": function (e) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            var input = $(e.currentTarget).val()
            if (input === '') var query = {}
            else {
                query = []
                var filter = t => t !== ''
                && t !== '-'

                input.split(' ').filter(filter).forEach(word => {
                    var text = new ActiveText(word).find('\\-.+')
                    if (!$.isEmptyObject(text)) {
                        var isNot = true
                        word = word.replace('-', '')
                    }

                    var conditions = []
                    var setConditions = word => {
                        //TODO: Escape regex
                        var search = {$regex: word, $options: 'i'}
                        conditions = conditions.concat([
                            {title: search},
                            {content: search},
                            {dateCreated: search},
                            {dateModified: search}
                        ])
                    }

                    var wordOptions = word.split('|')
                    if (wordOptions.length > 1) {
                        wordOptions.filter(filter)
                            .forEach(setConditions)
                    } else setConditions(word)

                    var queryFrag
                    if (isNot) queryFrag = {$nor: conditions}
                    else queryFrag = {$or: conditions}
                    query.push(queryFrag)
                })
                query = {$and: query}
            }
            Session.set('post-search', query)
        }, 500)
    },
    "click .open-post-update": function (e) {
        this.collection = 'post'
        var _ = this
        UI.renderWithData(
            Template.editPost, this,
            $(document.body)[0])

        var uid = dataRenderId++

        $('form.post-update:not([data-render-id])')
            .attr('data-render-id', uid)
            .closest('.overlay')
            .setChildHtml({
                '.date': helpers.date.call(this),
                '.title': _.title,
                '.content': helpers.content.call(this)
            })
            .fadeIn()
            .find('> *:first-child')
            .after(10).draggable().go()
            .find('.fade-out')
            .after(100).fadeIn().go()
    },
    "click .js-new-create-post": function (e) {
        UI.render(Template.createPost, $(document.body)[0])

        var uid = dataRenderId++

        $('form.post-create:not([data-render-id])')
            .attr('data-render-id', uid)
            .closest('.overlay')
            .fadeIn()
            .find('> *:first-child')
            .after(10).draggable().go()
    },
    createPost: {
        "submit .post-create": function (e) {
            e.preventDefault()
            var form = $(e.currentTarget)
            var post = {}
            post.title = form.find(`[name=title]`).val()
            post.content = form.find(`[name=content]`).val()
            console.log({post: post})
            Meteor.call('postCreate', post, function () {
                window.isNotFirst = false
                $(e.currentTarget).closest('.overlay')
                    .fadeOut()
                    .after(500).remove().go()
            })
        },
        "input [name=content],[name=title]": helpers.preview,
        "click [name=expand]": helpers.click.expand,
        "click .close": helpers.click.close,
        "click .maximize": helpers.click.maximize,
        "click .restore-down": helpers.click.restoreDown,
        "click .minimize": helpers.click.minimize
    },
    editPost: {
        "submit .post-update": function (e) {
            e.preventDefault()

            var $form = $(e.currentTarget)
            this.title = $form.find(`[name=title]`).val()
            this.content = $form.find(`[name=content]`).val()

            console.log({post: this})

            Meteor.call('postUpdate', this, () => {
                $form.closest('.overlay').remove()
            })
        },
        "input [name=content],[name=title]": helpers.preview,
        "click [name=expand]": helpers.click.expand,
        "click .close": helpers.click.close,
        "click .maximize": helpers.click.maximize,
        "click .restore-down": helpers.click.restoreDown,
        "click .minimize": helpers.click.minimize
    }
})

/*
Meteor.CrudCollection('liveview', ['title', 'content'], {
    template: 'liveView'
}, function (collection) {
    return {
        liveview: function () {
            return collection.find({}, {
                sort: {dateModified: -1}
            }).fetch()
        },
        date: function () {
            return this.dateModified.toLocaleString()
        },
        content: function () {
            return NextMark.convertMarkdown(this.content)
        }
    }
})
*/

var LiveViews = new Meteor.Collection('liveViews')

if (Meteor.isClient) {
    Template.liveView.helpers({
        date: function () {
            return this.date.toLocaleString()
        },
        content: function () {
            return NextMark.convertMarkdown(this.content)
        }
    })
}

Router.route('/liveView/:id/:version?', {
    name: 'liveView',
    subscriptions: function () {
        Meteor.log.trace({message: 'Id from url', id: this.params.id})
        return Meteor.subscribe('liveView', this.params.id)
    },
    data: function () {
        if (this.ready()) {
            Meteor.log.trace({message: 'Id from url', id: this.params.id})
            var liveView = LiveViews.findOne({_id: this.params.id})
            var length = liveView.versions.length

            if (this.params.version && this.params.version < length)
                var version = liveView.versions[this.params.version]
            else version = liveView.versions[length - 1]

            version._id = liveView._id
            return version
        }
    }
})

if (Meteor.isServer) {
    Meteor.publish('liveView', function (id) {
        this._session.socket.on('close', Meteor.bindEnvironment(function () {
            LiveViews.remove(id)
        }))
        return LiveViews.find({_id: id})
    })

    Meteor.methods({
        'newLiveView': function (sourceId) {
            // Versions are necessary for history?
            return LiveViews.insert({
                versions: [{
                    title: '',
                    content: '',
                    date: new Date()
                }],
                sourceId: sourceId,
                started: new Date()
            })
        },
        'updateLiveView': function (obj) {
            return LiveViews.update({
                $or: {
                    _id: obj.id,
                    sourceId: obj.sourceId
                }
            }, {
                $push: {
                    versions: {
                        title: obj.title,
                        content: obj.content,
                        date: new Date()
                    }
                }
            })
        }
    })
}
