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

// TODO: Find a way to infer template based on this/helper?
var error = {
    required: function (template, property) {
        Meteor.log.error(`${property} is required for ${template} template`)
    }
}

Template.field.helpers({
    label: function () {
        if (!this.label) error.required('field', 'label')
        else return this.label
    },
    tag: function () {
        var _ = this
        if (!_.name) error.required('field', 'name')
        if (!_.val) _.val = ''
        if (!_.type) _.type = ''
        if (!_.hint) _.hint = ''
        
        var attributes = Resource('field attributes', _.name, _.type, _.hint)
        
        if (_.tag === 'input' || !_.tag) {
            return Resource('field input', attributes, _.val)
        } else {
            return Resource('field default', _.tag, attributes, _.val)
        }
    },
    help: function () {
        if (!this.help) return ''
        else return Resource('field help', this.help)
    }
})