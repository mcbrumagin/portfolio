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
        } else {
            Logger.disable()
        }

        Meteor.isSuperUser()
    })
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Meteor.isDebug) {
            Logger.enable()
        } else {
            Logger.disable()
        }
        
        Logger.log(process.env)
    })
}

Meteor.isDebug = true
