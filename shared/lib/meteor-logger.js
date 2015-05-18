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

var log = function (type, obj) {
    Logs.insert({
        type: type,
        data: obj
    })
}

var extend = function (original, extension, context) {
    return function () {
        context = context || this
        var result1 = original.apply(context, arguments)
        var result2 = extension.apply(context, arguments)
        return result1 && result2
            ? [result1, result2]
            : !result1 ? result2 : result1
    }
}

console = {
    log: extend(console.log, log.curry('trace'), console),
    info: extend(console.info, log.curry('info'), console),
    warn: extend(console.warn, log.curry('warning'), console),
    error: extend(console.error, log.curry('error'), console)
}

Meteor.startup(function () {
    Logs = new Meteor.Collection('logs')
})
