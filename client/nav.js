import { htmlTags } from './modules/micro-js-html/src/index.js'

export default function createNav() {
  const { nav, a, div, ul, li } = htmlTags

  const baseUrl = '/portfolio'
  
  // Get current path to highlight active nav item
  const currentPath = window.location.pathname

  const createNavLink = (href, text) => {
    const isActive = currentPath === href || currentPath.startsWith(href + '/')
    return a({ 
      class: `link ${isActive ? 'active' : ''}`, 
      href: baseUrl + href,
      onclick: (e) => {
        // Smooth scroll for same-page navigation
        if (href.startsWith('#')) {
          e.preventDefault()
          const targetId = href.substring(1)
          const targetElement = document.getElementById(targetId)
          if (targetElement) {
            smoothScrollTo(targetElement)
          }
        }
      }
    }, text)
  }

  return nav({ id: 'nav', class: 'nav' },
    div({ class: 'nav-brand' }, createNavLink('/', 'M. Brumagin')),
    ul({ class: 'nav-links' },
      li(createNavLink('/', 'Home')),
      li(createNavLink('/resume', 'Resume')),
      li(createNavLink('/projects', 'Projects')),
      // li(createNavLink('/contact', 'Contact'))
    )
  )
}
