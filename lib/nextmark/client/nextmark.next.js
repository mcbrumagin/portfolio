String.prototype.take = function (end) {
    return String.prototype.slice.call(this, 0, end)
}

window.NextMark = new function () {
    var _ = this
    
    Function.prototype.curry = function (...args) {
        var f = this
        var a = args
        return (...args) => f.apply(this, a.concat(args))
    }
    
    var voidNode = function (tag, attributes, value) {
        var attr = ''
        if (attributes !== undefined
        && attributes.toString() !== '[object Object]')
            attributes = { value: attributes }
        for (var prop in attributes)
            attr += ` ${prop}="${attributes[prop]}"`
        return `<${tag}${attr} />`
    }
    
    var node = function (tag, attributes, ...strings) {
        var attr = '', text = ''
        if (attributes !== undefined
        && attributes.toString() !== '[object Object]')
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
    
    var $ = {}
    assignHtmlHelpers($,
        'p span li label ul ol div h1 h2 h3 h4 h5 h6 button code pre',
        'input i br')
    
    var countCharsAtStart = function (line, char, max) {
        var regex = new RegExp(`^(${char}{1,${max}})`, 'g')
        var matches = line.match(regex)
        if (!matches) return 0
        else return matches[0].trim().length
    }
    
    var findAttributes = function (line) {
        var regex = new RegExp('([a-zA-Z]+)\="?([a-zA-Z]+)"?', 'g')
        var matches = {}
        do {
            var match = regex.exec(line)
            if (match) matches[match[1]] = match[2]
        } while (match)
        return matches
    }
    
    _.convertMarkdown = function (markdown) {
        
        var markup = ''
        var lines = markdown.split('\n')
        for (var i = 0; i < lines.length; i++) {
            
            var isHeaderLine = ()
                => lines[i][0] === '@'
                || lines[i][0] === '='
            
            var createHeader = function () {
                var n = countCharsAtStart(lines[i], lines[i][0], 6)
                var x = (n - 7) * -1 // Invert so more is larger
                markup += $['h'+ x](lines[i].slice(n))
            }
            
            var doWhile = function (cond, fn) {
                do {
                    fn()
                    i++
                } while (lines[i] !== undefined && cond())
            }
            
            var isUnorderedListItem = ()
                => lines[i][0] === '*'
                || lines[i][0] === '-'
            
            var isOrderedListItem = ()
                => lines[i][0] === '#'
            
            var createList = function (listType) {
                var match = lines[i][0]
                var items = ''
                doWhile(() => lines[i][0] === match, () => {
                    //for (var n = 1; n < 6; n++)
                    //    if (lines[i][n] === match) break
                    // TODO: Nest lists
                    items += $.li(lines[i].slice(1))
                })
                markup += $[listType](items)
                i--
            }
            
            var isChecklistItem = ()
                => lines[i].take(2) === '()'
                || lines[i].take(3) === '(x)'
            
            var createChecklist = function () {
                var type = 'checkbox'
                
                var items = ''
                doWhile(isChecklistItem, function () {
                    if (lines[i][1] === ')') {
                        var text = lines[i].slice(2)
                        items += $.li($.label($.input({
                            type: type
                        },text)))
                    } else {
                        text = lines[i].slice(3)
                        items += $.li($.label($.input({
                            type: type,
                            checked: true
                        },text)))
                    }
                })
                
                markup += ul({class: 'check-list'}, items)
                i--
            }
            
            var isCodeStart = ()
                => lines[i].slice(0,5) === '[code'
                && lines[i][lines[i].length - 1] === ']'
            
            var isNotCodeEnd = () => lines[i].take(3) !== '[/]'
            
            var createCodeBlock = function () {
                
                // Get attributes before we iterate anywhere
                var attributes = findAttributes(lines[i])
                i++
                
                var script = ''
                doWhile(isNotCodeEnd, () => script += lines[i] + '\n')
                
                // TODO: May need to test for other chars
                script = script
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                
                if (attributes.type) {
                    if (attributes.type === 'js' && attributes.runnable) {
                        // TODO: May need to test for other chars
                        var escapedScript = script.replace(/"/g, '&quot;')
                        markup +=
                            $.button({onclick: escapedScript},
                                $.i({class: 'fa fa-play-circle'}),
                                $.span({class: 'tx'}, 'Run'))
                    }
                    markup +=
                        $.code({class: attributes.type},
                            $.pre(script))
                                
                } else markup += $.code($.pre(script))
            }
            
            if (isHeaderLine()) createHeader()
            else if (isUnorderedListItem()) createList('ul')
            else if (isOrderedListItem()) createList('ol')
            else if (isChecklistItem()) createChecklist()
            else if (isCodeStart()) createCodeBlock()
            else if (lines[i] === '') markup += $.br()
            else markup += $.p(lines[i])
        }
        return markup
    }
}