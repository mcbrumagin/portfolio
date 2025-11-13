import {
  registryServer,
  createRoutes,
  overrideConsoleGlobally,
  HttpError
} from 'micro-js'

import createStaticFileService from 'micro-js/static-file-service'

overrideConsoleGlobally({
  includeLogLineNumbers: true
})

import { htmlTags } from 'micro-js-html'
const { html, head, title, meta, link, script, body, pre } = htmlTags

const isDev = !process.env.ENVIRONMENT?.toLowerCase().includes('prod')

async function getClient() {
  return html({ lang: 'en' },
    head(
      meta({ charset: 'utf-8' }),
      meta({ name: 'viewport', content: 'width=device-width, initial-scale=1.0' }),

      title('M. Brumagin | Portfolio'),
      meta({ name: 'author', content: 'Matt Brumagin' }),
      meta({ name: 'description', content: `Browse Matt Brumagin's resume and personal projects.` }),
      meta({
        name: 'keywords',
        content: `portfolio, resume, projects, 
          developer, software, engineer, 
          agile, scrum, react, javascript, html, css, 
          microservices, aws, eks, gitlab, devops`
      }),

      link({ rel: 'stylesheet', href: '/css/styles.css' }),
      link({ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }),

      // TODO helper to bind server-side variables to client fns?
      script(`window.isDev = ${isDev}`),
      script({ src: '/modules/client-init.js' }),
      script({ src: '/modules/client-utils.js' }),        
      script({ src: '/js/app.js', type: 'module' }), // main client entry point

      isDev ? script({ src: '/js/test.js' }) : '' // Test harness
    ),
    body({ id: 'app', 'data-init-time': Date.now() })
  ).render()
}

async function getMemoryUsage() {
  let mem = process.memoryUsage()
  return mem
}

async function getHealthDetails() {
  let registryMap = await fetch(`${process.env.MICRO_REGISTRY_URL}`, {
    headers: {
      'Content-Type': 'application/json',
      'micro-command': 'service-lookup',
      'micro-service-name': '*'
    }
  }).then(response => response.json())

  return { health: 'OK', registryMap }
}

async function getHealth() {
  return JSON.stringify({ health: 'OK', timestamp: new Date().toISOString() })
}

// TODO simple metrics tracking service

async function main() {

  let registry = await registryServer()
  let routeMap = {
    '/': getClient,
    '/health': getHealth,
    '/portfolio/*': getClient,
    '/*': await createStaticFileService({
      fileMap: {
        '/robots.txt': 'src/public/resources/robots.txt',
        '/sitemap.xml': 'src/public/resources/sitemap.xml',
        '/favicon.ico': 'src/public/resources/favicon.svg',
        '/favicon.svg': 'src/public/resources/favicon.svg',
        '/modules/*': 'node_modules/micro-js-html/src',
        '/*': 'src/public'
      }
    })
  }

  if (isDev) {
    routeMap['/memory'] = getMemoryUsage
    routeMap['/healthDetails'] = getHealthDetails
  }

  return [registry, await createRoutes(routeMap)]
}

main()
.then(([registry, services]) => {
  
  async function shutdown() {
    try {
      for (let service of services) await service?.terminate()
      await registry.terminate()
      process.exit(0)
    } catch (err) {
      console.error(err.stack)
      process.exit(1)
    }
  }

  process.once('SIGINT', () => {
    console.info('Received SIGINT. Initiating graceful shutdown.')
    shutdown()
  })
  
  process.once('SIGTERM', () => {
    console.info('Received SIGTERM. Initiating graceful shutdown.')
    shutdown()
  })

  console.log('Portfolio server ready!')
})
