import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig } from 'cypress'

// Color guard for the source: white/red hex codes, keywords and utility names.
const forbidden = /#fff\b|#ffffff|\bwhite\b|\bred\b|#f00\b|\brose-|\bred-/i

function findForbiddenColors(dir: string): string[] {
  const hits: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true, recursive: true })) {
    if (!entry.isFile()) continue
    const file = join(entry.parentPath, entry.name)
    readFileSync(file, 'utf8')
      .split('\n')
      .forEach((line, i) => {
        // Photo descriptions ("A white church…") describe the picture, not the UI's colors.
        const code = line.replace(/\balt(?:="[^"]*"|: '[^']*')/g, '')
        if (forbidden.test(code)) hits.push(`${file}:${i + 1}: ${line.trim()}`)
      })
  }
  return hits
}

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on) {
      on('task', { findForbiddenColors })
      // The default 1280×720 headless window clips 1440px and full-page screenshots.
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'electron' && browser.isHeadless) {
          launchOptions.preferences.width = 1600
          launchOptions.preferences.height = 9000
        }
        return launchOptions
      })
    },
  },
})
