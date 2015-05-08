String.prototype.slim = function (start, end) {
    return String.prototype
        .slice.call(this, start, end)
        .trim()
}

window.convertMarkdown = function (markdown) {
    
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
    
    var markup = ''
    var lines = markdown.split('\n')
    for (var i = 0; i < lines.length; i++) {
        
        var doWhile = function (fn, cond) {
            do {
                fn()
            } while (lines[i] !== undefined && cond())
        }
        
        var parseList = function (listType, match) {
            markup += `<${listType}>`
            do {
                markup += `<li>${lines[i].slice(1)}</li>`
                i++
            } while (lines[i] !== undefined && lines[i][0] === match)
            markup += `</${listType}>`
        }
        
        if (lines[i][0] === '*') {
            parseList('ul', '*')
        }
        else if (lines[i][0] === '-') {
            parseList('ul', '-')
        }
        else if (lines[i][0] === '#') {
            parseList('ol', '#')
        }
        else if (lines[i][0] === '@') {
            var h = countCharsAtStart(lines[i], '@', 6)
            markup += `<h${h}>${lines[i].slice(h)}</h${h}>`
        }
        else if (lines[i].slice(0,2) === '()'
            || lines[i].slice(0,3) === '(x)') {
            
            markup += `<ul class="check-list">`
            var type = 'type="checkbox"'
            do {
                if (lines[i][1] === ')') {
                    var text = lines[i].slice(2)
                    markup += `<li><input ${type} />${text}</li>`
                } else {
                    text = lines[i].slice(3)
                    markup += `<li><input ${type} checked />${text}</li>`
                }
                i++
            } while (lines[i] !== undefined
                && (lines[i].slice(0,2) === '()'
                || lines[i].slice(0,3) === '(x)'))
            
            markup += `</ul>`
        }
        else if (lines[i].slice(0,5) === '[code') {
            var attributes = findAttributes(lines[i])
            
            i++
            var script = ''
            doWhile(() => {
                script += lines[i++] + '\n'
            }, () => lines[i].slice(0,3) !== '[/]')
            
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
        else if (lines[i][0] === '') {
            markup += '</p>'
        } else if (i === 0 || lines[i-1] === '' || lines[i-1][0] === '@') {
            markup += '<p>' + lines[i]
        } else {
            markup += ' ' + lines[i]
        }
    }
    return markup
}

Template.postList.onCreated(function () {
    this.subscribe('posts')
})

Template.postList.helpers({
    post: () => Posts.find()
})

Template.postList.events({
    "click .delete-post": function (e) {
        e.preventDefault()
        Meteor.call('deletePost', this)
    }
})

Template.postPreview.helpers({
    date: function () {
        return this.date.toLocaleString()
    },
    content: function () {
        window.temp1 = convertMarkdown(this.content)
        return window.temp1
    }
})

Template.newPost.events({
    "submit .create-post": e => {
        e.preventDefault()
        Meteor.call('newPost', {
            title: $('.create-post [name=title]').val(),
            content: $('.create-post [name=content]').val()
        })
    },
    "input [name=content]": e => {
        var title = $('.create-post [name=title]').val()
        $('.new-post-preview .title').html(title)
        
        var date = new Date().toLocaleString()
        $('.new-post-preview .date').html(date)
        
        var markdown = $('.create-post [name=content]').val()
        var markup = convertMarkdown(markdown)
        window.temp2 = markup
        $('.new-post-preview .content').html(markup)
    }
})
