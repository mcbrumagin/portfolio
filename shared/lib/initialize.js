// Registers section names
// for use with {{> editableSection }} tags
Meteor.EditableSections('about','projects')

if (Meteor.isClient) {
    Meteor.startup(function () {

        // Assume debug mode if a port is found
        if (window
         && window.location
         && window.location.port
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
    // TODO: May not need hopefully at some point
    process.env.PORT = 80
    process.env.ROOT_URL = "http://mcbrumagin.com/"
    process.env.MONGO_URL = "mongodb://mcbrumagin.com:82/meteor"
    process.env.BIND_IP = "mcbrumagin.com"
    
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
