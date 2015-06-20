
/*
INPUT

`
// <summary>Theoretical documentation comment</summary>
var getData = function () {
    return 'This is an example function!'
}

var template = 2 + 2
`

 MAP CONFIG
var map = {
  comment: [REGEX1, REGEX2, {"html-tag": REGEX3}],
  keyword: REGEX4,
  equals: REGEX5,
  operator: [REGEX6, REGEX7, REGEX5]
}

// Match nested areas and store matched content
    
    // Process nested area regex map
    // Process entire nest
    // Process remaining content as it stands
    // Use shiftIndices on nests that are pending insertion 
    //    for each main-map modification
    // Insert nests (starting at the largest index)

 OUTPUT
 
<span class="comment">// <span class="html-tag>"&lt;summary&gt;Theoretical documentation comment<span class="html-tag html-end">&lt;/summary&gt;</span>
<span class="keyword">var</span> <span class="member">getData</span> <span class="equals operator">=</span> <span class="keyword">function</span> <span class="brace">(</span><span class="brace">)</span> <span class="brace">{</span>
    <span class="keyword">return</span> <span class="string">'This is an example function!'</span>
<span class="brace">}</span>

<span class="keyword">var</span> <span class="member">template</span> <span class="equals operator">=</span> 2 <span class="operator">+</span> 2
*/

Meteor.startup(function () {
    window.tests = {}
    window.tests.classify = new TestSuite('classify')
    var test = window.tests.classify
    
    test.the('Find method', () => {
        //--
    })
    
    test.the('Keyword parser', () => {
        
        var result = classify(' function test () { return } ',{
            keyword: ['\\s(function)[\\s|\\(]', '\\s(return)[\\s|;]']
        })
        
        the(result).is.exactly(
            ' <span class="keyword">function</span> test () {' +
            ' <span class="keyword">return</span> } ')
    })
    
    window.tests.activeText = new TestSuite('ActiveText')
    var test = window.tests.activeText
    
    test.the('Find function, basic case', () => {
        var test = new ActiveText('This is some test text.')
        var result = test.find('test')
        the(result[0].match).is.exactly('test')
    })
    
    test.the('Find function, basic capture case', () => {
        var test = new ActiveText('This is some test text.')
        var matchLocation = 13 // location of "test"
        var result = test.find('some (test) text')
        var capture = result[0].capture[matchLocation]
        the(capture).is.exactly('test')
    })
    
    test.the('Find function, multi-match basic case', () => {
        var test = new ActiveText('This is some test text. This is more test text.')
        var result = test.find('test')
        
        the(result[0].match).is.exactly('test')
        the(result[1].match).is.exactly('test')
    })
    
    test.the('Find function, multi-match case', () => {
        var test = new ActiveText('This is some test text. This is more test text.')
        var result = test.find(' (test) text')
        
        var matchLocation1 = 13 // location 1 of "test"
        var capture = result[0].capture[matchLocation1]
        the(capture).is.exactly('test')
        
        var matchLocation2 = 37
        var capture = result[1].capture[matchLocation2]
        the(capture).is.exactly('test')
    })
    
    test.the('Find function, multi-capture case', () => {
        var test = new ActiveText('This is some test text.')
        var result = test.find('some (test) (text)')
        
        var matchLocation1 = 13 // location 1 of "test"
        var capture = result[0].capture[matchLocation1]
        the(capture).is.exactly('test')
        
        var matchLocation2 = 18
        var capture = result[0].capture[matchLocation2]
        the(capture).is.exactly('text')
    })
})


// TODO: Class
function ActiveText (text) {
    var _ = this
    _.text = text
    _.search = regex => {
        
        if (!/(\(.+\))/.test(regex))
            regex = `(${regex})`
            
        regex = new RegExp(regex, 'g')
        
        var matches = []
        var match;
        while ((match = regex.exec(_.text)) !== null) {
            
            // TODO: Class, match should be property
            //    capture should be a map { 0: '', 1: '' } [.valueOf()]
            
            var result = {
                match: match.shift(),
                index: match.index,
                capture: null
            }
            
            var hasCaptures = false
            for (var m of match) {
                if (m !== result.match)
                    hasCaptures = true
            }
            
            if (hasCaptures) {
                result.capture = {}
                var text = new ActiveText(result.match) // TODO: Esacpe
                
                for (var capture of match) if (capture) {
                    capture = text.search(capture)
                    
                    for (var nestedMatch of capture) {
                        var i = match.index + nestedMatch.index
                        result.capture[i] = nestedMatch.match
                    }
                }
            }
            
            matches.push(result)
        }
        return matches
    }
    
    _.find = (...regexes) => {
        var matches = {}
        for (var regex of regexes) {
            var result = _.search(regex)
            for (var match of result) {
                if (match.capture) {
                    for (var i in match.capture) {
                        matches[i] = match.capture[i]
                    }
                } else matches[match.index] = match.match
            }
        }
        return matches
    }
    
    _.valueOf = () => _.text
    _.toString = () => _.text
}
window.ActiveText = ActiveText

this.classify = function (content, config) {
    
    var propsIn = (obj,fn) => {
        for (var prop in obj)
            fn(obj[prop], prop)
    }
    
    var forEach = (arr, fn) => {
        for (var i = 0; i < arr.length; i++)
            fn(arr[i], i)
    }
    
    var fragment = (text, regex) => {
        var match = text.find(regex)

    }
    
    var fragments = []
    propsIn(config.nest, (nest, type) => {
        fragments.push(fragment(nest))
    })
    // var test = '<div>This is a test</div>' + 'yeah'
    // ["var test = ", "'<div>This is a test</div>'", "'yeah'"]
    // [""]
    
    
    // {content: "var test =  + ", map: {11: "'<div>This is a test</div>'", 14: "'yeah'"}}
    // {content: "<s>var</s> <s>test</s> <s>=</s>  <s>+</s> ",
    //     map: {32: "'<span class="markup">&lt;div&gt;This is a test&lt;/div&gt;</span>'", 42: "'yeah'"}}
    // "<s>var</s> <s>test</s> <s>=</s> <s>'<s><div></s>This is a test<s>div></s>'</s> + <s>'yeah'</s>""
    
    var nestedMap = {content: content, map:{}}
    
    propsIn(config.map, (val, name) => {
        // if array, check for nested object
        if (val.length) {
            forEach(val, (rule, ind) => {
                // if object, create new nest
                    // move the selected strings to a new map
                    // the map should have the index at which to insert
                if (rule.toString() === '[object Object]') {
                    //rule.
                    var newMap = {}
                    newMap.name = val
                    newMap.index = ind
                }
            })
            
        }
    })

    // Match nested areas and store matched content
    
    // Process nested area regex map
    // Process entire nest
    // Process remaining content as it stands
    // Use shiftIndices on nests that are pending insertion 
    //    for each main-map modification
    // Insert nests (starting at the largest index)

}