// Get Away, Blind Services, Chapters, Disability Friendly Church, Family Support and Contact.

describe('every photo has a description', () => {
  for (const path of ['/get-away', '/blind-services', '/chapters', '/disability-friendly-church', '/family-support']) {
    it(path, () => {
      cy.visit(path)
      cy.get('h1')
      cy.get('main img').each(($img) => {
        expect($img.attr('alt'), $img.attr('src')).to.be.a('string').and.not.be.empty
      })
    })
  }
})

describe('Get Away', () => {
  beforeEach(() => cy.visit('/get-away'))

  it('lists the five locations with dates, fees and a register button', () => {
    cy.get('#locations article').should('have.length', 5)
    cy.get('#camp-OK')
      .closest('article')
      .should('contain.text', 'May')
      .and('contain.text', '18–22')
      .and('contain.text', 'No care required $500')
      .and('contain.text', 'Requiring care $600')
      .and('contain.text', 'CIT $400')
      .and('contain.text', 'Register by April 20')
      .find('a')
      .should('contain.text', 'Register for Oklahoma')
  })

  it('shows the "Please read before you register" note with an icon and text', () => {
    cy.get('[role="note"]').should('contain.text', 'Please read before you register.').find('svg').should('exist')
  })

  it('has accordions: Guests open, others closed; the Staff & volunteers pill opens its section', () => {
    cy.contains('details summary', 'Guests').parent().should('have.attr', 'open')
    cy.get('#staff').should('not.have.attr', 'open')
    cy.contains('a', 'Staff & volunteers').click()
    cy.get('#staff').should('have.attr', 'open')
    cy.contains('#staff summary', 'Volunteer staff').click()
    cy.get('#staff').should('not.have.attr', 'open')
  })

  it('"Volunteer at camp" in the footer opens the volunteer section from another page', () => {
    cy.visit('/')
    cy.contains('footer a', 'Volunteer at camp').click()
    cy.location('pathname').should('eq', '/get-away')
    cy.get('#staff').should('have.attr', 'open')
  })
})

describe('Blind Services', () => {
  beforeEach(() => cy.visit('/blind-services'))

  it('shows how to talk to a person', () => {
    cy.get('#talk-h').closest('section').should('contain.text', 'Nettamara').find('a[href="mailto:blind@specialtouch.org"]').should('exist')
  })

  it('lists the resources with format badges and a cost line', () => {
    cy.get('#resources-h').closest('section').find('article').should('have.length', 4)
    cy.get('#alive-in-5').should('contain.text', 'Braille').and('contain.text', 'Large print').and('contain.text', 'No cost if you qualify for NLS')
    cy.get('#alive-in-5 a').should('contain.text', 'Learn more about Alive in 5')
  })

  it('offers "Listen to this page", or says why it can’t', () => {
    cy.window().then((win) => {
      if ('speechSynthesis' in win) cy.get('[data-listen]').should('be.visible').and('contain.text', 'Listen to this page')
      else cy.get('[data-listen-unsupported]').should('be.visible')
    })
  })

  it('"Order resources" opens the order page', () => {
    cy.contains('a', 'Order resources').click()
    cy.location('pathname').should('eq', '/blind-services/order')
  })
})

describe('Chapters filter', () => {
  beforeEach(() => cy.visit('/chapters'))

  it('shows every chapter at first, with "All" pressed', () => {
    cy.get('[data-filter="All"]').should('have.attr', 'aria-pressed', 'true')
    cy.get('[data-region]:visible').should('have.length', 4)
    cy.get('main article:visible').should('have.length', 6)
  })

  it('shows only the chosen state, updates aria-pressed and announces the result', () => {
    cy.get('[data-filter="Florida"]').click().should('have.attr', 'aria-pressed', 'true')
    cy.get('[data-filter="All"]').should('have.attr', 'aria-pressed', 'false')
    cy.get('[data-region]:visible').should('have.length', 1).and('have.attr', 'data-region', 'Florida')
    cy.get('main article:visible').should('have.length', 2)
    cy.get('[data-filter-status]').should('have.text', 'Showing 2 chapters in Florida.')
    cy.get('[data-filter="All"]').click()
    cy.get('main article:visible').should('have.length', 6)
  })

  it('each chapter has directions, phone, email, register and Facebook', () => {
    cy.get('#first-coast')
      .should('contain.text', 'Upcoming:')
      .within(() => {
        cy.get('a[href^="https://www.google.com/maps"]').should('exist')
        cy.get('a[href="tel:+19043035290"]').should('exist')
        cy.get('a[href="mailto:stfirstcoast@gmail.com"]').should('exist')
        cy.contains('a', 'Register to attend')
        cy.contains('a', 'Facebook')
      })
  })
})

describe('Disability Friendly Church', () => {
  beforeEach(() => cy.visit('/disability-friendly-church'))

  it('"Take the free DFC survey" jumps to the survey band', () => {
    cy.contains('a', 'Take the free DFC survey').click()
    cy.location('hash').should('eq', '#survey')
    cy.get('#survey-h').should('be.visible')
  })

  it('shows three numbered ways to help and the local-church note', () => {
    cy.get('#help ol > li').should('have.length', 3)
    cy.get('#partnership').should('contain.text', 'From $25 a month')
    cy.get('[role="note"]').should('contain.text', 'All services are run and insured by the local church.')
  })
})

describe('Family Support questionnaire', () => {
  beforeEach(() => {
    cy.visit('/family-support')
    cy.get('[data-share-form]').as('form')
  })

  it('starts on step 1 of 4 with the current step marked', () => {
    cy.get('[data-step-count]').should('have.text', 'Step 1 of 4')
    cy.get('[data-progress-step="1"]').should('have.attr', 'aria-current', 'step')
    cy.get('[data-back]').should('not.be.visible')
  })

  it('validates each step before Next, and Back keeps the answers', () => {
    cy.get('[data-next]').click()
    cy.get('[data-error-summary]').should('be.visible').and('contain.text', 'Error:')
    cy.get('#fs-first').should('have.attr', 'aria-invalid', 'true')
    cy.focused().should('have.id', 'fs-first')

    cy.get('#fs-first').type('Ann')
    cy.get('#fs-email').type('ann@example.com')
    cy.get('[data-next]').click()
    cy.get('[data-step-count]').should('have.text', 'Step 2 of 4')
    cy.get('[data-progress-step="1"]').should('have.attr', 'data-state', 'done')
    cy.get('[data-progress-step="2"]').should('have.attr', 'aria-current', 'step')
    cy.focused().should('have.id', 'step-2-h')

    cy.get('[data-back]').click()
    cy.get('#fs-first').should('have.value', 'Ann')
    cy.get('[data-next]').click()

    cy.get('#fs-relationship').select('Parent')
    cy.get('#fs-age').select('5–12')
    cy.get('[data-next]').click()
    cy.get('[data-step-count]').should('have.text', 'Step 3 of 4')

    // The frequency question is required: one error for the whole radio group.
    cy.contains('label', 'Respite care').click()
    cy.get('#fs-helps-0').should('be.checked')
    cy.get('[data-next]').click()
    cy.get('#churchFrequency-error').should('contain.text', 'Error: Choose how often your family joins church activities')
    cy.get('input[name="churchFrequency"]').first().should('have.attr', 'aria-invalid', 'true')
    cy.contains('label', 'Once a month').click()
    cy.get('[data-next]').click()

    cy.get('[data-step-count]').should('have.text', 'Step 4 of 4')
    cy.get('[data-submit]').should('be.visible').click()
    cy.get('[data-form-status]').should('contain.text', 'Thank you for sharing your story.')
    cy.get('[data-step-count]').should('have.text', 'Step 1 of 4')
  })
})

describe('Contact form', () => {
  beforeEach(() => cy.visit('/contact'))

  it('an empty submit shows the summary, inline errors, aria-invalid and one error for the topic group', () => {
    cy.get('[data-contact-form] button[type="submit"]').click()
    cy.get('[data-error-summary]').should('be.visible').and('contain.text', 'Error: There are 5 problems')
    cy.get('#ct-first').should('have.attr', 'aria-invalid', 'true').and('have.attr', 'aria-describedby', 'ct-first-error')
    cy.get('#ct-phone').should('not.have.attr', 'aria-invalid')
    cy.get('#topic-error').should('have.length', 1).and('contain.text', 'Error: Choose what your question is about')
    cy.get('#ct-message-error').should('contain.text', 'Error: Tell us how we can help')
    cy.focused().should('have.id', 'ct-first')
  })

  it('shows the email error pattern from the design', () => {
    cy.get('#ct-email').type('maria@')
    cy.get('[data-contact-form] button[type="submit"]').click()
    cy.get('#ct-email-error').should('contain.text', 'Error: Enter an email address like name@example.com')
  })

  it('valid input passes and thanks the person', () => {
    cy.get('#ct-first').type('Maria')
    cy.get('#ct-last').type('Lopez')
    cy.get('#ct-email').type('maria@example.com')
    cy.contains('label', 'Blind Services').click()
    cy.get('#ct-message').type('Do you have large-print Bibles?')
    cy.get('[data-contact-form] button[type="submit"]').click()
    cy.get('[data-form-status]').should('contain.text', 'Thank you, Maria!')
    cy.get('[data-error-summary]').should('not.be.visible')
  })
})
