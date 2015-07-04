var helpers = {
    date: function () {
        return this.dateModified.toLocaleString()
    },
    content: function () {
        return NextMark.convertMarkdown(this.content)
    }
}

var createEditableSection = function (name, events) {
    
    var data
    events["click .edit"] = function (e) {
        e.preventDefault()
        
        var oninput = function (e) {
            var _ = $(e.currentTarget)
                .closest('form')
                .getChildHtml({
                    title: '[name=title]',
                    content: '[name=content]'
                })

            _.content = helpers.content.call(_)
            _.dateModified = new Date()
            _.date = helpers.date.call(_)

            $(e.currentTarget)
                .closest('.overlay')
                .setChildHtml({
                    '.date': _.date,
                    '.title': _.title,
                    '.content': _.content
                })
        }
        
        var overlay = UI.components.overlay(
            form({class: `${name}-update`},
                input({name: 'title', oninput: oninput}),
                input({name: 'content', oninput: oninput}),
                div({class: 'live-view next-mark'},
                    div({class: 'item-header'},
                        span({class: 'title'}, data.title),
                        span({class: 'date'}, data.date)
                    ),
                    div({class: 'preview content'}, data.content)
                )
            ), {title: `Editing ${name}`, id: data._id})
           
        $(document.body).append(overlay)
            .on('click', '#' + data._id + ' .close, #' + data._id + ' .cancel', function (e) {
                $('#' + data._id).closest('.overlay')
                    .fadeOut()
                    .after(500).remove().go()
            })
        console.log(overlay)
    }
    
    Meteor.CrudCollection(name, ['title', 'content'],
        { template: name }, function (collection) {
            var viewHelpers = {
                date: helpers.date,
                content: helpers.content
            }
            viewHelpers[name] = function () {
                var defaultObj = {
                    title: 'Enter a title',
                    content: 'Enter some content'
                }
                
                var result = collection.find({}, {
                    sort: {dateModified: -1}
                }).fetch()[0]
                
                if (Meteor.isServer && !result) {
                    collection.insert(defaultObj)
                }
                
                data = result || defaultObj
                return data
            }
            
            return viewHelpers
        }, events)
}

//createEditableSection('about', {})

var editableSections = new Meteor.Collection('editableSection')
Meteor.EditableSection = function (name) {
    
    var subPubName = `${name}EditableSection`
    var update = `${name}UpdateEditableSection`
    
    if (Meteor.isServer) {
        Meteor.startup(() => {
            
            var sections = editableSections.find()
            for (var i = 0; i < sections.length; i++)
                editableSections.remove(sections[i]._id)
            
            var result = editableSections.find({name: name})[0]
            if (!result) editableSections.insert({
                name: name,
                title: 'Enter a unique title...',
                content: 'Enter some content...'
            })
        })
        Meteor.publish(subPubName, function () {
            return editableSections.find({name: name})[0]
        })
        var methods = {}
        methods[update] = function (obj) {
            obj.dateModified = new Date()
            return editableSections.update({name: name}, obj)
        }
    }
    
    if (Meteor.isClient) {
        
        Template.editableSection.onCreated(function () {
            this.subscribe(subPubName)
        })
        
        Template.editableSection.helpers({
            section: function () {
                var data = editableSections.find().fetch()[0]
                if (data) data.name = this
                console.log({data: data})
                return data
            },
            editOrNewButton: function () {
                if (true /* TODO: Check permissions */) {
                    return UI.components.buttonEdit({
                        class: 'edit md'
                    })
                }
            }
        })
        
        // TODO Permissions
        Template.editableSection.events({
            "click .edit": function (e) {
                var data = $(`#${name}`).getChildHtml({
                    title: '.title',
                    content: '.content'
                })
                data.name = name
                
                UI.renderWithData(
                    Template.editSection,
                    data, $(e.currentTarget).parent()[0])
            }
        })
        
        var events = {}
        
        events[`submit #update-${name}`] = function (e) {
            e.preventDefault()
            var data = $(e.currentTarget).getChildHtml({
                title: '[name=title]',
                content: '[name=content]'
            })
            Meteor.call(update, data, function () {
                $(e.currentTarget).closest('.overlay')
                    .fadeOut()
                    .after(500).remove().go()
            })
        }
        
        Template.editSection.events(events)
    }
}
Meteor.EditableSection('about')