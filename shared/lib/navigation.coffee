NavigationCollection = new Meteor.Collection 'navigation'
Meteor.Navigation = NavigationCollection

if Meteor.isClient
  Template.navigation.onCreated ->
    Logger.info 'Subscribing to navigation'
    @subscribe 'navigation'

  # TODO, Filter publish based on user permissions
  Template.navigation.helpers
    superUserNavItems: ->
      NavigationCollection.find
        authLevel: 'superadmin'

    isSuperUser: -> Meteor.isSuperUser()
    isLoggedIn: -> Meteor.isLoggedIn()

  Template.navigation.events
    "click li a": (e) ->
      addr = $(e.currentTarget).attr('href')
      Router.go addr unless !addr

    "click .js-close-nav": (e) ->
      $('.main-nav').removeClass('open')
      $('header .button-group').fadeIn()

    "click [class*=my-login]": (e) ->
      type = $(e.currentTarget)[0].className.slice(9)
      type = type[0].toUpperCase() + type.slice(1)
      Meteor["loginWith#{type}"] ->
        Meteor.isSuperUser()
        $('#my-login').fadeAndHideAfter(500)
        $('#my-logout').after(500).show().fadeIn().go()

    "click #my-logout": (e) ->
      Meteor.logout()
      $db.myLogout().fadeOutHideAfter 500
      $('#my-login').after(500).show().fadeIn().go()
      #create sequential jquery helper



  ###
  $.fn.compose = function () {
    var
  }


  $.sequence = ($obj) ->

  $.fn.customFunc = ->
    $(@).after(500).show().fadeIn().go()
  ###


  $.fn.sequence = (fns...) -> ($object) ->
    args = Array.prototype.slice.call arguments
    runAndSave = (fn) -> args = fn.apply $object, args
    runAndSave fn for fn of fns
    args

  $.fn.args = (args...) -> (extraArgs...) =>
      @.apply this, args.concat extraArgs


else if Meteor.isServer

  Meteor.publish 'navigation', ->
    NavigationCollection.find {}

  Meteor.startup ->
    navigationItems = NavigationCollection.find {}

    navigationItems.forEach (item) ->
      NavigationCollection.remove item._id

    NavigationCollection.insert item for item in [
        name: 'blog'
        icon: 'comment'
        displayName: 'Blog'
        authLevel: 'public'
      ,
        name: 'notes'
        icon: 'pencil-square'
        displayName: 'Notes'
        authLevel: 'superadmin'
      ,
        name: 'designLibrary'
        icon: 'photo'
        displayName: 'Design'
        authLevel: 'superadmin'
      ,
        name: 'sandbox'
        icon: 'inbox'
        displayName: 'Sandbox'
        authLevel: 'superadmin'
      ,
        name: 'logs'
        icon: 'list-alt'
        displayName: 'Logs'
        authLevel: 'superadmin'
    ]

###
    ,{
      name: 'resume'
      icon: 'book'
      displayName: 'Resume'
      authLevel: 'superadmin'
    },{
      name: 'tutorials'
      icon: 'graduation-cap'
      displayName: 'Tutorials'
      authLevel: 'superadmin'
    },{
      name: 'samples'
      icon: 'code'
      displayName: 'Samples'
      authLevel: 'superadmin'
    }
###