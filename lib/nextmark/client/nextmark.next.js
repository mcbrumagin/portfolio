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
        'p span li label ul ol div h1 h2 h3 h4 h5 h6 button code pre a',
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
                var matches = text.find('\\[(.*)\\]@\\((.*)\\)')
                var targets = []
                for (var m in matches)
                    targets.push(matches[m])
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
                //script = script
                    //.replace(/</g, '&lt;')
                    //.replace(/>/g, '&gt;')
                
                //Characters that require escaping:
                // \ + * ? ^ $ = ! | : - . < > [ ] ( ) { }
                var defaultMap = {
                    keyword: [
                        '\\s(function)[\\s|\\(]',
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
                     keyword: '\\s(function|return|while|for|if|let|else|do|break|yield|in|of|typeof|instanceof)\\s'
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
        return markup
    }
}