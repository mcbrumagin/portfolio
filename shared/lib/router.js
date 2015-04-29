Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
})

Router.route('/', {
  name: 'resume',
  template: 'resume'
})

Router.route('/blog')

Router.route('/design', {
  name: 'designLibrary',
  template: 'designLibrary'
})

Router.route('/sandbox')