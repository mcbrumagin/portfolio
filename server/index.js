const {
  registryServer,
  createRoute,
  createService,
  createServices,
  callService,
  Logger,
  fs
} = require('micro-js')

new Logger({
  overrideConsoleLog: true,
  includeLogLineNumbers: true
})

const { loadClient, html: { html, head, link, script, body } } = require('micro-js-html')

async function getClient() {
  return html(
    head(
      script(`console.time('pageLoad'); var initTime = new Date()`),
      link({ rel: 'stylesheet', href: '/assets/resources/styles.css' }),

      // prevent browser from requesting favicon
      link({ rel: 'icon', type: 'image/png', href: 'data:image/png;base64,iVBORw0KGgo=' }),

      script({ src: '/assets/micro-js-html.js' }),
      script({ src: '/assets/global.js' }),
      script({ src: '/assets/home.js' }),

      // Portfolio sections
      script({ src: '/assets/sections/experience.js' }),
      script({ src: '/assets/sections/projects.js' }),
      script({ src: '/assets/sections/skills.js' }),
      script({ src: '/assets/sections/contact.js' }),

      script({ src: '/assets/nav.js' }),
      script({ src: '/assets/app.js' }),

      script({ src: '/assets/test.js' }),
    ),
    body({ id: 'app' })
  ).render()
}

async function getAsset(payload) {
  let assetPath = '../client/' + payload.url
    .split('/')
    .slice(2 /* ignore "assets" */)
    .join('/')

  if (payload.url === '/assets/test.js') {
    return { payload: await fs.read('../test/client/test.js'), dataType: 'text/javascript' }
  }

  try {
    let result = (assetPath === '../client/micro-js-html.js')
      ? await loadClient()
      : await fs.read(assetPath)

    let dataType = assetPath.includes('.js') && 'text/javascript'
      || assetPath.includes('.css') && 'text/css'
      || assetPath.includes('.svg') && 'image/svg+xml'
      || assetPath.includes('.png') && 'image/png'
      || 'text/html'

    return { payload: result, dataType }
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
