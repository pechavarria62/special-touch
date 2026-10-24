// Site header: top bar, logo row (Search, Donate, Menu) and the main nav.
import { icon } from '../icons.js'

export interface NavLink {
  label: string
  href: string
}

export const mainNav: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Get Away', href: '/get-away' },
  { label: 'Blind Services', href: '/blind-services' },
  { label: 'Chapters', href: '/chapters' },
  { label: 'Disability Friendly Church', href: '/disability-friendly-church' },
  { label: 'Family Support', href: '/family-support' },
  { label: 'Contact', href: '/contact' },
]

// TODO(confirm): Facebook and YouTube URLs
export const social = {
  facebook: 'https://www.facebook.com/SpecialTouchMinistry',
  youtube: 'https://www.youtube.com/@specialtouchministry',
}

const topLink = 'inline-flex min-h-11 items-center gap-2 text-cream no-underline hover:underline'

export function renderHeader(): string {
  const navItems = mainNav
    .map(({ label, href }) => `<li><a data-nav href="${href}" class="nav-link">${label}</a></li>`)
    .join('')

  return `
  <!-- Top bar. Under 1024px only the phone number and the Accessibility pill stay. -->
  <div class="on-dark bg-navy-900 text-sm text-cream">
    <div class="wrap flex min-h-12 items-center justify-between gap-x-6">
      <ul class="flex items-center gap-x-6" role="list">
        <li><a class="${topLink}" href="tel:+17152582713">${icon('phone', 'size-4')}<span class="whitespace-nowrap"><span class="sr-only">Call </span>715-258-2713</span></a></li>
        <li class="max-lg:hidden"><a class="${topLink}" href="mailto:ministry@specialtouch.org">${icon('mail', 'size-4')}<span><span class="sr-only">Email </span>ministry@specialtouch.org</span></a></li>
      </ul>
      <ul class="flex items-center gap-x-6" role="list">
        <li class="max-lg:hidden"><a class="${topLink}" href="/prayer-request">${icon('prayer', 'size-4')}Prayer Request</a></li>
        <li class="max-lg:hidden"><a class="${topLink}" href="${social.facebook}">${icon('facebook', 'size-4')}Facebook</a></li>
        <li class="max-lg:hidden"><a class="${topLink}" href="${social.youtube}">${icon('youtube', 'size-4')}YouTube</a></li>
        <li>
          <button type="button" data-a11y-open
            class="my-1 inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full bg-cream py-1 pr-4 pl-1 font-bold text-navy-800 hover:bg-cream-200">
            <span class="grid size-8 place-items-center rounded-full bg-navy-700 text-cream">${icon('accessibility', 'size-5')}</span>Accessibility
          </button>
        </li>
      </ul>
    </div>
  </div>

  <div class="border-b border-cream-300 bg-cream">
    <div class="wrap flex items-center justify-between gap-3 py-3 lg:py-4">
      <div class="flex min-w-0 items-center gap-5">
        <a href="/" class="block min-w-12 rounded-sm">
          <picture data-logo="navy">
            <source srcset="/images/logo-navy.webp" type="image/webp" />
            <img src="/images/logo-navy.png" alt="Special Touch Ministry, Inc., home" width="640" height="297" class="h-auto w-20 max-w-full sm:w-36 lg:w-44" />
          </picture>
          <!-- Shown instead of the navy logo in the dark high-contrast mode (src/style.css). -->
          <picture data-logo="cream" class="hidden">
            <source srcset="/images/logo-cream.webp" type="image/webp" />
            <img src="/images/logo-cream.png" alt="Special Touch Ministry, Inc., home" width="640" height="297" class="h-auto w-20 max-w-full sm:w-36 lg:w-44" loading="lazy" />
          </picture>
        </a>
        <p class="hidden max-w-64 border-l-2 border-sage-500 pl-5 font-display leading-snug text-navy-700 italic lg:block">
          Serving the concerns of people with disabilities since 1982
        </p>
      </div>
      <div class="flex shrink-0 items-center gap-1.5 sm:gap-3">
        <!-- Icon-only under 1024px, labelled pill above. -->
        <button type="button" aria-label="Search" aria-expanded="false" aria-controls="site-search" data-search-toggle
          class="btn btn-outline size-11 border-navy-500 p-0 sm:size-12 lg:size-auto lg:px-5">
          ${icon('search')}<span class="max-lg:hidden">Search</span>
        </button>
        <a class="btn btn-primary max-sm:gap-1.5 max-sm:px-3" href="/donate">${icon('heart')}<span>Donate</span></a>
        <button type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle
          class="group btn btn-outline max-sm:gap-1.5 max-sm:px-3 lg:hidden">
          <span class="contents group-aria-expanded:hidden">${icon('menu')}</span><span class="hidden group-aria-expanded:contents">${icon('close')}</span><span class="max-[23rem]:sr-only">Menu</span>
        </button>
      </div>
    </div>

    <!-- Site search (Google, limited to our domain). TODO(confirm): search provider and the live domain -->
    <div id="site-search" class="border-t border-cream-300 bg-cream-200 not-data-open:hidden">
      <form class="wrap flex flex-wrap items-end gap-3 py-4" role="search" action="https://www.google.com/search" method="get">
        <input type="hidden" name="as_sitesearch" value="specialtouch.org" />
        <div class="min-w-0 flex-1 basis-64">
          <label class="field-label" for="site-search-q">Search this website</label>
          <input class="field-input" id="site-search-q" name="q" type="search" autocomplete="off" enterkeyhint="search" />
        </div>
        <button type="submit" class="btn btn-primary min-h-12">${icon('search')}Search</button>
      </form>
    </div>

    <nav id="site-nav" aria-label="Main" class="max-lg:not-data-open:hidden">
      <div class="wrap">
        <ul class="flex flex-col gap-1 py-3 lg:flex-row lg:justify-between lg:gap-2 lg:border-t lg:border-cream-300 lg:py-0" role="list">${navItems}</ul>
      </div>
    </nav>
  </div>`
}

function isCurrent(href: string, path: string): boolean {
  return href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`)
}

/** Marks the nav link for `path` with aria-current="page" (sub-pages mark their section). */
export function setCurrentNav(path: string): void {
  for (const link of document.querySelectorAll<HTMLAnchorElement>('a[data-nav]')) {
    if (isCurrent(link.getAttribute('href') ?? '', path)) link.setAttribute('aria-current', 'page')
    else link.removeAttribute('aria-current')
  }
}
