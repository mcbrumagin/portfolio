import { htmlTags } from '../../modules/index.js'

export default async function projects() {
  await yamf.modules.renderPageTemplate()
  
  const { div, h1, h2, h3, h4, p, section, ul, li, a, button, strong, em } = htmlTags

  return div({ class: 'content' },
    section({ class: 'hero' },
      h1('Personal Projects'),
      p({ class: 'hero-subtitle' },
        'Open Source Projects & Applications'
      )
    ),

    section({ class: 'mb-4' },
      h2('Yet Another Microservice Framework (YAMF)'),
      div({ class: 'card' },
        div({ class: 'card-header' },
          div(
            h3({ class: 'card-title' }, 'YAMF Core'),
            h4({ class: 'card-subtitle' }, 'Zero-Dependency Microservices Framework')
          ),
          div({ class: 'card-meta' },
            p('Core Framework'),
            p({ class: 'text-muted' }, 'JavaScript/Node.js')
          )
        ),
        div({ class: 'card-content' },
          p(`A monorepo of smaller modules for building distributed systems with zero runtime dependencies. 
            Features service registry, API gateway, routing, RPC, pub/sub events, caching, and authentication.`
          ),
          
          h4('Key Features:'),
          ul(
            li('Zero external dependencies - virtually immune to supply-chain attacks'),
            li('Service registry with dynamic service discovery'),
            li('Built-in API gateway with reverse-proxy capabilities'),
            li('RPC calls and pub/sub event system for inter-service communication'),
            li('Round-robin load balancing and health checks'),
            li('Comprehensive test coverage (90%+) with custom logging and multi-assertion')
          ),
          
          h4('Technical Highlights:'),
          ul(
            li('Monorepo architecture with independently versioned packages'),
            li('Supports both Node.js and Python clients'),
            li('Dockerized multi-container examples demonstrating distributed communication'),
            li('JWT-lite authentication and in-memory caching services'),
            li('Modular design - use only what you need'),
            li('Production-ready with detailed logging and debugging utilities')
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

      // YAMF Client project
      div({ class: 'card' },
        div({ class: 'card-header' },
          div(
            h3({ class: 'card-title' }, 'YAMF Client'),
            h4(
              { class: 'card-subtitle' },
              'Isomorphic HTML-as-JavaScript Library'
            )
          ),
          div({ class: 'card-meta' },
            p('Client Library'),
            p({ class: 'text-muted' }, 'JavaScript')
          )
        ),
        div({ class: 'card-content' },
          p(`An isomorphic library for building UIs with JavaScript functions that generate HTML. 
            Unlike React, it's pure JavaScript with no virtual DOM overhead.
            Write your HTML structure using plain JS - works server-side and client-side.`
          ),
          
          h4('Key Features:'),
          ul(
            li('Declarative HTML generation using JavaScript functions'),
            li('Server-side rendering with client-side hydration'),
            li('Reactive state management with automatic re-rendering'),
            li('Direct DOM manipulation - no virtual DOM overhead'),
            li('Zero dependencies, zero build step required')
          ),
          
          h4('Technical Highlights:'),
          ul(
            li('Write HTML structure using plain JavaScript syntax'),
            li('Conditional exports for browser and server environments'),
            li('Event handling integration with proper cleanup'),
            li('Powerful composition patterns for reusable components'),
            li('Works standalone or as part of the YAMF ecosystem')
          ),
          
          div({ class: 'button-actions' },
            a({ 
              href: 'https://github.com/mcbrumagin/yamf/tree/main/packages/client', 
              target: '_blank', 
              class: 'button-link' 
            }, 'View on GitHub')
          )
        )
      )
    ),

    section({ class: 'mb-4' },
      h2('Applications'),
      p({ class: 'mb-4' }, 'Real-world applications built using the YAMF ecosystem:'),
      

      // SoundClone project (now TheScene.FM)
      div({ class: 'card' },
        div({ class: 'card-header' },
          div(
            h3({ class: 'card-title' }, 'TheScene.FM', em({ style: 'opacity: 0.5' }, ' [active development]')),
            h4({ class: 'card-subtitle' }, 'Audio Streaming Platform with In-App Recording')
          ),
          div({ class: 'card-meta' },
            p('Web Application'),
            p({ class: 'text-muted' }, 'JavaScript/Node.js')
          )
        ),
        div({ class: 'card-content' },
          p(`A SoundCloud-inspired platform built to showcase and extend YAMF's real-world functionality. 
            Features authenticated uploads, in-app recording, and roadmap includes playlists, feeds, 
            artist/venue profiles, and an event calendar.`
          ),
          
          h4('Core Features:'),
          ul(
            li('In-browser audio recording using Web Audio API'),
            li('Real-time audio playback with waveform visualization'),
            li('Authenticated uploads with JWT-lite auth service'),
            li('Audio streaming with S3 backup and Redis-like caching'),
            li('Responsive design optimized for mobile and desktop')
          ),
          
          h4('Technical Implementation:'),
          ul(
            li('Built with YAMF Core, Client, and service modules (auth, cache, file-upload)'),
            li('Multi-container architecture: main app + dedicated ffmpeg service'),
            li('Handles audio transcoding and waveform generation in separate container'),
            li('S3 integration for persistent storage with local caching layer'),
            li('Deployed alongside portfolio in shared ECS task'),
            li('Demonstrates distributed communication and service discovery')
          ),

          h4('Current Status:'),
          ul(
            li('Real-time audio playback and streaming functional'),
            li('Admin-only uploads with authentication'),
            li('FFmpeg container handles audio processing and waveform generation'),
            li('In-browser recording using Web Audio API'),
            li('Efficient streaming from filesystem with S3 backup'),
            li('Metadata cached locally for fast access'),
            li('Roadmap: playlists, social feeds, artist profiles, event calendar')
          ),
          
          div({ class: 'button-actions-flex' },
            a({ 
              href: 'https://soundcl.one', 
              target: '_blank', 
              class: 'button-link' 
            }, 'Live App'),
            a({
              href: 'https://github.com/mcbrumagin/soundclone', 
              target: '_blank', 
              class: 'button-link' 
            }, 'View Source')
          )
        )
      ),

      // Portfolio Website project
      div({ class: 'card' },
        div({ class: 'card-header' },
          div(
            h3({ class: 'card-title' }, 'Portfolio Website'),
            h4({ class: 'card-subtitle' }, 'Built from scratch with YAMF')
          ),
          div({ class: 'card-meta' },
            p('Web Application'),
            p({ class: 'text-muted' }, 'JavaScript/Node.js')
          )
        ),
        div({ class: 'card-content' },          
          h4('Core Features:'),
          ul(
            li('Built entirely with YAMF Core and YAMF Client'),
            li('Server-side rendering with client-side hydration'),
            li('Responsive design optimized for all devices'),
            li('PDF resume download functionality'),
            li('Static file serving with YAMF file-server service')
          ),
          
          h4('Technical Implementation:'),
          ul(
            li('Infrastructure as Code with Terraform'),
            li('Containerized deployment with Docker'),
            li('CI/CD pipeline with GitHub Actions'),
            li('Hosted on AWS ECS Fargate with Application Load Balancer'),
            li('SSL/TLS termination and custom domain routing'),
            li('Multi-container task definition with SoundClone')
          ),
          
          div({ class: 'button-actions' },
            a({ 
              href: 'https://github.com/mcbrumagin/portfolio', 
              target: '_blank', 
              class: 'button-link' 
            }, 'View Source')
          )
        )
      )
    )
  ).onReady(() => fadeIn('.content'))
}
