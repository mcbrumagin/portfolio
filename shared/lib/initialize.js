// Registers section names
// for use with {{> editableSection }} tags
Meteor.EditableSections('about','projects')

if (Meteor.isClient) {
    Meteor.startup(function () {

        // Assume debug mode if a port is found
        if (window.location.port
         && window.location.port !== '') {
            Meteor.isDebug = true
        }

        if (Meteor.isDebug) {
            Logger.enable()
        }

        Meteor.isSuperUser()
    })
}
