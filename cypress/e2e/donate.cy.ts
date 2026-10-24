// Donate page: gift form, live total and validation.

describe('donate form', () => {
  beforeEach(() => {
    cy.visit('/donate')
    cy.get('[data-gift-form]').as('form')
  })

  it('starts with a one-time $50 gift', () => {
    cy.get('input[name="frequency"]:checked').should('have.value', 'once')
    cy.get('input[name="amount"]:checked').should('have.value', '50')
    cy.get('[data-total-label]').should('have.text', 'Gift total')
    cy.get('[data-total]').should('have.text', '$50.00')
  })

  it('updates and announces the total for amount, frequency and fees', () => {
    cy.contains('label', '$100').click()
    cy.get('[data-total]').should('have.text', '$100.00')
    cy.contains('label', 'Monthly').click()
    cy.get('[data-total-label]').should('have.text', 'Monthly total')
    cy.get('[data-fee-amount]').should('have.text', '$3.20')
    cy.contains('label', 'cover card processing fees').click()
    cy.get('[data-total]').should('have.text', '$103.20')
    cy.get('[data-total-status]').should('have.attr', 'aria-live', 'polite').and('have.text', 'Monthly total: $103.20')
  })

  it('the selected amount shows a check mark, not only a color', () => {
    cy.contains('label', '$25').click()
    cy.contains('label', '$25').find('svg').should('be.visible')
    cy.contains('label', '$50').find('svg').should('not.be.visible')
  })

  it('"Other" reveals an amount field, focuses it, and enforces the $8 minimum', () => {
    cy.get('#gift-other').should('not.be.visible')
    cy.contains('label', 'Other').click()
    cy.focused().should('have.id', 'gift-other')
    cy.get('#gift-other').type('5')
    cy.get('[data-total]').should('have.text', '$5.00')
    cy.get('@form').find('button[type="submit"]').click()
    cy.get('[data-error-summary]').should('be.visible').and('contain.text', 'Error:')
    cy.get('#gift-other').should('have.attr', 'aria-invalid', 'true')
    cy.get('#gift-other-error').should('contain.text', 'Error: The minimum gift is $8')
    cy.get('#gift-other').clear().type('40')
    cy.get('@form').find('button[type="submit"]').click()
    cy.get('[data-error-summary]').should('not.be.visible')
  })

  it('"In honor or memory" reveals its fields, which are required only when shown', () => {
    cy.get('#gift-honoree').should('not.be.visible')
    cy.contains('label', 'Give in honor or memory').click()
    cy.get('#gift-honoree').should('be.visible')
    cy.get('@form').find('button[type="submit"]').click()
    cy.get('#gift-honoree-error').should('contain.text', 'Error: Enter the name of the person you are honoring')
    cy.contains('label', 'Give in honor or memory').click()
    cy.get('@form').find('button[type="submit"]').click()
    cy.get('[data-error-summary]').should('not.be.visible')
  })

  it('a valid gift explains how to give while online checkout is being connected', () => {
    cy.get('@form').find('button[type="submit"]').click()
    cy.get('[data-form-status]').should('contain.text', 'To give $50.00 today').and('contain.text', '715-258-2713')
  })
})
