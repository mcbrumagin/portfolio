micro.exports = async function skills() {
  await micro.modules.renderPageTemplate()
  
  const { div, h1, h2, h3, h4, p, section, span } = micro.html

  return div({ class: 'content' },
    section({ class: 'hero' },
      h1('Technical Skills'),
      p({ class: 'hero-subtitle' }, 'Comprehensive Cloud Expertise')
    ),

    section({ class: 'mb-4' },
      h3('Programming Languages'),
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

    section({ class: 'mb-4' },
      h3('Frameworks & Libraries'),
      div({ class: 'skill-category' },
        div({ class: 'skill-tags' },
          div({ class: 'skill-tag' }, 'Node.js'),
          div({ class: 'skill-tag' }, 'React'),
          div({ class: 'skill-tag' }, 'React Native'),
          div({ class: 'skill-tag' }, 'Redux'),
          div({ class: 'skill-tag' }, 'Angular'),
          div({ class: 'skill-tag' }, 'Express'),
          div({ class: 'skill-tag' }, 'Restify'),
          div({ class: 'skill-tag' }, 'Prisma'),
          div({ class: 'skill-tag' }, 'Sequelize'),
          div({ class: 'skill-tag' }, 'Jest'),
          div({ class: 'skill-tag' }, 'Mocha/Chai'),
          div({ class: 'skill-tag' }, 'Spring'),
          div({ class: 'skill-tag' }, 'Hibernate'),
          div({ class: 'skill-tag' }, 'JUnit'),
          div({ class: 'skill-tag' }, '.NET Core'),
          div({ class: 'skill-tag' }, 'Entity Framework'),
          div({ class: 'skill-tag' }, 'NUnit'),
          div({ class: 'skill-tag' }, 'xUnit')
        )
      )
    ),

    section({ class: 'mb-4' },
      h3('Cloud Platforms & Services'),
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

    section({ class: 'mb-4' },
      h3('Infrastructure & DevOps'),
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

    section({ class: 'mb-4' },
      h3('Databases & Storage'),
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

    section({ class: 'mb-4' },
      h3('Collaboration & Tools'),
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
  ).onReady(() => fadeIn('.content'))
}


