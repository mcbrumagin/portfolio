import { htmlTags } from '../modules/index.js'

export default async function home() {
  await micro.modules.renderPageTemplate(true)
  
  const { div, h1, h2, h3, p, a, section, button, span, em } = htmlTags


  return div({ class: 'content' },
    section({ class: 'hero' },
      h1('Matthew C Brumagin'),
      p({ class: 'hero-subtitle' }, 'Senior Software Engineer'),
      p({ class: 'hero-description indent' }, 
        `Senior Software Engineer with a background in Agile/Scrum, 
          full-stack, cloud hosting, CI/CD, and polyglot microservices. 
        Expertise in AWS, EKS, and GitLab CI, 
          with a proven ability to lead projects, 
          collaborate with stakeholders, and improve DevOps. 
        Seeking a role within an organization looking to expand or 
          modernize cloud applications and infrastructure.`
      )
    ),

    section({ class: 'mb-4' },
      h2('Quick Overview'),
      div({ class: 'skills-grid' },
        div({ class: 'skill-category' },
          h3('Specialties'),
          div({ class: 'skill-tags' },
            div({ class: 'skill-tag' }, 'AWS & Cloud Architecture'),
            // div({
            //   class: 'skill-tag',
            //   onclick: () => toggleClass('expand', document.querySelector('.skill-detail.aws'))
            // }, 'AWS & Cloud Architecture',
            //   span({ class: 'skill-detail aws' }, 
            //     `EC2, EKS, IAM, S3, SQS, SNS, Elasticache, Cloudwatch, Cloudformation`
            //   )
            // ),
            div({ class: 'skill-tag' }, 'Kubernetes & EKS'),
            div({ class: 'skill-tag' }, 'DevOps & CI/CD'),
            div({ class: 'skill-tag' }, 'Full-Stack Development'),
            div({ class: 'skill-tag' }, 'JavaScript & Node.js'),
            div({ class: 'skill-tag' }, '.NET Core & C#')
          )
        ),
        div({ class: 'skill-category' },
          h3('Experience'),
          div({ class: 'skill-tags' },
            div({ class: 'skill-tag' }, '10+ Years of Engineering Experience'),
            div({ class: 'skill-tag' }, 'Senior Engineer & Scrum Master'),
            div({ class: 'skill-tag' }, 'Portal & eCommerce Architecture')
          )
        )
      )
    ),

    section({ class: 'text-center mt-4' },
      h2('Resume & Portfolio'),
      p({ class: 'mb-2' }, 'Ready to discuss how I can contribute to your team\'s success.'),
      div({ class: 'button-group' },
        a({
          download: 'mcbrumagin-resume.pdf',
          href: '/resources/mcbrumagin-resume.pdf',
          target: '_blank',
          class: 'button-link download-pdf-btn'
        }, 'Download Resume PDF'),
        a({ href: '/portfolio/resume', class: 'button-link' }, 'View Resume Online'),
        a({ href: '/portfolio/projects', class: 'button-link' }, 'View Projects'),
        // a({ href: '/portfolio/contact', class: 'button-link' }, 'Contact Me')
      )
    )
  ).onReady(() => fadeIn('.content'))
}
