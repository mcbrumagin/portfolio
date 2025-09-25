import initGlobals from './global.js'
initGlobals()

import home from './home.js'

import resume from './sections/resume.js'
import projects from './sections/projects.js'
import createNav from './nav.js'

import { htmlTags } from './modules/micro-js-html/src/index.js'


micro.exports = async function renderPageTemplate(includeNav = true) {
  const { div } = htmlTags
  const { waitForElement } = micro // TODO refactor as module

  let body = await waitForElement('body')
  body.innerHTML = div({ id: 'main' },
    includeNav ? createNav() : '',
    div({ id: 'content' }),
    div({ class: 'load-time', /* style: 'display: none' */ })
  ).render()
}

async function main() {
  const { router, isMobileBrowser, loadResource } = micro // TODO refactor as modules

  micro.htmlTags = htmlTags
  if (isMobileBrowser()) {
    await loadResource('/assets/resources/mobile.css')
  }

  await micro.modules.renderPageTemplate(false)

  router({
    '/portfolio': {
      '/': home,
      '/resume': resume,
      '/projects': projects
    }
  }, {
    renderLocation: '#content',
    before: () => {
      if (!window.initTime) window.initTime = new Date()
    },
    after: async () => {
      let loadTime = await micro.waitForElement('.load-time')
      let totalLoadTime = getTotalLoadTime()
      loadTime.innerHTML = htmlTags.p({ class: 'smaller-text' }, totalLoadTime + 'ms')
      window.initTime = null
    }
  })
}

main()
.then(() => {
  console.timeEnd('pageLoad')
  console.log('Portfolio ready!')
})


