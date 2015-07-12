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

var timeout = null
var dataRenderId = 1

var util = {
    debounce: (time, fn) => {
        var timeout
        return (...$) => {
            Meteor.clearTimeout(timeout)
            timeout = Meteor.setTimeout(() => fn(...$), time)
        }
    },
    applyAllAfter: (time, fn) => {
        var timeout
        var args = []
        return (...$) => {
            args = args.concat($)
            Meteor.clearTimeout(timeout)
            timeout = Meteor.setTimeout(() => {
                fn(...args)
                args = []
            }, time)
        }
    },
    escapeHtml: () => {}
}
Meteor.app = {util: util}

var helpers = {
    isSuperUser: Meteor.isSuperUser,
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
            .find('form')
            .getChildHtml({
                title: '[name=title]',
                content: '[name=content]'
            })

        //_.content = _.content.replace(/\?/g, '&quest;')
        _.content = NextMark.convertMarkdown(_.content)
        _.date = new Date().toLocaleString()

        $(e.currentTarget)
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

var Posts = Meteor.CrudCollection('post', ['user', 'title', 'content'], {
        template: 'blog'
    }, {
        post: function () {
            var query = Session.get('post-search') || {}
            return Posts.find(query, {
                sort: {dateModified: -1}
            }).fetch()
        },
        date: helpers.date,
        content: helpers.content,
        isSuperUser: helpers.isSuperUser
        // TODO: Allow easy extension of built-in methods
        // TODO: Extend delete action to delete coupled comments
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
            var user = Meteor.user()
            if (!user || !user._id) throw new Error('User not found when saving post.')
            post.user = user._id
            post.title = form.find(`[name=title]`).val()
            post.content = form.find(`[name=content]`).val()
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
            var user = Meteor.user()
            if (!user._id) throw new Error('User not found when saving post.')
            this.user = user._id
            this.title = $form.find(`[name=title]`).val()
            this.content = $form.find(`[name=content]`).val()

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


var Comments = new Meteor.CrudCollection('comment',
    ['user', 'username', 'post', 'content'], {
        template: 'comments'
    }, {
        // TODO: Fix Logger.wrap this/context
        comments: function () {
            Logger.disable()
            console.log(this)
            var comments = Comments
                .find({post:this}, {
                    sort: {dateModified: -1}
                }).fetch()
            console.log(comments)
            return comments
        },
        isLoggedIn: Meteor.isLoggedIn,
        comment: {
            createdBy: function () {
                return `${this.name} responded on ${helpers.date.apply(this)}`
            },
            date: helpers.date,
            content: helpers.content,
            isOwned: function () {
                var user = Meteor.user()
                return user && user._id && this.user === user._id
            }
        }
    }, {
        "click .js-new-create-comment": function (e) {
            Logger.log({currentTarget: e.currentTarget})
            var _ = $(e.currentTarget)
            var data = {id:this}
            var user = Meteor.user()
            if (user && user.profile)
                data.name = user.profile.name

            Logger.log({parent: _.parent().html()})
            UI.renderWithData(
                Template.createComment,
                data, _.parent()[0], _[0])
        },
        createComment: {
            "submit .comment-create": function (e) {
                e.preventDefault()
                var form = $(e.currentTarget)
                var comment = {}
                var user = Meteor.user()
                // TODO: User/name helpers
                var profile = user.profile
                comment.post = this.post || this
                comment.user = user._id
                comment.name = profile.name // fallback for linkedin
                    || `${profile.firstName} ${profile.lastName}`

                comment.content = form.find(`[name=content]`).val()
                Meteor.call('commentCreate', comment, function () {
                    form.fadeOut()
                        .after(500).remove().go()
                })
            },
            "input [name=content]": util.debounce(10, e => {

                var preview = $('.new-comment-preview')
                if (preview.hasClass('fade-out')) preview.fadeIn()

                Logger.log({currentTarget: e.currentTarget})
                var _ = $(e.currentTarget)
                    .closest('form')
                    .getChildHtml({ content: '[name=content]' })

                //_.content = _.content.replace(/\?/g, '&quest;')
                _.content = NextMark.convertMarkdown(_.content)
                _.date = new Date().toLocaleString()

                preview.setChildHtml({
                    '.date': _.date,
                    '.content': _.content
                })
            }),
            "click .close": function (e) {
                $(e.currentTarget)
                    .closest('form')
                    .fadeOut()
                    .after(500).remove().go()
            }
        }
    })


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
