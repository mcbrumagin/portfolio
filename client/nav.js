micro.exports = function createNav() {
  const { nav, a, div, ul, li } = micro.html

  const baseUrl = '/portfolio'
  
  // Get current path to highlight active nav item
  const currentPath = window.location.pathname

  const createNavLink = (href, text) => {
    const isActive = currentPath === href || currentPath.startsWith(href + '/')
    return li(
      a({ 
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
    )
  }

  return nav({ id: 'nav', class: 'nav' },
    div({ class: 'nav-brand' }, 'Matt Brumagin'),
    ul({ class: 'nav-links' },
      createNavLink('/', 'Home'),
      createNavLink('/about', 'About'),
      createNavLink('/experience', 'Experience'),
      createNavLink('/projects', 'Projects'),
      createNavLink('/skills', 'Skills'),
      createNavLink('/education', 'Education'),
      createNavLink('/contact', 'Contact')
    )
  )
}


