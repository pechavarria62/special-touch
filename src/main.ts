import '@fontsource/atkinson-hyperlegible/400.css'
import '@fontsource/atkinson-hyperlegible/700.css'
import '@fontsource/fraunces/500.css'
import '@fontsource/fraunces/600.css'
import '@fontsource/fraunces/600-italic.css'
import './style.css'
import { initA11y } from './a11y/index.js'
import { renderFooter } from './layout/footer.js'
import { renderHeader } from './layout/header.js'
import { initNav, initSearch } from './nav.js'
import { startRouter } from './router.js'

const header = document.getElementById('site-header')
const footer = document.getElementById('site-footer')
const main = document.getElementById('main')

if (header) header.innerHTML = renderHeader()
if (footer) footer.innerHTML = renderFooter()

initNav()
initSearch()
initA11y()
if (main) startRouter(main)
