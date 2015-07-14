
var isFading = false
Router.configure({
  layoutTemplate: 'layout',
  /*onBeforeAction: function () {
    Logger.disable()
    Logger.info("Fading in.")
    $('.loading').show().fadeIn()
    Meteor.setTimeout(function () {
      Logger.info("Done fading in.")
      return this.next()
    },500)
  },*/
  onAfterAction: function (cb) {
    //Logger.disable()
    //Logger.info("Fading out.")
    $('.loading').fadeIn().fadeOut()
  },
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function () {
    return [Meteor.subscribe('resources')]
  }
})

Router.route('/', {
  name: 'home',
  template: 'home'
})

Router.route('/blog')

Router.route('/notes', {
  name: 'notes',
  template: 'notes'
})

Router.route('/design', {
  name: 'designLibrary',
  template: 'designLibrary'
})

Router.route('/sandbox')

Router.route('/logs')

