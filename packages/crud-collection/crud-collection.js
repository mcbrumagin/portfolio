function isFunction(fn) {
    return fn && {}.toString.call(fn) === '[object Function]'
}

Meteor.Collections = {}

Meteor.CrudCollection = function (name, props, options, helpers, events) {
    
    if (isFunction(options))
        helpers = options
    else {
        var templateName = options.template || name
    }
    
    if (Meteor.Collections[name])
        throw new Error('Collection "' + name + '" already exists.')
    
    Meteor.Collections[name] = new Meteor.Collection(name)
    
    var create = name + 'Create'
    var update = name + 'Update'
    var destroy = name + 'Delete'
    
    var classes = {
        create: '.' + name + '-create',
        update: '.' + name + '-update',
        destroy: '.' + name + '-delete'
    }
    
    if (Meteor.isClient) {
        Template[templateName].onCreated(function () {
            this.subscribe(name)
        })

        var callback = function (err, res) {
            if (err) Meteor.log.error(err)
            else Meteor.log.trace(res)
        }
        
        var mainEvents = {}
        mainEvents['submit ' + classes.create] = function (e) {
            e.preventDefault()
            var newItem = {}
            for (var i = 0; i < props.length; i++) {
                newItem[props[i]] = $(classes.create + ' [name=' + props[i] + ']').val()
            }
            Meteor.call(create, newItem, callback)
        }
        mainEvents['submit ' + classes.update] = function (e) {
            e.preventDefault()
            var updateItem = {}
            for (var i = 0; i < props.length; i++) {
                updateItem[props[i]] = $(classes.update + ' [name=' + props[i] + ']').val()
            }
            updateItem._id = this._id
            Meteor.call(update, updateItem, callback)
        }
        mainEvents['click ' + classes.destroy] = function (e) {
            e.preventDefault()
            if (!this._id) var id = Template.parentData()
            else id = this._id
            
            Meteor.log.trace({deleting: id})
            Meteor.call(destroy, this._id, callback)
        }
        
        var bindFunctions = function (type, obj, main) {
            for (var prop in obj) {
                if (isFunction(obj[prop]))
                    main[prop] = obj[prop]
                else Template[prop][type](obj[prop])
            }
            
            if (!$.isEmptyObject(main)) {
                Template[templateName][type](main)
            }
        }
        
        bindFunctions('events', events, mainEvents)
        bindFunctions('helpers', helpers(Meteor.Collections[name]), {})
    }
    
    if (Meteor.isServer) {
        
        // TODO: expose publish function
        Meteor.publish(name, function () {
            return Meteor.Collections[name].find()
        })
        
        var methods = {}
        methods[create] = function (obj) {
            var date = new Date()
            obj.dateCreated = date
            obj.dateModified = date
            return Meteor.Collections[name].insert(obj)
        }
        methods[update] = function (obj) {
            obj.dateModified = new Date()
            return Meteor.Collections[name].update({_id: obj._id}, obj)
        }
        methods[destroy] = function (id) {
            return Meteor.Collections[name].remove({_id: id})
        }
        Meteor.methods(methods)
    }
}