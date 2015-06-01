Meteor.CrudCollection('resume', ['title', 'content'], {
        template: 'resume'
    }, function (collection) {
        return {
            resume: function () {
                return collection.find({},{
                    sort: { dateModified: -1 }
                }).fetch()[0]
            },
            content: function () {
                return NextMark.convertMarkdown(this.content)
            }
        }
})