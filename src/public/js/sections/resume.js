import { htmlTags } from '../../modules/index.js'

export default async function resume() {
  await yamf.modules.renderPageTemplate()
  
  const { div, h1, h2, h3, h4, p, section, ul, li, span, em, a, button } = htmlTags


  return div({ class: 'content' },
    section({ class: 'hero' },
      h1('Resume'),
      p({ class: 'hero-subtitle' }, 'Matthew C Brumagin'),
      div({ class: 'button-group' },
        a({
          download: 'mcbrumagin-resume.pdf',
          href: '/resources/mcbrumagin-resume.pdf',
          target: '_blank',
          class: 'button-link download-pdf-btn'
        }, 'Download Resume PDF')
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
            li('Hosted cross-team products: Prizmdoc Viewer, PAS, OCR, barcode, and signing services'),
            li('Took ownership of and extended the cloud portal & admin React projects'),
            li('Led the development of Braintree e-commerce system for SaaS products'),
            li('Supported multiple billing systems, with over ten thousand cloud accounts'),
            li('Assisted with a company-wide Salesforce migration of over 40,000 accounts'),
            li('Researched and implemented Redis, which reduced authorization time by 90%'),
            li('Implemented Prometheus metrics, monitoring, and PagerDuty alerts'),
            li('Cut deployment time in half by migrating to EKS/GitLab CI from Teamcity/EC2'),
            li('Reduced infrastructure costs by 50% through migration to EKS architecture'),
            li('Optimized cloud service API test runs from 50 minutes to 5 minutes'),
            li('Served as a cross-functional Engineer & Scrum Master for several years'),
            li('Maintained dozens of other microservices, modules, tools, and integrations')
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
            li('Developed patient portals, EHR storage and display, and APIs using C#/.NET'),
            li('Migrated over a million patient records for over 70,000 healthcare providers'),
            li('Helped deliver a meaningful-use compliant system that passed HIPAA audits'),
            li('Collaborated with offshore engineers on backend portal system implementation')
          )
        )
      )
    ),

    // Personal Projects Section
    section({ class: 'mb-4' },
      h2('Personal Projects'),
      
      // YAMF Project
      div({ class: 'card' },
        div({ class: 'card-header' },
          div(
            h3({ class: 'card-title' }, 'Yet Another Microservice Framework (YAMF)'),
            h4({ class: 'card-subtitle' }, 'Open Source Framework')
          ),
          div({ class: 'card-meta' },
            p('Monorepo'),
            p({ class: 'text-muted' }, 'Node.js & Python')
          )
        ),
        div({ class: 'card-content' },
          ul(
            li('Monorepo with several smaller modules for server and client code'),
            li('Zero dependencies at runtime; virtually immune to supply-chain attacks'),
            li('Implements registry, gateway, routing, RPC, events, cache, and auth'),
            li('Features a Python client that integrates seamlessly with Node.js registry'),
            li('Comprehensive tests (90% coverage) with custom logging and multi-assertion'),
            li('Dockerized multi-container example demonstrating distributed communication')
          ),
          
          div({ class: 'button-actions' },
            a({
              href: 'https://github.com/mcbrumagin/yamf',
              target: '_blank',
              class: 'button-link'
            }, 'View on GitHub')
          )
        )
      ),

      // TheScene.FM Project
      div({ class: 'card' },
        div({ class: 'card-header' },
          div(
            h3({ class: 'card-title' }, 'TheScene.FM'),
            h4({ class: 'card-subtitle' }, 'Audio Streaming Platform (working prototype)')
          ),
          div({ class: 'card-meta' },
            p('Web Application'),
            p({ class: 'text-muted' }, 'JavaScript/Node.js')
          )
        ),
        div({ class: 'card-content' },
          ul(
            li('Built with my framework to showcase and extend real-world functionality'),
            li('The website features playback with authenticated upload and in-app recording'),
            li('Roadmap includes playlists, feeds, artist/venue profiles, and an event calendar'),
            li('Handles audio streaming with S3 backup and Redis-like caching'),
            li('Multi-container architecture with dedicated ffmpeg processing service')
          ),
          
          div({ class: 'button-actions-flex' },
            a({
              href: 'https://soundcl.one',
              target: '_blank',
              class: 'button-link'
            }, 'Live Prototype'),
            a({
              href: 'https://github.com/mcbrumagin/soundclone',
              target: '_blank',
              class: 'button-link'
            }, 'View Source')
          )
        )
      )
    ),

    // Technical Skills Section
    section({ class: 'mb-4' },
      h2('Technical Skills'),

      div({ class: 'skills-grid' },
        div({ class: 'mb-3' },
          h4('Programming Languages'),
          div({ class: 'skill-category' },
            div({ class: 'skill-tags' },
              div({ class: 'skill-tag' }, 'JavaScript'),
              div({ class: 'skill-tag' }, 'TypeScript'),
              div({ class: 'skill-tag' }, 'Python'),
              div({ class: 'skill-tag' }, 'C#'),
              div({ class: 'skill-tag' }, 'Java'),
              div({ class: 'skill-tag' }, 'Golang'),
              div({ class: 'skill-tag' }, 'Ruby'),
              div({ class: 'skill-tag' }, 'F#'),
              div({ class: 'skill-tag' }, 'Bash/Shell')
            )
          )
        ),

        div({ class: 'mb-3' },
          h4('Frameworks & Libraries'),
          div({ class: 'skill-category' },
            div({ class: 'skill-tags' },
              div({ class: 'skill-tag' }, 'Node.js'),
              div({ class: 'skill-tag' }, 'React'),
              div({ class: 'skill-tag' }, 'React Native'),
              div({ class: 'skill-tag' }, 'Angular'),
              div({ class: 'skill-tag' }, 'Express'),
              div({ class: 'skill-tag' }, 'Mocha'),
              div({ class: 'skill-tag' }, 'Chai'),
              div({ class: 'skill-tag' }, 'Jest'),
              div({ class: 'skill-tag' }, 'Spring'),
              div({ class: 'skill-tag' }, 'JUnit'),
              div({ class: 'skill-tag' }, 'Django'),
              div({ class: 'skill-tag' }, 'Flask'),
              div({ class: 'skill-tag' }, 'Pytest'),
              div({ class: 'skill-tag' }, '.NET Core'),
              div({ class: 'skill-tag' }, 'NUnit'),
              div({ class: 'skill-tag' }, 'xUnit')
            )
          )
        ),

        div({ class: 'mb-3' },
          h4('Cloud Platforms'),
          div({ class: 'skill-category' },
            div({ class: 'skill-tags' },
              div({ class: 'skill-tag' }, 'AWS'),
              div({ class: 'skill-tag' }, 'EKS'),
              div({ class: 'skill-tag' }, 'EC2'),
              div({ class: 'skill-tag' }, 'ECS'),
              div({ class: 'skill-tag' }, 'Fargate'),
              div({ class: 'skill-tag' }, 'Lambda'),
              div({ class: 'skill-tag' }, 'RDS'),
              div({ class: 'skill-tag' }, 'SQS'),
              div({ class: 'skill-tag' }, 'IAM'),
              div({ class: 'skill-tag' }, 'S3'),
              div({ class: 'skill-tag' }, 'ECR'),
              div({ class: 'skill-tag' }, 'ElastiCache'),
              div({ class: 'skill-tag' }, 'DynamoDB'),
              div({ class: 'skill-tag' }, 'CloudWatch'),
              div({ class: 'skill-tag' }, 'CloudFormation'),
              div({ class: 'skill-tag' }, 'GCP'),
              div({ class: 'skill-tag' }, 'GKE'),
              div({ class: 'skill-tag' }, 'Azure')
            )
          )
        ),

        div({ class: 'mb-3' },
          h4('CI/CD, DevOps, & Orchestration'),
          div({ class: 'skill-category' },
            div({ class: 'skill-tags' },
              div({ class: 'skill-tag' }, 'Terraform'),
              div({ class: 'skill-tag' }, 'Docker'),
              div({ class: 'skill-tag' }, 'Kubernetes'),
              div({ class: 'skill-tag' }, 'GitLab CI'),
              div({ class: 'skill-tag' }, 'GitHub Actions'),
              div({ class: 'skill-tag' }, 'Jenkins'),
              div({ class: 'skill-tag' }, 'Grafana'),
              div({ class: 'skill-tag' }, 'Prometheus')
            )
          )
        ),

        div({ class: 'mb-3' },
          h4('Databases & Storage'),
          div({ class: 'skill-category' },
            div({ class: 'skill-tags' },
              div({ class: 'skill-tag' }, 'PostgreSQL'),
              div({ class: 'skill-tag' }, 'MySQL'),
              div({ class: 'skill-tag' }, 'Redis'),
              div({ class: 'skill-tag' }, 'MongoDB'),
              div({ class: 'skill-tag' }, 'Cassandra'),
              div({ class: 'skill-tag' }, 'DynamoDB')
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
            h3({ class: 'card-title' },
              'Bachelor of Science in Electrical Engineering'
            ),
            h4({ class: 'card-subtitle' }, 'Minors in Software & Mathematics')
          ),
          div({ class: 'card-meta' },
            p('Clarkson University'),
            p({ class: 'text-muted' }, 'Class of 2013')
          )
        )
      )
    ),
  ).onReady(() => fadeIn('.content'))
}
