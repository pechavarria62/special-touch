import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// Single-page app: every URL serves index.html and src/router.ts renders the page.
export default defineConfig({
  appType: 'spa',
  plugins: [tailwindcss()],
  // .tsx pages render to HTML strings with our own runtime (src/jsx.ts), not React.
  oxc: {
    jsx: { runtime: 'classic', pragma: 'h', pragmaFrag: 'Fragment', development: false },
  },
})
