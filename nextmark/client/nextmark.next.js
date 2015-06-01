String.prototype.take = function (end) {
    return String.prototype.slice.call(this, 0, end)
}

window.NextMark = new function () {
    var _ = this
    
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
            
            var createHeader = function () {
                var h = countCharsAtStart(lines[i], lines[i][0], 6)
                markup += `<h${h}>${lines[i].slice(h)}</h${h}>`
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
                markup += `<${listType}>`
                doWhile(() => lines[i][0] === match, () => {
                    markup += `<li>${lines[i].slice(1)}</li>`
                })
                markup += `</${listType}>`
                i--
            }
            
            var isChecklistItem = ()
                => lines[i].take(2) === '()'
                || lines[i].take(3) === '(x)'
            
            var createChecklist = function () {
                markup += `<ul class="check-list">`
                var type = 'type="checkbox"'
                
                doWhile(isChecklistItem, function () {
                    if (lines[i][1] === ')') {
                        var text = lines[i].slice(2)
                        markup += `<li><label><input ${type} />${text}</label></li>`
                    } else {
                        text = lines[i].slice(3)
                        markup += `<li><label><input ${type} checked />${text}</label></li>`
                    }
                })
                
                markup += `</ul>`
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
                
                if (attributes.type) {
                    if (attributes.type === 'js' && attributes.runnable) {
                        // TODO: May need to test for other chars
                        var escapedScript = script.replace(/"/g, '&quot;')
                        markup += `<button onclick="${escapedScript}">Run</button>`
                    }
                    
                    markup += `<code class="${attributes.type}"><pre>`
                } else markup += '<code><pre>'
                
                // TODO: May need to test for other chars
                script = script
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                
                markup += script
                markup += '</pre></code>'
                
            }
            
            if (isHeaderLine()) createHeader()
            else if (isUnorderedListItem()) createList('ul')
            else if (isOrderedListItem()) createList('ol')
            else if (isChecklistItem()) createChecklist()
            else if (isCodeStart()) createCodeBlock()
            else if (lines[i] === '') {
                markup += '<br />'
            } else {
                markup += `<p>${lines[i]}</p>`
            }
            /*
            else if (lines[i][0] === '') {
                markup += '</p>'
            } else if (i === 0 || lines[i-1] === '' || lines[i-1][0] === '@') {
                markup += '<p>' + lines[i]
            } else {
                markup += ' ' + lines[i]
            }
            */
        }
        return markup
    }
}