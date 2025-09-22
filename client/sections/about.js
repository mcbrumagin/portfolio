micro.exports = async function about() {
  await micro.modules.renderPageTemplate()
  
  const { div, h1, h2, h3, h4, p, strong, section } = micro.html

  return div({ class: 'content' },
    section({ class: 'hero' },
      h1('About Me'),
      p({ class: 'hero-subtitle' }, 'Web, Cloud, & Full-Stack Engineer | 10+ Years Experience')
    ),

    section({ class: 'mb-4' },
      h2('Professional Summary'),
      div({ class: 'card' },
        div({ class: 'card-content' },
          p(`A Senior Software Engineer with a strong background 
              in web/cloud hosting, Node.js, .NET Core, AWS, K8s, 
              Prometheus, and GitLab CI. 
            With a decade in web development, I have proven 
              my ability to lead projects, improve DevOps practices, 
              and maintain complex systems and monitoring.`
          ),
          p(`I possess a keen eye for user-centric design 
              and a passion for full-stack development, 
              especially microservices and internal modules/libraries.
            I thrive in dynamic environments where 
              wearing multiple hats is encouraged, 
              and I'm particularly drawn to opportunities 
              that allow me to make the world a better 
              (or at least more efficient) place.`
          ),
          p(`I'm currently seeking a role in a small-to-midsize company 
            looking to expand their SaaS/cloud/ecommerce solutions 
            and enhance their DevOps capabilities,
            or a position focused on UI development 
            where I can leverage my eye for innovation.`
          )
        )
      )
    ),

    section({ class: 'mb-4' },
      h2('What Drives Me'),
      div({ class: 'skills-grid' },
        div({ class: 'skill-category' },
          h4('Cloud & Infrastructure'),
          p(`If it's I/O bound, it's bound to be in my wheelhouse.
            I've seen dozens of frameworks and languages over the years,
              and although I may side-eye a few, 
              I can always pave a path forward.`
          )
        ),
        div({ class: 'skill-category' },
          h4('Leadership & Mentoring'),
          p(`With years of experience as scrum master, and 
              even more time mentoring junior developers,
            I believe it is everyone's responsibility 
              to teach and to stay teachable.`
          )
        ),
        div({ class: 'skill-category' },
          h4('Continuous Integration'),
          p(`Technology and best practices are constantly evolving, 
            as should any competent developer. I prefer my learning 
            approach to mirror my development approach, 
            continuously integrated and deployed.`
          )
        )
      )
    ),

    section({ class: 'mb-4' },
      h2('Core Values'),
      div({ class: 'card' },
        div({ class: 'card-content' },
          p(
            strong('Quality First: '),
            `I believe in writing clean, maintainable code, 
              in tandem with necessary tests. 
            Too many of the wrong optimizations and tests added too soon
              can slow down the CI/CD process 
              and make a poor design prematurely concrete.
            Of course, we all know what a lack of tests will do ;)`
          ),
          p(
            strong('Transparency & Trust: '),
            `It's the ultimate positive feedback loop.
            If we are forthcoming, others will follow suit.`
          ),
          p(
            strong('User Centric: '), 
            `First we consider the end user, 
            then our ability to support them.
            If we make their experience the best it can be 
            they will stick around and be our best marketing team.`
          ),
        )
      )
    )
  ).onReady(() => fadeIn('.content'))
}


