import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { renderFooter, renderHead, renderHeader } from './src/layout/layout'

// Every page is a folder with an index.html (clean URLs: /about/ → about/index.html).
const pages = ['index.html', 'design-system/index.html']

// Replaces <!--@head-->, <!--@header--> and <!--@footer--> with the shared layout.
function siteLayout(): Plugin {
  return {
    name: 'site-layout',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const path = ctx.path.replace(/index\.html$/, '')
        return html
          .replace('<!--@head-->', renderHead())
          .replace('<!--@header-->', renderHeader(path))
          .replace('<!--@footer-->', renderFooter())
      },
    },
  }
}

export default defineConfig({
  plugins: [tailwindcss(), siteLayout()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((page) => [page, resolve(import.meta.dirname, page)])),
    },
  },
})
