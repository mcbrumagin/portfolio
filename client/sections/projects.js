micro.exports = async function projects() {
  await micro.modules.renderPageTemplate()
  
  const { div, h1, h2, h3, h4, p, section, ul, li, a, button, strong, em } = micro.html

  return div({ class: 'content' },
    section({ class: 'hero' },
      h1('Personal Projects'),
      p(
        { class: 'hero-subtitle' },
        'Open Source Projects & Applications'
      )
    ),

    section({ class: 'mb-4' },
      h2('Microservice Framework'),
      div({ class: 'card' },
        div({ class: 'card-header' },
          div(
            h3({ class: 'card-title' }, 'micro-js'),
            h4({ class: 'card-subtitle' }, 'Lightweight Microservice Framework')
          ),
          div({ class: 'card-meta' },
            p('Core Framework'),
            p({ class: 'text-muted' }, 'JavaScript/Node.js')
          )
        ),
        div({ class: 'card-content' },
          p(`A minimal, powerful JavaScript framework 
            designed for building fast, efficient web applications. 
            micro-js provides essential utilities for routing, 
            service management, and application architecture 
            without the opinions or bloat of larger frameworks.`
          ),
          
          h4('Key Features:'),
          ul(
            li('Registry server w/ built-in service discovery'),
            li('Lightweight routing system with support for nested routes'),
            li('Round-robin load balancing baked in'),
            li('Server-side rendering capabilities'),
            li('Built to allow any function as a microservice'),
            li('Registered services are injected into the context')
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
            button(
              a({ 
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
            li('Seamless integration with micro-js and its router')
          ),
          
          h4('Technical Highlights:'),
          ul(
            li('Write HTML structure using plain JavaScript syntax'),
            li('No build step required - works directly in browsers'),
            li('Eliminates context switching between HTML templates and JavaScript'),
            li('Powerful composition patterns for reusable components')
          ),
          
          div({ class: 'button-actions' },
            button(
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
      
      // SoundClone project
      div({ class: 'card' },
        div({ class: 'card-header' },
          div(
            h3({ class: 'card-title' }, 'SoundClone', em({ style: 'opacity: 0.5' }, ' [work in progress]')),
            h4({ class: 'card-subtitle' }, 'Minimal SoundCloud Clone with Recording')
          ),
          div({ class: 'card-meta' },
            p('Web Application'),
            p({ class: 'text-muted' }, 'micro-js/HTML/CSS')
          )
        ),
        div({ class: 'card-content' },
          p('A streamlined audio sharing platform inspired by SoundCloud, built entirely with micro-js and micro-js-html. ' +
            'Features real-time audio recording, playback, and sharing capabilities with a clean, modern interface.'),
          
          h4('Core Features:'),
          ul(
            li('In-browser audio recording using Web Audio API'),
            li('Real-time audio playback and streaming'),
            li('User-friendly upload and sharing interface'),
            li('Responsive design optimized for all devices'),
            li('Minimal, fast-loading architecture'),
            li('Clean, modern UI following best UX practices')
          ),
          
          h4('Technical Implementation:'),
          ul(
            li('Built entirely with micro-js framework for optimal performance'),
            li('Utilizes micro-js-html for declarative UI components'),
            li('Web Audio API integration for recording functionality'),
            li('Mobile-first responsive design')
          ),
          
          div({ class: 'button-actions-flex' },
            button(
              a({ 
                href: 'https://soundclone.example.com', 
                target: '_blank', 
                class: 'button-link' 
              }, 'Live Demo')
            ),
            button(
              a({ 
                href: 'https://github.com/mcbrumagin/soundclone', 
                target: '_blank', 
                class: 'button-link' 
              }, 'View Source')
            )
          )
        )
      )
    ),

    section({ class: 'text-center mt-4' },
      h2('Explore the Ecosystem'),
      p({ class: 'mb-4' }, 'These projects showcase my approach to building efficient, maintainable software solutions.'),
      div({ class: 'button-group' },
        button(
          a({ 
            href: 'https://github.com/mcbrumagin', 
            target: '_blank', 
            class: 'button-link' 
          }, 'View All Projects')
        ),
        button(
          a({ 
            href: '/portfolio/contact', 
            class: 'button-link' 
          }, 'Discuss Collaboration')
        )
      )
    )
  ).onReady(() => fadeIn('.content'))
}
