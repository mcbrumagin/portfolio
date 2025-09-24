micro.exports = async function home() {
  await micro.modules.renderPageTemplate(includeNav = true)
  
  const { div, h1, h2, h4, p, a, section, button } = micro.html

  return div({ class: 'content' },
    section({ class: 'hero' },
      h1('Matthew C Brumagin'),
      p({ class: 'hero-subtitle' }, 'Senior Software Engineer'),
      p({ class: 'hero-description' }, `Background in full-stack, cloud hosting, and polyglot microservices. 
        Expertise in AWS, EKS, and GitLab CI, with a proven ability to lead projects that enhance scalability and developer productivity. 
        Seeking a role within an organization looking to expand or modernize web/SaaS/DevOps capabilities.`
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
            div({ class: 'skill-tag' }, '10+ Years of Engineering Experience'),
            div({ class: 'skill-tag' }, 'Scrum Master & Mentoring'),
            div({ class: 'skill-tag' }, 'eCommerce & Portal Architecture')
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
