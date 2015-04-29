///*
Template.postList.onCreated(function () {
    this.subscribe('posts')
})

Template.postList.helpers({
    post: () => Posts.find()
})

Template.postList.events({
    "click .delete-post": function (e) {
        e.preventDefault()
        Meteor.call('deletePost', this)
    }
})

Template.postPreview.helpers({
    date: function () {
        return this.date.toLocaleString()
    }
})

Template.newPost.events({
    "submit .create-post": e => {
        e.preventDefault()
        Meteor.call('newPost', {
            title: $('[name=title]').val(),
            content: $('[name=content]').val()
        })
    }
})
//*/

/*
Template.postList.onCreated(function () {
  this.subscribe('posts')
})

Template.postList.helpers({
    post: function () {
        return Posts.find()
    }
})

Template.itemPreview.helpers({
    date: function () {
        return this.date.toLocaleString()
    }
})

Template.newPost.events({
    "submit .create-post": function (e) {
        e.preventDefault()
        Meteor.call('newPost', {
            title: $('[name=title]').val(),
            content: $('[name=content]').val()
        })
    }
})
*/