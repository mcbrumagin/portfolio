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

    section({ class: 'mb-4' },
      h2('What I\'m Looking For'),
      div({ class: 'card' },
        div({ class: 'card-content' },
          h3('Ideal Opportunities'),
          p('I\'m particularly interested in roles that offer:'),
          div({ class: 'indent' },
            p(strong('Smaller Company Environment'), 
            ': Where I can wear multiple hats and make a significant impact'),
            p(strong('SaaS/Cloud Expansion'), 
            ': Help companies modernize their infrastructure and expand cloud solutions'),
            p(strong('DevOps Enhancement'), 
            ': Improve development workflows, CI/CD pipelines, and deployment practices'),
            p(strong('UI/Frontend Focus'), 
            ': Opportunities to work on user-centric design and modern frontend technologies'),
            p(strong('Team Leadership'), 
            ': Mentor junior developers and contribute to technical decision-making')
          )
        )
      )
    ),

    section({ class: 'mb-4' },
      h2('Why Work With Me'),
      div({ class: 'skills-grid' },
        div({ class: 'skill-category' },
          h4('Proven Track Record'),
          p('10+ years of experience delivering complex software solutions, with a history of successful migrations, ' +
            'system optimizations, and team leadership.')
        ),
        div({ class: 'skill-category' },
          h4('Full-Stack Expertise'),
          p('Comprehensive knowledge across the technology stack, from cloud infrastructure to frontend development, ' +
            'enabling me to contribute effectively across all project phases.')
        ),
        div({ class: 'skill-category' },
          h4('Growth Mindset'),
          p('Continuously learning and adapting to new technologies, with a passion for solving challenging problems ' +
            'and driving innovation.')
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


