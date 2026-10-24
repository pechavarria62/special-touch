// Full-page screenshots for design review: npm run screenshots (output in cypress/screenshots/).
// The viewport is stretched to the page height instead of using capture: 'fullPage',
// which stitches scrolled frames and duplicates content on narrow viewports.
const pages: [string, string][] = [
  ['home', '/'],
  ['design-system', '/design-system/'],
]
const viewports: [string, number, number][] = [
  ['phone', 390, 844],
  ['tablet', 820, 1180],
  ['pc', 1440, 900],
]

function fullPageShot(name: string, width: number): void {
  cy.document().then((doc) => {
    cy.viewport(width, doc.documentElement.scrollHeight)
    cy.screenshot(name, { capture: 'viewport', overwrite: true })
  })
}

for (const [name, path] of pages) {
  for (const [size, width, height] of viewports) {
    it(`${name} on ${size}`, () => {
      cy.viewport(width, height)
      cy.visit(path)
      fullPageShot(`${name}-${size}`, width)
    })
  }
}

it('phone menu open', () => {
  cy.viewport(390, 844)
  cy.visit('/')
  cy.get('[data-nav-toggle]').click()
  cy.window().scrollTo(0, 0)
  cy.screenshot('phone-menu-open', { capture: 'viewport', overwrite: true })
})

it('header at 320px', () => {
  cy.viewport(320, 568)
  cy.visit('/')
  cy.screenshot('header-320', { capture: 'viewport', overwrite: true })
})
