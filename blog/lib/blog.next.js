
var timeout = null
Meteor.CrudCollection('post', ['title', 'content'], {
        template: 'blog'
    }, function (collection) {
        return {
            post: function () {
                var query = Session.get('post-search') || {}
                return collection.find(query, {
                    sort: { dateModified: -1 }
                }).fetch()
            },
            date: function () {
                return this.dateModified.toLocaleString()
            },
            content: function () {
                return NextMark.convertMarkdown(this.content)
            }
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
                    if (isNot) queryFrag = { $nor: conditions }
                    else queryFrag = { $or: conditions }
                    query.push(queryFrag)
                })
                query = { $and: query }
            }
            Session.set('post-search', query)
        }, 500)
    },
    "click .open-post-update": function (e) {
        e.preventDefault()
        this.collection = 'post'
        if ($(`[data-id=${this._id}] .post-update`).length === 0) {
            var selector = `[data-id=${this._id}]`
            UI.insert(UI.renderWithData(Template.editPost, this),
                $(selector)[0],
                $(`${selector} .content`)[0])
                //$(`${selector} *:first-child`)[0])
        }
            //UI.insert(UI.render(Template.bar), parentNode, beforeNode)
            //UI.renderWithData(Template.editPost, this,
            //    $(`[data-id=${this._id}]`)[0])
    },
    "click .js-new-create-post": function (e) {
        //var overlay = UI.components.overlay(
        //    '<form name="post-create">' + UI.components.+ '</form>',
        //    {title: 'Are You Sure?', id: id})
        //$(document).append(overlay)
        
        UI.render(Template.createPost, $(document.body)[0])
        $('form.post-create').parent().fadeIn()
    },
    createPost: {
        "input [name=content]": function (e) {
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
            
            _.content = NextMark.convertMarkdown(_.content)
            if (!window.liveViewId) {
                _.date = new Date().toLocaleString()
                
                $('.new-post-preview').setChildHtml({
                    '.date': _.date,
                    '.title': _.title,
                    '.content': _.content
                })
                
            } else {
                Meteor.call('updateLiveView', {
                    id: window.liveViewId,
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
        },
        "click [name=expand]": function (e) {
            Meteor.call('newLiveView', function (err, res) {
                if (err) {
                    Meteor.log.error({
                        message: 'An error occurred when creating a new LiveView',
                        error: err
                    })
                } else {
                    // TODO: store in session (so that the server can reset it on disconnect)
                    window.liveViewId = res
                    var endpoint = '/liveview/' + res
                    // TODO: New window, not tab
                    window.open(window.location.origin + endpoint)
                }
            })
        },
        "submit .post-create": function (e) {
            e.preventDefault()
            var form = $(e.currentTarget)
            var post = {}
            post.title = form.find(`[name=title]`).val()
            post.content = form.find(`[name=content]`).val()
            console.log({post: post})
            Meteor.call('postCreate', post, function () {
                window.isNotFirst = false
                $(e.currentTarget).parent()
                    .fadeOut()
                    .after(500).remove().go()
            })
        },
        "click .close": function (e) {
            window.isNotFirst = false
            $(e.currentTarget).parent().parent()
                .fadeOut()
                .after(500).remove().go()
        }
    },
    editPost: {
        "submit .post-update": function (e) {
            e.preventDefault()
            var form = $(`[data-id=${this._id}] .edit-post`)
            this.title = form.find(`[name=title]`).val()
            this.content = form.find(`[name=content]`).val()
            Meteor.call('updatePost', this, function () {
                $(e.currentTarget).remove()
            })
        },
        "click .close": function (e) {
            $(e.currentTarget).parent().remove()
        }
    }
})

/*
Meteor.CrudCollection('liveview', ['title', 'content'], {
        template: 'liveView'
    }, function (collection) {
        return {
            liveview: function () {
                return collection.find({},{
                    sort: { dateModified: -1 }
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
            var liveView = LiveViews.findOne({ _id: this.params.id })
            var length = liveView.versions.length
            
            if (this.params.version && this.params.version < length)
                var version = liveView.versions[this.params.version]
            else version = liveView.versions[length-1]
            
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
        'newLiveView': function () {
            // Versions are necessary for history?
            return LiveViews.insert({
                versions: [{
                    title: '',
                    content: '',
                    date: new Date()
                }],
                started: new Date()
            })
        },
        'updateLiveView': function (obj) {
            return LiveViews.update({_id: obj.id}, {
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
