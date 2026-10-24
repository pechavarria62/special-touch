// Shared JSX components used by the pages, so repeated patterns look the same everywhere.
import { icon, type IconName } from '../icons.js'
import { h, raw, type Child, type Html } from '../jsx.js'

export interface Crumb {
  label: string
  /** Omit for the current page (the last crumb). */
  href?: string
}

/** Breadcrumb trail: "Home / About Us". The current page is marked aria-current. Use `dark` on navy bands. */
export function Breadcrumb({ crumbs, dark = false }: { crumbs: Crumb[]; dark?: boolean }): Html {
  return (
    <nav aria-label="Breadcrumb">
      <ol class={`flex flex-wrap items-center gap-x-1.5 text-sm ${dark ? 'text-cream' : 'text-ink-muted'}`} role="list">
        {crumbs.map(({ label, href }, i) => (
          <li class="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {href ? (
              <a href={href} class={dark ? 'text-cream' : undefined}>
                {label}
              </a>
            ) : (
              <span aria-current="page">{label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function Icon({ name, class: className = 'size-5' }: { name: IconName; class?: string }): Html {
  return raw(icon(name, className))
}

export function Eyebrow({ class: className = '', dark = false, children }: { class?: string; dark?: boolean; children?: Child }): Html {
  return <p class={`${dark ? 'eyebrow-dark' : 'eyebrow'} ${className}`}>{children}</p>
}

/** Doorway-arch icon tile (navy, cream icon or letter). */
export function ArchTile({ class: className = 'size-14', children }: { class?: string; children?: Child }): Html {
  return <span class={`grid ${className} shrink-0 place-items-center rounded-t-full rounded-b-lg bg-navy-700 text-cream`}>{children}</span>
}

export function ArchIcon({ name, class: className }: { name: IconName; class?: string }): Html {
  return (
    <ArchTile class={className}>
      <Icon name={name} class="size-6" />
    </ArchTile>
  )
}

export interface PictureProps {
  /** Base name in public/images/, e.g. "hero" → hero.webp + hero.jpg. */
  name: string
  alt: string
  width: number
  height: number
  ext?: 'jpg' | 'png'
  class?: string
  eager?: boolean
}

/** <picture> with the WebP copy first and the JPG/PNG fallback. */
export function Picture({ name, alt, width, height, ext = 'jpg', class: className = '', eager = false }: PictureProps): Html {
  return (
    <picture>
      <source srcset={`/images/${name}.webp`} type="image/webp" />
      <img src={`/images/${name}.${ext}`} alt={alt} width={width} height={height} class={className} loading={eager ? undefined : 'lazy'} fetchpriority={eager ? 'high' : undefined} />
    </picture>
  )
}

/** Photo in a doorway arch, optionally with the thin sage arch outline offset behind it (hero photos). */
export function ArchPhoto({ outline = false, class: className = '', children }: { outline?: boolean; class?: string; children?: Child }): Html {
  return (
    <div class={`relative ${className}`}>
      {outline && <div aria-hidden="true" class="arch absolute inset-0 translate-x-3 -translate-y-3 border-2 border-sage-500 sm:translate-x-4 sm:-translate-y-4"></div>}
      <div class="arch relative size-full bg-cream-200">{children}</div>
    </div>
  )
}

/** Temporary page body until the page is built from its design. */
export function PlaceholderPage({ h1, crumbs }: { h1: string; crumbs: Crumb[] }): Html {
  return (
    <div class="wrap py-10 md:py-16">
      <Breadcrumb crumbs={crumbs} />
      <h1 class="mt-6 max-w-3xl text-4xl md:text-5xl">{h1}</h1>
    </div>
  )
}

/** "(required)" written as text next to a field label. */
export function Required(): Html {
  return <span class="font-normal text-ink-muted">(required)</span>
}

/** Hidden honeypot field: people never see or fill it; bots usually do. */
export function Honeypot(): Html {
  return (
    <div class="hidden" aria-hidden="true">
      <label>
        Leave this field empty <input type="text" name="website" tabindex="-1" autocomplete="off" />
      </label>
    </div>
  )
}


type AlertKind = 'info' | 'success' | 'warning'
const alertIcon: Record<AlertKind, IconName> = { info: 'info', success: 'checkCircle', warning: 'warning' }

/** Status note: icon + text + thick left border. Kinds differ by icon shape, not only color; no warning hues (see CLAUDE.md). */
export function Alert({ kind = 'info', class: className = '', children }: { kind?: AlertKind; class?: string; children?: Child }): Html {
  return (
    <div role="note" class={`alert ${kind === 'success' ? 'alert-success' : ''} ${className}`}>
      <Icon name={alertIcon[kind]} class="mt-0.5 size-6" />
      <div>{children}</div>
    </div>
  )
}

/** Accordion item on <details>/<summary>: chevron rotates; the open item gets a darker navy border. */
export function Accordion({ title, open = false, id, children }: { title: string; open?: boolean; id?: string; children?: Child }): Html {
  return (
    <details id={id} open={open} class="group scroll-mt-6 rounded-2xl border-2 border-navy-500 bg-cream open:border-navy-700 open:shadow-card">
      <summary class="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-3 font-bold text-navy-700 [&::-webkit-details-marker]:hidden">
        {title}
        <Icon name="chevronDown" class="size-5 transition-transform group-open:rotate-180" />
      </summary>
      <div class="px-5 pb-5">{children}</div>
    </details>
  )
}

/** Sidebar card with a small serif heading. */
export function SideCard({ title, id, class: className = '', children }: { title: string; id?: string; class?: string; children?: Child }): Html {
  return (
    <section id={id} aria-label={title} class={`card p-6 ${className}`}>
      <h2 class="text-xl">{title}</h2>
      {children}
    </section>
  )
}

/** Small badge for formats and states (Braille, Audio, Next…): always an icon plus text. */
export function Badge({ icon: iconName, dark = false, children }: { icon: IconName; dark?: boolean; children?: Child }): Html {
  return (
    <span
      class={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold ${dark ? 'bg-cream text-navy-800' : 'border border-navy-200 bg-navy-50 text-navy-700'}`}
    >
      <Icon name={iconName} class="size-4" />
      {children}
    </span>
  )
}

/** Checkbox card or radio card: a real <input> styled as a card. Selected = thicker border + filled box/dot + light fill. */
export function ChoiceCard({
  type,
  name,
  value,
  id,
  checked = false,
  required = false,
  layout = 'row',
  children,
}: {
  type: 'checkbox' | 'radio'
  name: string
  value: string
  id: string
  checked?: boolean
  required?: boolean
  layout?: 'row' | 'stack'
  children?: Child
}): Html {
  const marker =
    type === 'checkbox' ? (
      <span aria-hidden="true" class="grid size-6 shrink-0 place-items-center rounded-md border-2 border-navy-700 bg-cream text-cream group-has-checked:bg-navy-700">
        <span class="hidden group-has-checked:contents">
          <Icon name="check" class="size-4" />
        </span>
      </span>
    ) : (
      <span aria-hidden="true" class="size-5 shrink-0 rounded-full border-2 border-navy-700 bg-cream group-has-checked:bg-navy-700 group-has-checked:shadow-[inset_0_0_0_3px_var(--color-cream)]"></span>
    )
  return (
    <label
      for={id}
      class={`group flex min-h-12 cursor-pointer rounded-xl border-2 border-navy-500 bg-cream px-4 py-2.5 font-bold text-navy-700 hover:bg-navy-50 has-checked:border-[3px] has-checked:border-navy-700 has-checked:bg-navy-50 has-checked:px-[0.9375rem] has-focus-visible:shadow-[0_0_0_3px_var(--color-cream)] has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-navy-700 ${
        layout === 'stack' ? 'flex-col items-center justify-center gap-1.5 text-center text-sm' : 'items-center gap-3'
      }`}
    >
      <input class="sr-only" type={type} id={id} name={name} value={value} checked={checked} required={required} />
      {marker}
      <span>{children}</span>
    </label>
  )
}
