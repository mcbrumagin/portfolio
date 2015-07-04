var editableSections = new Meteor.Collection('editableSection')
Meteor.EditableSection = function (name) {

    var subPubName = name + 'EditableSection'
    var update = name + 'UpdateEditableSection'

    if (Meteor.isServer) {
        Meteor.startup(function () {
            var result = editableSections.find({name: name}).fetch()[0]
            if (!result) editableSections.insert({
                name: name,
                title: name.toUpperCase(),
                content: 'Enter some content...'
            })
        })
        Meteor.publish(subPubName, function () {
            return editableSections.find({name: name})
        })
        var methods = {}
        methods[update] = function (obj) {
            obj.dateModified = new Date()
            obj.name = name
            return editableSections.update({name: name}, obj)
        }
        Meteor.methods(methods)
    }

    if (Meteor.isClient) {

        Template.editableSection.onCreated(function () {
            this.subscribe(subPubName)
        })

        Template.editableSection.helpers({
            section: function () {
                var data = editableSections.find({name: this.toString()}).fetch()[0]
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
                var data = $('#' + name).getChildHtml({
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

        events['submit #update-' + name] = function (e) {
            e.preventDefault()
            var data = $(e.currentTarget).getChildHtml({
                title: '[name=title]',
                content: '[name=content]'
            })
            console.log(update, data)
            Meteor.call(update, data, function () {
                $(e.currentTarget).closest('.overlay')
                    .fadeOut()
                    .after(500).remove().go()
            })
        }
        events["click .close"] = function (e) {
            $(e.currentTarget)
                .closest('.edit-section')
                .remove()
        }

        Template.editSection.events(events)
    }
}
