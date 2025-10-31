import { htmlTags } from '../../modules/index.js'

export default async function projects() {
  await micro.modules.renderPageTemplate()
  
  const { div, h1, h2, h3, h4, p, section, ul, li, a, button, strong, em } = htmlTags

  return div({ class: 'content' },
    section({ class: 'hero' },
      h1('Personal Projects'),
      p({ class: 'hero-subtitle' },
        'Open Source Projects & Applications'
      )
    ),

    section({ class: 'mb-4' },
      h2('Microservice Framework'),
      div({ class: 'card' },
        div({ class: 'card-header' },
          div(
            h3({ class: 'card-title' }, 'micro-js'),
            h4({ class: 'card-subtitle' }, 'Functional Microservices & Registry')
          ),
          div({ class: 'card-meta' },
            p('Core Framework'),
            p({ class: 'text-muted' }, 'JavaScript/Node.js')
          )
        ),
        div({ class: 'card-content' },
          p(`Zero-dependency server microservice module 
            featuring a reverse-proxy, service registry, 
            routing, layered stack traces, and dynamic discovery.`
          ),
          
          h4('Key Features:'),
          ul(
            li('Only one environment variable needed: your registry location'),
            li('Lightweight routing system with support for nested routes'),
            li('Layered stack traces for better debugging'),
            li('Simple round-robin load balancing baked in'),
            li('Server-side rendering capabilities using micro-js-html'),
            li('Built to allow any function as a microservice')
          ),
          
          h4('Technical Highlights:'),
          ul(
            li('Zero external dependencies for core functionality'),
            li('Everything async/await ready'),
            li('Modular design allowing selective feature usage'),
            li('Works in tandem with micro-js-html for declarative UI'),
            li('Built-in logging and debugging utilities')
          ),
          
          div({ class: 'button-actions' },
            button({ onclick: () => findOne('[href*="micro-js"]').click() },
              a({
                // onclick: () => { throw 'test' },
                href: 'https://github.com/mcbrumagin/micro-js', 
                target: '_blank', 
                class: 'button-link' 
              }, 'View on GitHub')
            )
          )
        )
      ),

      // micro-js-html project
      div({ class: 'card' },
        div({ class: 'card-header' },
          div(
            h3({ class: 'card-title' }, 'micro-js-html'),
            h4(
              { class: 'card-subtitle' },
              'Declarative HTML Generation Library'
            )
          ),
          div({ class: 'card-meta' },
            p('Companion Library'),
            p({ class: 'text-muted' }, 'JavaScript')
          )
        ),
        div({ class: 'card-content' },
          p(`A companion library to micro-js that provides a clean, 
              declarative way to generate HTML using JavaScript.
            Unlike react, it's actually just javascript.
            The library makes no assumptions about rendering,
              but offers a simple helper.`
          ),
          
          h4('Key Features:'),
          ul(
            li('Declarative HTML generation'),
            li('Event handling integration'),
            li('Server-side and client-side rendering support'),
            li('No virtual DOM overhead - direct DOM manipulation'),
            li('Use it with micro-js or standalone')
          ),
          
          h4('Technical Highlights:'),
          ul(
            li('Write HTML structure using plain JavaScript syntax'),
            li('No build step required - works directly in browsers'),
            li('Eliminates context switching between HTML templates and JavaScript'),
            li('Powerful composition patterns for reusable components')
          ),
          
          div({ class: 'button-actions' },
            button({ onclick: () => findOne('[href*="micro-js-html"]').click() },
              a({ 
                href: 'https://github.com/mcbrumagin/micro-js-html', 
                target: '_blank', 
                class: 'button-link' 
              }, 'View on GitHub')
            )
          )
        )
      )
    ),

    section({ class: 'mb-4' },
      h2('Applications'),
      p({ class: 'mb-4' }, 'Real-world applications built using the micro-js ecosystem:'),
      
      // Portfolio Website project
      div({ class: 'card' },
        div({ class: 'card-header' },
          div(
            h3({ class: 'card-title' }, 'Portfolio Website'),
            h4({ class: 'card-subtitle' }, 'Built from scratch with only micro-js & micro-js-html')
          ),
          div({ class: 'card-meta' },
            p('Web Application'),
            p({ class: 'text-muted' }, 'JavaScript/Node.js')
          )
        ),
        div({ class: 'card-content' },          
          h4('Core Features:'),
          ul(
            li('Built entirely with micro-js framework ecosystem'),
            li('Server-side rendering with client-side hydration'),
            li('Responsive design optimized for all devices'),
            li('PDF resume download functionality')
          ),
          
          h4('Technical Implementation:'),
          ul(
            li('Infrastructure as Code with Terraform'),
            li('Containerized deployment with Docker'),
            li('CI/CD pipeline with GitHub Actions'),
            li('Hosted on AWS ECS with Application Load Balancer'),
            li('SSL/TLS termination and custom domain routing')
          ),
          
          div({ class: 'button-actions' },
            button({ onclick: () => findOne('[href*="mcbrumagin/portfolio"]').click() },
              a({ 
                href: 'https://github.com/mcbrumagin/portfolio', 
                target: '_blank', 
                class: 'button-link' 
              }, 'View Source')
            )
          )
        )
      ),
      
      // SoundClone project
      div({ class: 'card' },
        div({ class: 'card-header' },
          div(
            h3({ class: 'card-title' }, 'SoundClone', em({ style: 'opacity: 0.5' }, ' [work in progress]')),
            h4({ class: 'card-subtitle' }, 'Minimal SoundCloud Clone with Recording')
          ),
          div({ class: 'card-meta' },
            p('Web Application'),
            p({ class: 'text-muted' }, 'JavaScript/Node.js')
          )
        ),
        div({ class: 'card-content' },
          p(`Developing a SoundCloud-inspired app with built-in recording. 
            Building out with micro-js & micro-js-html to extend and test the framework.`
          ),
          
          h4('Core Features:'),
          ul(
            li('In-browser audio recording using Web Audio API'),
            li('Real-time audio playback and streaming'),
            li('User-friendly upload and sharing interface'),
            li('Responsive design optimized for all devices')
          ),
          
          h4('Technical Implementation:'),
          ul(
            li('Built with micro-js & micro-js-html framework'),
            li('Serves as a testing ground for framework capabilities'),
            li('Web Audio API integration for recording functionality'),
            li('Mobile-first responsive design')
          ),
          
          // Disabled until these are live
          // div({ class: 'button-actions-flex' },
          //   button(
          //     a({ 
          //       href: 'https://soundclone.example.com', 
          //       target: '_blank', 
          //       class: 'button-link' 
          //     }, 'Live Demo')
          //   ),
          //   button(
          //     a({ 
          //       href: 'https://github.com/mcbrumagin/soundclone', 
          //       target: '_blank', 
          //       class: 'button-link' 
          //     }, 'View Source')
          //   )
          // )
        )
      )
    )
  ).onReady(() => fadeIn('.content'))
}
