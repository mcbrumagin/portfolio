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

Logs = new Meteor.Collection('logs')

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
            Logs.insert({
                type: type,
                content: args,
                date: new Date()
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
            Meteor.app.util.applyAllAfter(1000,
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

    _.clear = function () {
        var logs = Logs.find().fetch()
        for (var i = 0; i < logs.length; i++)
            Logs.remove(logs[i]._id)
    }

    // Initialize logging methods on this Logger
    setMethods()
}
