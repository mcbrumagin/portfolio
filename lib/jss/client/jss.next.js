/*
JSON Stylesheets
*/

/* TODO: Try using template strings
`.test-${name}`: {}
*/
function $$ (..._) {
    // Parse object and apply styles
    
    var rules = {}
    if (_.length === 1) {
        _ = _[0]
        (function createRules(prepend, _) {
            for (var selector in _) {
                // Check for nested selectors
                if (_[selector].toString() === '[object Object]') {
                    // Traverse through this
                    createRules(selector, _[selector])
                } else {
                    var constraint = prepend + _[selector]
                    if (rules[selector] && rules[selector].length)
                        rules[selector].push(constraint)
                    else rules[selector] = [constraint]
                }
            }
        })('', _)
        // Check for arrays (e.g; background: [...])
        // Add translated rule properties
        
        // Iterate through and apply all rules
        for (var selector in rules) {
            // TODO: Smart selector?
            for (var element of $$.select.all(selector)) {
                for (var prop in element.style) {
                    element.style[selector] = rules[selector]
                }
            }
        }
    }
}

$$.prototype = {
    select: {
        byId: document.getElementById.bind(document),
        one: document.querySelector.bind(document),
        all: document.querySelectorAll.bind(document),
        byClass: document.getElementsByClassName.bind(document),
        byTag: document.getElementsByTagName.bind(document),
        byName: document.getElementsByName.bind(document)
    }
}
