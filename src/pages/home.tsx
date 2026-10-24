// Home page — design/screens/01-home-pc.png, 02-home-tablet.png, 03-home-phone.png, 03b-home-phone-first-screen.png
import { ArchIcon, ArchPhoto, Eyebrow, Honeypot, Icon, Picture, Required } from '../components/ui.js'
import { campSeason, campYear, camps, nextCamp } from '../data/camps.js'
import { initForm } from '../forms.js'
import type { IconName } from '../icons.js'
import { Fragment, h, type Html } from '../jsx.js'
import { social } from '../layout/header.js'

// TODO(confirm): "Watch our story" video URL
const storyVideoUrl = social.youtube

function Hero(): Html {
  const trust = ['Interdenominational', 'Candid Platinum Transparency', 'Nationwide']
  return (
    <section aria-labelledby="home-h1" class="relative isolate overflow-hidden">
      {/* Soft sage circle: behind the text on phones, behind the photo on PC. */}
      <div aria-hidden="true" class="absolute top-16 -left-48 -z-10 size-144 rounded-full bg-sage-200/60 lg:-top-48 lg:-right-40 lg:left-auto lg:size-176"></div>

      <div class="wrap grid items-center gap-12 py-12 md:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-20">
        <div>
          <Eyebrow>Serving since 1982</Eyebrow>
          <h1 id="home-h1" class="mt-4 text-[2.125rem] leading-[1.1] sm:text-5xl lg:text-6xl">Opening the doors of the church to <em class="text-sage-800">every body</em></h1>
          <p class="mt-4 max-w-xl text-lg text-ink-muted">
            Special Touch Ministry eases and enriches the lives of people impacted by disability, so everyone can experience God, belong in the church, and build lasting friendships.
          </p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a class="btn btn-primary" href="/get-away">
              <Icon name="calendar" />
              Register for Summer Get Away
            </a>
            <a class="btn btn-secondary" href="/donate">
              <Icon name="heart" />
              Give today
            </a>
          </div>
          <ul class="mt-6 flex flex-col gap-x-5 gap-y-3 text-ink-muted sm:flex-row sm:flex-wrap sm:text-base lg:text-[0.9375rem]" role="list">
            {trust.map((item) => (
              <li class="flex items-center gap-2">
                <Icon name="checkCircle" class="size-5 text-sage-800" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div class="relative mx-auto w-full max-w-md lg:mr-0">
          <ArchPhoto outline class="aspect-square sm:aspect-4/5">
            <Picture name="hero" alt="A smiling camper in a wheelchair waves at Summer Get Away." width={1600} height={624} class="size-full object-cover object-[40%_center]" eager />
          </ArchPhoto>
          <div class="absolute inset-x-4 bottom-4 rounded-2xl border-l-[6px] border-navy-700 bg-cream p-5 shadow-card sm:inset-x-6 lg:right-auto lg:bottom-8 lg:-left-10 lg:w-72">
            <p class="font-display text-xl font-semibold text-navy-700">{campYear} Summer Get Away</p>
            <ul class="mt-2 space-y-1 text-sm text-ink-muted" role="list">
              <li class="flex items-start gap-2">
                <Icon name="pin" class="size-5 text-navy-700" />
                {camps.length} locations: {camps.map((c) => c.abbr).join(', ')}
              </li>
              <li class="flex items-start gap-2">
                <Icon name="calendar" class="size-5 text-navy-700" />
                {campSeason}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

interface PathCard {
  icon: IconName
  label: string
  title: string
  link: string
  href: string
}

const paths: PathCard[] = [
  { icon: 'tent', label: 'Summer Get Away', title: 'I’m looking for a camp for someone with a disability', link: `See ${campYear} dates & fees`, href: '/get-away' },
  { icon: 'eye', label: 'Blind Services', title: 'I’m blind or have a visual impairment', link: 'Braille, large print & audio', href: '/blind-services' },
  { icon: 'users', label: 'Chapters', title: 'I want to connect with families near me', link: 'Find a chapter', href: '/chapters' },
  { icon: 'church', label: 'Disability Friendly Church', title: 'I lead a church and want to be more welcoming', link: 'Free survey & ministry guide', href: '/disability-friendly-church' },
  { icon: 'homeHeart', label: 'Family of Hope', title: 'Our family needs support and encouragement', link: 'Family support services', href: '/family-support' },
  { icon: 'gift', label: 'Give & serve', title: 'I want to donate or volunteer', link: 'Ways to help', href: '/donate' },
]

function FindYourWay(): Html {
  return (
    <section aria-labelledby="paths-h" class="bg-cream-200 py-16 lg:py-24">
      <div class="wrap">
        <div class="mx-auto max-w-2xl text-center">
          <Eyebrow class="justify-center">Find your way</Eyebrow>
          <h2 id="paths-h" class="mt-3 text-3xl md:text-4xl">What brings you here today?</h2>
          <p class="mt-3 text-lg text-ink-muted">Choose the option that fits you best. Each one takes you straight to what you need.</p>
        </div>
        <ul class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {paths.map((p) => (
            <li>
              <a href={p.href} class="card group flex h-full gap-5 p-6 no-underline hover:border-navy-500">
                <ArchIcon name={p.icon} />
                <span class="block">
                  <span class="block text-sm font-bold tracking-[0.08em] text-sage-800 uppercase">{p.label}</span>
                  <span class="mt-1 block font-display text-xl leading-snug font-semibold text-navy-700">{p.title}</span>
                  <span class="mt-2 block font-bold text-navy-700 underline underline-offset-[0.18em] group-hover:decoration-2">{p.link}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function CampDates(): Html {
  return (
    <section aria-labelledby="camps-h" class="py-16 lg:py-24">
      <div class="wrap">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div class="max-w-2xl">
            <Eyebrow>Summer Get Away {campYear}</Eyebrow>
            <h2 id="camps-h" class="mt-3 text-3xl md:text-4xl">Five days of fun, faith and friendship</h2>
            <p class="mt-3 text-lg text-ink-muted">An overnight retreat for people with intellectual or physical disabilities, staffed by medical professionals and vetted volunteers.</p>
          </div>
          <a class="btn btn-outline self-start lg:self-auto" href="/get-away#locations">
            <Icon name="arrowRight" />
            All locations &amp; fees
          </a>
        </div>
        <ul class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" role="list">
          {camps.map((c) => (
            <li class="card flex flex-col p-5">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <h3 class="text-2xl lg:text-[1.375rem]">{c.state}</h3>
                {c === nextCamp && (
                  <span class="inline-flex items-center gap-1 rounded-full bg-navy-700 px-2.5 py-0.5 text-sm font-bold text-cream">
                    <Icon name="arrowRight" class="size-3.5" />
                    Next
                  </span>
                )}
              </div>
              <p class="mt-2 font-bold text-ink">{c.dates}</p>
              <p class="mt-1 text-sm text-ink-muted">
                {c.camp}, {c.town}
              </p>
              <div class="mt-auto pt-4">
                <p class="flex items-center gap-2 border-t border-dashed border-cream-300 pt-3 text-sm font-bold text-ink">
                  <Icon name="clock" class="size-4" />
                  Register by {c.registerBy}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function OurStory(): Html {
  const stats: [string, string][] = [
    ['1982', 'Founded by Rev. Charlie & Debbie Chivers'],
    [String(camps.length), 'Summer Get Away locations'],
    ['6', 'Chapters, including online'],
    ['Free', 'Church survey & ministry guide'],
  ]
  return (
    <section aria-labelledby="story-h" class="bg-cream-200 py-16 lg:py-24">
      <div class="wrap grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <ArchPhoto class="aspect-5/4 lg:aspect-[1.08]">
          <Picture name="team" alt="Special Touch volunteers and campers standing together by a lake." width={1400} height={434} class="size-full object-cover object-[48%_center]" />
        </ArchPhoto>
        <div>
          <Eyebrow>Our story</Eyebrow>
          <h2 id="story-h" class="mt-3 text-3xl md:text-4xl">From a summer camp for 32 people to a nationwide mission</h2>
          <figure class="mt-4">
            <blockquote class="font-display text-2xl leading-snug text-navy-700">
              <p>“Every ‘BODY’ needs to hear the message of love and saving grace. Our people group cannot be left out.”</p>
            </blockquote>
            <figcaption class="mt-3 text-ink-muted">
              <strong class="text-ink">Rev. Debra Chivers</strong>, Executive Director
            </figcaption>
          </figure>
          <dl class="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map(([value, label]) => (
              <div class="flex flex-col rounded-b-xl border-t-4 border-navy-700 bg-cream p-4">
                <dt class="order-2 mt-1 text-sm text-ink-muted">{label}</dt>
                <dd class="order-1 font-display text-3xl font-semibold text-navy-700">{value}</dd>
              </div>
            ))}
          </dl>
          <a class="btn btn-outline mt-8" href={storyVideoUrl}>
            <Icon name="play" />
            Watch our story
          </a>
        </div>
      </div>
    </section>
  )
}

function MissionVisionPurpose(): Html {
  const items: [IconName, string, string][] = [
    ['dove', 'Mission', 'To ease and enrich the lives of people impacted by disability.'],
    ['eye', 'Vision', 'To provide faith-based support to the needs that arise in the disability community.'],
    ['hand', 'Purpose', 'Opportunities for people with disabilities to experience God, be included in the church, and build meaningful relationships with caring believers.'],
  ]
  return (
    <section aria-labelledby="mvp-h" class="bg-sage-100 py-16 lg:py-20">
      <div class="wrap">
        <h2 id="mvp-h" class="sr-only">
          Mission, vision and purpose
        </h2>
        <ul class="grid gap-5 md:grid-cols-3" role="list">
          {items.map(([iconName, title, text]) => (
            <li class="rounded-3xl border border-sage-300 bg-cream p-6">
              <h3 class="flex items-center gap-3 text-2xl">
                <Icon name={iconName} class="size-6 text-sage-800" />
                {title}
              </h3>
              <p class="mt-2 text-ink">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function StayConnected(): Html {
  const links: [IconName, string, string, string][] = [
    ['prayer', 'Send a prayer request', 'Our team prays over every request', '/prayer-request'],
    ['youtube', 'Watch on YouTube', 'Camp stories and DFC trainings', social.youtube],
    ['facebook', 'Follow on Facebook', 'News from camps and chapters', social.facebook],
  ]
  const signupAs = ['An individual', 'A church', 'A business or organization']

  return (
    <section aria-labelledby="connect-h" class="py-16 lg:py-24">
      <div class="wrap grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow>Stay connected</Eyebrow>
          <h2 id="connect-h" class="mt-3 text-3xl md:text-4xl">Pray with us and follow along</h2>
          <ul class="mt-6 space-y-4" role="list">
            {links.map(([iconName, title, text, href]) => (
              <li>
                <a href={href} class="group flex items-center gap-4 rounded-2xl border-2 border-sage-300 bg-cream p-4 no-underline hover:border-navy-500">
                  <span class="grid size-11 shrink-0 place-items-center rounded-full bg-navy-700 text-cream">
                    <Icon name={iconName} />
                  </span>
                  <span>
                    <span class="block font-bold text-navy-700 underline underline-offset-[0.18em] group-hover:decoration-2">{title}</span>
                    <span class="block text-sm text-ink-muted">{text}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* TODO(confirm): newsletter provider (the form only validates and thanks for now). */}
        <form id="newsletter" aria-labelledby="newsletter-h" class="card border-t-[6px] border-t-sage-500 p-6 sm:p-8" data-newsletter>
          <h3 id="newsletter-h" class="text-2xl">
            Get our newsletter
          </h3>
          <p class="mt-2 text-ink-muted">News, camp dates and stories by email. Opt out any time.</p>
          <div data-error-summary hidden tabindex="-1" class="alert mt-5"></div>
          <div class="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label class="field-label" for="nl-first">
                First name <Required />
              </label>
              <input class="field-input" id="nl-first" name="firstName" autocomplete="given-name" required />
            </div>
            <div>
              <label class="field-label" for="nl-last">
                Last name
              </label>
              <input class="field-input" id="nl-last" name="lastName" autocomplete="family-name" />
            </div>
          </div>
          <fieldset class="mt-5">
            <legend class="field-label">I am signing up as</legend>
            <div class="flex flex-wrap gap-3">
              {signupAs.map((label, i) => (
                <label class="group chip">
                  <input class="sr-only" type="radio" name="signupAs" value={label} checked={i === 0} />
                  <span class="hidden group-has-checked:inline">
                    <Icon name="check" class="size-4" />
                  </span>
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
          <div class="mt-5">
            <label class="field-label" for="nl-email">
              Email <Required />
            </label>
            <input class="field-input" id="nl-email" name="email" type="email" inputmode="email" autocomplete="email" required />
          </div>
          <Honeypot />
          <button type="submit" class="btn btn-primary mt-6">
            <Icon name="mail" />
            Sign me up
          </button>
          <p class="mt-4 text-sm text-ink-muted">No math puzzles. We use invisible spam protection instead.</p>
          <div data-form-status role="status" class="mt-4 empty:hidden"></div>
        </form>
      </div>
    </section>
  )
}

export function render(): Html {
  return (
    <>
      <Hero />
      <FindYourWay />
      <CampDates />
      <OurStory />
      <MissionVisionPurpose />
      <StayConnected />
    </>
  )
}

export function mount(root: HTMLElement): () => void {
  const form = root.querySelector<HTMLFormElement>('[data-newsletter]')
  if (!form) return () => {}
  return initForm(form, {
    onSuccess(f) {
      const status = f.querySelector<HTMLElement>('[data-form-status]')
      const name = f.querySelector<HTMLInputElement>('#nl-first')?.value.trim() ?? ''
      if (status) {
        status.innerHTML = String(
          <p class="alert alert-success">
            <Icon name="checkCircle" class="size-6 mt-0.5" />
            <span>
              <strong>Thank you{name ? `, ${name}` : ''}!</strong> You’re on the list.
            </span>
          </p>,
        )
      }
      f.reset()
    },
  })
}
