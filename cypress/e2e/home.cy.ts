// Home page: sections, links and the newsletter form.

describe('home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('shows the six "What brings you here today?" cards, each a single link', () => {
    cy.get('#paths-h').should('have.text', 'What brings you here today?')
    cy.get('#paths-h').closest('section').find('ul > li > a').should('have.length', 6)
    cy.contains('a', 'I’m blind or have a visual impairment').should('have.attr', 'href', '/blind-services').click()
    cy.location('pathname').should('eq', '/blind-services')
  })

  it('lists the five camp locations, with Oklahoma marked Next', () => {
    cy.get('#camps-h').closest('section').find('ul > li').should('have.length', 5)
    cy.contains('#camps-h ~ * li, section li', 'Oklahoma').should('contain.text', 'Next').and('contain.text', 'Register by April 20')
  })

  it('every photo has a description', () => {
    cy.get('main img').each(($img) => {
      expect($img.attr('alt'), $img.attr('src')).to.be.a('string').and.not.be.empty
    })
  })
})

describe('newsletter form', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-newsletter]').as('form')
  })

  it('an empty submit shows the summary, inline errors and aria-invalid, and focuses the first field', () => {
    cy.get('@form').find('button[type="submit"]').click()
    cy.get('@form').find('[data-error-summary]').should('be.visible').and('contain.text', 'Error: There are 2 problems')
    cy.get('#nl-first').should('have.attr', 'aria-invalid', 'true').and('have.attr', 'aria-describedby', 'nl-first-error')
    cy.get('#nl-first-error').should('contain.text', 'Error: Enter your first name')
    cy.get('#nl-email-error').should('contain.text', 'Error: Enter your email')
    cy.get('#nl-last').should('not.have.attr', 'aria-invalid')
    cy.focused().should('have.id', 'nl-first')
  })

  it('a summary link focuses its field', () => {
    cy.get('@form').find('button[type="submit"]').click()
    cy.get('[data-error-summary] a').last().click()
    cy.focused().should('have.id', 'nl-email')
  })

  it('rejects a badly formed email', () => {
    cy.get('#nl-first').type('Ann')
    cy.get('#nl-email').type('ann-at-example')
    cy.get('@form').find('button[type="submit"]').click()
    cy.get('#nl-email-error').should('contain.text', 'Error: Enter an email address like name@example.com')
    cy.get('#nl-first').should('not.have.attr', 'aria-invalid')
  })

  it('valid input passes and thanks the person', () => {
    cy.get('#nl-first').type('Ann')
    cy.get('#nl-email').type('ann@example.com')
    cy.get('@form').find('button[type="submit"]').click()
    cy.get('[data-form-status]').should('contain.text', 'Thank you, Ann!')
    cy.get('[data-error-summary]').should('not.be.visible')
    cy.get('#nl-first').should('have.value', '')
  })

  it('"I am signing up as" chips are real radios; the selected one shows a check mark', () => {
    cy.get('input[name="signupAs"]:checked').should('have.value', 'An individual')
    cy.contains('label.chip', 'A church').click()
    cy.get('input[name="signupAs"]:checked').should('have.value', 'A church')
    cy.contains('label.chip', 'A church').find('svg').should('be.visible')
    cy.contains('label.chip', 'An individual').find('svg').should('not.be.visible')
  })
})
