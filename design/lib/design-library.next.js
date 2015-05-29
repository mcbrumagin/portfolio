Meteor.CrudCollection('components', ['title', 'html', 'style'], {
    template: 'designLibrary'
}, function (collection) {
    return {
        component: () => collection.find({}, {
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
    }
})
