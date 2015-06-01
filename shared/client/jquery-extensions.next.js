$.fn.childHtml = function (...args) {
    var _ = $(this)
    if (args.length === 0) {
        var obj = args[0]
        for (var prop in obj) {
            _.find(prop).html(obj[prop])
        }
    } else {
        var res = {}
        for (prop of args) {
            res[prop] = _.find(prop).val() || _.find(prop).html()
        }
        return res
    }
}
