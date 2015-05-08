Meteor.publish('components', function () {
    return Components.find()
})

Meteor.methods({
    newComponent: function (data) {
        Components.insert({
            title: data.title,
            date: new Date(),
            style: data.style,
            html: data.html
        })
    },
    deleteComponent: function (data) {
        Components.remove(data._id)
    }
})