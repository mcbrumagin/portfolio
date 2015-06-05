$.fn.setChildHtml = function (map) {
    var _ = $(this)
    for (var selector in map) {
        // TODO: Input, set value
        _.find(selector).html(map[selector])
    }
}

$.fn.getChildHtml = function (map) {
    var _ = $(this)

    var result = {}
    for (var name in map) {
        result[name] = _.find(map[name]).val()
                    || _.find(map[name]).html()
    }
    return result
}
