import {
  registryServer,
  createRoute,
  createService,
  createServices,
  callService,
  overrideConsoleGlobally
} from 'micro-js'

import fs from 'fs/promises'

overrideConsoleGlobally({
  includeLogLineNumbers: true // TODO doesn't work for some reason
})

import { htmlTags } from 'micro-js-html'
const { html, head, meta, link, script, body, pre } = htmlTags

async function getClient() {
  let initTime = Date.now()
  try {
    return html(
      head(
        meta({ name: 'viewport', content: 'width=device-width, initial-scale=1.0' }),
        script(`console.time('pageLoad'); window.initTime = new Date()`),
        link({ rel: 'stylesheet', href: '/assets/resources/styles.css' }),

        // prevent browser from requesting favicon
        link({ rel: 'icon', type: 'image/png', href: 'data:image/png;base64,iVBORw0KGgo=' }),

        // global helpers
        script({ src: '/assets/modules/micro-js-html/src/client-init.js' }),
        script({ src: '/assets/modules/micro-js-html/src/client-utils.js' }),

        // main client entry point
        script({ src: '/assets/app.js', type: 'module' }),

        // Test harness
        // script({ src: '/assets/test.js' })
      ),
      body({ id: 'app', 'data-init-time': initTime })
    ).render()
  } catch (err) {
    console.error(err.stack)
  }
}

async function getRobots() {
  let robots = await fs.readFile('../client/resources/robots.txt')
  return { payload: robots, dataType: 'text/plain' }
}

async function getSiteMap() {
  let sitemap = await fs.readFile('../client/resources/sitemap.xml')
  return { payload: sitemap, dataType: 'application/xml' }
}

async function getAsset(payload) {
  try {
    if (payload.url === '/assets/test.js') {
      return { payload: await fs.readFile('../test/client/test.js'), dataType: 'text/javascript' }
    } else if (payload.url.includes('module')) {
      let modulePath = '../client/node_modules/' + payload.url
        .split('/')
        .slice(3 /* ignore "assets/modules/" */)
        .join('/')

      let moduleScript = await fs.readFile(modulePath)
      return { payload: moduleScript, dataType: 'text/javascript' }
    } else {
      // payload.url includes asset
      let assetPath = '../client/' + payload.url
        .split('/')
        .slice(2 /* ignore "assets" */)
        .join('/')

      let result = await fs.readFile(assetPath)

      if (payload.url.includes('.pdf')) {
        let dataType = 'application/pdf'
        let headers = {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="mcbrumagin-resume.pdf"'
        }
        return { payload: result, dataType, headers }
      } else {
        let dataType = assetPath.includes('.js') && 'text/javascript; charset=UTF-8'
          || assetPath.includes('.css') && 'text/css; charset=UTF-8'
          || assetPath.includes('.svg') && 'image/svg+xml; charset=UTF-8'
          || assetPath.includes('.png') && 'image/png'
          || 'text/html; charset=UTF-8'

        return { payload: result, dataType }
      }
    }
  } catch (err) {
    console.error(err.stack)
    return { status: 404 } // TODO getting "Cannot write headers after they are sent to the client"
  }
}

async function getMemoryUsage() {
  let mem = process.memoryUsage()
  return { payload: JSON.stringify(mem) }
}

async function getHealthDetails() {
  let response = await fetch(`${process.env.SERVICE_REGISTRY_ENDPOINT}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lookup: 'all' })
  })

  let registryMap = await response.json()
  
  return JSON.stringify({ health: 'OK', registryMap })
}

async function getHealth() {
  return JSON.stringify({ status: 'healthy', timestamp: new Date().toISOString() })
}

async function main() {
  await Promise.all([
    registryServer(),
    createRoute('/', getClient),
    createRoute('/robots.txt', getRobots),
    createRoute('/sitemap.xml', getSiteMap),
    createRoute('/portfolio/*', 'getClient'), // TODO, prevent multiple service creations or throw error?
    createRoute('/assets/*', getAsset),
    createRoute('/mem/*', getMemoryUsage),
    createRoute('/healthDetails', getHealthDetails),
    createRoute('/health', getHealth)
  ])
}

//setInterval(() => {
//  let mem = process.memoryUsage()
//  console.info(`Memory usage ${mem.rss/1024/1024}MB`)
//}, 10000)

main()
.then(() => console.log('Portfolio server ready!'))
