const pages = ['/', '/design-system/']
const viewports: [string, number, number][] = [
  ['phone', 390, 844],
  ['tablet', 820, 1180],
  ['pc', 1440, 900],
]

describe('accessibility (axe)', () => {
  for (const page of pages) {
    for (const [name, width, height] of viewports) {
      it(`${page} has no violations on ${name}`, () => {
        cy.viewport(width, height)
        cy.visit(page)
        cy.checkA11y()
      })
    }
  }
})

describe('skip links', () => {
  it('are the first two focusable items', () => {
    cy.visit('/')
    cy.press(Cypress.Keyboard.Keys.TAB)
    cy.focused().should('have.text', 'Skip to main content').and('be.visible')
    cy.press(Cypress.Keyboard.Keys.TAB)
    cy.focused().should('have.text', 'Accessibility options').and('have.attr', 'data-a11y-open')
  })
})

describe('header on phone', () => {
  beforeEach(() => {
    cy.viewport(390, 844)
    cy.visit('/')
  })

  it('opens and closes the menu, and Esc returns focus', () => {
    cy.get('#site-nav').should('not.be.visible')
    cy.get('[data-nav-toggle]').should('have.attr', 'aria-expanded', 'false').click()
    cy.get('[data-nav-toggle]').should('have.attr', 'aria-expanded', 'true')
    cy.get('#site-nav').should('be.visible')
    cy.get('#site-nav a[aria-current="page"]').should('have.text', 'Home')
    cy.get('body').type('{esc}')
    cy.get('#site-nav').should('not.be.visible')
    cy.focused().should('have.attr', 'data-nav-toggle')
  })
})

describe('header on PC', () => {
  it('shows the full nav with no menu button', () => {
    cy.viewport(1440, 900)
    cy.visit('/')
    cy.get('[data-nav-toggle]').should('not.be.visible')
    cy.get('#site-nav').should('be.visible').find('a').should('have.length', 8)
    cy.get('#site-nav a[aria-current="page"]').should('have.text', 'Home')
  })
})

describe('no horizontal scroll', () => {
  for (const page of pages) {
    it(`${page} fits at 320px wide`, () => {
      cy.viewport(320, 700)
      cy.visit(page)
      cy.document().then((doc) => {
        expect(doc.documentElement.scrollWidth).to.be.at.most(320)
      })
    })
  }
})
