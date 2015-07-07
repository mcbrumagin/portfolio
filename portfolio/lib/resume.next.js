var Resumes = Meteor.CrudCollection('resume', ['title', 'content'], {
        template: 'resume'
    }, {
        resume: function () {
            return Resumes.find({},{
                sort: { dateModified: -1 }
            }).fetch()[0]
        },
        content: function () {
            return NextMark.convertMarkdown(this.content)
        }
})