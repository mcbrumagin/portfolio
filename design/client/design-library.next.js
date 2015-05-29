/*
// Need some way to specify different template helper methods
// Need some templates? Or use meteor template helper
CrudCollection('components', ['title', 'content'], function (collection) {
    
    var date = function () {
        return (this.dateModified
             || this.dateCreated)
                .toLocaleString()
    }
    
    return {
        testList: function () {
            return collection.find({},{
                sort: { dateModified: -1 }
            }).fetch()
        },
        date: date,
        testMostRecent: {
            mostRecent: function () {
                return collection.find({},{
                    sort: { dateModified: -1 }
                }).fetch()[0]
            }
        }
    }
})


Template.componentList.onCreated(function () {
    this.subscribe('components')
})

Template.componentList.helpers({
    component: () => Components.find({},{
        sort: { date: -1 }
    })
})


/*
Template.componentList.events({
    "click .delete-post": function (e) {
        e.preventDefault()
        Meteor.call('deletePost', this)
    }
})
*

Template.componentPreview.helpers({
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
        return this.date.toLocaleString()
    }
})


Template.newComponent.events({
    
})
*/