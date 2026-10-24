// Client-side router (History API). Replaces the content of <main> for same-site links,
// and handles Back/Forward, direct URLs, refresh and unknown URLs (the not-found page).
import { setCurrentNav } from './layout/header.js'
import { findRoute, normalizePath, notFound, type Route } from './routes.js'

export interface RouteChangeDetail {
  path: string
  route: Route
}

const siteName = 'Special Touch Ministry'

let cleanup: (() => void) | undefined
let currentPath = ''

function documentTitle(route: Route): string {
  return route.path === '/' ? `${siteName} | Opening the doors of the church to every body` : `${route.title} | ${siteName}`
}

function announce(message: string): void {
  const announcer = document.getElementById('route-announcer')
  if (!announcer) return
  // Clear first so the same message is announced again (e.g. Home → Home).
  announcer.textContent = ''
  window.setTimeout(() => {
    announcer.textContent = message
  }, 100)
}

function scrollToHashOrTop(hash: string): void {
  const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
  // A link to a closed accordion (e.g. /get-away#staff) opens it.
  if (target instanceof HTMLDetailsElement) target.open = true
  if (target) target.scrollIntoView()
  else window.scrollTo(0, 0)
}

function focusHeading(main: HTMLElement): void {
  const h1 = main.querySelector<HTMLElement>('h1')
  if (!h1) return main.focus({ preventScroll: true })
  h1.tabIndex = -1
  h1.focus({ preventScroll: true })
}

function render(main: HTMLElement, initial: boolean): void {
  const path = normalizePath(location.pathname)
  const route = findRoute(path)
  currentPath = path

  cleanup?.()
  cleanup = undefined
  main.innerHTML = String(route.page.render())
  cleanup = route.page.mount?.(main) ?? undefined

  document.title = documentTitle(route)
  setCurrentNav(path)
  scrollToHashOrTop(location.hash)

  // On first load the browser starts at the top of the page; don't steal focus or announce.
  if (!initial) {
    focusHeading(main)
    announce(route === notFound ? route.title : `${route.title} page`)
  }
  window.dispatchEvent(new CustomEvent<RouteChangeDetail>('route:change', { detail: { path, route } }))
}

/** Returns the URL to route to, or null when the browser should handle the click itself. */
function routableUrl(event: MouseEvent): URL | null {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null
  const link = (event.target as Element | null)?.closest?.('a[href]')
  if (!(link instanceof HTMLAnchorElement)) return null
  if ((link.target && link.target !== '_self') || link.hasAttribute('download') || link.dataset.external !== undefined) return null

  const url = new URL(link.href)
  if (url.origin !== location.origin) return null
  // Files (PDFs, images) are real downloads, not pages.
  if (/\.[a-z0-9]+$/i.test(url.pathname)) return null
  // Same-page anchors (#main, #top, #share) keep their normal jump-and-focus behavior.
  if (url.pathname === location.pathname && url.search === location.search && url.hash) return null
  return url
}

export function startRouter(main: HTMLElement): void {
  history.scrollRestoration = 'manual'

  document.addEventListener('click', (event) => {
    const url = routableUrl(event)
    if (!url) return
    event.preventDefault()
    history.pushState(null, '', url.pathname + url.search + url.hash)
    render(main, false)
  })

  // Same-page #anchor clicks are left to the browser; still open a targeted accordion.
  window.addEventListener('hashchange', () => {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)))
    if (target instanceof HTMLDetailsElement) target.open = true
  })

  window.addEventListener('popstate', () => {
    // Back/Forward between #anchors of the same page: just scroll, keep the page (and any form input).
    if (normalizePath(location.pathname) === currentPath) scrollToHashOrTop(location.hash)
    else render(main, false)
  })

  render(main, true)
}
