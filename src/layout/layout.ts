// Shared page chrome, injected into every page's HTML by the site-layout Vite plugin.
import {
  accessibilityStatement,
  donateHref,
  mainNav,
  org,
  otherLinks,
  programLinks,
  social,
  type Link,
} from '../data/site'
import { icon } from './icons'

export function renderHead(): string {
  return `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta name="theme-color" content="#1e3a5f" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <script>document.documentElement.classList.add('js')</script>`
}

function isCurrent(href: string, path: string): boolean {
  return href === '/' ? path === '/' : path.startsWith(href)
}

const navLink =
  'flex min-h-11 items-center rounded-md px-4 py-2 text-lg font-medium text-navy-900 no-underline hover:underline ' +
  'aria-[current=page]:bg-navy-50 aria-[current=page]:font-bold aria-[current=page]:underline aria-[current=page]:shadow-[inset_4px_0_0_var(--color-navy-700)] ' +
  'lg:rounded-none lg:px-2 lg:py-3 lg:text-base lg:aria-[current=page]:bg-transparent lg:aria-[current=page]:shadow-[inset_0_-4px_0_var(--color-navy-700)]'

const topLink =
  'inline-flex min-h-11 items-center gap-2 text-white no-underline hover:underline'

export function renderHeader(path: string): string {
  const navItems = mainNav
    .map(
      ({ label, href }) =>
        `<li><a class="${navLink}" href="${href}"${isCurrent(href, path) ? ' aria-current="page"' : ''}>${label}</a></li>`,
    )
    .join('')

  return `
  <div id="top">
    <a class="skip-link btn btn-primary" href="#main">Skip to main content</a>
    <button type="button" class="skip-link btn btn-primary" data-a11y-open>Accessibility options</button>
  </div>
  <header>
    <div class="on-dark bg-navy-800 text-sm text-white">
      <div class="wrap flex items-center justify-between gap-x-6">
        <ul class="flex items-center gap-x-5" role="list">
          <li><a class="${topLink}" href="${org.phoneHref}">${icon('phone', 'size-4')}<span><span class="sr-only">Call </span>${org.phone}</span></a></li>
          <li class="max-sm:hidden"><a class="${topLink}" href="mailto:${org.email}">${icon('mail', 'size-4')}<span><span class="sr-only">Email </span>${org.email}</span></a></li>
        </ul>
        <ul class="flex items-center gap-x-5" role="list">
          <li><a class="${topLink}" href="/prayer-request/">${icon('prayer', 'size-4')}Prayer Request</a></li>
          <li class="max-sm:hidden"><a class="${topLink}" href="${social.facebook}">${icon('facebook', 'size-4')}Facebook</a></li>
          <li class="max-sm:hidden"><a class="${topLink}" href="${social.youtube}">${icon('youtube', 'size-4')}YouTube</a></li>
        </ul>
      </div>
    </div>

    <div class="bg-white">
      <div class="wrap flex items-center justify-between gap-3 py-3">
        <div class="flex items-center gap-4">
          <a href="/" class="block shrink-0 rounded-sm">
            <picture>
              <source srcset="/images/logo.webp" type="image/webp" />
              <img src="/images/logo.png" alt="${org.name}, home" width="560" height="258" class="h-auto w-24 sm:w-44 lg:w-48" />
            </picture>
          </a>
          <p class="hidden max-w-64 border-l-2 border-sage-500 pl-4 font-serif text-navy-700 italic lg:block">${org.tagline}</p>
        </div>
        <div class="flex items-center gap-2 sm:gap-3">
          <!-- Under 23rem (e.g. 320px phones) the labels become screen-reader-only so both buttons fit. -->
          <a class="btn btn-primary max-sm:px-4 max-[23rem]:px-3" href="${donateHref}">${icon('heart', 'size-5')}<span class="max-[23rem]:sr-only">Donate</span></a>
          <button type="button" class="group btn btn-outline hidden max-sm:px-4 max-[23rem]:px-3 in-[.js]:inline-flex lg:in-[.js]:hidden"
            aria-expanded="false" aria-controls="site-nav" data-nav-toggle>
            ${icon('menu', 'size-5 group-aria-expanded:hidden')}${icon('close', 'size-5 hidden group-aria-expanded:block')}<span class="max-[23rem]:sr-only">Menu</span>
          </button>
        </div>
      </div>
    </div>

    <nav id="site-nav" aria-label="Main" class="border-y border-cream-300 bg-white max-lg:in-[.js]:not-data-open:hidden">
      <ul class="wrap flex flex-col gap-1 py-3 lg:flex-row lg:justify-between lg:gap-2 lg:py-0" role="list">${navItems}</ul>
    </nav>
  </header>`
}

function footerList(links: Link[]): string {
  return `<ul class="mt-4 space-y-1" role="list">${links
    .map(({ label, href }) => `<li><a class="inline-flex min-h-11 items-center py-1 text-white" href="${href}">${label}</a></li>`)
    .join('')}</ul>`
}

const footerHeading = 'font-sans text-base font-bold tracking-[0.08em] text-sage-300 uppercase'

export function renderFooter(): string {
  return `
  <footer class="on-dark bg-navy-800 text-white">
    <div class="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
      <section aria-labelledby="footer-org">
        <h2 id="footer-org" class="${footerHeading}">${org.name}</h2>
        <address class="mt-4 space-y-1 not-italic">
          <p>${org.address}</p>
          <p><a class="text-white" href="${org.phoneHref}">${org.phone}</a></p>
          <p><a class="text-white" href="mailto:${org.email}">${org.email}</a></p>
          <p>${org.officeHours}</p>
        </address>
        <ul class="mt-4 flex flex-wrap gap-x-5" role="list">
          <li><a class="inline-flex min-h-11 items-center gap-2 text-white" href="${social.facebook}">${icon('facebook', 'size-4')}Facebook</a></li>
          <li><a class="inline-flex min-h-11 items-center gap-2 text-white" href="${social.youtube}">${icon('youtube', 'size-4')}YouTube</a></li>
        </ul>
      </section>
      <nav aria-labelledby="footer-programs">
        <h2 id="footer-programs" class="${footerHeading}">Programs</h2>
        ${footerList(programLinks)}
      </nav>
      <nav aria-labelledby="footer-other">
        <h2 id="footer-other" class="${footerHeading}">Other links</h2>
        ${footerList(otherLinks)}
      </nav>
      <section aria-labelledby="footer-a11y">
        <h2 id="footer-a11y" class="${footerHeading}">Accessibility</h2>
        <p class="mt-4">${accessibilityStatement} <a class="text-white" href="mailto:${org.email}?subject=Disabled%20Access">${org.email}</a> with “Disabled Access” in the subject line. We welcome your suggestions.</p>
        <button type="button" class="btn btn-on-dark mt-5" data-a11y-open>Accessibility options</button>
      </section>
    </div>
    <div class="wrap">
      <div class="flex flex-col gap-4 border-t border-navy-500 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>© ${new Date().getFullYear()} ${org.name} A non-profit, faith-based, interdenominational ministry.</p>
        <a class="inline-flex min-h-11 items-center gap-1 text-white" href="#top">Back to top${icon('arrowUp', 'size-4')}</a>
      </div>
    </div>
  </footer>`
}
