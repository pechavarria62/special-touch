// Site footer: organization details, link columns, accessibility statement and the bottom row.
import { icon } from '../icons.js'
import type { NavLink } from './header.js'

const programs: NavLink[] = [
  { label: 'Summer Get Away', href: '/get-away' },
  { label: 'Chapters', href: '/chapters' },
  { label: 'Disability Friendly Church', href: '/disability-friendly-church' },
  { label: 'Blind Services', href: '/blind-services' },
  { label: 'Family of Hope', href: '/family-support' },
]

const getInvolved: NavLink[] = [
  { label: 'Donate', href: '/donate' },
  { label: 'Volunteer at camp', href: '/get-away#staff' },
  { label: 'Prayer request', href: '/prayer-request' },
  { label: 'Our leadership', href: '/about#leadership' },
  // TODO(confirm): MA Resources and Chapter staff URLs
  { label: 'MA Resources', href: '/ma-resources' },
  { label: 'Chapter staff', href: '/chapter-staff' },
]

// TODO(confirm): exact Candid profile URL
const candidUrl = 'https://www.guidestar.org/'

function linkList(links: NavLink[]): string {
  return `<ul class="mt-4 space-y-1" role="list">${links
    .map(({ label, href }) => `<li><a class="inline-flex min-h-11 items-center py-1 text-cream" href="${href}">${label}</a></li>`)
    .join('')}</ul>`
}

export function renderFooter(): string {
  return `
  <div class="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
    <section aria-labelledby="footer-org">
      <h2 id="footer-org" class="sr-only">Special Touch Ministry, Inc.</h2>
      <picture>
        <source srcset="/images/logo-cream.webp" type="image/webp" />
        <img src="/images/logo-cream.png" alt="Special Touch Ministry, Inc." width="640" height="297" class="h-auto w-40" loading="lazy" />
      </picture>
      <address class="mt-5 space-y-1 not-italic">
        <p>P.O. Box 25, Waupaca, WI 54981</p>
        <p><a class="text-cream" href="tel:+17152582713">715-258-2713</a></p>
        <p><a class="text-cream" href="mailto:ministry@specialtouch.org">ministry@specialtouch.org</a></p>
        <p>Office hours: Mon–Thu, 10am–4pm CST</p>
      </address>
      <a class="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl border-2 border-cream px-4 py-2 text-sm font-bold text-cream no-underline hover:underline" href="${candidUrl}">
        ${icon('badge')}Candid Platinum Transparency 2025<span class="sr-only"> (view our Candid profile)</span>
      </a>
    </section>

    <nav aria-labelledby="footer-programs">
      <h2 id="footer-programs" class="footer-heading">Programs</h2>
      ${linkList(programs)}
    </nav>

    <nav aria-labelledby="footer-involved">
      <h2 id="footer-involved" class="footer-heading">Get involved</h2>
      ${linkList(getInvolved)}
    </nav>

    <section aria-labelledby="footer-a11y">
      <h2 id="footer-a11y" class="footer-heading">Accessibility</h2>
      <p class="mt-4">
        We are committed to an accessible website. Having trouble? Email
        <a class="text-cream" href="mailto:ministry@specialtouch.org?subject=Disabled%20Access">ministry@specialtouch.org</a>
        with “Disabled Access” in the subject line.
      </p>
      <button type="button" class="btn btn-on-dark mt-5" data-a11y-open>${icon('accessibility')}Accessibility options</button>
    </section>
  </div>

  <div class="wrap">
    <div class="flex flex-col gap-2 border-t border-navy-500 py-5 text-sm sm:flex-row sm:items-center sm:justify-between">
      <p>© ${new Date().getFullYear()} Special Touch Ministry, Inc. · Non-profit · Interdenominational</p>
      <p class="flex flex-wrap items-center gap-x-5">
        <!-- TODO(confirm): Privacy & Terms page -->
        <a class="inline-flex min-h-11 items-center text-cream" href="/privacy">Privacy &amp; Terms</a>
        <a class="inline-flex min-h-11 items-center gap-1 text-cream" href="#top">Back to top${icon('arrowUp', 'size-4')}</a>
      </p>
    </div>
  </div>`
}
