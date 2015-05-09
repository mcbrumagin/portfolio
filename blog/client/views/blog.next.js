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
        UI.renderWithData(Template.editPost, this,
            $(`[data-id=${this._id}]`)[0])
    }
})

Template.postPreview.helpers({
    date: function () {
        return this.date.toLocaleString()
    },
    content: function () {
        window.temp1 = NextMark.convertMarkdown(this.content)
        return window.temp1
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

Template.createPost.events({
    "submit .create-post": e => {
        e.preventDefault()
        Meteor.call('newPost', {
            title: $('.create-post [name=title]').val(),
            content: $('.create-post [name=content]').val()
        })
    },
    "input [name=content]": e => {
        var title = $('.create-post [name=title]').val()
        $('.new-post-preview .title').html(title)
        
        var date = new Date().toLocaleString()
        $('.new-post-preview .date').html(date)
        
        var markdown = $('.create-post [name=content]').val()
        var markup = NextMark.convertMarkdown(markdown)
        window.temp2 = markup
        $('.new-post-preview .content').html(markup)
    }
})
