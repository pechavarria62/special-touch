// Summer Get Away — design/screens/06-get-away-pc.png, 07-get-away-phone.png
import { Accordion, Alert, Breadcrumb, Eyebrow, Icon, Picture, SideCard } from '../components/ui.js'
import { campYear, camps, splitDates, type Camp } from '../data/camps.js'
import type { IconName } from '../icons.js'
import { Fragment, h, type Html } from '../jsx.js'

// TODO(confirm): FAQ page, camp forms and staff manuals (until then these go to Contact).
const faqUrl = '/contact'
const docs = {
  physicianPermission: '/contact',
  staffReference: '/contact',
  staffManual: '/contact',
  teamLeaderGuide: '/contact',
  medicalStaffManual: '/contact',
}

function Hero(): Html {
  const jumps: [string, string][] = [
    ['Locations & fees', '#locations'],
    ['Who can attend', '#who'],
    ['FAQ', '#faq'],
    ['Staff & volunteers', '#staff'],
  ]
  return (
    <section aria-labelledby="getaway-h1" class="on-dark bg-navy-700 text-cream">
      <div class="wrap grid items-center gap-10 pt-10 pb-16 lg:grid-cols-[1.45fr_1fr] lg:gap-16 lg:pt-14 lg:pb-24">
        <div>
          <Breadcrumb dark crumbs={[{ label: 'Home', href: '/' }, { label: 'Summer Get Away' }]} />
          <Eyebrow dark class="mt-8">
            Summer Get Away {campYear}
          </Eyebrow>
          <h1 id="getaway-h1" class="mt-4 text-[2.125rem] leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
            Five days of fun, faith and friendship
          </h1>
          <p class="mt-4 max-w-2xl text-lg">An overnight, camp-style retreat for people with intellectual or physical disabilities. Five days, four nights, in a Christian atmosphere.</p>
          <ul class="mt-7 flex flex-wrap gap-3" role="list">
            {jumps.map(([label, href]) => (
              <li>
                <a href={href} class="inline-flex min-h-11 items-center rounded-full border-2 border-cream px-4 py-2 font-bold text-cream no-underline hover:bg-navy-800 hover:underline">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div class="hidden lg:block">
          <div class="arch aspect-[1.55] border-4 border-sage-500">
            <Picture name="getaway" alt="Three campers in climbing helmets give a thumbs up." width={800} height={499} class="size-full object-cover" eager />
          </div>
        </div>
      </div>
    </section>
  )
}

function Facts(): Html {
  const facts: [IconName, string, string][] = [
    ['calendar', 'Monday to Friday', 'Check in Monday afternoon, check out Friday morning'],
    ['users', 'About 3–4 guests per staff', 'Medical professionals at every location'],
    ['clock', 'Allow 2 weeks', 'Forms are reviewed by hand in CampDoc'],
  ]
  return (
    <section aria-labelledby="glance-h" class="mt-8">
      <h2 id="glance-h" class="sr-only">
        At a glance
      </h2>
      <ul class="grid gap-4 md:grid-cols-3" role="list">
        {facts.map(([iconName, title, text]) => (
          <li class="flex gap-3 rounded-2xl border border-cream-300 bg-cream p-5">
            <span class="grid size-10 shrink-0 place-items-center rounded-full border border-sage-300 bg-sage-100 text-navy-700">
              <Icon name={iconName} />
            </span>
            <span>
              <span class="block font-bold text-navy-700">{title}</span>
              <span class="mt-1 block text-sm text-ink-muted">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function DateBadge({ camp }: { camp: Camp }): Html {
  const { month, days } = splitDates(camp.dates)
  return (
    <div class="flex h-28 w-32 shrink-0 flex-col items-center justify-end rounded-2xl bg-navy-700 pb-5 text-cream sm:h-30 sm:w-38 sm:rounded-t-full sm:rounded-b-none">
      <span class="text-sm font-bold tracking-wider uppercase">{month}</span>
      <span class="font-display text-3xl font-semibold">{days}</span>
    </div>
  )
}

function FeeChip({ label, amount }: { label: Html | string; amount: number }): Html {
  return (
    <li class="rounded-lg border border-cream-300 bg-cream px-3 py-1.5 text-sm text-ink">
      {label} <strong class="text-navy-700">${amount}</strong>
    </li>
  )
}

function Locations(): Html {
  return (
    <section id="locations" aria-labelledby="locations-h" class="mt-12 scroll-mt-6">
      <h2 id="locations-h" class="text-3xl md:text-4xl">
        {campYear} locations &amp; fees
      </h2>
      <p class="mt-2 text-ink-muted">Tuition varies by location because of facility rental, insurance and state rules. Volunteer staff attend free.</p>
      <ul class="mt-6 space-y-4" role="list">
        {camps.map((camp) => (
          <li>
            <article aria-labelledby={`camp-${camp.abbr}`} class="card grid gap-5 p-6 sm:grid-cols-[auto_1fr] sm:items-center lg:grid-cols-[auto_1fr_auto]">
              <DateBadge camp={camp} />
              <div>
                <h3 id={`camp-${camp.abbr}`} class="text-2xl">
                  {camp.state}
                </h3>
                <p class="sr-only">Dates: {camp.dates}</p>
                <ul class="mt-1 space-y-1 text-ink-muted" role="list">
                  <li class="flex items-start gap-2">
                    <Icon name="pin" class="mt-0.5 size-4.5 text-navy-700" />
                    <span>
                      <span class="sr-only">Location: </span>
                      {camp.camp}, {camp.town}
                    </span>
                  </li>
                  <li class="flex items-start gap-2">
                    <Icon name="users" class="mt-0.5 size-4.5 text-navy-700" />
                    <span>
                      <span class="sr-only">Coordinators: </span>
                      {camp.coordinators}
                    </span>
                  </li>
                </ul>
                <ul class="mt-3 flex flex-wrap gap-2" role="list" aria-label={`${camp.state} tuition`}>
                  <FeeChip label="No care required" amount={camp.fees.noCare} />
                  <FeeChip label="Requiring care" amount={camp.fees.care} />
                  <FeeChip label={<abbr title="Caregiver-in-Training">CIT</abbr>} amount={camp.fees.cit} />
                </ul>
              </div>
              <div class="flex flex-col items-start gap-2 sm:col-span-2 lg:col-span-1 lg:items-end">
                <a class="btn btn-primary" href={camp.registrationUrl}>
                  Register for {camp.state}
                </a>
                <p class="flex items-center gap-2 text-sm font-bold text-ink">
                  <Icon name="clock" class="size-4" />
                  Register by {camp.registerBy}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}

function WhoCanAttend(): Html {
  return (
    <section id="who" aria-labelledby="who-h" class="mt-14 scroll-mt-6">
      <h2 id="who-h" class="text-3xl md:text-4xl">
        Who can attend
      </h2>
      <p class="mt-2 text-ink-muted">Choose one option per registration.</p>
      <div class="mt-6 space-y-3">
        <Accordion title="Guests" open>
          <ul class="divide-y divide-cream-300 border-t border-cream-300" role="list">
            <li class="flex flex-col gap-2 py-4 sm:flex-row sm:items-start sm:gap-4">
              <span class="inline-flex shrink-0 items-center gap-1 self-start rounded-full bg-navy-700 px-3 py-1 text-sm font-bold text-cream">
                <Icon name="checkCircle" class="size-4" />
                Age 10+
              </span>
              <div>
                <h3 class="font-sans text-lg font-bold text-navy-700">Guest, no care required</h3>
                <p class="text-sm text-ink-muted">Mostly independent with personal care. Volunteers give supervision and reminders.</p>
              </div>
            </li>
            <li class="flex flex-col gap-2 pt-4 sm:flex-row sm:items-start sm:gap-4">
              <span class="inline-flex shrink-0 items-center gap-1 self-start rounded-full border border-navy-500 bg-navy-50 px-3 py-1 text-sm font-bold text-navy-700">
                <Icon name="users" class="size-4" />
                Bring a caregiver
              </span>
              <div>
                <h3 class="font-sans text-lg font-bold text-navy-700">Guest, requiring care</h3>
                <p class="text-sm text-ink-muted">Needs hands-on help with toileting, showering, dressing or eating. The caregiver registers separately as Personal Care Staff.</p>
              </div>
            </li>
          </ul>
        </Accordion>
        {/* TODO(confirm): full wording for the three sections below. */}
        <Accordion title="Volunteer staff (18+)" id="staff">
          <p class="text-ink-muted">
            Volunteer staff are 18 or older and attend free. Every volunteer completes reference forms and a background screening before camp. See <a href={docs.staffReference}>Staff Reference Page</a> and the staff manuals.
          </p>
        </Accordion>
        <Accordion title="Caregiver-in-Training (ages 14–17)">
          <p class="text-ink-muted">Young people ages 14–17 can serve as Caregivers-in-Training (CIT) alongside experienced staff. CIT tuition is listed for each location above.</p>
        </Accordion>
        <Accordion title="Family members, speakers & activity leaders">
          <p class="text-ink-muted">Family members, guest speakers and activity leaders can join for part of the week. Contact your local coordinator to plan your visit.</p>
        </Accordion>
      </div>
    </section>
  )
}

function DocLink({ label, format, href }: { label: string; format: 'PDF' | 'Online'; href: string }): Html {
  return (
    <li>
      <a href={href} class="flex min-h-11 items-center justify-between gap-3 font-bold">
        {label}
        <span class="text-sm font-normal text-ink-muted">{format}</span>
      </a>
    </li>
  )
}

function Sidebar(): Html {
  const schedule: [string, string][] = [
    ['Monday morning', 'Staff orientation'],
    ['Monday afternoon', 'Guest check-in'],
    ['Friday morning', 'Guest check-out'],
  ]
  return (
    <aside aria-label="Camp resources" class="space-y-5">
      <SideCard title="Typical schedule">
        <ol class="mt-3 space-y-3" role="list">
          {schedule.map(([when, what]) => (
            <li class="grid grid-cols-[1.25rem_1fr] gap-x-3">
              <span aria-hidden="true" class="mt-1.5 size-4 rounded-full border-[3px] border-navy-700"></span>
              <span>
                <span class="block font-bold text-navy-700">{when}</span>
                <span class="block text-ink">{what}</span>
              </span>
            </li>
          ))}
        </ol>
        <p class="mt-4 text-sm text-ink-muted">Times vary. Confirm with your local coordinator.</p>
      </SideCard>
      <SideCard title="Required forms">
        <ul class="mt-2" role="list">
          <DocLink label="Physician’s Permission" format="PDF" href={docs.physicianPermission} />
          <DocLink label="Staff Reference Page" format="Online" href={docs.staffReference} />
        </ul>
      </SideCard>
      <SideCard title="Staff manuals">
        <ul class="mt-2" role="list">
          <DocLink label="Staff Manual" format="PDF" href={docs.staffManual} />
          <DocLink label="Team Leader Guide" format="Online" href={docs.teamLeaderGuide} />
          <DocLink label="Medical Staff Manual" format="Online" href={docs.medicalStaffManual} />
        </ul>
      </SideCard>
      <SideCard title="Questions?" id="faq" class="scroll-mt-6 border-sage-300 bg-sage-100">
        <p class="mt-2 text-ink-muted">Most answers are in our FAQ.</p>
        <a class="btn btn-outline mt-4" href={faqUrl}>
          Read the FAQ
        </a>
      </SideCard>
    </aside>
  )
}

export function render(): Html {
  return (
    <>
      <Hero />
      <div class="wrap grid gap-10 pb-16 lg:-mt-8 lg:grid-cols-[1fr_20rem] lg:gap-12 lg:pb-24">
        <div class="max-lg:mt-8">
          <Alert class="relative">
            <p>
              <strong>Please read before you register.</strong> This is a traditional camp. It can be noisy and active, with walking between locations, swimming, fishing, boat rides, sports, games and crafts. Transportation to and from camp is the participant’s
              responsibility.
            </p>
          </Alert>
          <Facts />
          <Locations />
          <WhoCanAttend />
        </div>
        <Sidebar />
      </div>
    </>
  )
}
