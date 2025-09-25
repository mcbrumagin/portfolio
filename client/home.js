import { htmlTags } from './modules/micro-js-html/src/index.js'

export default async function home() {
  await micro.modules.renderPageTemplate(true)
  
  const { div, h1, h2, h4, p, a, section, button, span } = htmlTags

  // Minimal contact info component
  const createMinimalContact = () => {
    return div({ class: 'minimal-contact mb-3' },
      div({ class: 'contact-links' },
        a({ href: 'mailto:mcbrumagin@gmail.com', class: 'contact-link' }, 'mcbrumagin@gmail.com'),
        a({ href: 'https://www.linkedin.com/in/matthew-brumagin-3868ab68/', target: '_blank', class: 'contact-link' }, 'LinkedIn'),
        a({ href: 'https://github.com/mcbrumagin', target: '_blank', class: 'contact-link' }, 'GitHub'),
        div({ class: 'contact-info' }, 'Tampa, FL')
      )
    )
  }

  return div({ class: 'content' },
    section({ class: 'hero' },
      h1('Matthew C Brumagin'),
      p({ class: 'hero-subtitle' }, 'Senior Software Engineer'),
      createMinimalContact(),
      p({ class: 'hero-description indent' }, `Background in full-stack, cloud hosting, and polyglot microservices. 
        Expertise in AWS, EKS, and GitLab CI, with a proven ability to lead projects that enhance scalability and developer productivity. 
        Seeking a role within an organization looking to expand or modernize cloud/SaaS/DevOps capabilities.`
      )
    ),

    section({ class: 'mb-4' },
      h2('Quick Overview'),
      div({ class: 'skills-grid' },
        div({ class: 'skill-category' },
          h4('Specialties'),
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
          h4('Experience'),
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
        button({
            class: 'download-pdf-btn',
            onclick: () => downloadFile('/assets/resources/mcbrumagin-resume.pdf') },
          a({
            // href: '/assets/resources/mcbrumagin-resume.pdf',
            // class: 'button-link',
            download: 'mcbrumagin-resume.pdf',
            target: '_blank'
          }, 'Download Resume PDF')
        ),
        button(a({ href: '/portfolio/resume', class: 'button-link' }, 'View Resume Online')),
        button(a({ href: '/portfolio/projects', class: 'button-link' }, 'View Projects')),
        // button(a({ href: '/portfolio/contact', class: 'button-link' }, 'Contact Me'))
      )
    )
  ).onReady(() => fadeIn('.content'))
}

function downloadFile(filePath) {
  var link=document.createElement('a')
  link.href = filePath
  link.download = filePath.substr(filePath.lastIndexOf('/') + 1)
  link.click()
}