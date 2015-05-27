Meteor.publish('liveView', function (id) {
    this._session.socket.on('close', Meteor.bindEnvironment(function () {
        LiveViews.remove(id)
    }))
    return LiveViews.find({_id: id})
})

Meteor.methods({
    'newLiveView': function () {
        // Versions are necessary for history?
        return LiveViews.insert({
            versions: [{
                title: '',
                content: '',
                date: new Date()
            }],
            started: new Date()
        })
    },
    'updateLiveView': function (obj) {
        return LiveViews.update({_id: obj.id}, {
            $push: {
                versions: {
                    title: obj.title,
                    content: obj.content,
                    date: new Date()
                }
            }
        })
    }
})
