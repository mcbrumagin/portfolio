
var error = {
    required: function (property) {
        Logger.error(`${property} is required for helper.`)
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
        /*
        Meteor.log.trace({
            prepare: {
                propsToTake: propsToTake,
                propsToCopy: propsToCopy
            }
        })
        */
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
                //Meteor.log.trace({prop: prop})
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
            //Meteor.log.trace(result)
            return result
        }
    }
    
    var formField = function (options, name, take, copy) {
        /*
        Meteor.log.trace({
            formField: {
                options: options,
                name: name,
                take: take,
                copy: copy
            }
        })
        */
        if (!name) error.required('name')
        return new UI.ViewModel({
            type: 'text',
            label: name[0].toUpperCase() + name.slice(1),
            name: name
        }, options).prepare(take, copy)
    }
    
    _.input = function (options, name) {
        return formField(options, name, ['help', 'label'], ['name'])
    }
    
    _.textarea = function (options, name) {
        return formField(options, name, ['help', 'label', 'value'], ['name'])
    }

    _.button = function (defaults) {
        return function (options, text) {
            /*
            Meteor.log.trace({
                button: {
                    defaults: defaults,
                    options: options,
                    text: text
                }
            })
            */
            if (options) options.text = text
            var _ = new UI.ViewModel(defaults, options)
                .prepare(['icon', 'text'])
                
            //Meteor.log.trace({button: _})
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
    
    _.overlay = _ =>
        `<div class="overlay fade fade-out" style="display: none">
            <div ${_.attributes}>
                ${_.close}
                ${_.title ? `<h3>${_.title}</h3>` : ''}
                ${_.message ? `<div>${_.message}</div>` : ''}
                <div class="button-group clearfix">
                    ${_.ok}
                    ${_.cancel}
                </div>
            </div>
        </div>`
}

UI.components = new function () {
    var _ = this
    
    _.button = UI.util.helper(
        UI.util.button({
            type: 'button',
            class: 'md'
        }),
        UI.draw.button)

    _.buttonOkay = UI.util.helper(
        UI.util.button({
            text: 'Okay',
            icon: 'check',
            type: 'button',
            class: 'md okay'
        }),
        UI.draw.button)
        
    _.buttonClose = UI.util.helper(
        UI.util.button({
            icon: 'close',
            type: 'button',
            class: 'md close right'
        }),
        UI.draw.button)
    
    _.buttonCancel = UI.util.helper(
        UI.util.button({
            text: 'Cancel',
            icon: 'close',
            type: 'button',
            class: 'md cancel'
        }),
        UI.draw.button)
    
    _.buttonSave = UI.util.helper(
        UI.util.button({
            type: 'submit',
            icon: 'save',
            text: 'Save',
            class: 'md'
        }),
        UI.draw.button)
    
    _.buttonEdit = UI.util.helper(
        UI.util.button({
            type: 'button',
            icon: 'edit',
            text: 'Edit',
            class: 'md'
        }),
        UI.draw.button)
    
    _.buttonDelete = UI.util.helper(
        UI.util.button({
            type: 'button',
            icon: 'trash',
            text: 'Delete',
            class: 'md'
        }),
        UI.draw.button)
    
    _.input = UI.util.helper(
        UI.util.input,
        UI.draw.input)
    
    _.textarea = UI.util.helper(
        UI.util.textarea,
        UI.draw.textarea)
    
    _.overlay = UI.util.helper(
        function (options, message) {
            if (!message) error.required('message')
            var _ = UI.viewModel({message: message}, options)
                .prepare(['message', 'title'])
            _.close = UI.components.buttonClose()
            _.cancel = UI.components.buttonCancel()
            _.ok = UI.components.buttonOkay()
            //Meteor.log.trace({overlay: _})
            return _
        },
        UI.draw.overlay)
    
    for (var helper in _) {
        UI.registerHelper(helper, _[helper])
    }
}