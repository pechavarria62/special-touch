// The accessibility tool: launcher, panel, settings, profiles, saving and page effects.

const rootFontSize = (): Cypress.Chainable<number> => cy.document().then((doc) => parseFloat(getComputedStyle(doc.documentElement).fontSize))

describe('accessibility tool', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.viewport(1440, 900)
    cy.visit('/')
    cy.get('#st-a11y-launcher').as('launcher')
  })

  it('opens from the launcher, focuses the heading, and Esc closes it and returns focus', () => {
    cy.get('#st-a11y-panel').should('not.be.visible')
    cy.get('@launcher').should('have.attr', 'aria-expanded', 'false').click()
    cy.get('#st-a11y-panel').should('be.visible').and('have.attr', 'role', 'dialog').and('have.attr', 'aria-modal', 'false')
    cy.get('@launcher').should('have.attr', 'aria-expanded', 'true')
    cy.focused().should('have.id', 'st-a11y-title')
    cy.get('body').type('{esc}')
    cy.get('#st-a11y-panel').should('not.be.visible')
    cy.focused().should('have.id', 'st-a11y-launcher')
  })

  it('opens from the top-bar pill and the footer button', () => {
    cy.get('#site-header button[data-a11y-open]').click()
    cy.get('#st-a11y-panel').should('be.visible')
    cy.get('[data-st-close]').click()
    cy.get('#st-a11y-panel').should('not.be.visible')
    cy.focused().should('match', '#site-header button[data-a11y-open]')
    cy.get('#site-footer button[data-a11y-open]').click()
    cy.get('#st-a11y-panel').should('be.visible')
  })

  it('Bigger text cycles through its levels, sets data-st-text and scales the root font', () => {
    cy.get('@launcher').click()
    rootFontSize().should('eq', 16)
    cy.get('[data-setting="text"]').click().should('have.attr', 'aria-pressed', 'true').and('contain.text', '125% · 1 of 3')
    cy.get('html').should('have.attr', 'data-st-text', '1')
    rootFontSize().should('eq', 20)
    cy.get('[data-setting="text"]').click().should('contain.text', '150% · 2 of 3')
    rootFontSize().should('eq', 24)
    cy.get('[data-st-status]').should('have.text', 'Bigger text: 150% · 2 of 3')
    cy.get('[data-setting="text"]').click().click().should('have.attr', 'aria-pressed', 'false').and('contain.text', 'Off')
    cy.get('html').should('not.have.attr', 'data-st-text')
  })

  it('settings survive a reload and apply before the panel opens', () => {
    cy.get('@launcher').click()
    cy.get('[data-setting="text"]').click()
    cy.get('[data-setting="links"]').click()
    cy.reload()
    cy.get('html').should('have.attr', 'data-st-text', '1').and('have.attr', 'data-st-links', '1')
    cy.get('#st-a11y-launcher').click()
    cy.get('[data-setting="links"]').should('have.attr', 'aria-pressed', 'true')
  })

  it('Reset turns everything off', () => {
    cy.get('@launcher').click()
    cy.get('[data-setting="text"]').click()
    cy.get('[data-profile="dyslexia"]').click()
    cy.get('[data-st-reset]').click()
    cy.get('[data-setting][aria-pressed="true"], [data-profile][aria-pressed="true"]').should('not.exist')
    cy.document().then((doc) => {
      expect(Array.from(doc.documentElement.attributes).filter((a) => a.name.startsWith('data-st-'))).to.have.length(0)
    })
    cy.window().then((win) => expect(JSON.parse(win.localStorage.getItem('st-a11y:v1')!).settings).to.deep.equal({}))
  })

  it('a quick profile turns on its settings and off again', () => {
    cy.get('@launcher').click()
    cy.get('[data-profile="low-vision"]').click().should('have.attr', 'aria-pressed', 'true')
    cy.get('html').should('have.attr', 'data-st-text', '2').and('have.attr', 'data-st-focus', '1').and('have.attr', 'data-st-cursor', '1')
    cy.get('[data-setting="links"]').should('have.attr', 'aria-pressed', 'true')
    cy.get('[data-profile="low-vision"]').click().should('have.attr', 'aria-pressed', 'false')
    cy.get('html').should('not.have.attr', 'data-st-text')
  })

  it('turning one profile off keeps settings another active profile needs', () => {
    cy.get('@launcher').click()
    cy.get('[data-profile="low-vision"]').click()
    cy.get('[data-profile="dyslexia"]').click()
    cy.get('[data-profile="low-vision"]').click()
    cy.get('html').should('have.attr', 'data-st-line-height', '1').and('not.have.attr', 'data-st-text')
    cy.get('[data-profile="dyslexia"]').should('have.attr', 'aria-pressed', 'true')
  })

  it('high contrast dark repaints the page in navy and cream', () => {
    cy.get('@launcher').click()
    cy.get('[data-setting="contrast"]').click().should('contain.text', 'Dark')
    cy.get('main').should('have.css', 'background-color', 'rgb(15, 31, 51)').and('have.css', 'color', 'rgb(245, 240, 230)')
    cy.get('#site-header [data-logo="cream"]').should('be.visible')
    cy.get('#site-header [data-logo="navy"]').should('not.be.visible')
    cy.get('[data-setting="contrast"]').click().should('contain.text', 'Light')
    cy.get('main').should('have.css', 'background-color', 'rgb(245, 240, 230)')
  })

  it('reading mask and guide appear when turned on', () => {
    cy.get('@launcher').click()
    cy.get('[data-setting="mask"]').click()
    cy.get('[data-setting="guide"]').click()
    cy.get('body > div[data-st-keep][aria-hidden="true"]:not([hidden])').should('have.length', 3)
  })

  it('Hide hides the launcher for the session; the top-bar pill still opens the panel', () => {
    cy.get('@launcher').click()
    cy.get('[data-st-hide]').click()
    cy.get('#st-a11y-launcher').should('not.be.visible')
    cy.get('#st-a11y-panel').should('not.be.visible')
    cy.reload()
    cy.get('#st-a11y-launcher').should('not.be.visible')
    cy.get('#site-header button[data-a11y-open]').click()
    cy.get('#st-a11y-panel').should('be.visible')
  })

  it('Page structure lists headings and jumps to one', () => {
    cy.get('@launcher').click()
    cy.get('[data-st-structure]').click().should('have.attr', 'aria-expanded', 'true')
    cy.contains('[data-st-jump]', 'What brings you here today?').click()
    cy.get('#st-a11y-panel').should('not.be.visible')
    cy.focused().should('have.id', 'paths-h')
  })

  it('has no axe violations with the panel open', () => {
    cy.get('@launcher').click()
    cy.checkA11y()
  })
})

describe('accessibility tool on a phone', () => {
  it('opens as a full-width bottom sheet with icon-only header buttons', () => {
    cy.clearLocalStorage()
    cy.viewport(390, 844)
    cy.visit('/')
    cy.get('#st-a11y-launcher').click()
    cy.get('#st-a11y-panel').then(($panel) => {
      const rect = $panel[0]!.getBoundingClientRect()
      expect(rect.width).to.equal($panel[0]!.ownerDocument.documentElement.clientWidth)
      expect(rect.bottom).to.be.closeTo(844, 1)
      expect(rect.height).to.be.at.most(844 * 0.86 + 1)
    })
    // Icon only on phones: the visible word is clipped to 1px, but the accessible name stays.
    cy.get('[data-st-reset]').should('have.text', 'Reset all settings')
    cy.get('[data-st-reset] .max-sm\\:sr-only').invoke('outerWidth').should('be.at.most', 1)
    cy.checkA11y()
  })
})
