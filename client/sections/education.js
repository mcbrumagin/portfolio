micro.exports = async function education() {
  await micro.modules.renderPageTemplate()
  
  const { div, h1, h2, h3, h4, p, section, ul, li } = micro.html

  return div({ class: 'content' },
    section({ class: 'hero' },
      h1('Education'),
      p({ class: 'hero-subtitle' }, 
        `Strong Foundation in Engineering & Mathematics`
      )
    ),

    section({ class: 'mb-4' },
      h2('Academic Background'),
      div({ class: 'card' },
        div({ class: 'card-header' },
          div(
            h3({ class: 'card-title' }, 
              `Bachelor of Science in Electrical Engineering`
            ),
            h4({ class: 'card-subtitle' }, 
              `Clarkson University | Potsdam, NY`
            )
          ),
          div({ class: 'card-meta' },
            p('Class of 2013'),
            p({ class: 'text-muted' }, 
              `Software & Mathematics Minors`
            )
          )
        ),
        div({ class: 'card-content' },
          p(
            `Comprehensive engineering education with specialized 
            focus on software development and mathematical foundations.
            The program provided a strong technical foundation 
            in problem-solving, systems thinking, and analytical reasoning.`
          ),
          
          h4('Key Areas of Study:'),
          ul(
            li(`Electronics fundamentals; analog & digital circuits`),
            li(`Software principles, algorithms, and data structures`),
            li(`Advanced Math; calculus, linear algebra, and probability`),
            li(`Digital Signal Processing w/ MATLAB`),
            li(`Computer programming; agile, mobile, web, and systems`),
            li(`Independent study; sensors and display for parking assistance`),
            li(`Engineering economics and engineering ethics`)
          )
        )
      )
    ),

    section({ class: 'mb-4' },
      h2('Academic Highlights'),
      div({ class: 'skills-grid' },
        div({ class: 'skill-category' },
          h4('Depth in Computer Science'),
          p(
            `Software minor provided early exposure to 
            programming principles, software architecture, 
            and development methodologies.
            Practical experience with multiple programming 
            languages and development environments.`
          )
        ),
        div({ class: 'skill-category' },
          h4('Mathematical Rigor'),
          p(
            `Mathematics minor strengthened analytical capabilities 
            and provided advanced mathematical tools essential 
            for algorithm development and system optimization.`
          )
        ),
        div({ class: 'skill-category' },
          h4('Interdisciplinary Approach'),
          p(
            `Unique combination of electrical engineering, 
            software development, and mathematics created 
            a well-rounded technical foundation applicable 
            to modern technology challenges.`
          )
        )
      )
    ),

    section({ class: 'mb-4' },
      h2('Continuous Learning'),
      div({ class: 'card' },
        div({ class: 'card-content' },
          h3('Professional Development'),
          p(
            `Beyond formal education, I maintain a commitment 
            to continuous learning and professional growth:`
          ),
          ul(
            li(`AWS Certifications and cloud architecture best practices`),
            li(`Kubernetes and container orchestration technologies`),
            li(`Modern web development frameworks and methodologies`),
            li(`DevOps culture and automation practices`),
            li(`Leadership and team management skills`),
            li(`Industry conferences, workshops, and technical publications`)
          )
        )
      )
    ),

    section({ class: 'mb-4' },
      h2('How Education Informs My Work'),
      div({ class: 'card' },
        div({ class: 'card-content' },
          p(
            `My engineering education instilled a systematic approach 
            to problem-solving that I apply daily in software development. 
            The mathematical foundation helps me optimize algorithms 
            and understand complex system behaviors, while the software 
            focus provided early exposure to programming concepts 
            that I've continuously built upon throughout my career.`
          ),
          
          p(
            `The interdisciplinary nature of my education—combining 
            electrical engineering, software, and mathematics—mirrors 
            the cross-functional collaboration required in modern 
            technology teams. This background has been invaluable 
            in bridging communication gaps between different technical 
            disciplines and understanding system requirements 
            from multiple perspectives.`
          )
        )
      )
    )
  ).onReady(() => fadeIn('.content'))
}


