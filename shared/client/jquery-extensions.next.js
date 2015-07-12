$.fn.setChildHtml = function (map) {
    var _ = $(this)
    for (var selector in map) {
        // TODO: Input, set value
        _.find(selector).html(map[selector])
    }
    return _
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
    return fade('out', this)
}

$.fn.fadeIn = function () {
    return fade('in', this)
}

$.fn.after = function (ms) {
    var __ = this
    var _ = $(this)
    __.afterMs = ms
    __.operations = []
    
    
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
        return _
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

/* // TODO: Animate neighbor positions upon showing/hiding page elements
 var rem = $.fn.remove
 $.fn.remove = function () {
 var _ = $(this)
 var next = _.next()
 var isStatic = next.css('position') === 'static'
 var top = next.css('top')
 if (top === 'auto') var isAuto = true

 if (isStatic) next.css('position', 'relative')
 if (isAuto) next.css('top')

 next.animate({top: _.css('height')},500)

 if (isAuto) next.after(500).css('top', 'auto').go()
 if (isStatic) next.after(500).css('position', 'static').go()

 // TODO RESET
 rem.apply(this)
 }
 */

$.fn.draggable = function() {
    var _ = $(this)

    _.attr('draggable', true)
        .css('position', 'relative')
        .parent()
        .css('position', 'fixed')

    var elemPosition = {}
    var mouseStart = {}
    var mouse = {}

    _.off('dragstart').on('dragstart', function(e) {
        var orig = e.originalEvent
        
        orig.dataTransfer.effectAllowed = 'move'
        orig.dataTransfer.setData('Text', this.id)
        
        var dragIcon = document.createElement('img')
        dragIcon.src = 'blank.png'
        dragIcon.width = 100
        orig.dataTransfer.setDragImage(dragIcon, -10, -10)

        var top = _.css('top')
        var left = _.css('left')
        
        elemPosition = {
            top: top === 'auto' ? 0 : Number(top.replace('px', '')),
            left: left === 'auto' ? 0 : Number(left.replace('px', ''))
        }

        mouseStart = {
            top: orig.clientY,
            left: orig.clientX
        }

        /*console.log({
            dragstart: {
                clientX: orig.clientX,
                clientY: orig.clientY
            }
        })*/
    })

    var frame
    _.off('drag dragend').on('drag dragend', function(e) {

        window.cancelAnimationFrame(frame)
        frame = window.requestAnimationFrame(() => {

            var orig = e.originalEvent

            if (orig.clientY !== 0 || orig.clientX !== 0) {
            
                mouse = {
                    top: orig.clientY,
                    left: orig.clientX
                }

                var getPosition = prop =>
                    elemPosition[prop]
                    + mouse[prop]
                    - mouseStart[prop]
    
                _.css({
                    top: getPosition('top'),
                    left: getPosition('left')
                })
            }
        })
    })

    return _
}
