Meteor.publish('resume', function () {
    return Resume.find()
})

Meteor.startup(function () {
    if (Resume.find().fetch().length === 0) {
        Resume.insert({
            content: 'This is an empty resume.'
        })
    }
})