micro.exports = async function experience() {
  await micro.modules.renderPageTemplate()
  
  const { div, h1, h2, h3, h4, p, section, ul, li } = micro.html

  return div({ class: 'content' },
    section({ class: 'hero' },
      h1('Professional Experience'),
      p({ class: 'hero-subtitle' }, 'Software Engineer since 2013'),
      p({ class: 'hero-subtitle' }, '3 Years as Scrum Master'),
      p({ class: 'hero-subtitle' }, '10 Years in SaaS/Cloud/Ecommerce')
    ),

    section({ class: 'mb-4' },
      h2('Work History'),
      
      // Accusoft Experience
      div({ class: 'card' },
        div({ class: 'card-header' },
          div(
            h3({ class: 'card-title' }, 'Senior Software Engineer'),
            h4({ class: 'card-subtitle' }, 'Accusoft | Tampa, FL')
          ),
          div({ class: 'card-meta' },
            p('December 2015 - August 2025'),
            p({ class: 'text-muted' }, '9 years, 8 months')
          )
        ),
        div({ class: 'card-content' },
          p('Led modernization efforts and maintained critical cloud-hosted products while serving in multiple leadership roles.'),
          ul(
            li('Migrated numerous legacy services from TeamCity and EC2 to GitLab CI and EKS, significantly improving CI/CD pipelines and infrastructure efficiency'),
            li('Maintained a React UI portal for cloud-hosted products, ensuring seamless user experience across multiple client applications'),
            li('Developed and maintained a comprehensive Braintree e-commerce backend, supporting multiple in-house products and revenue streams'),
            li('Led the development of a Redis cache library, integrating with e-commerce and usage metrics systems for enhanced performance'),
            li('Served as Scrum Master for several years (2017-2020), facilitating agile processes and improving team collaboration'),
            li('Regularly onboarded interns and newer developers, fostering team growth and knowledge transfer across the organization'),
            li('Maintained primary hosted product (PrizmDoc Viewer) and various SDK demos (OCR, barcode), ensuring product stability and functionality')
          )
        )
      ),

      // Greenway Health Experience
      div({ class: 'card' },
        div({ class: 'card-header' },
          div(
            h3({ class: 'card-title' }, 'Software Engineer'),
            h4({ class: 'card-subtitle' }, 'Greenway Health | Tampa, FL')
          ),
          div({ class: 'card-meta' },
            p('August 2013 - November 2015'),
            p({ class: 'text-muted' }, '2 years, 3 months')
          )
        ),
        div({ class: 'card-content' },
          p('Contributed to healthcare software solutions with a focus on patient portal systems and regulatory compliance.'),
          ul(
            li('Assisted with a massive patient portal migration, ensuring data integrity and system continuity throughout the transition'),
            li('Developed and maintained new and existing patient portal systems, enhancing patient access and engagement capabilities'),
            li('Helped deliver a meaningful-use compliant system and successfully passed 3rd party audits, ensuring regulatory compliance'),
            li('Collaborated with offshore engineers to facilitate DAO and backend code for portal systems, optimizing development workflows'),
            li('Designed and created an asynchronous API in C# that allowed non-blocking client requests and separate tracking of events, improving system responsiveness')
          )
        )
      )
    ),

    section({ class: 'mb-4' },
      h2('Key Achievements'),
      div({ class: 'skills-grid' },
        div({ class: 'skill-category' },
          h4('Infrastructure Modernization'),
          p('Successfully migrated multiple legacy services to modern cloud infrastructure, ' +
            'reducing deployment times by 60% and improving system reliability.')
        ),
        div({ class: 'skill-category' },
          h4('Team Leadership'),
          p('Led cross-functional teams as Scrum Master, improving sprint velocity by 40% ' +
            'and establishing best practices for agile development.')
        ),
        div({ class: 'skill-category' },
          h4('Healthcare Compliance'),
          p('Delivered HIPAA-compliant healthcare solutions, successfully passing rigorous ' +
            '3rd party audits and ensuring regulatory adherence.')
        )
      )
    )
  ).onReady(() => fadeIn('.content'))
}


