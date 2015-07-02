String.prototype.take = function (end) {
    return String.prototype.slice.call(this, 0, end)
}

window.highlight = function (content, config) {
    content = `\n${content}\n`
    
    var find = function (query, text, preprocess) {
        var regex = new RegExp(query, 'g')
        var matches = {}
        var matchLens = {}
        do {
            var match = regex.exec(text)
            if (match !== null) {
                
                //--
                if (!matchLens[match.length])
                    matchLens[match.length] = [match]
                else matchLens[match.length].push(match)
                //--
                
                var content = ''
                if (!preprocess) content = match[1]
                else content = preprocess(match[1])
                //console.log(regex, match, match.index, content[match.index])
                if (match[0] !== match[1]) {
                    var reg = new RegExp('(' + (match[1] || match[2]) + ')')
                    var nestedMatch = reg.exec(match[0])
                    if (nestedMatch) match.index += nestedMatch.index
                    //console.log('Processing nestedMatch', reg, nestedMatch)
                }
                //if (!match[1]) console.log(match)
                //console.log(regex, match, match.index, content[match.index])
                matches[match.index] = {
                    content: content,
                    length: (match[1] || match[2]).length
                }
            }
        } while (match !== null)
        //console.log({matchLens: matchLens})
        return matches
    }
    
    var nestMatches = {}
    for (var nestType in config.nest) {
        var result = find(config.nest[nestType], content,
            _ => span({class: 'hl-' + nestType} , _))
        
        for (var ind in result)
            nestMatches[ind] = result[ind]
    }
    
    var matches = {}
    for (var type in config.map) {
        var result = find(config.map[type], content,
            _ => span({class: 'hl-' + type} , _))
        
        for (var ind in result)
            matches[ind] = result[ind]
    }
    
    var indices = []
    for (var i in matches) indices.push(Number(i))
    indices.sort((a,b) => a < b ? 1 : -1)
    
    for (i of indices) {
        // Handle nested matches (e.g; "// test!" )
        content = content.slice(0,i)
            + matches[i].content
            + content.slice(Number(i) + Number(matches[i].length))
    }
    
    return content
}


/*
window.highlight = function (content, config) {
    
    // Match nested areas and store matched content
    
    // Process nested area regex map
    // Process entire nest
    // Process remaining content as it stands
    // Use shiftIndices on nests that are pending insertion 
    //    for each main-map modification
    // Insert nests (starting at the largest index)
    
    function NextText (content) {
        var _ = this
        _.content = content
        _.changes = []
        
        // changes = [{index: n, old: '', new: ''},...]
        _.applyChanges = function () {
            for (var change of changes)
                _.content = _.content.slice(0, change.index)
                    + change.new
                    + _.content.slice(change.index + change.old.length)
        }
    }
    
    NextText.prototype = {
        toString: () => this.content.toString(),
        valueOf: () => this.content.toString(),
        find: query => {
            if (query.toString() === '[object Object]') {
                // map
            } else if (query.toString() === '[object Function]') {
                // run function until it returns true (return index, and match)
                
            } else { // assumes a regex string
                var regex = new RegExp(query, 'g')
                var matches = {}
                while ((var match = regex.exec(text)) !== null) {
                        
                    var content = ''
                    if (!preprocess) content = match[1]
                    else content = preprocess(match[1])
                    
                    if (match[0] !== match[1]) {
                        var reg = new RegExp('(' + match[1] + ')') // TODO: Escape
                        var currentMatch = reg.exec(match[0])
                        if (currentMatch) match.index = match.index + currentMatch.index
                    }
                    
                    matches[match.index] = {
                        content: content,
                        length: match[1].length
                    }
                }
                return matches
            }
        }
    }
    
    var escapeRegexCharacters = function () {
        
    }
    
    var find = function (query, text, preprocess) {
        var regex = new RegExp(query, 'g')
        var matches = {}
        do {
            var match = regex.exec(text)
            if (match !== null) {
                
                var content = ''
                if (!preprocess) content = match[1]
                else content = preprocess(match[1])
                
                if (match[0] !== match[1]) {
                    var reg = new RegExp('(' + match[1] + ')') // TODO: Escape
                    var currentMatch = reg.exec(match[0])
                    if (currentMatch) match.index = match.index + currentMatch.index
                }
                
                matches[match.index] = {
                    content: content,
                    length: match[1].length
                }
            }
        } while (match !== null)
        return matches
    }
    
    // Match nested areas and store matched content
    
    // Process nested area regex map
    // Process entire nest
    // Process remaining content as it stands
    // Use shiftIndices on nests that are pending insertion 
    //    for each main-map modification
    // Insert nests (starting at the largest index)
    
    var indices = []
    
    var shiftIndices = function (startIndex, shiftAmount) {
        for (var i = 0; i < indices.length; i++)
            if (indices[i] >= startIndex) indices[i] += shiftAmount
    }
    
    for (var i in matches) indices.push(Number(i))
    indices.sort((a,b) => a < b ? 1 : -1)
    
    for (i of indices) {
        // Handle nested matches (e.g; "// test!" )
        content = content.slice(0,i)
            + matches[i].content
            + content.slice(Number(i) + Number(matches[i].length))
    }
    
    return content
}
*/

Function.prototype.curry = function (...args) {
    var f = this
    var a = args
    return (...args) => f.apply(this, a.concat(args))
}

window.Jsml = new function Jsml() {
    var _ = this

    var forOwn = function (obj, fn) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                fn.call(obj, prop, obj[prop])
        }
    }

    /*
    ==== JSS
    ===Custom Events
    - onhide
    - onshow
    - onbeforerender
    - onrender
    - onremove
    - onafterremove

    ===Animation/Transition Hooks
    - onclick
    - onhover
    - onmouseover
    - onidle

    ===Selectors/Pseudo-Selectors
    - parent
    - not
    - matches
    - before
    - after
    - child
    - self
    - nested
    */

    /*
    if (rules == '[object Object]') {
        
    } else if (rules.length) {
        
    } else if (rules == '[object Function]') {
        
    } else {
        
    }
    */
    
    var styleNames = []
    
    _.isValidStyle = function (style) {
        if (styleNames.length) return styleNames.indexOf(style) > 0
        var body = document.getElementsByTagName('body')[0]
        forOwn(body.style, (prop, val) => {
            if (val !== undefined)
                styleNames.push(prop)
        })
        return styleNames.indexOf(style) > 0
    }
    
    _.parseStyle = function (style, $base) {
        //console.log(arguments)
        
        var parseTree = (selector, rules) => {
            //console.log(arguments)
            
            var continueParseTree = (s,r) => parseTree(`${selector} ${s}`, r)
            
            var parseRules
            var parseRulesForSelector = (extendedSelector, property, value) => {
                //console.log({selector: selector, property: property, value: value})
                
                var $elems = () => {
                    var s = extendedSelector || selector
                    if ($base) return $base.find(s)
                    else return $(s)
                }
                
                if (value == '[object Object]') {
                    forOwn(value, parseRulesForSelector.curry(`${selector} ${property}`))
                }
                else if ($.isFunction(value)) {
                    var fn = value
                    $elems().each((i, v) => {
                        var $elem = $(v)
                        $elem.css(property, fn($elem))
                    })
                }
                else if (property === 'mixin') {
                    var mixin = value
                    if (mixin == '[object Object]')
                        forOwn(mixin, continueParseTree)
                    else if ($.isFunction(mixin)) {
                        // evaluate after rendering..?
                    } else if (mixin.length > 0) {
                        for (var mix of mixin)
                            forOwn(mix, parseRules)
                    } else {
                        // mixin matching selector..?
                    }
                }
                else if (value.length) {
                    for (var style of value) {
                        // TODO: Verify prop/style
                        $elems().css(property, style)
                    }
                }
                else if (_.isValidStyle(property)) {
                    console.log({selector: extendedSelector || selector, property: property, value: value})
                    $elems().css(property, value)
                }
            }
            
            parseRules = parseRulesForSelector.curry(null)
            
            if (rules == '[object Object]')
                forOwn(rules, parseRules)
            else console.warn('In Jsml.parseStyle: other object parsing is not yet implemented.',
                {selector: selector, rules: rules})
            
            //else if (rules.length)
                // TODO: { ".test": [1,2,..] }
            //else if (rules == '[object Function]')
                // TODO: { ".test": () => {} }
            //else
                // TODO: { ".test": 'test' }
        }
        
        forOwn(style, parseTree)
    }

    _.Writer = function Writer(options) {

        var createNode = function (
                isVoid, tag,
                attributes /* optional */,
                ...strings /* or value */) {

            if (isVoid) var value = strings[0]

            var attrstr = ''
            var text = ''

            if (isVoid) {
                if (attributes != '[object Object]')
                    attributes = {value: attributes}
                else attributes.value = value

            } else if (attributes != '[object Object]') {
                text += attributes
                attributes = {}
            }

            forOwn(attributes, (prop, attr) => {
                if (attr !== undefined
                    && attr !== null
                    && attr !== false)
                    if (prop === 'style') attrstr += _.parseStyle(attr)
                    else attrstr += ` ${prop}="${attr}"`
            })

            for (var s of strings) text += s

            return isVoid ? `<${tag}${attrstr} />`
                : `<${tag}${attrstr}>${text}</${tag}>`
        }

        var node = createNode.curry(false)
        var voidNode = createNode.curry(true)
        
        var createMethods = (methodNames, baseFn) =>
            methodNames.split(' ')
                .forEach(e => this[e] = baseFn.curry(e))

        var normalNodes = 'p span li label ul ol div h1 h2 h3 h4 h5 h6 button code pre a'
        var voidNodes = 'input i br'

        createMethods(normalNodes, node)
        createMethods(voidNodes, voidNode)

        return this
    }
}

window.NextMark = new function () {
    var _ = this
    
    var $ = new Jsml.Writer()
    
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
                => lines[i][0] === '='
                || lines[i][0] === '@'
            
            var createHeader = function () {
                var n = countCharsAtStart(lines[i], lines[i][0], 6)
                var x = (n - 7) * -1 // Invert so more is larger
                markup += $['h'+ x](lines[i].slice(n))
            }
            
            var isLinkLine = ()
                => /\[.*\]@\(.*\)/.test(lines[i])
            
            var createLink = function () {
                var text = new ActiveText(lines[i])
                
                //var escapeRegex = regexString =>
                //    regexString.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                
                // TODO: Escape question mark and other characters
                //console.log(text)
                var matches = text.find('\\[(.+)\\]@\\((.+)\\)')
                
                var targets = []
                for (var m in matches)
                    targets.push(matches[m])
                
                console.log(targets)
                markup += $.a({href: targets[1]}, targets[0])
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
                        items +=
                            $.li(
                              $.label(
                                $.input({type: type}),
                                text))
                    } else {
                        text = lines[i].slice(3)
                        
                        items +=
                            $.li(
                              $.label(
                                $.input({type: type, checked: true}),
                                text))
                            
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
                    .replace(/\?/g, '&quest;')
                
                //Characters that require escaping:
                // \ + * ? ^ $ = ! | : - . < > [ ] ( ) { }
                var defaultMap = {
                    keyword: [
                        '\\s(function)[\\s|\\(]',
                        '\\s(class)[\\s|\\S]',
                        '\\s(return)[\\s|;]',
                        '\\s(while)[\\s|\\(]',
                        '\\s(for)[\\s|\\(]',
                        '\\s(if)[\\s|\\(]',
                        '\\s(else)\\s',
                        '\\s(do)\\s',
                        '\\s(break)\\s',
                        '\\s(yield)\\s',
                        '\\s(in)\\s',
                        '\\s(of)\\s',
                        '\\s(typeof)\\s',
                        '\\s(instanceof)\\s'
                    ],
                    declaration: ['\\s(var)\\s','\\s(let)\\s'],
                    name: ['var (\\S+)\\s?=','this\\.(\\S+)[\\s|\\(]?='],
                    operator: '(\\=|\\!|\\+|\\-|\\*|/|\\<|\\>)',
                    braces: `(\\(|\\)|\\[|\\]|\\{|\\})`
                }
                
                var defaultNest = {
                    quote: {selector:`('.*')`,},
                    comment: `(?:(//.*)\\n|(/\\*.*\\*/))`
                }
                
                var defaultConfig = {
                    map: defaultMap,
                    nest: defaultNest
                }
                
                var defaultMap = {
                     keyword: '\\s(function|class|return|while|for|if|let|else|do|break|yield|in|of|typeof|instanceof)\\s'
                    ,declaration: '\\s(var)\\s'
                    ,name: 'var (\\S+)\\s?='
                    ,operator: '(\\=|\\!|\\+|\\-|\\*|/|\\<|\\>)'
                    ,braces: `(\\(|\\)|\\[|\\]|\\{|\\})` // Untested
                }
                
                var defaultNest = {
                    quote: `('.*')` // Untested
                    ,comment: `(?:(//.*)\\n|(/\\*.*\\*/))` // Untested
                }
                
                var defaultConfig = {
                    map: defaultMap,
                    nest: defaultNest
                }
                
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
                        $.pre(
                          $.code({class: attributes.type},
                            highlight(script, defaultConfig)))
                    
                } else markup +=
                    $.pre(
                      $.code({class: attributes.type},
                        highlight(script, defaultConfig)))
            }
            
            if (isHeaderLine()) createHeader()
            else if (isLinkLine()) createLink()
            else if (isUnorderedListItem()) createList('ul')
            else if (isOrderedListItem()) createList('ol')
            else if (isChecklistItem()) createChecklist()
            else if (isCodeStart()) createCodeBlock()
            else if (lines[i] === '') markup += $.br()
            else markup += $.p(lines[i])
        }
        
        // TODO?
        //markup = markup.replace(/\?/g, '&quest;')
        
        return markup
    }
}