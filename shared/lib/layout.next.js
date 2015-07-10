
var isSuperUser = function (name) {
    var superUser = Meteor.users.find({
        isSuperUser: true
    }).fetch()[0]

    return superUser
    && superUser.profile
    && superUser.profile.name
    && superUser.profile.name === name
}
Meteor.methods({isSuperUser: isSuperUser})
Meteor.checkSuperUser = function () {
    var user = Meteor.user()
    if (user) {
        var name = user.profile.name
        if (Meteor.isClient) {
            Meteor.call('isSuperUser', name, function (err, res) {
                var result = err || res || false
                Session.set('isSuperUser', result)
            })
        } else if (Meteor.isServer) {
            var isSuper = isSuperUser(name)
            Session.set('isSuperUser', isSuper)
            return isSuper
        }
    } else {
        Session.set('isSuperUser', false)
        return false
    }
}

Meteor.checkIsLoggedIn = function () {
    var user = Meteor.user()
    
    if (user) var isLoggedIn = true
    else isLoggedIn = false
    
    return isLoggedIn
}

Meteor.isSuperUser = function () {
    return Meteor.checkSuperUser()
        || Session.get('isSuperUser')
}

Meteor.isLoggedIn = function () {
    return Meteor.checkIsLoggedIn()
}