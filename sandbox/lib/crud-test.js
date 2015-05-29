/*Meteor.CrudCollection('test', ['title', 'content'], function (collection) {
    
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
}, {
    testMostRecent: {
        "click [name=title]": function () {
            alert('Test')
        }
    }
})*/

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
