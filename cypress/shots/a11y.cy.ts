// Accessibility panel screenshots for design review (compare with design/screens/20–22).
beforeEach(() => cy.clearLocalStorage())

it('panel on PC', () => {
  cy.viewport(1440, 900)
  cy.visit('/')
  cy.get('#st-a11y-launcher').click()
  cy.screenshot('a11y-panel-pc', { capture: 'viewport', overwrite: true })
})

it('panel on PC with settings on', () => {
  cy.viewport(1440, 900)
  cy.visit('/')
  cy.get('#st-a11y-launcher').click()
  cy.get('[data-setting="text"]').click().click()
  cy.get('[data-setting="font"]').click()
  cy.get('[data-setting="links"]').click()
  cy.get('[data-setting="focus"]').click()
  cy.get('#st-a11y-panel [data-setting="contrast"]').scrollIntoView()
  cy.screenshot('a11y-panel-active-pc', { capture: 'viewport', overwrite: true })
})

it('panel on phone', () => {
  cy.viewport(390, 844)
  cy.visit('/')
  cy.get('#st-a11y-launcher').click()
  cy.screenshot('a11y-panel-phone', { capture: 'viewport', overwrite: true })
})

it('high contrast dark on PC', () => {
  cy.viewport(1440, 900)
  cy.visit('/')
  cy.get('#st-a11y-launcher').click()
  cy.get('[data-setting="contrast"]').click()
  cy.get('[data-st-close]').click()
  cy.screenshot('a11y-contrast-dark-pc', { capture: 'viewport', overwrite: true })
})
