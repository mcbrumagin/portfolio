import { htmlTags } from '../modules/micro-js-html/src/index.js'

export default async function resume() {
  await micro.modules.renderPageTemplate()
  
  const { div, h1, h2, h3, h4, p, section, ul, li, span, em, a, button } = htmlTags

  // Minimal contact info component
  const createMinimalContact = () => {
    return div({ class: 'minimal-contact mb-4' },
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
      h1('Resume'),
      p({ class: 'hero-subtitle' }, 'Matthew C Brumagin'),
      createMinimalContact(),
      div({ class: 'button-group' },
        button({ 
          class: 'download-pdf-btn', 
          onclick: () => downloadFile('/assets/resources/mcbrumagin-resume.pdf')
        }, 'Download PDF')
      )
    ),

    // Experience Section
    section({ class: 'mb-4' },
      h2('Professional Experience'),
      
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

    // Technical Skills Section
    section({ class: 'mb-4' },
      h2('Technical Skills'),
      div({ class: 'proficiency-legend mb-3' },
        div({ class: 'legend-item' },
          div({ class: 'legend-color expert' }),
          span('Expert')
        ),
        div({ class: 'legend-item' },
          div({ class: 'legend-color advanced' }),
          span('Advanced')
        ),
        div({ class: 'legend-item' },
          div({ class: 'legend-color intermediate' }),
          span('Intermediate')
        )
      ),

      div({ class: 'skills-grid' },
        div({ class: 'mb-3' },
          h4('Programming Languages'),
          
          
          div({ class: 'skill-category' },
            div({ class: 'skill-tags' },
              div({ class: 'skill-tag expert' }, 'JavaScript'),
              div({ class: 'skill-tag expert' }, 'TypeScript'),
              div({ class: 'skill-tag expert' }, 'C#'),
              div({ class: 'skill-tag expert' }, 'Java'),
              div({ class: 'skill-tag expert' }, 'Python')
            )
          ),
          
          div({ class: 'skill-category' },
            div({ class: 'skill-tags' },
              div({ class: 'skill-tag advanced' }, 'Golang'),
              div({ class: 'skill-tag advanced' }, 'C/C++'),
              div({ class: 'skill-tag advanced' }, 'SQL'),
              div({ class: 'skill-tag advanced' }, 'Bash/Sh'),
              div({ class: 'skill-tag advanced' }, 'Scala'),
              div({ class: 'skill-tag advanced' }, 'Clojure'),
              div({ class: 'skill-tag advanced' }, 'Groovy')
            )
          ),
          
          div({ class: 'skill-category' },
            div({ class: 'skill-tags' },
              div({ class: 'skill-tag intermediate' }, 'F#'),
              div({ class: 'skill-tag intermediate' }, 'Kotlin'),
              div({ class: 'skill-tag intermediate' }, 'Ruby'),
              div({ class: 'skill-tag intermediate' }, 'Rust'),
              div({ class: 'skill-tag intermediate' }, 'Swift'),
              div({ class: 'skill-tag intermediate' }, 'Dart'),
              div({ class: 'skill-tag intermediate' }, 'Haskell')
            )
          )
        ),

        div({ class: 'mb-3' },
          h4('Runtimes & Libraries'),
          div({ class: 'skill-category' },
            div({ class: 'skill-tags' },
              div({ class: 'skill-tag expert' }, 'Node.js'),
              div({ class: 'skill-tag expert' }, 'React'),
              div({ class: 'skill-tag expert' }, 'Express'),
              div({ class: 'skill-tag expert' }, 'Restify'),
              div({ class: 'skill-tag expert' }, 'Mocha/Chai')
            )
          ),
          div({ class: 'skill-category' },
            div({ class: 'skill-tags' },
              div({ class: 'skill-tag advanced' }, '.NET Core'),
              div({ class: 'skill-tag advanced' }, 'React Native'),
              div({ class: 'skill-tag advanced' }, 'Redux'),
              div({ class: 'skill-tag advanced' }, 'Sequelize'),
              div({ class: 'skill-tag advanced' }, 'Jest'),
              div({ class: 'skill-tag advanced' }, 'JUnit'),
              div({ class: 'skill-tag advanced' }, 'NUnit'),
              div({ class: 'skill-tag advanced' }, 'Entity Framework')
            )
          ),
          div({ class: 'skill-category' },
            div({ class: 'skill-tags' },
              div({ class: 'skill-tag intermediate' }, 'Angular'),
              div({ class: 'skill-tag intermediate' }, 'Prisma'),
              div({ class: 'skill-tag intermediate' }, 'Spring'),
              div({ class: 'skill-tag intermediate' }, 'Hibernate'),
              div({ class: 'skill-tag intermediate' }, 'xUnit')
            )
          )
        ),

        div({ class: 'mb-3' },
          h4('Cloud Platforms & Services'),
          div({ class: 'skill-category' },
            div({ class: 'skill-tags' },
              div({ class: 'skill-tag' }, 'AWS'),
              div({ class: 'skill-tag' }, 'EKS'),
              div({ class: 'skill-tag' }, 'EC2'),
              div({ class: 'skill-tag' }, 'Lambda'),
              div({ class: 'skill-tag' }, 'RDS'),
              div({ class: 'skill-tag' }, 'SNS'),
              div({ class: 'skill-tag' }, 'SQS'),
              div({ class: 'skill-tag' }, 'CloudFormation'),
              div({ class: 'skill-tag' }, 'IAM'),
              div({ class: 'skill-tag' }, 'CloudWatch'),
              div({ class: 'skill-tag' }, 'ElastiCache'),
              div({ class: 'skill-tag' }, 'S3'),
              div({ class: 'skill-tag' }, 'DynamoDB'),
              div({ class: 'skill-tag' }, 'GCP'),
              div({ class: 'skill-tag' }, 'GKE'),
              div({ class: 'skill-tag' }, 'Azure'),
              div({ class: 'skill-tag' }, 'OpenStack')
            )
          )
        ),

        div({ class: 'mb-3' },
          h4('Infrastructure & DevOps'),
          div({ class: 'skill-category' },
            div({ class: 'skill-tags' },
              div({ class: 'skill-tag' }, 'Docker'),
              div({ class: 'skill-tag' }, 'Kubernetes'),
              div({ class: 'skill-tag' }, 'Terraform'),
              div({ class: 'skill-tag' }, 'Helm'),
              div({ class: 'skill-tag' }, 'Prometheus'),
              div({ class: 'skill-tag' }, 'Alertmanager'),
              div({ class: 'skill-tag' }, 'Grafana'),
              div({ class: 'skill-tag' }, 'GitLab CI'),
              div({ class: 'skill-tag' }, 'TeamCity'),
              div({ class: 'skill-tag' }, 'CircleCI'),
              div({ class: 'skill-tag' }, 'Jenkins'),
              div({ class: 'skill-tag' }, 'MaaS'),
              div({ class: 'skill-tag' }, 'Juju')
            )
          )
        ),

        div({ class: 'mb-3' },
          h4('Databases & Storage'),
          div({ class: 'skill-category' },
            div({ class: 'skill-tags' },
              div({ class: 'skill-tag' }, 'MySQL'),
              div({ class: 'skill-tag' }, 'PostgreSQL'),
              div({ class: 'skill-tag' }, 'SQL Server'),
              div({ class: 'skill-tag' }, 'Redis'),
              div({ class: 'skill-tag' }, 'Elasticsearch'),
              div({ class: 'skill-tag' }, 'DynamoDB'),
              div({ class: 'skill-tag' }, 'MongoDB'),
              div({ class: 'skill-tag' }, 'Cassandra')
            )
          )
        ),

        div({ class: 'mb-3' },
          h4('Collaboration & Tools'),
          div({ class: 'skill-category' },
            div({ class: 'skill-tags' },
              div({ class: 'skill-tag' }, 'Git/GitLab/GitHub'),
              div({ class: 'skill-tag' }, 'GitLab Issues'),
              div({ class: 'skill-tag' }, 'Jira'),
              div({ class: 'skill-tag' }, 'Trello'),
              div({ class: 'skill-tag' }, 'Slack'),
              div({ class: 'skill-tag' }, 'Google Workspace')
            )
          )
        )
      )
    ),

    // Education Section
    section({ class: 'mb-4' },
      h2('Education'),
      div({ class: 'card' },
        div({ class: 'card-header' },
          div(
            h4({ class: 'card-title' },
              'Bachelor of Science in Electrical Engineering'
            ),
            span(em('Minors in Software & Mathematics'))
          ),
          div({ class: 'card-meta' },
            h4({ class: 'card-subtitle' }, 'Clarkson University'),
            span({ class: 'card-subtitle' }, em('Class of 2013'))
          )
        )
      )
    ),
  ).onReady(() => fadeIn('.content'))
}
