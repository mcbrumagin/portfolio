Meteor.CrudCollection('post', ['title', 'content'], {
        template: 'blog'
    }, function (collection) {
    
    return {
        post: function () {
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
}, {
    "input [name=content]": function (e) {
        var form = $(e.currentTarget).closest('form')
        var title = form.find('[name=title]').val()
        var markdown = form.find('[name=content]').val()
            
        if (!window.liveViewId) {
            var date = new Date().toLocaleString()
            var markup = NextMark.convertMarkdown(markdown)
            
            $('.new-post-preview').childHtml({
                '.date': date,
                '.title': title,
                '.content': markup
            })
            
        } else {
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
    },
    "click .open-post-update": function (e) {
        e.preventDefault()
        if ($(`[data-id=${this._id}] .post-update`).length === 0)
            UI.renderWithData(Template.editPost, this,
                $(`[data-id=${this._id}]`)[0])
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
