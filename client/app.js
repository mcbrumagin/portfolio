import initGlobals from './global.js'
initGlobals()

import home from './home.js'

import resume from './sections/resume.js'
import projects from './sections/projects.js'
import createNav from './nav.js'

import { htmlTags } from './modules/micro-js-html/src/index.js'
import { createFooter } from './footer.js'

micro.exports = async function renderPageTemplate(includeNav = true) {
  const { div } = htmlTags
  const { waitForElement } = micro // TODO refactor as module

  let body = await waitForElement('body')
  body.innerHTML = div({ id: 'main' },
    includeNav ? createNav() : '',
    div({ id: 'content' }),
    createFooter()
  ).render()
}

async function main() {
  const { router, isMobileBrowser, loadResource } = micro // TODO refactor as modules

  micro.htmlTags = htmlTags
  // for some reason, mobile.css looks worse all of a sudden? maybe need a refactor..
  // also lowkey, doing desktop-only styles instead of mobile-only styles would be more sensible
  // if (isMobileBrowser()) {
  //   await loadResource('/assets/resources/mobile.css')
  // }

  await micro.modules.renderPageTemplate(false)

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
      // TODO client load time
      // if (!window.initTime) window.initTime = new Date()
    },
    after: async () => {
      let loadTime = await micro.waitForElement('.load-time')
      if (totalLoadTime == null) {
        totalLoadTime = getTotalLoadTime()
        console.log({ totalLoadTime })
        // window.initTime = null
      }
      loadTime.innerHTML = htmlTags.p({ class: 'smaller-text' }, `${totalLoadTime}ms`)
    }
  })
}

main()
.then(() => {
  console.timeEnd('pageLoad')
  console.log('Portfolio ready!')
})


