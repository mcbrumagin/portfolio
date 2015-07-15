Function.prototype.curry = function () {
    var toArray = function (args) {
        return Array.prototype.slice.call(args)
    }
    var fn = this
    var init = toArray(arguments)
    return function () {
        var tail = toArray(arguments)
        var args = (init || []).concat(tail)
        return fn.apply(this, args)
    }
}

var Logs = new Meteor.Collection('logs')

Logger = new function () {
    var _ = this
    var copy = {} // Stores a copy of bound console methods
    var custom = {} // Stores a custom logger

    var log = function (type) {
        var args = Array.prototype.slice.call(arguments, 1)
        args = (args.length > 1) ? args : args[0]

        // Call the regular old console
        // TODO: Spoof console line numbers
        copy[type](args)

        if (args !== undefined) {
            var log = {
                type: type,
                content: args,
                date: new Date()
            }

            if (Meteor.isServer) Logs.insert(log)
            else Meteor.call('createLog', log, function (err, res) {
                if (err) Logger.error('Failed to save log.', err)
            })
        }
    }

    var eachWord = function (words, fn) {
        words.split(' ').forEach(fn)
    }

    var methodNames = 'log info warn error'
    var eachMethod = eachWord.curry(methodNames)

    eachMethod(function (method) {
        copy[method] = console[method].bind(console)
    })

    eachMethod(function (method) {
        custom[method] =
            Util.applyAllAfter(1000,
                log.curry(method))
    })

    var setMethods = function (useCustom) {
        var methods = useCustom ? custom : copy
        for (var logger in copy)
            if (copy.hasOwnProperty(logger)) {
                _[logger] = methods[logger]
                console[logger] = methods[logger]
            }
    }

    // Switch between copy or custom for console and this
    _.enable = setMethods.curry(true)
    _.disable = setMethods

    _.wrap = function (fn) {
        return function () {
            Logger.enable()
            var result = fn.apply(this, arguments)
            Logger.disable()
            return result
        }
    }

    _.clear = function () {
        if (window
         && window.console
         && window.console.clear)
            window.console.clear()

        Meteor.call('deleteAllLogs')
    }
}

if (Meteor.isClient) {
    Meteor.startup(function () {
        Meteor.subscribe('logs')
    })

    Template.logs.helpers({
        log: function () {
            var logs = Logs.find({}, {
                sort: {date: -1}
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
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        var logs = Logs.find()
        for (var i = 0; i < logs.length; i++)
            Logs.remove(logs[i]._id)
    })

    Meteor.publish('logs', function () {
        return Logs.find()
    })

    Meteor.methods({
        createLog: function (log) {
            return Logs.insert(log)
        },
        deleteAllLogs: function () {
            var logs = Logs.find().fetch()
            for (var i = 0; i < logs.length; i++)
                Logs.remove(logs[i]._id)
        }
    })
}