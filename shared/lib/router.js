Router.configure({
  layoutTemplate: 'layout',
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

Router.route('/design', {
  name: 'designLibrary',
  template: 'designLibrary'
})

Router.route('/sandbox')

Router.route('/logs')

