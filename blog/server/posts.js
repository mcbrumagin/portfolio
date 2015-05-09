Meteor.publish('posts', function () {
    return Posts.find({ /*active: true }, { versions: 0*/ })
})

Meteor.methods({
    newPost: function (data) {
        Posts.insert({
            title: data.title,
            content: data.content,
            date: new Date()
        })
    },
    updatePost: function (data) {
        //var last = Posts.find({ _id: data._id })
        
        Posts.update({ _id: data._id }, {
            title: data.title,
            content: data.content,
            date: new Date()
            //$push: { versions: last }
        })
    },
    deletePost: function (data) {
        Posts.remove(data._id)
    }
})