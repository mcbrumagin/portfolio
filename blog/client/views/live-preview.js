// TODO: Completely identical to postPreview helpers
Template.liveView.helpers({
    date: function () {
        return this.date.toLocaleString()
    },
    content: function () {
        return NextMark.convertMarkdown(this.content)
    }
})
