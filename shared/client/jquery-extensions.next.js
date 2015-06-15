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

var fade = function (type, that) {
    var _ = $(that)
    
    if (!that.isFading) {
        that.isFading = true
        if (_.hasClass('fade'))
            _.removeClass('fade fade-out fade-in')
            
        _.addClass('fade-' + type)
        
        setTimeout(() => {
            _.addClass('fade')
            that.isFading = false
        }, 50)
        //_.addClass('fade')
        
    }
    return _
}

$.fn.fadeOut = function () {
    return fade ('out', this)
}

$.fn.fadeIn = function () {
    return fade ('in', this)
}

$.fn.after = function (ms) {
    var __ = this
    var _ = $(this)
    this.afterMs = ms
    this.operations = []
    
    
    var $$ = {}
    
    var tracker = name => {
        return (...args) => {
            __.operations.push({
                name: name,
                args: args
            })
            return $$
        }
    }
    
    for (var p in $.fn)
        $$[p] = tracker(p)
    
    $$.go = () => {
        if (__.operations && __.afterMs) {
            setTimeout(() => {
                for (var o of __.operations)
                    _ = _[o.name](...o.args)
            }, __.afterMs)
        } else throw new Error('Use ".after()" before calling ".go()".')
        return $
    }
    
    return $$
}

$.fn.render = function (name, original) {
    var _ = $(this)
    original = original || _.css(name)
    
    _.css(name, 'auto')
    var reset = _.css(name)
    _.css(name, original)
    
    setTimeout(() => _.css(name, reset), 5)
    
    return _
}