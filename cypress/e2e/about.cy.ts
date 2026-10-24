// About Us page.

describe('about page', () => {
  beforeEach(() => {
    cy.visit('/about')
  })

  it('has the breadcrumb, the hero and every section from the design', () => {
    cy.get('nav[aria-label="Breadcrumb"]').should('contain.text', 'Home').find('[aria-current="page"]').should('have.text', 'About Us')
    cy.get('h1').should('have.text', 'Opening the doors of the church since 1982')
    cy.get('main h2').then(($h2) => {
      expect($h2.toArray().map((el) => el.textContent?.trim())).to.deep.equal([
        'A God-given vision that keeps growing',
        'We live by CRAFT',
        'Trust built on intention and respect',
        'Faith-based and interdenominational',
      ])
    })
  })

  it('shows the 1982 / 2019 / Today timeline and the full quote', () => {
    cy.get('#story-h').closest('section').find('ol > li').should('have.length', 3).first().should('contain.text', '1982')
    cy.get('blockquote').should('contain.text', 'A God-given vision will always be greater than the person called to fulfill it.')
    cy.get('a[aria-label="Watch the video message from Rev. Debra Chivers"]').should('be.visible')
  })

  it('lists the five CRAFT values in order', () => {
    cy.get('#craft-h').closest('section').find('ol > li h3').then(($h3) => {
      expect($h3.toArray().map((el) => el.textContent?.[0]).join('')).to.equal('CRAFT')
    })
  })

  it('"Meet our leadership" jumps to the leadership section on the same page', () => {
    cy.contains('a', 'Meet our leadership').click()
    cy.location('pathname').should('eq', '/about')
    cy.location('hash').should('eq', '#leadership')
    cy.get('#leadership').should('be.visible').and('contain.text', 'Character')
  })

  it('every photo has a description', () => {
    cy.get('main img').should('have.length', 2).each(($img) => {
      expect($img.attr('alt'), $img.attr('src')).to.be.a('string').and.not.be.empty
    })
  })
})
