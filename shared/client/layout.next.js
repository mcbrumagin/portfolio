
Template.footer.helpers({
    year: () => new Date().getFullYear()
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
            var profile = Meteor.user().profile
            var displayName = profile.name
                || `${profile.firstName} ${profile.lastName}`
            // TODO: Return random hello/welcome text
            return displayName ? "Signed in as " + displayName + "." : ""
        }
    })
}
