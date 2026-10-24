// Shared site content: navigation, contact details and links.
// Items marked TODO(confirm) need real URLs from the ministry.

export interface Link {
  label: string
  href: string
}

export const org = {
  name: 'Special Touch Ministry, Inc.',
  shortName: 'Special Touch Ministry',
  tagline: 'Serving the concerns of people with disabilities since 1982',
  address: 'P.O. Box 25, Waupaca, WI 54981',
  phone: '715-258-2713',
  phoneHref: 'tel:+17152582713',
  email: 'ministry@specialtouch.org',
  officeHours: 'Office hours: Monday–Thursday, 10:00am–4:00pm CST',
}

export const social = {
  facebook: 'https://www.facebook.com/specialtouchministry', // TODO(confirm)
  youtube: 'https://www.youtube.com/@specialtouchministry', // TODO(confirm)
  candid: 'https://www.guidestar.org/', // TODO(confirm): exact Candid profile URL
}

export const donateHref = '/donate/' // TODO(confirm): external donation processor URL, if any

export const mainNav: Link[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about/' },
  { label: 'Get Away', href: '/get-away/' },
  { label: 'Blind Services', href: '/blind-services/' },
  { label: 'Chapters', href: '/chapters/' },
  { label: 'Disability Friendly Church', href: '/disability-friendly-church/' },
  { label: 'Family Support', href: '/family-support/' },
  { label: 'Contact', href: '/contact/' },
]

export const programLinks: Link[] = [
  { label: 'Summer Get Away', href: '/get-away/' },
  { label: 'Chapters', href: '/chapters/' },
  { label: 'Disability Friendly Church', href: '/disability-friendly-church/' },
  { label: 'Blind Services', href: '/blind-services/' },
  { label: 'Family Support', href: '/family-support/' },
]

export const otherLinks: Link[] = [
  { label: 'MA Resources', href: '/ma-resources/' },
  { label: 'Chapter Staff', href: '/chapter-staff/' },
  { label: 'Prayer Request', href: '/prayer-request/' },
  { label: 'Our Leadership', href: '/about/#leadership' },
  { label: 'Privacy & Terms', href: '/privacy/' },
  { label: 'View our Candid (GuideStar) profile', href: social.candid },
]

export const accessibilityStatement =
  'Special Touch Ministry is committed to website accessibility. If you have any difficulty, email'
