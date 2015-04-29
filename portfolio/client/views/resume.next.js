Template.resume.onCreated(function () {
  this.subscribe('resume')
})

Template.resume.helpers({
    resume: () => Resume.findOne()
})