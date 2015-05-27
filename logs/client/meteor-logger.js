Meteor.startup(function () {
    Meteor.subscribe('logs')
})

Template.logs.helpers({
    log: function () {
        return Logs.find().fetch()
    }
})

Template.logItem.helpers({
    date: function () {
        return this.date.toLocaleString()
    },
    content: function () {
        return JSON.stringify(this.content, null, 2)
    }
})