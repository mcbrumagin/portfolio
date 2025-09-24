micro.exports = async function experience() {
  await micro.modules.renderPageTemplate()
  
  const { div, h1, h2, h3, h4, p, section, ul, li } = micro.html

  return div({ class: 'content' },
    section({ class: 'hero' },
      h1('Professional Experience'),
      p({ class: 'hero-subtitle' }, 'Software Engineer since 2013')
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
            p('Dec 2015 - Aug 2025'),
            p({ class: 'text-muted' }, '9 years, 8 months')
          )
        ),
        div({ class: 'card-content' },
          ul(
            li('Deployed and maintained several in-house Docker images to EKS/EC2.'),
            li('Hosted Prizmdoc Viewer/Application Services, OCR/Barcode demos, and more.'),
            li('Migrated dozens of legacy services from Teamcity/EC2 to GitLab CI w/ EKS.'),
            li('Cut deployment time in half; improving infrastructure cost/efficiency.'),
            li('Pivotal in the creation of a Braintree e-commerce system (Node.js).'),
            li('Supported multiple in-house product billing systems, w/ ~10k+ users/accounts.'),
            li('Took ownership of the cloud portal & admin React projects, extending features.'),
            li('Assisted with a company-wide CRM migration of ~40k+ accounts to Salesforce.'),
            li('Our team was the first to implement Prometheus/alerting/PagerDuty rotation.'),
            li('Led the design and implementation of our Redis cache module.'),
            li('Reduced usage authorization and subscription update times by ~90%.'),
            li('Optimized API test runtime from ~40min to ~4min with a custom runner.'),
            li('Created a multi-error validator module to decrease app/test debugging time.'),
            li('Created an SQS testing helper for message isolation during development.'),
            li('Served as a cross-functional Engineer & Scrum Master for several years.'),
            li('Met with other leaders to foster better processes and agile company culture.')
          )
        )
      ),

      // Greenway Health Experience
      div({ class: 'card' },
        div({ class: 'card-header' },
          div(
            h3({ class: 'card-title' }, 'Software Engineer II'),
            h4({ class: 'card-subtitle' }, 'Greenway Health | Tampa, FL')
          ),
          div({ class: 'card-meta' },
            p('Aug 2013 - Nov 2015'),
            p({ class: 'text-muted' }, '2 years, 3 months')
          )
        ),
        div({ class: 'card-content' },
          ul(
            li('Worked on new (C#/.NET) and existing (Java/Spring/JSP) patient portal systems.'),
            li('Instrumental in the KT for two legacy portal systems after Vitera was acquired.'),
            li('Migrated over a million patient records for ~70k+ healthcare providers'),
            li('Helped deliver a meaningful-use compliant system and passed 3rd party audits.'),
            li('Collaborated with offshore engineers on backend portal system implementation.'),
            li('Designed a C# async API for non-blocking client requests and events.')
          )
        )
      )
    ),

    section({ class: 'mb-4' },
      h2('Education'),
      div({ class: 'card' },
        div({ class: 'card-header' },
          div(
            h3({ class: 'card-title' }, 
              `Bachelor of Science in Electrical Engineering`
            ),
            h4({ class: 'card-subtitle' }, 
              `Minors in Software & Mathematics`
            )
          ),
          div({ class: 'card-meta' },
            p('Clarkson University | Class of 2013')
          )
        )
      )
    )
  ).onReady(() => fadeIn('.content'))
}


