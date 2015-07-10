
Template.footer.helpers({
    year: () => new Date().getFullYear()
})

Template.navigation.helpers({
    isSuperUser: function () {
        return Meteor.isSuperUser()
    },
    isLoggedIn: function () {
        return Meteor.isLoggedIn()
    }
})

Template.navigation.events({
    "click li a": e => {
        var addr = $(e.currentTarget)
            .attr('href')
        if (addr) Router.go(addr)
    },
    "click .js-close-nav": e => {
        $('.main-nav').removeClass('open')
        $('header .button-group').fadeIn()
    },
    "click [class*=my-login]": e => {
        var type = $(e.currentTarget)[0].className.slice(9)
        type = type[0].toUpperCase() + type.slice(1)
        Meteor[`loginWith${type}`](() => {
            Meteor.isSuperUser()
            $('#my-login').fadeOut().after(500).hide().go()
            $('#my-logout').after(500).show().fadeIn().go()
        })
    },
    "click #my-logout": e => {
        Meteor.logout()
        $('#my-logout').fadeOut().after(500).hide().go()
        $('#my-login').after(500).show().fadeIn().go()
    }
})

Template.banner.events({
    "click .js-open-nav": e => {
        $('header .button-group').fadeOut()
        $('.main-nav').addClass('open')
    },
    "click .js-back-to-top": e => {
        $('html,body').animate({ scrollTop: 0 }, 'slow')
    }
})

Template.banner.onRendered(() => {
    
    // TODO: jQuery Cache
    var _ = $('.js-back-to-top')
    var showOrHideBackToTop = () => {
        
        if (_.hasClass('fade-in')
         && window.scrollY < window.innerHeight) {
                
            _.fadeOut().after(500).hide().go()
            _.parent().after(505)
                .render('height', _.parent().height())
                .render('width').go()
            
        } else if (!_.hasClass('fade-in')
         && window.scrollY >= window.innerHeight) {
            
            _.show().after(500).fadeIn().go()
            _.parent().render('height').render('width')
        }
    }
    
    _.hide()
    
    var reset = () => {
        _.parent().height('auto')
        _.parent().height(_.parent().height())
    }
    
    reset()
    showOrHideBackToTop()
    
    var timer
    var renderBackToTop = () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            showOrHideBackToTop()
        }, 500)
    }

    $(window)
        .scroll(renderBackToTop)
        .resize(() => {
            reset()
            renderBackToTop()
        })

})



if (Meteor.isClient) {
    Template.userHud.helpers({
        isLoggedIn: function () {
            return Meteor.isLoggedIn()
        },
        welcomeText: function () {
            // TODO: Return random hello/welcome text
            var displayName = Meteor.user().profile.name
            return displayName ? "Signed in as " + displayName + "." : ""
        }
    })
}
