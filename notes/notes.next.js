
var timeout = null
var dataRenderId = 1

var util = {
    debounce: (time, fn) => {
        var timeout
        return (...$) => {
            Meteor.clearTimeout(timeout)
            timeout = Meteor.setTimeout(() => fn(...$), time)
        }
    },
    applyAllAfter: (time, fn) => {
        var timeout
        var args = []
        return (...$) => {
            args = args.concat($)
            Meteor.clearTimeout(timeout)
            timeout = Meteor.setTimeout(() => {
                fn(...args)
                args = []
            }, time)
        }
    },
    escapeHtml: () => {}
}

var helpers = {
    isSuperUser: Meteor.isSuperUser,
    date: function () {
        return this.dateModified.toLocaleString()
    },
    content: function () {
        return NextMark.convertMarkdown(this.content)
    },
    preview: util.debounce(10, e => {
        if (!window.isNotFirst) {
            window.isNotFirst = true
            $('.new-note-preview').fadeIn()
        }

        var _ = $(e.currentTarget)
            .find('form')
            .getChildHtml({
                title: '[name=title]',
                content: '[name=content]'
            })

        //_.content = _.content.replace(/\?/g, '&quest;')
        if (_.content.length > 0)
            _.content = NextMark.convertMarkdown(_.content)

        _.date = new Date().toLocaleString()

        $(e.currentTarget)
            .setChildHtml({
                '.date': _.date,
                '.title': _.title,
                '.content': _.content
            })

        var liveViewId = $(e.currentTarget)
            .find('[data-live-view-id]')
            .data('live-view-id')

        if (liveViewId) {
            var liveView = {
                id: liveViewId,
                title: _.title,
                content: _.content
            }

            Meteor.call('updateLiveView', liveView, function (err, res) {
                if (err) {
                    Logger.error({
                        message: 'An error occurred when updating the LiveView',
                        error: err
                    })
                } else Logger.log(res)
            })
        }
    }),
    click: {
        close: function (e) {
            window.isNotFirst = false
            $(e.currentTarget)
                .closest('.overlay')
                .fadeOut()
                .after(500).remove().go()
        },
        maximize: function (e) {
            var pane = $(e.currentTarget)
                .closest('.overlay')
                .find('> *:first-child')

            pane.data('position', {
                top: pane.css('top'),
                left: pane.css('left'),
                right: pane.css('right'),
                bottom: pane.css('bottom')
            }).css({
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                height: 'auto',
                width: 'auto',
                overflow: 'auto'
            })
        },
        restoreDown: function (e) {
            var pane = $(e.currentTarget)
                .closest('.overlay')
                .find('> *:first-child')

            var position = pane.data('position')

            pane.css({
                position: 'relative',
                top: position.top,
                left: position.left,
                right: position.right,
                bottom: position.bottom,
                height: 'auto',
                width: 'auto',
                overflow: 'auto'
            })
        },
        minimize: function (e) {
            $(e.currentTarget)
                .closest('.overlay')
                .find('> *:first-child')
                .css({
                    position: 'absolute',
                    top: 'auto',
                    left: 0,
                    right: 'auto',
                    bottom: 0,
                    height: '3.6rem',
                    width: '25rem',
                    overflow: 'hidden'
                })
        }
    }
}

var Notes = Meteor.CrudCollection('note', ['user', 'title', 'content'], {
        template: 'notes'
    }, {
        note: function () {
            var query = Session.get('note-search') || {}
            return Notes.find(query, {
                sort: {dateModified: -1}
            }).fetch()
        },
        date: helpers.date,
        content: helpers.content,
        isSuperUser: helpers.isSuperUser
        // TODO: Allow easy extension of built-in methods
        // TODO: Extend delete action to delete coupled comments
    }, {
        "input #note-search": function (e) {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                var input = $(e.currentTarget).val()
                if (input === '') var query = {}
                else {
                    query = []
                    var filter = t => t !== ''
                    && t !== '-'

                    input.split(' ').filter(filter).forEach(word => {
                        var text = new ActiveText(word).find('\\-.+')
                        if (!$.isEmptyObject(text)) {
                            var isNot = true
                            word = word.replace('-', '')
                        }

                        var conditions = []
                        var setConditions = word => {
                            //TODO: Escape regex
                            var search = {$regex: word, $options: 'i'}
                            conditions = conditions.concat([
                                {title: search},
                                {content: search},
                                {dateCreated: search},
                                {dateModified: search}
                            ])
                        }

                        var wordOptions = word.split('|')
                        if (wordOptions.length > 1) {
                            wordOptions.filter(filter)
                                .forEach(setConditions)
                        } else setConditions(word)

                        var queryFrag
                        if (isNot) queryFrag = {$nor: conditions}
                        else queryFrag = {$or: conditions}
                        query.push(queryFrag)
                    })
                    query = {$and: query}
                }
                Session.set('note-search', query)
            }, 500)
        },
        "click .open-note-update": function (e) {
            this.collection = 'note'
            var _ = this
            UI.renderWithData(
                Template.editNote, this,
                $(document.body)[0])

            var uid = dataRenderId++

            $('form.note-update:not([data-render-id])')
                .attr('data-render-id', uid)
                .closest('.overlay')
                .setChildHtml({
                    '.date': helpers.date.call(this),
                    '.title': _.title,
                    '.content': helpers.content.call(this)
                })
                .fadeIn()
                .find('> *:first-child')
                .after(10).draggable().go()
                .find('.fade-out')
                .after(100).fadeIn().go()
        },
        "click .js-new-create-note": function (e) {
            UI.render(Template.createNote, $(document.body)[0])

            var uid = dataRenderId++

            $('form.note-create:not([data-render-id])')
                .attr('data-render-id', uid)
                .closest('.overlay')
                .fadeIn()
        .find('> *:first-child')
        .after(10).draggable().go()
    },
    createNote: {
        "submit .note-create": function (e) {
            e.preventDefault()
            var form = $(e.currentTarget)
            var note = {}
            var user = Meteor.user()
            if (!user || !user._id) throw new Error('User not found when saving note.')
            note.user = user._id
            note.title = form.find(`[name=title]`).val()
            note.content = form.find(`[name=content]`).val()
            Meteor.call('noteCreate', note, function () {
                window.isNotFirst = false
                $(e.currentTarget).closest('.overlay')
                    .fadeOut()
                    .after(500).remove().go()
            })
        },
        "input [name=content],[name=title]": helpers.preview,
        "click .close": helpers.click.close,
        "click .maximize": helpers.click.maximize,
        "click .restore-down": helpers.click.restoreDown,
        "click .minimize": helpers.click.minimize
    },
    editNote: {
        "submit .note-update": function (e) {
            e.preventDefault()

            var $form = $(e.currentTarget)
            var user = Meteor.user()
            if (!user._id) throw new Error('User not found when saving note.')
            this.user = user._id
            this.title = $form.find(`[name=title]`).val()
            this.content = $form.find(`[name=content]`).val()

            Meteor.call('noteUpdate', this, () => {
                $form.closest('.overlay').remove()
            })
        },
        "input [name=content],[name=title]": helpers.preview,
        "click .close": helpers.click.close,
        "click .maximize": helpers.click.maximize,
        "click .restore-down": helpers.click.restoreDown,
        "click .minimize": helpers.click.minimize
    }
})
