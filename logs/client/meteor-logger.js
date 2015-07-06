Meteor.startup(function () {
    Meteor.subscribe('logs')
})

Template.logs.helpers({
    log: function () {
        var logs = Logs.find({},{
            sort: { date: -1 }
        }).fetch()

        var normalizedLogs = []
        for (var i = 0; i < logs.length; i++) {
            if (logs[i].content instanceof Array) {
                var log = logs[i]
                var list = logs[i].content.slice()
                log._id = undefined
                //alert(JSON.stringify(log))
                for (var j = 0; j < list.length; j++) {
                    log.content = list[j]
                    normalizedLogs.push(log)
                }
            } else normalizedLogs.push(logs[i])
        }

        return normalizedLogs
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