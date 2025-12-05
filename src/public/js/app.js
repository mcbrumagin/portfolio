import initGlobals from './global.js'
initGlobals()

import home from './home.js'

import resume from './sections/resume.js'
import projects from './sections/projects.js'
import createNav from './nav.js'

import { htmlTags } from '../modules/index.js'
import { createFooter } from './footer.js'

yamf.exports = async function renderPageTemplate(includeNav = true) {
  const { div } = htmlTags
  const { waitForElement } = yamf // TODO refactor as module

  let body = await waitForElement('body')
  body.innerHTML = div({ id: 'main' },
    includeNav ? createNav() : '',
    div({ id: 'content' }),
    createFooter()
  ).render()
}

async function main() {
  const { router, isMobileBrowser, loadResource } = yamf // TODO refactor as modules

  yamf.htmlTags = htmlTags
  // for some reason, mobile.css looks worse all of a sudden? maybe need a refactor..
  // also lowkey, doing desktop-only styles instead of mobile-only styles would be more sensible
  // if (isMobileBrowser()) {
  //   await loadResource('/assets/resources/mobile.css')
  // }

  await yamf.modules.renderPageTemplate(false)

  let totalLoadTime = null
  router({
    '/': home,
    '/portfolio': {
      '/': home,
      '/resume': resume,
      '/projects': projects
    }
  }, {
    renderLocation: '#content',
    before: () => {
      // TODO client load time?
      // if (!window.initTime) window.initTime = new Date()
    },
    after: async () => {
      if (window.isDev) {
        let loadTime = await yamf.waitForElement('.load-time')
        if (totalLoadTime == null) {
          totalLoadTime = getTotalLoadTime()
        }
        if (totalLoadTime) {
          loadTime.innerHTML = htmlTags.p({ class: 'smaller-text' }, `${totalLoadTime}ms`)
        }
      }
    }
  })
}

main()
.then(() => {
  console.timeEnd('pageLoad')
  console.log('Portfolio ready!')
})
