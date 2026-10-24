// Shared layout and routing: nav, header, footer, skip link, axe and color guard on every page.

interface PageInfo {
  path: string
  nav?: string // label of the nav tab that is current on this page
  title: string // document.title starts with this
  h1: string
}

const menuPages: PageInfo[] = [
  { path: '/', nav: 'Home', title: 'Special Touch Ministry', h1: 'Opening the doors of the church to every body' },
  { path: '/about', nav: 'About Us', title: 'About Us', h1: 'Opening the doors of the church since 1982' },
  { path: '/get-away', nav: 'Get Away', title: 'Summer Get Away', h1: 'Five days of fun, faith and friendship' },
  { path: '/blind-services', nav: 'Blind Services', title: 'Blind Services', h1: 'Making the Cross accessible' },
  { path: '/chapters', nav: 'Chapters', title: 'Chapters', h1: 'You don’t have to do this alone' },
  {
    path: '/disability-friendly-church',
    nav: 'Disability Friendly Church',
    title: 'Disability Friendly Church',
    h1: 'The need for disability-friendly churches is off the charts',
  },
  { path: '/family-support', nav: 'Family Support', title: 'Family Support', h1: 'Hope and encouragement for families facing disability' },
  { path: '/contact', nav: 'Contact', title: 'Contact', h1: 'We’d love to hear from you' },
]
const otherPages: PageInfo[] = [
  { path: '/blind-services/order', nav: 'Blind Services', title: 'Order Blind Services resources', h1: 'Order Blind Services resources' },
  { path: '/donate', title: 'Donate', h1: 'Help make the Cross accessible to everyone' },
  { path: '/prayer-request', title: 'Prayer request', h1: 'Send us a prayer request' },
  { path: '/no-such-page', title: 'Page not found', h1: 'Page not found' },
]
const allPages = [...menuPages, ...otherPages]

const phone: [number, number] = [390, 844]
const pc: [number, number] = [1440, 900]

describe('navigation', () => {
  for (const page of menuPages) {
    it(`the "${page.nav}" tab opens ${page.path}`, () => {
      cy.viewport(...pc)
      cy.visit(page.path === '/' ? '/contact' : '/')
      cy.contains('#site-nav a', page.nav!).click()
      cy.location('pathname').should('eq', page.path)
      cy.get('main h1').should('have.length', 1).and('have.text', page.h1)
      cy.title().should('include', page.title)
      cy.get('#site-nav a[aria-current="page"]').should('have.length', 1).and('have.text', page.nav)
      cy.focused().should('match', 'h1')
      cy.get('#route-announcer').should('have.text', page.path === '/' ? 'Home page' : `${page.title} page`)
    })
  }

  it('Back and Forward work', () => {
    cy.viewport(...pc)
    cy.visit('/')
    cy.contains('#site-nav a', 'About Us').click()
    cy.contains('#site-nav a', 'Chapters').click()
    cy.go('back')
    cy.location('pathname').should('eq', '/about')
    cy.get('h1').should('have.text', 'Opening the doors of the church since 1982')
    cy.get('#site-nav a[aria-current="page"]').should('have.text', 'About Us')
    cy.go('forward')
    cy.location('pathname').should('eq', '/chapters')
    cy.get('h1').should('have.text', 'You don’t have to do this alone')
  })

  it('direct visits and reloads of /chapters work', () => {
    cy.visit('/chapters')
    cy.get('h1').should('have.text', 'You don’t have to do this alone')
    cy.reload()
    cy.get('h1').should('have.text', 'You don’t have to do this alone')
    cy.get('#site-nav a[aria-current="page"]').should('have.text', 'Chapters')
  })

  it('a trailing slash shows the same page', () => {
    cy.visit('/chapters/')
    cy.get('h1').should('have.text', 'You don’t have to do this alone')
  })

  it('unknown URLs show "Page not found"', () => {
    cy.visit('/no-such-page')
    cy.get('h1').should('have.text', 'Page not found')
    cy.title().should('include', 'Page not found')
    cy.get('#site-nav a[aria-current]').should('have.length', 0)
  })

  it('a link to another page’s #anchor opens that page', () => {
    cy.visit('/')
    cy.contains('footer a', 'Our leadership').click()
    cy.location('pathname').should('eq', '/about')
    cy.location('hash').should('eq', '#leadership')
  })

  it('closes the phone menu after a tab is clicked', () => {
    cy.viewport(...phone)
    cy.visit('/')
    cy.get('[data-nav-toggle]').click()
    cy.contains('#site-nav a', 'Chapters').click()
    cy.location('pathname').should('eq', '/chapters')
    cy.get('[data-nav-toggle]').should('have.attr', 'aria-expanded', 'false')
    cy.get('#site-nav').should('not.be.visible')
  })
})

describe('every page', () => {
  for (const page of allPages) {
    it(`${page.path} has one h1${page.nav ? ` and marks "${page.nav}" as current` : ''}`, () => {
      cy.visit(page.path)
      cy.get('h1').should('have.length', 1).and('have.text', page.h1)
      if (page.nav) cy.get('#site-nav a[aria-current="page"]').should('have.length', 1).and('have.text', page.nav)
    })
  }
})

describe('accessibility (axe)', () => {
  for (const page of allPages) {
    for (const [name, size] of [['phone', phone], ['pc', pc]] as const) {
      it(`${page.path} has no violations on ${name}`, () => {
        cy.viewport(...size)
        cy.visit(page.path)
        cy.get('h1')
        cy.checkA11y()
      })
    }
  }
})

describe('skip links', () => {
  it('are the first two focusable items, and the first moves focus to #main', () => {
    cy.visit('/about')
    cy.get('h1')
    cy.press(Cypress.Keyboard.Keys.TAB)
    cy.focused().should('have.text', 'Skip to main content').and('be.visible')
    cy.press(Cypress.Keyboard.Keys.TAB)
    cy.focused().should('have.text', 'Accessibility options').and('have.attr', 'data-a11y-open')
    cy.get('a.skip-link').focus().click()
    cy.focused().should('have.id', 'main')
    cy.location('pathname').should('eq', '/about')
  })
})

describe('header on phone', () => {
  beforeEach(() => {
    cy.viewport(...phone)
    cy.visit('/')
  })

  it('opens and closes the menu, and Esc returns focus', () => {
    cy.get('#site-nav').should('not.be.visible')
    cy.get('[data-nav-toggle]').should('have.attr', 'aria-expanded', 'false').click()
    cy.get('[data-nav-toggle]').should('have.attr', 'aria-expanded', 'true')
    cy.get('#site-nav').should('be.visible')
    cy.get('[data-nav-toggle]').click()
    cy.get('#site-nav').should('not.be.visible')
    cy.get('[data-nav-toggle]').click()
    cy.get('body').type('{esc}')
    cy.get('#site-nav').should('not.be.visible')
    cy.get('[data-nav-toggle]').should('have.attr', 'aria-expanded', 'false')
    cy.focused().should('have.attr', 'data-nav-toggle')
  })

  it('keeps only the phone number and the Accessibility pill in the top bar', () => {
    cy.contains('header a', '715-258-2713').should('be.visible')
    cy.contains('header button', 'Accessibility').should('be.visible')
    cy.contains('header a', 'Prayer Request').should('not.be.visible')
  })

  it('has an icon-only Search button with a label', () => {
    cy.get('[data-search-toggle]').should('have.attr', 'aria-label', 'Search').and('be.visible')
  })
})

describe('header on PC', () => {
  beforeEach(() => {
    cy.viewport(...pc)
    cy.visit('/')
  })

  it('shows the full nav with no menu button', () => {
    cy.get('[data-nav-toggle]').should('not.be.visible')
    cy.get('#site-nav').should('be.visible').find('a').should('have.length', 8)
  })

  it('opens the search panel and focuses the field; Esc closes it', () => {
    cy.get('#site-search').should('not.be.visible')
    cy.get('[data-search-toggle]').click().should('have.attr', 'aria-expanded', 'true')
    cy.focused().should('have.attr', 'name', 'q')
    cy.get('body').type('{esc}')
    cy.get('#site-search').should('not.be.visible')
    cy.focused().should('have.attr', 'data-search-toggle')
  })
})

describe('no horizontal scroll', () => {
  for (const page of allPages) {
    it(`${page.path} fits at 320px wide`, () => {
      cy.viewport(320, 700)
      cy.visit(page.path)
      cy.get('h1')
      cy.document().then((doc) => {
        expect(doc.documentElement.scrollWidth).to.be.at.most(320)
      })
    })
  }
})

// ---------- Color guard: no pure white and no red, in the rendered page or in the source ----------

function parseRgb(value: string): [number, number, number, number] | null {
  const m = /rgba?\(([\d.]+),?\s*([\d.]+),?\s*([\d.]+)(?:,?\s*\/?\s*([\d.]+))?\)/.exec(value)
  return m ? [Number(m[1]), Number(m[2]), Number(m[3]), m[4] === undefined ? 1 : Number(m[4])] : null
}

/** True for any clearly red hue (pinks and oranges included), ignoring near-grays. */
function isRed([r, g, b]: [number, number, number, number]): boolean {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 510
  const s = max === min ? 0 : (max - min) / 255 / (1 - Math.abs(2 * l - 1))
  if (s < 0.3 || l < 0.12 || l > 0.92) return false
  let h = 0
  if (max === r) h = (60 * ((g - b) / (max - min)) + 360) % 360
  else if (max === g) h = 60 * ((b - r) / (max - min)) + 120
  else h = 60 * ((r - g) / (max - min)) + 240
  return h >= 330 || h <= 20
}

const colorProps = ['color', 'background-color', 'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color', 'outline-color', 'fill', 'stroke'] as const

describe('color guard (rendered pages)', () => {
  for (const page of allPages) {
    it(`${page.path} uses no pure white and no red`, () => {
      cy.viewport(...pc)
      cy.visit(page.path)
      cy.get('h1')
      cy.document().then((doc) => {
        const problems: string[] = []
        for (const el of Array.from(doc.querySelectorAll('body, body *'))) {
          const style = getComputedStyle(el)
          for (const prop of colorProps) {
            const rgb = parseRgb(style.getPropertyValue(prop))
            if (!rgb || rgb[3] === 0) continue
            const white = rgb[0] === 255 && rgb[1] === 255 && rgb[2] === 255
            if (white || isRed(rgb)) problems.push(`${el.tagName.toLowerCase()}.${el.className} ${prop}: ${style.getPropertyValue(prop)}`)
          }
        }
        expect(problems, problems.slice(0, 20).join('\n')).to.have.length(0)
      })
    })
  }
})

describe('color guard (source)', () => {
  it('src/ never mentions white or red colors', () => {
    cy.task<string[]>('findForbiddenColors', 'src').then((hits) => {
      expect(hits, hits.join('\n')).to.have.length(0)
    })
  })
})
