// Chapters — design/screens/10-chapters-pc.png, 11-chapters-phone.png
import { ArchPhoto, ArchTile, Breadcrumb, Eyebrow, Icon, Picture, SideCard } from '../components/ui.js'
import { chapterEvents, chapters, directionsUrl, onlineCommunity, regions, telHref, type Chapter, type ChapterRegion } from '../data/chapters.js'
import { Fragment, h, type Html } from '../jsx.js'

// TODO(confirm): fundraisers page and the free ministry guide download.
const fundraisersUrl = '/donate'
const ministryGuideUrl = '/disability-friendly-church#help'

function Hero(): Html {
  const benefits = ['Connect with people who understand', 'Network with families facing similar challenges', 'Discover new ways to grow', 'Gain new ways to share your faith']
  return (
    <section aria-labelledby="chapters-h1">
      <div class="wrap grid items-center gap-10 py-10 md:py-14 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:py-16">
        <div>
          <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Chapters' }]} />
          <Eyebrow class="mt-8">Disability ministry outreach</Eyebrow>
          <h1 id="chapters-h1" class="mt-4 text-[2.125rem] leading-[1.1] sm:text-5xl lg:text-6xl">
            You don’t have to do this alone
          </h1>
          <p class="mt-4 max-w-2xl text-lg text-ink-muted">
            One of the greatest challenges for families who have a member with special needs is isolation. Special Touch Chapters bring people with disabilities and those who love them together for faith, friendship and support.
          </p>
          <ul class="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2" role="list">
            {benefits.map((b) => (
              <li class="flex items-start gap-3">
                <Icon name="checkCircle" class="mt-0.5 size-5 text-sage-800" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <ArchPhoto class="mx-auto aspect-[1.3] w-full max-w-xl lg:mr-0 lg:aspect-[1.5]">
          <Picture name="chapters" alt="Three chapter members smiling together at a gathering." width={400} height={278} class="size-full object-cover" eager />
        </ArchPhoto>
      </div>
    </section>
  )
}

function ChapterCard({ c }: { c: Chapter }): Html {
  return (
    <article id={c.id} aria-labelledby={`${c.id}-h`} class="card flex h-full flex-col p-6">
      <h4 id={`${c.id}-h`} class="font-display text-2xl font-semibold text-navy-700">
        {c.name}
      </h4>
      <ul class="mt-3 space-y-3" role="list">
        <li class="flex items-start gap-3">
          <Icon name="calendar" class="mt-1 size-4.5 text-navy-700" />
          <span>
            <span class="sr-only">Meets: </span>
            {c.meets}
          </span>
        </li>
        <li class="flex items-start gap-3">
          <Icon name="pin" class="mt-1 size-4.5 text-navy-700" />
          <span>
            <span class="sr-only">Location: </span>
            {c.place} ·{' '}
            <a href={directionsUrl(c.place)} target="_blank" rel="noopener">
              Get directions<span class="sr-only"> to {c.place} (opens in a new tab)</span>
            </a>
          </span>
        </li>
        <li class="flex items-start gap-3">
          <Icon name="phone" class="mt-1 size-4.5 text-navy-700" />
          <a href={telHref(c.phone)}>
            <span class="sr-only">Call </span>
            {c.phone}
          </a>
        </li>
        <li class="flex items-start gap-3">
          <Icon name="mail" class="mt-1 size-4.5 text-navy-700" />
          <a href={`mailto:${c.email}`} class="break-all">
            <span class="sr-only">Email </span>
            {c.email}
          </a>
        </li>
      </ul>
      {c.note && (
        <p class="mt-4 flex items-start gap-2 rounded-xl border border-sage-300 bg-sage-100 p-3 text-sm text-ink">
          <Icon name={c.note.kind === 'upcoming' ? 'calendar' : 'info'} class="mt-0.5 size-4.5" />
          <span>
            <strong>{c.note.label}</strong> {c.note.text} {c.note.link && <a href={c.note.link.href}>{c.note.link.label}</a>}
          </span>
        </p>
      )}
      <div class="mt-auto flex flex-wrap gap-3 pt-5">
        {/* TODO(confirm): chapter registration form. Until then, "Register to attend" emails the chapter. */}
        <a class="btn btn-primary btn-sm" href={`mailto:${c.email}?subject=${encodeURIComponent(`Registering to attend the ${c.name}`)}`}>
          Register to attend<span class="sr-only"> the {c.name}</span>
        </a>
        <a class="btn btn-outline btn-sm" href={c.facebookUrl}>
          <Icon name="facebook" class="size-4.5" />
          Facebook<span class="sr-only"> page for the {c.name}</span>
        </a>
      </div>
    </article>
  )
}

function RegionGroup({ region, children }: { region: ChapterRegion; children?: Html | Html[] }): Html {
  const id = `region-${region.toLowerCase()}`
  return (
    <section aria-labelledby={id} data-region={region} class="mt-8">
      <h3 id={id} class="flex items-center gap-3 font-sans text-sm font-bold tracking-[0.12em] text-sage-800 uppercase after:h-px after:flex-1 after:bg-cream-300 after:content-['']">
        {region === 'Online' ? 'Global · Online' : region}
      </h3>
      <div class="mt-4">{children}</div>
    </section>
  )
}

function OnlineCommunity(): Html {
  const o = onlineCommunity
  return (
    <article id={o.id} aria-labelledby="online-h" class="card grid scroll-mt-6 gap-5 p-6 md:grid-cols-[auto_1fr_auto] md:items-center">
      <ArchIcon />
      <div>
        <h4 id="online-h" class="font-display text-2xl font-semibold text-navy-700">
          {o.name}
        </h4>
        <p class="mt-1 text-ink-muted">
          {o.text} Contact {o.contactName} at <a href={`mailto:${o.email}`} class="break-all">{o.email}</a>.
        </p>
      </div>
      <div class="flex flex-wrap gap-3 md:flex-col">
        <a class="btn btn-primary btn-sm" href={`mailto:${o.email}?subject=${encodeURIComponent('STM Online Community meeting link')}`}>
          Get the meeting link
        </a>
        <a class="btn btn-outline btn-sm" href={o.facebookUrl}>
          <Icon name="facebook" class="size-4.5" />
          Facebook group
        </a>
      </div>
    </article>
  )
}

function ArchIcon(): Html {
  return (
    <ArchTile class="h-16 w-14">
      <Icon name="users" class="size-6" />
    </ArchTile>
  )
}

function FindAChapter(): Html {
  const filters: ('All' | ChapterRegion)[] = ['All', ...regions]
  return (
    <section aria-labelledby="find-h" class="bg-cream-200 py-14 lg:py-20">
      <div class="wrap grid gap-10 lg:grid-cols-[1fr_21rem] lg:gap-12">
        <div>
          <h2 id="find-h" class="text-3xl md:text-4xl">
            Find a chapter near you
          </h2>
          {/* Filter buttons only appear with JavaScript; without it every chapter is listed. */}
          <div role="group" aria-label="Show chapters in" class="mt-5 flex flex-wrap gap-3" data-chapter-filters hidden>
            {filters.map((f) => (
              <button
                type="button"
                data-filter={f}
                aria-pressed={f === 'All' ? 'true' : 'false'}
                class="group inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border-2 border-navy-500 bg-cream px-4 py-2 font-bold text-navy-700 hover:bg-navy-50 aria-pressed:border-[3px] aria-pressed:border-navy-900 aria-pressed:bg-navy-700 aria-pressed:px-[0.9375rem] aria-pressed:text-cream"
              >
                <span class="hidden group-aria-pressed:inline">
                  <Icon name="check" class="size-4" />
                </span>
                {f}
              </button>
            ))}
          </div>
          <p class="sr-only" aria-live="polite" data-filter-status></p>

          {regions
            .filter((r) => r !== 'Online')
            .map((region) => (
              <RegionGroup region={region}>
                <ul class="grid gap-5 md:grid-cols-2" role="list">
                  {chapters
                    .filter((c) => c.region === region)
                    .map((c) => (
                      <li>
                        <ChapterCard c={c} />
                      </li>
                    ))}
                </ul>
              </RegionGroup>
            ))}
          <RegionGroup region="Online">
            <OnlineCommunity />
          </RegionGroup>
        </div>

        <aside aria-label="Chapter events and resources" class="space-y-5">
          <SideCard title="Upcoming events">
            <ul class="mt-4 space-y-4" role="list">
              {chapterEvents.map((e) => (
                <li class="flex items-center gap-4">
                  <span aria-hidden="true" class="grid h-14 w-13 shrink-0 place-items-center rounded-t-full rounded-b-md border-2 border-navy-700 bg-sage-100 pt-1 text-center leading-none text-navy-700">
                    <span class="text-[0.6875rem] font-bold uppercase">{e.month}</span>
                    <span class="font-display text-xl font-semibold">{e.day}</span>
                  </span>
                  <span>
                    <span class="block font-bold text-ink">{e.title}</span>
                    <span class="block text-ink-muted">
                      <span class="sr-only">{e.month === 'TBA' ? 'Date to be announced. ' : `${e.month} ${e.day}. `}</span>
                      {e.where}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <a href={fundraisersUrl} class="mt-5 inline-flex min-h-11 items-center gap-2 font-bold">
              View all fundraisers
              <Icon name="arrowRight" class="size-4" />
            </a>
          </SideCard>

          <section aria-labelledby="gathering-h" class="on-dark rounded-3xl bg-navy-700 p-6 text-cream">
            <h2 id="gathering-h" class="text-xl text-cream">
              Start a gathering at your church
            </h2>
            <ul class="mt-3 list-disc space-y-1 pl-5 marker:text-sage-300" role="list">
              <li>Foster belonging</li>
              <li>Provide support</li>
              <li>Enrich faith</li>
              <li>Strengthen the church</li>
            </ul>
            <a class="btn btn-on-dark btn-sm mt-5" href={ministryGuideUrl}>
              Get the free ministry guide
            </a>
          </section>

          <SideCard title="Support our mission" class="border-sage-300 bg-sage-100">
            <p class="mt-2 text-ink-muted">Give to a chapter near you and help make the Cross accessible to everyone.</p>
            <a class="btn btn-outline btn-sm mt-4" href="/donate">
              <Icon name="heart" class="size-4.5" />
              Give to a chapter
            </a>
          </SideCard>
        </aside>
      </div>
    </section>
  )
}

export function render(): Html {
  return (
    <>
      <Hero />
      <FindAChapter />
    </>
  )
}

/** State filter: aria-pressed buttons show one region at a time; the result is announced. */
export function mount(root: HTMLElement): () => void {
  const group = root.querySelector<HTMLElement>('[data-chapter-filters]')
  const status = root.querySelector<HTMLElement>('[data-filter-status]')
  if (!group) return () => {}
  group.hidden = false

  const onClick = (event: MouseEvent): void => {
    const button = (event.target as Element | null)?.closest<HTMLButtonElement>('button[data-filter]')
    if (!button) return
    const filter = button.dataset.filter
    for (const b of group.querySelectorAll<HTMLButtonElement>('button[data-filter]')) b.setAttribute('aria-pressed', String(b === button))
    let shown = 0
    for (const section of root.querySelectorAll<HTMLElement>('[data-region]')) {
      const visible = filter === 'All' || section.dataset.region === filter
      section.hidden = !visible
      if (visible) shown += section.querySelectorAll('article').length
    }
    if (status) status.textContent = `Showing ${shown} ${shown === 1 ? 'chapter' : 'chapters'}${filter === 'All' ? '' : ` in ${filter}`}.`
  }

  group.addEventListener('click', onClick)
  return () => group.removeEventListener('click', onClick)
}
