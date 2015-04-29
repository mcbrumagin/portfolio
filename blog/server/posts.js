Meteor.publish('posts', function () {
    return Posts.find()
})

Meteor.methods({
    'newPost': function (data) {
        Posts.insert({
            title: data.title,
            date: new Date(),
            content: data.content
        })
    },
    'deletePost': function (data) {
        Posts.remove(data._id)
    }
})