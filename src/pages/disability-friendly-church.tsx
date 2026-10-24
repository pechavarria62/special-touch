// Disability Friendly Church — design/screens/12-dfc-pc.png, 13-dfc-phone.png
import { Alert, ArchPhoto, ArchTile, Breadcrumb, Eyebrow, Icon, Picture } from '../components/ui.js'
import type { IconName } from '../icons.js'
import { Fragment, h, type Html } from '../jsx.js'

// TODO(confirm): DFC survey, guide download, trainings, partnership, podcast and blog links (until then: Contact).
const links = {
  survey: '/contact',
  guide: '/contact',
  trainings: '/contact',
  partner: '/contact',
  podcast: '/contact',
  blog: '/contact',
  administrator: 'mailto:ministry@specialtouch.org?subject=Disability%20Friendly%20Church',
}

function Hero(): Html {
  return (
    <section aria-labelledby="dfc-h1">
      <div class="wrap grid items-center gap-12 py-10 md:py-14 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:py-16">
        <div>
          <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Disability Friendly Church' }]} />
          <Eyebrow class="mt-8">
            <span>Disability Friendly Church (DFC)</span>
          </Eyebrow>
          <h1 id="dfc-h1" class="mt-4 text-[2.125rem] leading-[1.1] sm:text-5xl lg:text-6xl">
            The need for disability-friendly churches is off the charts
          </h1>
          <p class="mt-4 max-w-2xl text-lg text-ink-muted">
            Many families are searching for a church that truly understands their needs. Our DFC program gives churches the resources, training and partnership to become a safe haven for people with disabilities.
          </p>
          <div class="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
            <a class="btn btn-primary" href="#survey">
              <Icon name="checkCircle" />
              Take the free DFC survey
            </a>
            <a class="btn btn-outline" href="#trainings">
              <Icon name="play" />
              What is DFC training?
            </a>
          </div>
        </div>
        <div class="relative mx-auto w-full max-w-md lg:mr-0">
          <ArchPhoto outline class="aspect-square sm:aspect-[1.1]">
            <Picture name="dfc" alt="Two smiling women sitting together at a church event." width={800} height={487} class="size-full object-cover" eager />
          </ArchPhoto>
          <div class="absolute inset-x-4 bottom-4 rounded-2xl border-l-[6px] border-sage-700 bg-cream p-5 shadow-card sm:inset-x-6 lg:right-auto lg:bottom-8 lg:-left-8 lg:w-64">
            <p class="font-display text-xl leading-snug font-semibold text-navy-700">Join us in Making the Cross Accessible</p>
            <p class="mt-1 text-sm text-ink-muted">Free tools for every church</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Survey(): Html {
  return (
    <div class="wrap">
      <section id="survey" aria-labelledby="survey-h" class="on-dark grid scroll-mt-6 gap-6 rounded-3xl bg-navy-700 p-6 text-cream sm:p-8 md:grid-cols-[auto_1fr_auto] md:items-center">
        <span aria-hidden="true" class="grid h-26 w-22 place-items-center rounded-t-full rounded-b-sm bg-sage-500 text-navy-900">
          <Icon name="gift" class="size-9" />
        </span>
        <div>
          <h2 id="survey-h" class="text-3xl text-cream md:text-4xl">
            How disability friendly is your church?
          </h2>
          <p class="mt-2">
            Take the free survey to assess your church and plan improvements. Everyone who finishes it gets our <strong>Disability Ministry Guide</strong>, a blueprint for sustainable ministry to people with disabilities, free.
          </p>
        </div>
        <a class="btn btn-on-dark justify-self-start" href={links.survey}>
          <Icon name="arrowRight" />
          Start the survey
        </a>
      </section>
    </div>
  )
}

interface Step {
  id: string
  title: string
  text: string
  points: string[]
  note: [IconName, string]
  cta: [string, string]
}

const steps: Step[] = [
  {
    id: 'guide',
    title: 'Disability Ministry Guide',
    text: 'Learn how to start a welcoming, faith-based friendship group (a DFC Gathering) for people with disabilities.',
    points: ['Welcome people of all abilities', 'Strengthen your church', 'Step-by-step blueprint'],
    note: ['checkCircle', 'Free download'],
    cta: ['Download the guide', links.guide],
  },
  {
    id: 'trainings',
    title: 'DFC Online Trainings',
    text: 'Video trainings that keep church staff and volunteers equipped as needs change.',
    points: ['Accessibility', 'Communication', 'Creating inclusive environments'],
    note: ['play', 'Watch online, any time'],
    cta: ['Explore trainings', links.trainings],
  },
  {
    id: 'partnership',
    title: 'DFC Partnership',
    text: 'Ongoing, personalized support to help your church start and grow its ministry.',
    points: ['Personal support from our team', 'Tools and resources', 'Individual guidance'],
    note: ['dollar', 'From $25 a month'],
    cta: ['Become a partner', links.partner],
  },
]

function ThreeWays(): Html {
  return (
    <section id="help" aria-labelledby="help-h" class="pt-14 pb-16 lg:pt-20 lg:pb-24">
      <div class="wrap">
        <div class="mx-auto max-w-2xl text-center">
          <Eyebrow class="justify-center">Three ways we help</Eyebrow>
          <h2 id="help-h" class="mt-3 text-3xl md:text-4xl">
            From first steps to ongoing partnership
          </h2>
        </div>
        <ol class="mt-10 grid gap-5 lg:grid-cols-3" role="list">
          {steps.map((s, i) => (
            <li id={s.id} class="card flex scroll-mt-6 flex-col p-7">
              <ArchTile class="h-14 w-12 font-display text-xl font-semibold">
                <span>
                  <span class="sr-only">Step </span>
                  {i + 1}
                </span>
              </ArchTile>
              <h3 class="mt-5 text-2xl">{s.title}</h3>
              <p class="mt-2 text-ink-muted">{s.text}</p>
              <ul class="mt-4 space-y-2 text-sm text-ink" role="list">
                {s.points.map((p) => (
                  <li class="flex items-center gap-2">
                    <Icon name="checkCircle" class="size-4.5 text-sage-800" />
                    {p}
                  </li>
                ))}
              </ul>
              <p class="mt-5 flex items-center gap-2 font-bold text-navy-700">
                <Icon name={s.note[0]} class="size-4.5" />
                {s.note[1]}
              </p>
              <div class="mt-auto pt-6">
                <a class="btn btn-primary btn-sm" href={s.cta[1]}>
                  {s.cta[0]}
                </a>
              </div>
            </li>
          ))}
        </ol>
        <Alert class="mt-8">
          <p>STM provides guidance and tools. All services are run and insured by the local church.</p>
        </Alert>
      </div>
    </section>
  )
}

function Gathering(): Html {
  return (
    <section aria-labelledby="gather-h" class="bg-cream py-16 lg:py-24">
      <div class="wrap grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <ArchPhoto class="aspect-[1.1] lg:aspect-[1.35]">
          <Picture name="picnic" alt="Gathering members sharing lunch together at an outdoor picnic table." width={1400} height={469} class="size-full object-cover object-[35%_center]" />
        </ArchPhoto>
        <div>
          <Eyebrow>What is a DFC Gathering?</Eyebrow>
          <h2 id="gather-h" class="mt-3 text-3xl md:text-4xl">
            A place to belong, grow and serve
          </h2>
          <p class="mt-3 text-ink">
            Gatherings are church-hosted faith and friendship groups. They offer a caring place for fellowship and spiritual mentorship, so people impacted by disability belong, grow, have their gifts supported, and are fully part of the church body.
          </p>
          <p class="mt-5 border-l-4 border-sage-500 pl-5 font-display text-2xl leading-snug text-navy-700">
            Regular meetings with spiritual support, helpful information, mentorship, encouragement, and plenty of fun and friendship.
          </p>
          <a class="btn btn-outline mt-6" href="/chapters">
            <Icon name="users" />
            Visit a Special Touch chapter
          </a>
        </div>
      </div>
    </section>
  )
}

function MoreTools(): Html {
  const tools: [IconName, string, string, string][] = [
    ['headphones', 'Indispensable People Podcast', 'Conversations on disability ministry', links.podcast],
    ['text', 'Indispensable People Blog', 'Ideas and stories for church leaders', links.blog],
    ['braille', 'Blind Services', 'Accessibility tools and training', '/blind-services'],
    ['mail', 'Contact the DFC Administrator', 'Questions about your church', links.administrator],
  ]
  return (
    <section aria-labelledby="tools-h" class="bg-cream-200 py-16 lg:py-20">
      <div class="wrap">
        <Eyebrow>DFC resources</Eyebrow>
        <h2 id="tools-h" class="mt-3 text-3xl md:text-4xl">
          More tools for your ministry
        </h2>
        <ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {tools.map(([iconName, title, text, href]) => (
            <li>
              <a href={href} class="group flex h-full flex-col gap-3 rounded-2xl border-2 border-sage-300 bg-cream p-5 no-underline hover:border-navy-500">
                <span class="grid size-12 place-items-center rounded-full bg-navy-700 text-cream">
                  <Icon name={iconName} />
                </span>
                <span class="font-bold text-navy-700 underline underline-offset-[0.18em] group-hover:decoration-2">{title}</span>
                <span class="text-sm text-ink-muted">{text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function render(): Html {
  return (
    <>
      <Hero />
      <div class="bg-cream-200 pt-14 lg:pt-20">
        <Survey />
        <ThreeWays />
      </div>
      <Gathering />
      <MoreTools />
    </>
  )
}
