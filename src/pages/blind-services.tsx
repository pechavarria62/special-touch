// Blind Services — design/screens/08-blind-services-pc.png, 09-blind-services-phone.png
import { Badge, Breadcrumb, Eyebrow, Icon, Picture } from '../components/ui.js'
import { icon, type IconName } from '../icons.js'
import { Fragment, h, type Html } from '../jsx.js'

// TODO(confirm): Tzadi kit video, per-resource "Learn more" pages and the Audio & Braille Resource Directory.
const tzadiVideoUrl = 'https://www.youtube.com/@specialtouchministry'
const orderUrl = '/blind-services/order'
const directoryUrl = '/contact'

function Hero(): Html {
  return (
    <section aria-labelledby="blind-h1" class="border-b border-cream-300">
      <div class="wrap grid items-center gap-10 py-10 md:py-14 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:py-16">
        <div>
          <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Blind Services' }]} />
          <Eyebrow class="mt-8">Blind Services</Eyebrow>
          <h1 id="blind-h1" class="mt-4 text-[2.125rem] leading-[1.1] sm:text-5xl lg:text-6xl">
            Making the Cross accessible
          </h1>
          <p class="mt-4 max-w-2xl text-lg text-ink-muted">
            Since 2019 we have been creating Braille, large-print and audio resources so people who are blind or have visual impairments can know Christ and grow in faith.
          </p>
          <div class="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
            <button type="button" class="btn btn-primary" data-listen>
              <span class="contents" data-listen-icon>
                <Icon name="speaker" />
              </span>
              <span data-listen-label>Listen to this page</span>
            </button>
            <a class="btn btn-outline" href={orderUrl}>
              <Icon name="arrowRight" />
              Order resources
            </a>
          </div>
          <p class="mt-3 hidden text-sm text-ink-muted" data-listen-unsupported>
            Your browser can’t read pages aloud. Your screen reader or the phone line below can help.
          </p>
        </div>

        <section aria-labelledby="talk-h" class="rounded-2xl border-l-[6px] border-sage-700 bg-sage-100 p-6 sm:p-8">
          <h2 id="talk-h" class="text-2xl">
            Talk to a person
          </h2>
          <p class="mt-3 text-ink">
            <strong>Nettamara</strong>, Administrator of Blind Services
          </p>
          <ul class="mt-3 space-y-2" role="list">
            <li class="flex items-center gap-3">
              <Icon name="phone" class="size-5 text-navy-700" />
              <a href="tel:+17152582713" class="font-bold">
                715-258-2713, option 2
              </a>
            </li>
            <li class="flex items-center gap-3">
              <Icon name="mail" class="size-5 text-navy-700" />
              <a href="mailto:blind@specialtouch.org" class="font-bold">
                blind@specialtouch.org
              </a>
            </li>
            <li class="flex items-center gap-3 text-ink">
              <Icon name="headphones" class="size-5 text-navy-700" />
              Daily devotional by phone: option 7
            </li>
          </ul>
        </section>
      </div>
    </section>
  )
}

function TzadiKit(): Html {
  return (
    <section aria-labelledby="tzadi-h" class="wrap pt-14 lg:pt-20">
      <div class="on-dark grid items-center gap-8 rounded-3xl bg-navy-700 p-6 text-cream sm:p-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        <div>
          <Eyebrow dark>New for children</Eyebrow>
          <h2 id="tzadi-h" class="mt-3 text-3xl text-cream md:text-4xl">
            Tzadi the Tiger Children’s Kit
          </h2>
          <p class="mt-3">
            A soft stuffed tiger, an audio storybook, and Bible stories in Braille with raised-line coloring pages, so children can enjoy the Gospel alongside their sighted friends.
          </p>
          <p class="mt-4 flex flex-wrap gap-2">
            <span class="sr-only">Formats: </span>
            <Badge icon="braille" dark>
              Braille
            </Badge>
            <Badge icon="headphones" dark>
              Audio
            </Badge>
            <Badge icon="hand" dark>
              Raised lines
            </Badge>
          </p>
          <a class="btn btn-on-dark mt-6" href={tzadiVideoUrl}>
            <Icon name="play" />
            Watch the video (captioned)
          </a>
        </div>
        <div class="arch aspect-[1.85] border-4 border-sage-500">
          <Picture name="braille-kit" alt="A child explores a Braille coloring book with raised-line pictures." width={1400} height={383} class="size-full object-cover object-[60%_center]" />
        </div>
      </div>
    </section>
  )
}

interface Resource {
  id: string
  short: string
  title: string
  text: string
  image: { name: string; alt: string; width: number; height: number }
  formats: [IconName, string][]
  cost: [IconName, string]
}

const resources: Resource[] = [
  {
    id: 'alive-in-5',
    short: 'Alive in 5',
    title: 'Alive in 5',
    text: 'Share the Gospel in five simple steps, adapted from Youth Alive.',
    image: { name: 'blind', alt: 'A hand reading a page of Braille.', width: 338, height: 272 },
    formats: [
      ['braille', 'Braille'],
      ['text', 'Large print'],
    ],
    cost: ['checkCircle', 'No cost if you qualify for NLS'],
  },
  {
    id: 'handbook',
    short: 'New Believer’s Handbook',
    title: 'New Believer’s Handbook',
    text: 'An easy-to-read foundation for new Christians.',
    image: { name: 'dtb-player', alt: 'A Digital Talking Book player with large tactile buttons.', width: 300, height: 195 },
    formats: [['headphones', 'Digital Talking Book']],
    cost: ['checkCircle', 'One-time fee'],
  },
  {
    id: 'sunday-school',
    short: 'Sunday School',
    title: 'Radiant Life Sunday School',
    text: 'Quarterly adult curriculum with a teacher’s guide.',
    image: { name: 'braille-child', alt: 'A child reading a Braille book with both hands.', width: 300, height: 251 },
    formats: [
      ['headphones', 'DTB cartridge'],
      ['text', 'Screen reader file'],
    ],
    cost: ['dollar', '$20 per quarter'],
  },
  {
    id: 'lending-library',
    short: 'Lending library',
    title: 'Church lending library',
    text: 'Faith-based children’s books for churches to borrow.',
    image: { name: 'church', alt: 'A white church with a tall steeple under a blue sky.', width: 300, height: 205 },
    formats: [
      ['braille', 'Contracted Braille'],
      ['text', 'Twin read'],
    ],
    cost: ['checkCircle', 'No cost'],
  },
]

function ResourceCard({ r }: { r: Resource }): Html {
  return (
    <article id={r.id} aria-labelledby={`${r.id}-h`} class="card flex scroll-mt-6 flex-col gap-5 p-5 sm:flex-row sm:p-6">
      <div class="arch aspect-[4/5] w-28 shrink-0 bg-cream-200 sm:w-36">
        <Picture name={r.image.name} alt={r.image.alt} width={r.image.width} height={r.image.height} class="size-full object-cover" />
      </div>
      <div>
        <h3 id={`${r.id}-h`} class="text-2xl">
          {r.title}
        </h3>
        <p class="mt-1 text-ink-muted">{r.text}</p>
        <p class="mt-3 flex flex-wrap gap-2">
          <span class="sr-only">Formats: </span>
          {r.formats.map(([iconName, label]) => (
            <Badge icon={iconName}>{label}</Badge>
          ))}
        </p>
        <p class="mt-3 flex items-center gap-2 font-bold text-ink">
          <Icon name={r.cost[0]} class="size-5" />
          <span class="sr-only">Cost: </span>
          {r.cost[1]}
        </p>
        <a href={orderUrl} class="mt-3 inline-flex min-h-11 items-center gap-2 font-bold">
          Learn more<span class="sr-only"> about {r.title}</span>
          <Icon name="arrowRight" class="size-4" />
        </a>
      </div>
    </article>
  )
}

function Resources(): Html {
  const more: [IconName, string, string, string, string][] = [
    ['users', 'online-community', 'Online Fellowship', 'Join the STM Online Community by Zoom or phone.', '/chapters#online'],
    ['book', 'directory', 'Audio & Braille Resource Directory', 'Where to find more accessible faith resources.', directoryUrl],
    ['church', 'ministry-support', 'Ministry Support', 'Help for your church through Disability Friendly Church.', '/disability-friendly-church'],
  ]
  const jumps: [string, string][] = [...resources.map((r): [string, string] => [r.short, `#${r.id}`]), ['Online community', '#online-community']]

  return (
    <section aria-labelledby="resources-h" class="wrap py-14 lg:py-20">
      <h2 id="resources-h" class="text-3xl md:text-4xl">
        Resources
      </h2>
      <nav aria-label="Jump to a resource" class="mt-5">
        <ul class="flex flex-wrap gap-3" role="list">
          {jumps.map(([label, href]) => (
            <li>
              <a href={href} class="inline-flex min-h-11 items-center rounded-full border-2 border-navy-500 bg-cream px-4 py-2 font-bold text-navy-700 no-underline hover:bg-navy-50 hover:underline">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <ul class="mt-8 grid gap-5 lg:grid-cols-2" role="list">
        {resources.map((r) => (
          <li>
            <ResourceCard r={r} />
          </li>
        ))}
      </ul>

      <h3 class="mt-12 text-2xl">More ways we help</h3>
      <ul class="mt-4 grid gap-4 md:grid-cols-3" role="list">
        {more.map(([iconName, id, title, text, href]) => (
          <li id={id} class="scroll-mt-6">
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

      <div class="mt-10 flex items-start gap-4 rounded-2xl border-2 border-navy-700 bg-cream p-6">
        <span class="grid size-12 shrink-0 place-items-center rounded-full bg-navy-700 text-cream">
          <Icon name="phone" />
        </span>
        <div>
          <h3 class="text-xl">Listen to God’s Word for Today</h3>
          <p class="mt-1 text-ink-muted">
            Call <a href="tel:+17152582713">715-258-2713</a> and choose option 7 for a daily scripture reading and devotional.
          </p>
        </div>
      </div>
    </section>
  )
}

export function render(): Html {
  return (
    <>
      <Hero />
      <TzadiKit />
      <Resources />
    </>
  )
}

/** "Listen to this page" reads the page's main content aloud with the browser's speech engine. */
export function mount(root: HTMLElement): () => void {
  const button = root.querySelector<HTMLButtonElement>('[data-listen]')
  const label = root.querySelector<HTMLElement>('[data-listen-label]')
  const iconSlot = root.querySelector<HTMLElement>('[data-listen-icon]')
  if (!button || !label || !iconSlot) return () => {}

  if (!('speechSynthesis' in window)) {
    button.hidden = true
    root.querySelector<HTMLElement>('[data-listen-unsupported]')?.classList.remove('hidden')
    return () => {}
  }

  const setReading = (reading: boolean): void => {
    label.textContent = reading ? 'Stop reading' : 'Listen to this page'
    iconSlot.innerHTML = icon(reading ? 'stop' : 'speaker')
  }

  const onClick = (): void => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel()
      setReading(false)
      return
    }
    const utterance = new SpeechSynthesisUtterance(root.innerText)
    utterance.lang = 'en-US'
    utterance.onend = () => setReading(false)
    utterance.onerror = () => setReading(false)
    speechSynthesis.speak(utterance)
    setReading(true)
  }

  button.addEventListener('click', onClick)
  return () => {
    button.removeEventListener('click', onClick)
    speechSynthesis.cancel()
  }
}
