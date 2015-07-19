Meteor.startup ->
  Logger.disable()

  contextCurry = (fn) ->
    original = fn
    fn = (init...) ->
      if @ instanceof jQuery
        original.apply @
      else
        (tail...) ->
          args = init.concat tail
          original.apply @, args

  {fadeOut, hide} = $.fn
  contextCurry fn for fn in [fadeOut, hide]

  $.seq = (fns...) ->
    (selector = @) ->
      $obj = $ selector
      fns.forEach (fn) ->
        $obj = fn.apply $obj


  $.after = (ms, fns...) ->
    (selector = @) ->
      fn = ->
        seq = $.seq fns...
        seq selector
      setTimeout fn, ms

  $.fn.fadeAndHide =
    $.seq fadeOut, $.after(500, hide)

  $.fn.fadeOutAndHideAfter = (time) ->
    $(@).fadeOut().after(time).hide().go()

  ###
  $.createCache = (obj) ->
    obj.prototype.$lazy = (selector) ->
      outerHtml = $('<div>').append($(selector)).html()
      return ->
        if $(selector).length is 0
        and outerHtml is "" then $()
        else if $(selector).length is 0
        then $(outerHtml)


  ###

  $.lazy = (selector) ->
    cached = $('<div>')
      .append($(selector).clone())
      .html()
    ->
      $current = $ selector
      if $current.length > 0
      then $ selector
      else cached

  window.Templates = class
    {div, button, i, span, label} = window

    @drawButton = ({icon, text} = {}) ->
      icon ?= ''
      text ?= ''

      button type:"button",
        i class:"fa fa-#{icon}"
        span class:"tx", text
