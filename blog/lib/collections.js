Meteor.startup(function () {
    Posts = new Meteor.Collection('posts')
})

/*
CrudCollection('post', ['title', 'content'], function (collection) {
    
    var date = function () {
        return (this.dateModified
             || this.dateCreated)
                .toLocaleString()
    }
    
    return {
        postList: {
            post: function () {
                return collection.find({}, {
                    sort: { date: -1 }
                })
            }
        },
        postPreview: {
            date: date,
            content: function () {
                return NextMark.convertMarkdown(this.content)
            }
        }
    }
})
*/