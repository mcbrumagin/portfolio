// Registers section names
// for use with {{> editableSection }} tags
Meteor.EditableSections('about','projects')

if (Meteor.isClient) {
    Meteor.startup(function () {
        Meteor.isSuperUser()
    })
}
