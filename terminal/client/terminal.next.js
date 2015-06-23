

var saveButton = {
    button: {
        padding: '1rem',

        span: {
            "font-size": '125%'
        }
    }
}

var defaultSpacing = {
    margin: '1rem',
    padding: '0.5rem'
}

var lightAccent = '#fde'

var centerOfParent = _ => {
    var p = _.parent()

    var parent = {
        offset: p.offset(),
        height: p.outerHeight(),
        width: p.outerWidth()
    }

    var self = {
        height: _.outerHeight(),
        width: _.outerWidth()
    }

    _.top(parent.offset.top
        + parent.height/2
        - self.height/2)

    _.left(parent.offset.left
        + parent.width/2
        - self.width/2)
}

var ifPortrait = value => _ => {
    var ratio = window.innerHeight/window.innerWidth
    return (ratio >= 1) ? value : 'auto'
}


// KEYWORDS: mixin, next, prev, self,
// onRender, onResize, onScroll, onClick, etc..
// all html5 tag names
// ...extend?

var styles = {
    ".sample-selector button": {
        background: '#fff',

        mixin: [
            defaultSpacing,
            saveButton
        ]
    },

    "h1, h2, h3, h4, h5, h6": {
        fontFamily: 'Times New Roman'
    },

    "ul": {
        margin: '1rem 2rem',

        "li": {
            "list-style-type": 'none',
            width: ifPortrait(100)
        }
    },

    ".date": {
        onRender: _ => new Date(_.text).toLocaleString(),
        fontStyle: 'italic'
    },

    "section": {
        border: `1px solid ${lightAccent}`,
        width: '40rem',
        onResize: centerOfParent
    },

    "form": {
        onHide: _ => _.fadeOut(),

        // Element query
        "& width < 100": {
            "> *": {
                display: 'block'
            },

            // Spread selector selects adjacent buttons?
            "...button": {
                width: '100%',
                margin: '2rem'
            }
        },

        mixin: saveButton,
        margin: '3rem',
        width: '75% - 20px'
    }
}



$.fn.terminal = function (options) {
    var jq = jQuery
    var $ = new Jsml.Writer()
    var _ = this
    var _$ = $(this)

    var render = {
        monitor: _ => {
            $.div({class:'monitor-wrapper'},
                $.ul({class:'monitor-list'},
                    $.each(_.lines, _ => render.monitorLine(_))
                )
            )
        },
        monitorLine: _ => {
            $.li({class:'monitor-line'},
                _.text
            )
        },
        prompt: _ => {
            $.div({class:'prompt-wrapper'},
                $.form({class:'prompt-form'},
                    $.label('>', $.input({class:"prompt-input"}))
                )
            )
        }
    }
}