micro.exports = async function skills() {
  await micro.modules.renderPageTemplate()
  
  const { div, h1, h2, h3, h4, p, section } = micro.html

  return div({ class: 'content' },
    section({ class: 'hero' },
      h1('Technical Skills'),
      p({ class: 'hero-subtitle' }, 'Comprehensive Technology Stack Expertise')
    ),

    section({ class: 'mb-4' },
      h2('Core Competencies'),
      div({ class: 'skills-grid' },
        div({ class: 'skill-category' },
          h4('Languages & Scripting'),
          div({ class: 'skill-tags' },
            div({ class: 'skill-tag' }, 'JavaScript/TypeScript'),
            div({ class: 'skill-tag' }, 'Node.js'),
            div({ class: 'skill-tag' }, 'C#'),
            div({ class: 'skill-tag' }, 'Java'),
            div({ class: 'skill-tag' }, 'React'),
            div({ class: 'skill-tag' }, 'HTML/CSS'),
            div({ class: 'skill-tag' }, 'MySQL'),
            div({ class: 'skill-tag' }, 'PostgreSQL'),
            div({ class: 'skill-tag' }, 'Python'),
            div({ class: 'skill-tag' }, 'Bash/Shell'),
            div({ class: 'skill-tag' }, 'Golang'),
            div({ class: 'skill-tag' }, 'C/C++')
          )
        ),
        
        div({ class: 'skill-category' },
          h4('Cloud Platforms'),
          div({ class: 'skill-tags' },
            div({ class: 'skill-tag' }, 'AWS EKS'),
            div({ class: 'skill-tag' }, 'AWS EC2'),
            div({ class: 'skill-tag' }, 'AWS Lambda'),
            div({ class: 'skill-tag' }, 'AWS RDS'),
            div({ class: 'skill-tag' }, 'CloudFormation'),
            div({ class: 'skill-tag' }, 'CloudWatch'),
            div({ class: 'skill-tag' }, 'Redis ElastiCache'),
            div({ class: 'skill-tag' }, 'AWS IAM'),
            div({ class: 'skill-tag' }, 'AWS S3'),
            div({ class: 'skill-tag' }, 'DynamoDB'),
            div({ class: 'skill-tag' }, 'GCP GKE'),
            div({ class: 'skill-tag' }, 'Azure')
          )
        ),

        div({ class: 'skill-category' },
          h4('DevOps & Infrastructure'),
          div({ class: 'skill-tags' },
            div({ class: 'skill-tag' }, 'GitLab CI'),
            div({ class: 'skill-tag' }, 'Kubernetes'),
            div({ class: 'skill-tag' }, 'Docker'),
            div({ class: 'skill-tag' }, 'Terraform'),
            div({ class: 'skill-tag' }, 'Prometheus'),
            div({ class: 'skill-tag' }, 'Jenkins'),
            div({ class: 'skill-tag' }, 'TeamCity')
          )
        )
      )
    ),

    section({ class: 'mb-4' },
      h2('Specialized Expertise'),
      div({ class: 'card' },
        div({ class: 'card-content' },
          h3('Cloud Architecture & Migration'),
          p('Extensive experience migrating legacy systems to modern cloud infrastructure. ' +
            'Proficient in designing scalable, resilient architectures using AWS services, ' +
            'with particular expertise in EKS orchestration and CI/CD pipeline optimization.')
        )
      ),
      
      div({ class: 'card' },
        div({ class: 'card-content' },
          h3('Full-Stack Development'),
          p('Strong background in both frontend and backend development, with experience building ' +
            'React-based user interfaces, RESTful APIs, and microservices architectures. ' +
            'Comfortable working across the entire technology stack.')
        )
      ),

      div({ class: 'card' },
        div({ class: 'card-content' },
          h3('DevOps & Automation'),
          p('Proven track record of improving development workflows through automation. ' +
            'Experience with GitLab CI, Kubernetes orchestration, and infrastructure as code ' +
            'using Terraform and CloudFormation.')
        )
      ),

      div({ class: 'card' },
        div({ class: 'card-content' },
          h3('E-commerce & Payment Systems'),
          p('Hands-on experience developing and maintaining e-commerce backends, ' +
            'including integration with payment processors like Braintree. ' +
            'Understanding of PCI compliance and secure transaction processing.')
        )
      )
    ),

    section({ class: 'mb-4' },
      h2('Development Practices'),
      div({ class: 'skills-grid' },
        div({ class: 'skill-category' },
          h4('Methodologies'),
          div({ class: 'skill-tags' },
            div({ class: 'skill-tag' }, 'Agile, Scrum & Kanban'),
            div({ class: 'skill-tag' }, 'Shift-Left Testing'),
            div({ class: 'skill-tag' }, 'Code Review'),
            div({ class: 'skill-tag' }, 'Continuous Integration'),
            div({ class: 'skill-tag' }, 'DevOps Culture')
          )
        ),
        
        div({ class: 'skill-category' },
          h4('Leadership Skills'),
          div({ class: 'skill-tags' },
            div({ class: 'skill-tag' }, 'Team Mentoring'),
            div({ class: 'skill-tag' }, 'Scrum Master'),
            div({ class: 'skill-tag' }, 'Technical Documentation'),
            div({ class: 'skill-tag' }, 'Knowledge Transfer'),
            div({ class: 'skill-tag' }, 'Project Planning')
          )
        )
      )
    )
  ).onReady(() => fadeIn('.content'))
}


