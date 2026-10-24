// Every page of the site: its URL, document title and page module (src/pages/*.tsx).
import type { Html } from './jsx.js'
import * as about from './pages/about.js'
import * as blindServicesOrder from './pages/blind-services-order.js'
import * as blindServices from './pages/blind-services.js'
import * as chapters from './pages/chapters.js'
import * as contact from './pages/contact.js'
import * as dfc from './pages/disability-friendly-church.js'
import * as donate from './pages/donate.js'
import * as familySupport from './pages/family-support.js'
import * as getAway from './pages/get-away.js'
import * as home from './pages/home.js'
import * as notFoundPage from './pages/not-found.js'
import * as prayerRequest from './pages/prayer-request.js'

/** What every file in src/pages/ exports. */
export interface PageModule {
  /** Returns the page's HTML (inserted into <main>). */
  render(): Html
  /** Optional behavior. Runs after the page is inserted; returns a cleanup function. */
  mount?(root: HTMLElement): (() => void) | void
}

export interface Route {
  path: string
  /** Page name: used in the document title and the "<title> page" announcement. */
  title: string
  page: PageModule
}

export const routes: Route[] = [
  { path: '/', title: 'Home', page: home },
  { path: '/about', title: 'About Us', page: about },
  { path: '/get-away', title: 'Summer Get Away', page: getAway },
  { path: '/blind-services', title: 'Blind Services', page: blindServices },
  { path: '/blind-services/order', title: 'Order Blind Services resources', page: blindServicesOrder },
  { path: '/chapters', title: 'Chapters', page: chapters },
  { path: '/disability-friendly-church', title: 'Disability Friendly Church', page: dfc },
  { path: '/family-support', title: 'Family Support', page: familySupport },
  { path: '/contact', title: 'Contact', page: contact },
  { path: '/donate', title: 'Donate', page: donate },
  { path: '/prayer-request', title: 'Prayer request', page: prayerRequest },
]

export const notFound: Route = { path: '', title: 'Page not found', page: notFoundPage }

/** "/about/" and "/about" are the same page. */
export function normalizePath(path: string): string {
  return path.length > 1 ? path.replace(/\/+$/, '') : path
}

export function findRoute(path: string): Route {
  const normalized = normalizePath(path)
  return routes.find((route) => route.path === normalized) ?? notFound
}
