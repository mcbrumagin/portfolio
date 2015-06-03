Function.prototype.curry = function (...args) {
    var f = this
    var a = args
    return (...args) => f.apply(this, a.concat(args))
}

var voidNode = function (tag, attributes, value) {
    var attr = ''
    if (attributes.toString() !== '[object Object]')
        attributes = { value: attributes }
    for (var prop in attributes)
        attr += ` ${prop}="${attributes[prop]}"`
    return `<${tag}${attr} />`
}

var node = function (tag, attributes, ...strings) {
    var attr = '', text = ''
    if (attributes.toString() !== '[object Object]')
        text += attributes
    else for (var prop in attributes)
        attr += ` ${prop}="${attributes[prop]}"`
    for (var str of strings) text += str
    return `<${tag}${attr}>${text}</${tag}>`
}

var assignHtmlHelpers = function (context, regElems, voidElems) {
    regElems = regElems.split(' ')
    voidElems = voidElems.split(' ')
    for (var n of regElems) context[n] = node.curry(n)
    for (n of voidElems) context[n] = voidNode.curry(n)
}

assignHtmlHelpers(this, 'html head body h1 h2 h3 h4 h5 h6 p main'
    + ' div form nav ul li a label textarea i span button th tr td'
    , 'input br col')

var result =
    html(
        nav({id: 'navigation'},
            ul(
                li(a({href: 'http://www.google.com'}, 'Google')),
                li(a({href: 'http://www.google.com'}, 'Google')))),
        div({class: 'test thing'},
            p('This is some simple text')),
        form({name: 'test', action: '/test'},
            input('This could be a variable value')))

console.info(result)

/*
<html>
    <nav id="navigation">
        <ul>
            <li><a href="http://www.google.com">Google</a></li>
            <li><a href="http://www.google.com">Google</a></li>
        </ul>
    </nav>
    <div class="test thing">
        <p>This is some simple text</p>
    </div>
    <form name="test" action="/test">
        <input value="This could be a variable value" />
    </form>
</html>
*/

UI.draw = new function () {
    var _ = this
    
    _.button = _ =>
        button(_.attributes,
            _.icon ? i({class: 'fa fa-' + _.icon}) : '',
            _.text ? span({class: 'tx'}, _.text) : '')
    
    _.input = _ =>
        div({class: 'field input-field'},
            label({for: _.name}, _.label),
            input(_.attributes),
            _.help ? p({class: 'help'}, _.help) : '')
        
    _.textarea = _ =>
        div({class: 'field textarea-field'},
            label({for: _.name}, _.label),
            textarea(_.attributes, _.value || ''),
            _.help ? p({class: 'help'}, _.help) : '')
    
    _.overlay = _ =>
        div({class: 'overlay'},
            div(_.attributes,
                _.close,
                _.title ? h3(_.title) : '',
                _.message || '',
                div({class: 'button-group'},
                    _.ok,
                    _.cancel)
            )
        )
}