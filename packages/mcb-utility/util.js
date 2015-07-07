Util = {
    applyAllAfter: function (time, fn) {
        var timeout
        var args = []
        return function () {
            args = args.concat(arguments)
            Meteor.clearTimeout(timeout)
            timeout = Meteor.setTimeout(function () {
                fn.apply(fn, args)
                args = []
            }, time)
        }
    }
}