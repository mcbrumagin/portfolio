/*
Template.button.helpers({
    type: function () {
        if (!this.type) return 'button'
        else return this.type
    },
    icon: function () {
        if (this.icon) return Resource('button icon', this.icon)
        else return ''
    },
    text: function () {
        if (this.text) return Resource('button text', this.text)
        else if (!this.icon) return Resource('button default text')
        else return ''
    },
    class: function () {
        if (this.class) return this.class
        else return Resource('button default class')
    }
})
*/

// TODO: Find a way to infer template based on this/helper?
var error = {
    required: function (property) {
        Meteor.log.error(`${property} is required for helper.`)
    }
}

// TODO: es6 class?
UI.viewModel = function (defaults, options) {
    return new UI.ViewModel(defaults, options)
}

UI.ViewModel = function (defaults, options) {
    this.options = options
    this.defaults = defaults
}

UI.ViewModel.prototype = {
    asAttributes: function () {
        var _ = {}
        for (var def in this.defaults) {
            _[def] = this.defaults[def]
        }
        for (var opt in this.options) {
            if (this.options[opt] !== undefined)
                _[opt] = this.options[opt]
        }
        var attr = ''
        for (var prop in _) {
            attr += ` ${prop}="${_[prop]}"`
        }
        return attr
    },
    prepare: function (propsToTake, propsToCopy) {
        Meteor.log.trace({
            prepare: {
                propsToTake: propsToTake,
                propsToCopy: propsToCopy
            }
        })
        propsToTake = propsToTake || []
        propsToCopy = propsToCopy || []
        var _ = {}
        for (var def in this.defaults) {
            _[def] = this.defaults[def]
        }
        for (var prop in this.options) {
            if (propsToCopy.indexOf(prop) > -1
            && this.options[prop])
                _[prop] = this.options[prop]
            if (propsToTake.indexOf(prop) > -1) {
                if (this.options[prop])
                    _[prop] = this.options[prop]
                delete this.options[prop]
            }
        }
        _.attributes = this.asAttributes()
        return _
    },
    valueOf: function () {
        return this.options
    },
    toString: function () {
        return this.asAttributes()
    }
}

UI.util = new function () {
    var _ = this
    
    _.helper = function (...fns) {
        return function (...args) {
            if (args !== undefined) {
                var options = args.pop()
                if (options && options.hash)
                    options = options.hash
                args.unshift(options)
            }
            var result = ''
            for (var fn of fns) {
                result = fn(...args)
                if (result.length) args = result
                else args = [result]
            }
            Meteor.log.trace(result)
            return result
        }
    }
    
    _.formField = function (options, name) {
        Meteor.log.trace({
            formField: {
                options: options,
                name: name
            }
        })
        if (!name) error.required('name')
        return new UI.ViewModel({
            type: 'text',
            label: name[0].toUpperCase() + name.slice(1),
            name: name
        }, options).prepare(['help', 'label'], ['name'])
    }

    _.button = function (defaults) {
        return function (options, text) {
            Meteor.log.trace({
                button: {
                    defaults: defaults,
                    options: options,
                    text: text
                }
            })
            if (options) options.text = text
            var _ = new UI.ViewModel(defaults, options)
                .prepare(['icon', 'text'])
                
            Meteor.log.trace({button: _})
            return _
        }
    }
}

UI.draw = new function () {
    var _ = this
    
    _.button = _ =>
        `<button${_.attributes}>
            ${_.icon ? `<i class="fa fa-${_.icon}" />` : ''}
            ${_.text ? `<span class="tx">${_.text}</span>` : ''}
        </button>`
    
    _.input = _ =>
        `<div class="field input-field">
            <label for="${_.name}">${_.label}</label>
            <input${_.attributes}/>
            ${_.help ? `<p class="help">${_.help}</p>` : ''}
        </div>`
        
    _.textarea = _ =>
        `<div class="field textarea-field">
            <label for="${_.name}">${_.label}</label>
            <textarea${_.attributes}>${_.value || ''}</textarea>
            ${_.help ? `<p class="help">${_.help}</p>` : ''}
        </div>`
}

UI.registerHelper('button', UI.util.helper(
    UI.util.button({
        type: 'button',
        class: 'md'
    }),
    UI.draw.button
))

UI.registerHelper('buttonSave', UI.util.helper(
    UI.util.button({
        type: 'submit',
        icon: 'save',
        text: 'Save',
        class: 'md'
    }),
    UI.draw.button
))

UI.registerHelper('buttonDelete', UI.util.helper(
    UI.util.button({
        type: 'button',
        icon: 'close',
        text: 'Delete',
        class: 'md'
    }),
    UI.draw.button
))

UI.registerHelper('input', UI.util.helper(
    UI.util.formField,
    UI.draw.input
))

UI.registerHelper('textarea', UI.util.helper(
    UI.util.formField,
    UI.draw.textarea
))
