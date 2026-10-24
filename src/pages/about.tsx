// About Us — design/screens/04-about-pc.png, 05-about-phone.png
import { ArchPhoto, ArchTile, Breadcrumb, Eyebrow, Icon, Picture } from '../components/ui.js'
import type { IconName } from '../icons.js'
import { Fragment, h, type Html } from '../jsx.js'
import { social } from '../layout/header.js'

// TODO(confirm): "Watch our story" video URL
const storyVideoUrl = social.youtube
// TODO(confirm): Ministry Team and Board of Directors pages, and the beliefs and affiliations links
const ministryTeamUrl = '/about#leadership'
const boardUrl = '/about#leadership'
const beliefsUrl = '/about#beliefs'
const affiliationsUrl = '/about#beliefs'

function Hero(): Html {
  return (
    <section aria-labelledby="about-h1">
      <div class="wrap grid items-center gap-12 py-10 md:py-14 lg:grid-cols-[1.3fr_1fr] lg:gap-14 lg:py-16">
        <div>
          <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />
          <Eyebrow class="mt-8">About Special Touch</Eyebrow>
          <h1 id="about-h1" class="mt-4 text-[2.125rem] leading-[1.1] sm:text-5xl lg:text-6xl">Opening the doors of the church since 1982</h1>
          <p class="mt-4 max-w-xl text-lg text-ink-muted">
            Special Touch Ministry began as a summer camp for 32 people. Today it is a nationwide mission dedicated to opening the doors of the church to people with disabilities, respected in both the faith and disability communities.
          </p>
          <div class="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
            <a class="btn btn-primary" href="#leadership">
              <Icon name="users" />
              Meet our leadership
            </a>
            <a class="btn btn-outline" href={storyVideoUrl}>
              <Icon name="play" />
              Watch our story
            </a>
          </div>
        </div>
        <ArchPhoto outline class="mx-auto aspect-[1.12] w-full max-w-xl lg:mr-0 lg:aspect-[1.25]">
          <Picture name="team" alt="Special Touch volunteers and campers standing together by a lake." width={1400} height={434} class="size-full object-cover object-[48%_center]" eager />
        </ArchPhoto>
      </div>
    </section>
  )
}

function OurStory(): Html {
  const timeline: [string, string][] = [
    ['1982', 'Rev. Charlie and Debbie Chivers start a summer camp for 32 people with disabilities.'],
    ['2019', 'Blind Services begins, creating Braille, large-print and audio resources.'],
    ['Today', 'Camps in five states, local chapters, church training and family support, nationwide.'],
  ]
  return (
    <section aria-labelledby="story-h" class="bg-cream-200 py-16 lg:py-24">
      <div class="wrap">
        <Eyebrow>Our story</Eyebrow>
        <h2 id="story-h" class="mt-3 text-3xl md:text-4xl">A God-given vision that keeps growing</h2>
        <ol class="mt-8 grid gap-5 md:grid-cols-3" role="list">
          {timeline.map(([year, text]) => (
            <li class="rounded-b-3xl border border-t-4 border-cream-300 border-t-navy-700 bg-cream p-6">
              <p class="font-display text-4xl font-semibold text-navy-700">{year}</p>
              <p class="mt-2 text-ink-muted">{text}</p>
            </li>
          ))}
        </ol>

        <figure class="on-dark mt-10 flex flex-col gap-8 rounded-3xl bg-navy-700 p-6 text-cream sm:p-10 md:flex-row md:items-center">
          <a
            href={storyVideoUrl}
            class="grid h-32 w-28 shrink-0 place-items-center rounded-t-full rounded-b-sm bg-sage-500 text-navy-900 hover:bg-sage-300"
            aria-label="Watch the video message from Rev. Debra Chivers"
          >
            <Icon name="play" class="size-10" />
          </a>
          <div>
            <blockquote class="font-display text-2xl leading-snug lg:text-[1.75rem]">
              <p>“Every ‘BODY’ needs to hear the message of love and saving grace. Our people group, people with disabilities, cannot be left out. A God-given vision will always be greater than the person called to fulfill it.”</p>
            </blockquote>
            <figcaption class="mt-3 font-bold text-sage-300">Rev. Debra Chivers, Executive Director</figcaption>
          </div>
        </figure>
      </div>
    </section>
  )
}

function CoreValues(): Html {
  const values: [string, string, string][] = [
    ['C', 'Create a safe, respectful environment', 'for every person’s potential and value'],
    ['R', 'Relationship', 'through servanthood'],
    ['A', 'Accessible faith', 'the Gospel for every body'],
    ['F', 'Friendship', 'without expecting anything in return'],
    ['T', 'Team-based ministry', 'serving together'],
  ]
  return (
    <section aria-labelledby="craft-h" class="py-16 lg:py-24">
      <div class="wrap">
        <div class="mx-auto max-w-2xl text-center">
          <Eyebrow class="justify-center">Core values</Eyebrow>
          <h2 id="craft-h" class="mt-3 text-3xl md:text-4xl">
            We live by CRAFT
          </h2>
          <p class="mt-3 text-lg text-ink-muted">Five values we hold most dear.</p>
        </div>
        <ol class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" role="list">
          {values.map(([letter, title, text]) => (
            <li class="card p-6">
              <ArchTile class="h-16 w-14 font-display text-3xl font-semibold">
                <span aria-hidden="true">{letter}</span>
              </ArchTile>
              <h3 class="mt-5 font-sans text-lg leading-snug font-bold text-navy-700">{title}</h3>
              <p class="mt-1 text-sm text-ink-muted">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Leadership(): Html {
  const traits = ['Character', 'Competence', 'Chemistry', 'Communication']
  const links: [IconName, string, string, string][] = [
    ['users', 'Ministry Team', 'Staff and missionaries', ministryTeamUrl],
    ['church', 'Board of Directors', 'Governance and oversight', boardUrl],
  ]
  return (
    <section id="leadership" aria-labelledby="lead-h" class="bg-cream-200 py-16 lg:py-24">
      <div class="wrap grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <div>
          <Eyebrow>Leadership culture</Eyebrow>
          <h2 id="lead-h" class="mt-3 text-3xl md:text-4xl">
            Trust built on intention and respect
          </h2>
          <p class="mt-3 text-ink">Our culture of communication builds trust. Every leader brings four key traits:</p>
          <ul class="mt-5 flex flex-wrap gap-3" role="list">
            {traits.map((trait) => (
              <li class="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-sage-700 bg-cream px-4 py-2 font-bold text-navy-700">
                <Icon name="checkCircle" class="size-5 text-sage-800" />
                {trait}
              </li>
            ))}
          </ul>
          <ul class="mt-6 grid gap-4 sm:grid-cols-2" role="list">
            {links.map(([iconName, title, text, href]) => (
              <li>
                <a href={href} class="group flex h-full items-center gap-4 rounded-2xl border-2 border-sage-300 bg-cream p-5 no-underline hover:border-navy-500">
                  <span class="grid size-12 shrink-0 place-items-center rounded-full bg-navy-700 text-cream">
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
        <ArchPhoto class="aspect-square w-full sm:aspect-[1.4]">
          <Picture name="getaway" alt="Three Summer Get Away staff and campers in climbing helmets give a thumbs up." width={800} height={499} class="size-full object-cover" />
        </ArchPhoto>
      </div>
    </section>
  )
}

function Beliefs(): Html {
  const cards: { title: string; text: string; link?: [string, string] }[] = [
    { title: 'Who we are', text: 'Special Touch Ministry, Inc. is a non-profit, faith-based organization that is interdenominational in scope.' },
    { title: 'Our beliefs', text: 'The foundation of our ministry.', link: ['Read our beliefs', beliefsUrl] },
    { title: 'Our affiliations', text: 'Partners who stand with us.', link: ['See our affiliations', affiliationsUrl] },
  ]
  return (
    <section id="beliefs" aria-labelledby="beliefs-h" class="py-16 lg:py-24">
      <div class="wrap">
        <Eyebrow>Beliefs &amp; affiliations</Eyebrow>
        <h2 id="beliefs-h" class="mt-3 text-3xl md:text-4xl">
          Faith-based and interdenominational
        </h2>
        <ul class="mt-8 grid gap-5 lg:grid-cols-[1.2fr_1fr_1fr]" role="list">
          {cards.map(({ title, text, link }) => (
            <li class="card p-6">
              <h3 class="text-2xl">{title}</h3>
              <p class="mt-2 text-ink-muted">{text}</p>
              {link && (
                <a href={link[1]} class="mt-4 inline-flex min-h-11 items-center gap-2 font-bold">
                  {link[0]}
                  <Icon name="arrowRight" class="size-4" />
                </a>
              )}
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
      <OurStory />
      <CoreValues />
      <Leadership />
      <Beliefs />
    </>
  )
}
