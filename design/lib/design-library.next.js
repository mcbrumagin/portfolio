var Components = Meteor.CrudCollection('components', ['title', 'html', 'style'], {
    template: 'designLibrary'
}, {
    component: () => Components.find({}, {
        sort: { dateModified: -1 }
    }),
    previewStyle: function () {
        var styleLines = this.style.split('\n')
        for (var i = 0; i < styleLines.length; i++) {
            if (styleLines[i].trim().slice(-1) === "{") {
                styleLines[i] = "." + this.title + " " + styleLines[i]
            }
        }
        return styleLines.join('\n')
    },
    date: function () {
        return this.dateModified.toLocaleString()
    }
}, {
    "click .open-components-update": function (e) {
        e.preventDefault()
        this.collection = 'components'
        if ($(`[data-id=${this._id}] .components-update`).length === 0)
            UI.renderWithData(Template.editComponent, this,
                $(`[data-id=${this._id}]`)[0])
    },
    editComponent: {
        "submit .components-update": function (e) {
            e.preventDefault()
            var _ = $(`[data-id=${this._id}] .components-update`)
                .childHtml('[name=title]', '[name=html]', '[name=style]')
                
            _._id = this._id
            Meteor.call('componentsUpdate', _, function () {
                $(e.currentTarget).remove()
            })
        },
        "click .close": function (e) {
            $(e.currentTarget).parent().remove()
        }
    }
})
