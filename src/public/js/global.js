const findOne = selector => document.querySelector(selector)
const findAll = selector => document.querySelectorAll(selector)

const addClass = (domClass, elem) => elem.classList.add(domClass)
const removeClass = (domClass, elem) => elem.classList.remove(domClass)
const toggleClass = (domClass, elem) => elem.classList.toggle(domClass)

const fadeIn = async selector => {
  let result = findOne(selector)
  addClass('display', result)
}

const fadeOut = async selector => {
  let result = findOne(selector)
  removeClass('display', result)
}

const createPlaceholder = page => {
  const { div, p } = micro.htmlTags
  return div({ class: 'content' },
      p(`Loading ${page}...`)
    ).onReady(() => fadeIn('.content'))
}

const getTotalLoadTime = () => {
  let initTime = Number(findOne('body').dataset.initTime)
  return Date.now() - initTime
}

// Smooth scroll utility
const smoothScrollTo = (element, duration = 800) => {
  const targetPosition = element.offsetTop - 80 // Account for fixed nav
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  let startTime = null

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const run = ease(timeElapsed, startPosition, distance, duration)
    window.scrollTo(0, run)
    if (timeElapsed < duration) requestAnimationFrame(animation)
  }

  const ease = (t, b, c, d) => {
    t /= d / 2
    if (t < 1) return c / 2 * t * t + b
    t--
    return -c / 2 * (t * (t - 2) - 1) + b
  }

  requestAnimationFrame(animation)
}

function downloadFile(filePath) {
  var link=document.createElement('a')
  link.href = filePath
  link.download = filePath.substr(filePath.lastIndexOf('/') + 1)
  link.click()
}

// TODO?
export default function initGlobals() {
  window.findOne = findOne
  window.findAll = findAll
  window.addClass = addClass
  window.removeClass = removeClass
  window.toggleClass = toggleClass
  window.fadeIn = fadeIn
  window.fadeOut = fadeOut
  window.createPlaceholder = createPlaceholder
  window.smoothScrollTo = smoothScrollTo
  window.getTotalLoadTime = getTotalLoadTime
  window.downloadFile = downloadFile
}
