import { htmlTags } from '../modules/micro-js-html/src/index.js'

export default async function resume() {
  await micro.modules.renderPageTemplate()
  
  const { div, h1, h2, h3, h4, p, section, ul, li, span, em, a, button } = htmlTags


  return div({ class: 'content' },
    section({ class: 'hero' },
      h1('Resume'),
      p({ class: 'hero-subtitle' }, 'Matthew C Brumagin'),
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
            li('Hosted and maintained Prizmdoc Viewer, PAS, and cloud portal & admin sites'),
            li('Deployed OCR, barcode, and digital signing services to EKS'),
            li('Assisted with a company-wide CRM migration of ~40k+ accounts to Salesforce'),
            li('Led the implementation of our Braintree e-commerce system'),
            li('Led the R&D of our Redis module which reduced usage authorization time by ~90%'),
            li('Supported multiple in-house product billing systems, w/ ~10k+ users/accounts'),
            li('Implemented/maintained Prometheus metrics & associated alerting/PagerDuty'),
            li('Cut deployment time in half by migrating to EKS/GitLab CI from Teamcity/EC2'),
            li('Reduced infrastructure and maintenance costs by ~50% with improved uptime'),
            li('Took ownership of and extended the cloud portal & admin React projects'),
            li('Optimized cloud service API test runs from ~50min to ~5min with a custom runner'),
            li('Served as a cross-functional Engineer & Scrum Master for several years'),
            li('Maintained and supported dozens of cloud services, apps, tools, and integrations')
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
            li('Developed new and existing patient portal systems, EHR display, databases, and APIs'),
            li('Migrated over a million patient records for ~70k+ healthcare providers'),
            li('Helped deliver a meaningful-use compliant system and passed 3rd party audits'),
            li('Collaborated with offshore engineers on backend portal system implementation')
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
          h4('Frameworks & Libraries'),
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
              div({ class: 'skill-tag' }, 'ECS'),
              div({ class: 'skill-tag' }, 'ECR'),
              div({ class: 'skill-tag' }, 'EC2'),
              div({ class: 'skill-tag' }, 'Lambda'),
              div({ class: 'skill-tag' }, 'RDS'),
              div({ class: 'skill-tag' }, 'S3'),
              div({ class: 'skill-tag' }, 'SNS'),
              div({ class: 'skill-tag' }, 'SQS'),
              div({ class: 'skill-tag' }, 'IAM'),
              div({ class: 'skill-tag' }, 'CloudFormation'),
              div({ class: 'skill-tag' }, 'CloudWatch'),
              div({ class: 'skill-tag' }, 'ElastiCache'),
              div({ class: 'skill-tag' }, 'Route53'),
              div({ class: 'skill-tag' }, 'GCP'),
              div({ class: 'skill-tag' }, 'GKE'),
              div({ class: 'skill-tag' }, 'Azure')
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
              div({ class: 'skill-tag' }, 'Grafana'),
              div({ class: 'skill-tag' }, 'GitLab CI'),
              div({ class: 'skill-tag' }, 'GitHub Actions'),
              div({ class: 'skill-tag' }, 'TeamCity'),
              div({ class: 'skill-tag' }, 'CircleCI'),
              div({ class: 'skill-tag' }, 'Jenkins')
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
