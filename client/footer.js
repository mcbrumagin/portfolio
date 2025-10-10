import { htmlTags } from './modules/micro-js-html/src/index.js'

const { footer, div, a, em, h3 } = htmlTags

export function createFooter() {
  return footer({ class: 'site-footer hidden' },
    div({ class: 'footer-content' },
      h3({ class: 'footer-heading' }, 'Get in touch'),
      div({ class: 'footer-contact' },
        div({ class: 'contact-links' },
          a({ href: 'mailto:mcbrumagin@gmail.com', class: 'contact-link' }, 'mcbrumagin@gmail.com'),
          a({ href: 'https://www.linkedin.com/in/matthew-brumagin-3868ab68/', target: '_blank', class: 'contact-link' }, 'LinkedIn'),
          a({ href: 'https://github.com/mcbrumagin', target: '_blank', class: 'contact-link' }, 'GitHub'),
          div({ class: 'location-info' }, em('Based in Tampa, FL'))
        )
      ),
      div({ class: 'load-time', /* style: 'display: none' */ })
    )
  ).onReady(() => removeClass('hidden', findOne('footer')))
}

export default createFooter
