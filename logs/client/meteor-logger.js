Meteor.startup(function () {
    Meteor.subscribe('logs')
})

Template.logs.helpers({
    log: function () {
        return Logs.find({},{
            sort: { date: -1 }
        }).fetch()
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