Meteor.startup(function () {
    var logs = Logs.find()
    for (var i = 0; i < logs.length; i++)
        Logs.remove(logs[i]._id)
})

Meteor.publish('logs', function () {
    return Logs.find()
})
