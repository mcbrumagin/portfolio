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
const { html, head, meta, link, script, body } = htmlTags

async function getClient() {
  try {
    return html(
      head(
        // <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        meta({ name: 'viewpoer', content: 'width=device-width, initial-scale=1.0' }),
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
        script({ src: '/assets/test.js' })
      ),
      body({ id: 'app' })
    ).render()
  } catch (err) {
    console.error(err.stack)
  }
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
    return { status: 404 }
  }
}

async function main() {
  await Promise.all([
    registryServer(),
    createRoute('/assets/*', getAsset),
    createRoute('/portfolio/*', getClient)
  ])
}

main()
.then(() => console.log('Portfolio server ready!'))
