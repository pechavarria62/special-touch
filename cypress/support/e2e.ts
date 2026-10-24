// Global setup and custom commands for e2e tests go here.
import type { AxeResults, RunOptions } from 'axe-core'

declare global {
  namespace Cypress {
    interface Chainable {
      /** Runs axe-core against the current page and fails on any WCAG 2.2 A/AA violation. */
      checkA11y(): Chainable<void>
    }
  }
}

interface AxeWindow extends Window {
  axe?: { run(context: Document, options: RunOptions): Promise<AxeResults> }
}

Cypress.Commands.add('checkA11y', () => {
  cy.readFile('node_modules/axe-core/axe.min.js').then((source: string) => {
    cy.window().then((win) => {
      // The dev server injects CSS after load; stop transitions so axe never measures mid-fade.
      const style = win.document.createElement('style')
      style.textContent = '*,::before,::after{transition:none!important}'
      win.document.head.append(style)
      const axeWin = win as unknown as AxeWindow
      if (!axeWin.axe) (win as unknown as { eval(code: string): void }).eval(source)
      return axeWin.axe!.run(win.document, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
      })
    }).then((results: AxeResults) => {
      const summary = results.violations.map(
        (v) => `${v.id} (${v.impact}): ${v.help}\n  ${v.nodes.map((n) => n.target.join(' ')).join('\n  ')}`,
      )
      expect(results.violations, summary.join('\n\n')).to.have.length(0)
    })
  })
})

export {}
