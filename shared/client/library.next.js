Template.button.helpers({
    icon: function () {
        if (this.icon) return `<i class="fa fa-${this.icon}" />`
        else return ''
    },
    text: function () {
        if (this.text) return `<span class="tx">${this.text}</span>`
        else if (!this.icon) return '<span class="tx">Submit</span>'
        else return ''
    },
    class: function () {
        if (this.class) return this.class
        else return 'md'
    }
})

// TODO: Find a way to infer template based on this/helper?
var error = {
    required: function (template, property) {
        console.error(`${property} is required for ${template} template`)
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
        
        var attributes = `name="${_.name}" type="${_.type}" placeholder="${_.hint}"`
        
        if (_.tag === 'input' || !_.tag) {
            return `<input ${attributes} value="${_.val}" />`
        } else {
            return `<${_.tag} ${attributes}>${_.val}</${_.tag}>`
        }
    },
    help: function () {
        if (!this.help) return ''
        else return `<div class="help">${this.help}}</div>`
    }
})