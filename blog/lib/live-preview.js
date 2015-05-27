Meteor.startup(function () {
    LiveViews = new Meteor.Collection('liveViews')
})

Router.route('/liveView/:id/:version?', {
    name: 'liveView',
    subscriptions: function () {
        Meteor.log.trace({message: 'Id from url', id: this.params.id})
        return Meteor.subscribe('liveView', this.params.id)
    },
    data: function () {
        if (this.ready()) {
            Meteor.log.trace({message: 'Id from url', id: this.params.id})
            var liveView = LiveViews.findOne({ _id: this.params.id })
            var length = liveView.versions.length
            
            Meteor.log.trace({length: length})
            
            if (this.params.version && this.params.version < length)
                var version = liveView.versions[this.params.version]
            else version = liveView.versions[length-1]
            
            version._id = liveView._id
            Meteor.log.trace({version: version})
            return version
        }
    }
})
