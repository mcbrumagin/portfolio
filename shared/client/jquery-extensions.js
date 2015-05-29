$.fn.childHtml = function (obj) {
    var _ = $(this)
    for (var prop in obj) {
        _.find(prop).html(obj[prop])
    }
}
