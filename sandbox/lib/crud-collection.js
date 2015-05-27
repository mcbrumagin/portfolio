function isFunction(fn) {
    return fn && {}.toString.call(fn) === '[object Function]'
}

Collections = {}

function CrudCollection(name, props, helpers) {
    Collections[name] = new Meteor.Collection(name)
    
    var create = name + 'Create'
    var update = name + 'Update'
    var destroy = name + 'Delete'
    
    var classes = {
        create: '.' + name + '-create',
        update: '.' + name + '-update',
        destroy: '.' + name + '-delete'
    }
    
    if (Meteor.isClient) {
        Template[name].onCreated(function () {
            this.subscribe(name)
        })

        var callback = function (err, res) {
            if (err) Meteor.log.error(err)
            else Meteor.log.trace(res)
        }
        
        var events = {}
        events['submit ' + classes.create] = function (e) {
            e.preventDefault()
            var newItem = {}
            for (var i = 0; i < props.length; i++) {
                newItem[props[i]] = $(classes.create + ' [name=' + props[i] + ']').val()
            }
            Meteor.call(create, newItem, callback)
        }
        events['submit ' + classes.update] = function (e) {
            e.preventDefault()
            var updateItem = {}
            for (var i = 0; i < props.length; i++) {
                updateItem[props[i]] = $(classes.update + ' [name=' + props[i] + ']').val()
            }
            updateItem._id = $(e.currentTarget).data('id')
            Meteor.call(update, updateItem, callback)
        }
        events['click ' + classes.destroy] = function (e) {
            e.preventDefault()
            // TODO
            Meteor.call(destroy, callback)
        }
        
        // TODO: Same as helpers
        Template[name].events(events)
        
        var mainHelpers = {}
        var methods = helpers(Collections[name])
        
        for (var helper in methods) {
            if (isFunction(methods[helper]))
                mainHelpers[helper] = methods[helper]
            else Template[helper].helpers(methods[helper])
        }
        
        if (!$.isEmptyObject(mainHelpers)) {
            Template[name].helpers(mainHelpers)
        }
    }
    
    if (Meteor.isServer) {
        
        // TODO: expose publish function
        Meteor.publish(name, function () {
            return Collections[name].find()
        })
        
        var methods = {}
        methods[create] = function (obj) {
            var date = new Date()
            obj.dateCreated = date
            obj.dateModified = date
            return Collections[name].insert(obj)
        }
        methods[update] = function (obj) {
            obj.dateModified = new Date()
            return Collections[name].update({_id: obj._id}, obj)
        }
        methods[destroy] = function (obj) {
            return Collections[name].remove({_id: obj._id})
        }
        Meteor.methods(methods)
    }
}

CrudCollection('test', ['title', 'content'], function (collection) {
    
    var date = function () {
        return (this.dateModified
             || this.dateCreated)
                .toLocaleString()
    }
    
    return {
        testList: function () {
            return collection.find({},{
                sort: { dateModified: -1 }
            }).fetch()
        },
        date: date,
        testMostRecent: {
            mostRecent: function () {
                return collection.find({},{
                    sort: { dateModified: -1 }
                }).fetch()[0]
            }
        }
    }
})

/*
CrudCollection('post', ['title', 'content'], function (collection) {
    
    return {
        postList: {
            post: function () {
                return collection.find({},{
                    sort: { dateModified: -1 }
                }).fetch()
            }
        },
        postPreview: {
            date: function () {
                return this.dateModified.toLocaleString()
            },
            content: function () {
                return NextMark.convertMarkdown(this.content)
            }
        }
    }
}, {
    postPreview: {
        "click .delete-post": function (e) {
            e.preventDefault()
            Meteor.call('deletePost', this)
        },
        "click .open-edit-post": function (e) {
            e.preventDefault()
            if ($(`[data-id=${this._id}] .edit-post`).length === 0)
                UI.renderWithData(Template.editPost, this,
                    $(`[data-id=${this._id}]`)[0])
        }
    },
    editPost: {
        "submit .edit-post": function (e) {
            e.preventDefault()
            var form = $(`[data-id=${this._id}] .edit-post`)
            this.title = form.find(`[name=title]`).val()
            this.content = form.find(`[name=content]`).val()
            Meteor.call('updatePost', this, function () {
                $(e.currentTarget).remove()
            })
        },
        "click .close-edit-post": function (e) {
            $(e.currentTarget).parent().remove()
        }
    },
    createPost: {
        "submit .create-post": function (e) {
            e.preventDefault()
            Meteor.call('newPost', {
                title: $('.create-post [name=title]').val(),
                content: $('.create-post [name=content]').val()
            })
        },
        "input [name=content]": function (e) {
            if (!window.liveViewId) {
                var title = $('.create-post [name=title]').val()
                $('.new-post-preview .title').html(title)
                
                var date = new Date().toLocaleString()
                $('.new-post-preview .date').html(date)
                
                var markdown = $('.create-post [name=content]').val()
                var markup = NextMark.convertMarkdown(markdown)
                $('.new-post-preview .content').html(markup)
                
            } else {
                var title = $('.create-post [name=title]').val()
                var markdown = $('.create-post [name=content]').val()
                
                Meteor.call('updateLiveView', {
                    id: window.liveViewId,
                    title: title,
                    content: markdown
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
        }
    }
})
*/
