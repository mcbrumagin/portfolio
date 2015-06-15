
Template.footer.helpers({
    year: () => new Date().getFullYear()
})

Template.navigation.events({
    "click li": e => {
        var addr = $(e.currentTarget)
            .find('a')
            .attr('href')
            
        Router.go(addr)
    },
    "click .js-close-nav": e => {
        $('.main-nav').removeClass('open')
        $('header .button-group').fadeIn()
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
    
    var repaintHud = () => {
        //var anchoringGroup;
        
        /*
        var buttonGroups = [];
        var isGroupFound = true
        
        var i = 0
        while (isGroupFound) {
            i++
            
            var buttonGroup = $(`[class*=js-button-group-${i}]`)
            console.log(buttonGroup.html())
            if (buttonGroup.length) {
                
                if (buttonGroups.length > 0) {
                    var lastGroup = buttonGroups[buttonGroups.length - 1]
                    var top = lastGroup.css('top').replace('px','')
                    var height = lastGroup.css('height').replace('px','')
                    var position = Number(top) + Number(height) + 5
                    console.log(position)
                    buttonGroup.css('top', position + 'px')
                }
                
                buttonGroups.push(buttonGroup)
                //if (i === 1) {
                //    anchoringGroup = buttonGroup
                //    console.log(anchoringGroup.html())
                //} else {
                //    var buttons = buttonGroup.children()
                //    anchoringGroup.append(buttons)
                //    buttonGroup.remove()
                //}
            } else isGroupFound = false
            
        }
        */
    }
    
    setTimeout(repaintHud, 550)
    
    
    // TODO: jQuery Cache
    var _ = $('.js-back-to-top')
    var showOrHideBackToTop = () => {
        
        setTimeout(repaintHud, 1000)
        
        if (_.hasClass('fade-in')
        && window.scrollY < window.innerHeight) {
                
            _.fadeOut()
                .after(500)
                .hide()
                .go()
                
            _.parent()
                .after(505)
                .render('height', _.parent().height())
                .render('width')
                .go()
            
        } else if (!_.hasClass('fade-in')
        && window.scrollY >= window.innerHeight) {
            
            _.show()
                .after(500)
                .fadeIn()
                .go()
            
            _.parent()
                .render('height')
                .render('width')
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
            repaintHud()
        })
    
})