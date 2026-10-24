// Special Touch Chapters, grouped by state for the Chapters page filter.

export type ChapterRegion = 'Connecticut' | 'Florida' | 'Wisconsin' | 'Online'

export interface ChapterNote {
  kind: 'upcoming' | 'info'
  label: string
  text: string
  link?: { label: string; href: string }
}

export interface Chapter {
  id: string
  name: string
  region: ChapterRegion
  meets: string
  place: string
  phone: string
  email: string
  note?: ChapterNote
  // TODO(confirm): each chapter's registration form and Facebook page.
  facebookUrl: string
}

const facebookUrl = 'https://www.facebook.com/SpecialTouchMinistry'

export const regions: ChapterRegion[] = ['Connecticut', 'Florida', 'Wisconsin', 'Online']

export const chapters: Chapter[] = [
  {
    id: 'nutmeg',
    name: 'Nutmeg Chapter',
    region: 'Connecticut',
    meets: 'Every other month, Saturday, 10:30am–1:30pm EST',
    place: 'Hope Christian Church, North Haven',
    phone: '860-346-4138',
    email: 'stnutmegchapter@gmail.com',
    facebookUrl,
  },
  {
    id: 'first-coast',
    name: 'First Coast Chapter',
    region: 'Florida',
    meets: '4th Saturday of most months, 1–4pm EST',
    place: 'Old Plank Road Baptist Church, Jacksonville',
    phone: '904-303-5290',
    email: 'stfirstcoast@gmail.com',
    note: { kind: 'upcoming', label: 'Upcoming:', text: 'Wii Bowling Fundraiser, July 25' },
    facebookUrl,
  },
  {
    id: 'nassau',
    name: 'Nassau Chapter',
    region: 'Florida',
    meets: '2nd Saturday of each month, 1–4pm EST',
    place: 'First Assembly of God, Fernandina Beach',
    phone: '904-868-9898',
    email: 'charspecialtouch@att.net',
    facebookUrl,
  },
  {
    id: 'beaver-dam',
    name: 'Beaver Dam Chapter',
    region: 'Wisconsin',
    meets: '3rd Friday of each month, 6:30pm',
    place: 'First Lutheran Church, Beaver Dam',
    phone: '920-210-7035',
    email: 'nhodgson71@charter.net',
    // TODO(confirm): participation waiver link
    note: { kind: 'info', label: 'Ms. Kim’s Amazing Animals:', text: '', link: { label: 'sign the participation waiver', href: '/contact' } },
    facebookUrl,
  },
  {
    id: 'greater-milwaukee',
    name: 'Greater Milwaukee Chapter',
    region: 'Wisconsin',
    meets: '2nd Saturday of each month, 1–3pm',
    place: 'Honey Creek Church, Wauwatosa',
    phone: '414-429-2656',
    email: 'nvyvyan77@wi.rr.com',
    // TODO(confirm): fundraiser registration/donation link
    note: { kind: 'upcoming', label: 'Upcoming:', text: 'Trivia Game Night Fundraiser.', link: { label: 'Register or donate', href: '/donate' } },
    facebookUrl,
  },
]

export const onlineCommunity = {
  id: 'online',
  name: 'STM Online Community',
  text: 'Meets monthly on Zoom or by phone. A safe place for anyone impacted by disability or sight loss. All are welcome.',
  contactName: 'Lori',
  email: 'loribullington.specialtouch@gmail.com',
  // TODO(confirm): Facebook group URL
  facebookUrl,
}

export interface ChapterEvent {
  month: string
  day: string
  title: string
  where: string
}

export const chapterEvents: ChapterEvent[] = [
  { month: 'Jul', day: '25', title: 'Wii Bowling Fundraiser', where: 'First Coast & Nassau, FL' },
  { month: 'TBA', day: '★', title: 'Trivia Game Night', where: 'Greater Milwaukee, WI' },
]

/** Google Maps search link for a meeting place. */
export function directionsUrl(place: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`
}

export function telHref(phone: string): string {
  return `tel:+1${phone.replace(/\D/g, '')}`
}
