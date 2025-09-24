micro.exports = async function contact() {
  await micro.modules.renderPageTemplate()
  
  const { div, h1, h2, h3, h4, p, section, a, button, strong } = micro.html

  return div({ class: 'content' },
    section({ class: 'hero' },
      h1('Get In Touch'),
      p({ class: 'hero-subtitle' }, 'Ready to discuss opportunities and collaborations')
    ),

    section({ class: 'mb-4' },
      h2('Contact Information'),
      div({ class: 'contact-info' },
        div({ class: 'contact-item' },
          div({ class: 'contact-icon' } /* TODO */),
          div(
            h4('Email'),
            a({ href: 'mailto:mcbrumagin@gmail.com' }, 'mcbrumagin@gmail.com')
          )
        ),
        div({ class: 'contact-item' },
          div({ class: 'contact-icon' } /* TODO */),
          div(
            h4('Phone'),
            a({ href: 'tel:+18135854791' }, '(813) 585-4791')
          )
        ),
        div({ class: 'contact-item' },
          div({ class: 'contact-icon' } /* TODO */),
          div(
            h4('GitHub'),
            a({ href: 'https://github.com/mcbrumagin', target: '_blank' }, 'github.com/mcbrumagin')
          )
        ),
        div({ class: 'contact-item' },
          div({ class: 'contact-icon' } /* TODO */),
          div(
            h4('Location'),
            p('Tampa, FL')
          )
        )
      )
    ),


    section({ class: 'text-center mt-4' },
      h2('Let\'s Connect'),
      p({ class: 'mb-4' }, 'I\'m always interested in discussing new opportunities, technical challenges, or potential collaborations.'),
      div({ class: 'button-group' },
        button(
          a({ 
            href: 'mailto:mcbrumagin@gmail.com?subject=Portfolio Inquiry&body=Hi Matt, I found your portfolio and would like to discuss...', 
            class: 'button-link' 
          }, 'Send Email')
        ),
        button(
          a({ 
            href: 'https://github.com/mcbrumagin', 
            target: '_blank', 
            class: 'button-link' 
          }, 'View GitHub')
        )
      )
    ),

    section({ class: 'mb-4' },
      div({ class: 'card' },
        div({ class: 'card-content text-center' },
          h3('Available for'),
          div({ class: 'button-actions-center' },
            div({ class: 'skill-tag' }, 'Full-time Positions'),
            div({ class: 'skill-tag' }, 'Contract Work'),
            div({ class: 'skill-tag' }, 'Consulting'),
            div({ class: 'skill-tag' }, 'Technical Mentoring')
          )
        )
      )
    )
  ).onReady(() => fadeIn('.content'))
}


