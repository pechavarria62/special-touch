// Placeholder: finished in step 11.
import { Eyebrow } from '../components/ui.js'
import { h, type Html } from '../jsx.js'

const links: [string, string][] = [
  ['Home', '/'],
  ['Summer Get Away', '/get-away'],
  ['Blind Services', '/blind-services'],
  ['Chapters', '/chapters'],
  ['Disability Friendly Church', '/disability-friendly-church'],
  ['Family Support', '/family-support'],
  ['Donate', '/donate'],
  ['Contact us', '/contact'],
]

export function render(): Html {
  return (
    <div class="wrap py-16">
      <Eyebrow>Error 404</Eyebrow>
      <h1 class="mt-4 max-w-3xl text-4xl md:text-5xl">Page not found</h1>
      <p class="mt-5 max-w-2xl text-lg text-ink-muted">The link may be old, or the page may have moved. These pages might help:</p>
      <ul class="mt-6 grid max-w-2xl gap-x-8 sm:grid-cols-2" role="list">
        {links.map(([label, href]) => (
          <li>
            <a class="inline-flex min-h-11 items-center" href={href}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
