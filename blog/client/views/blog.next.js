Template.postList.onCreated(function () {
    this.subscribe('posts')
})

Template.postList.helpers({
    post: () => Posts.find({},{
        sort: { date: -1 }
    })
})

Template.postPreview.events({
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
})

Template.postPreview.helpers({
    date: function () {
        return this.date.toLocaleString()
    },
    content: function () {
        return NextMark.convertMarkdown(this.content)
    }
})

Template.editPost.events({
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
})

window.liveViewId = false

Template.createPost.events({
    "submit .create-post": e => {
        e.preventDefault()
        Meteor.call('newPost', {
            title: $('.create-post [name=title]').val(),
            content: $('.create-post [name=content]').val()
        })
    },
    "input [name=content]": e => {
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
    "click [name=expand]": e => {
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
})
