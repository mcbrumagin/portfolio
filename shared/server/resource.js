Resource = function () {
    var hjson = Meteor.npmRequire('hjson')
    var resourceText = fs.readFileSync('../../../../../public/resources.hjson', 'UTF-8')
    var resourceObj = hjson.parse(resourceText)
    //Meteor.log.trace(resourceObj)
    return resourceObj
}

Meteor.publish('resources', function () {
    return Resources.find()
})

Meteor.startup(function() {
    var resources = Resources.find().fetch()
    for (var i = 0; i < resources.length; i++) {
        Resources.remove(resources[i])
    }
    Resources.insert(Resource())
})
