micro.exports = async function home() {
  await micro.modules.renderPageTemplate(includeNav = true)
  
  const { div, h1, h2, h4, p, a, section, button } = micro.html

  return div({ class: 'content' },
    section({ class: 'hero' },
      h1('Matthew C. Brumagin'),
      p({ class: 'hero-subtitle' }, 'Senior Software Engineer'),
      p({ class: 'hero-description' }, 
        `Experienced engineer with expertise in cloud 
          infrastructure, DevOps, and full-stack development.
        In the meantime, working on my framework, a minimal
          SoundCloud clone, and learning VST audio programming.`
      )
    ),

    section({ class: 'mb-4' },
      h2('Quick Overview'),
      div({ class: 'skills-grid' },
        div({ class: 'skill-category' },
          h4('Specialties'),
          div({ class: 'skill-tags' },
            div({ class: 'skill-tag' }, 'AWS & Cloud Architecture'),
            div({ class: 'skill-tag' }, 'Kubernetes & EKS'),
            div({ class: 'skill-tag' }, 'DevOps & CI/CD'),
            div({ class: 'skill-tag' }, 'Full-Stack Development'),
            div({ class: 'skill-tag' }, 'JavaScript & Node.js'),
            div({ class: 'skill-tag' }, '.NET Core & C#')
          )
        ),
        div({ class: 'skill-category' },
          h4('Experience'),
          div({ class: 'skill-tags' },
            div({ class: 'skill-tag' }, '10+ Software Engineering Experience'),
            div({ class: 'skill-tag' }, 'Scrum Master & Mentoring'),
            div({ class: 'skill-tag' }, 'eCommerce & Portal Architecture')
          )
        )
      )
    ),

    section({ class: 'mb-4' },
      h2('Current Focus'),
      div({ class: 'card' },
        div({ class: 'card-content' },
          p(`Seeking opportunities at any organization looking to expand
              into SaaS/cloud solutions or roles focused on UI development.
            Passionate about wearing multiple hats and contributing 
              to dynamic, growth-oriented environments.`
          )
        )
      )
    ),

    section({ class: 'text-center mt-4' },
      h2('Get In Touch'),
      p({ class: 'mb-2' }, 'Ready to discuss how I can contribute to your team\'s success.'),
      div({ class: 'button-group' },
        button(a({ href: '/portfolio/projects', class: 'button-link' }, 'View Projects')),
        button(a({ href: '/portfolio/experience', class: 'button-link' }, 'Experience')),
        button(a({ href: '/portfolio/contact', class: 'button-link' }, 'Contact Me'))
      )
    )
  ).onReady(() => fadeIn('.content'))
}
