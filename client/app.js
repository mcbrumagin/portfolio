micro.exports = async function renderPageTemplate(includeNav = true) {
  const {
    waitForElement,
    html: { div, p },
    modules: { createNav }
  } = micro

  let body = await waitForElement('body')
  body.innerHTML = div({ id: 'main' },
    includeNav ? createNav() : '',
    div({ id: 'content' }),
    div({ class: 'load-time' })
  ).render()
}

async function main() {
  const { router, hashRouter, isMobileBrowser, loadResource } = micro

  if (isMobileBrowser()) {
    await loadResource('/assets/resources/mobile.css')
  }

  await micro.modules.renderPageTemplate(includeNav = false)

  router({
    '/portfolio': {
      '/': micro.modules.home,
      '/experience': micro.modules.experience,
      '/projects': micro.modules.projects,
      '/skills': micro.modules.skills,
      '/contact': micro.modules.contact
    }
  }, {
    renderLocation: '#content',
    before: () => {
      if (!initTime) initTime = new Date()
    },
    after: async () => {
      let loadTime = await micro.waitForElement('.load-time')
      totalLoadTime = getTotalLoadTime()
      loadTime.innerHTML = micro.html.p({ class: 'smaller-text' }, totalLoadTime + 'ms')
      initTime = null
    }
  })
}

main()
.then(() => {
  console.timeEnd('pageLoad')
  console.log('Portfolio ready!')
})


