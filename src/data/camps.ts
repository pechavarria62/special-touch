// Summer Get Away 2026 locations, dates and fees.

export interface Camp {
  state: string
  /** Postal code, used in short lists ("OK, FL, OH, WI, GA"). */
  abbr: string
  dates: string
  registerBy: string
  camp: string
  town: string
  coordinators: string
  fees: { noCare: number; care: number; cit: number }
  registrationUrl: string
}

// TODO(confirm): CampDoc registration link for each location (until then, "Register" goes to Contact).
const registrationUrl = '/contact'

export const campYear = 2026
export const campSeason = 'May 18 – August 21'

export const camps: Camp[] = [
  {
    state: 'Oklahoma',
    abbr: 'OK',
    dates: 'May 18–22',
    registerBy: 'April 20',
    camp: 'New Life Ranch Frontier Cove',
    town: 'Adair',
    coordinators: 'Thomas & Angelia Carpenter',
    fees: { noCare: 500, care: 600, cit: 400 },
    registrationUrl,
  },
  {
    state: 'Florida',
    abbr: 'FL',
    dates: 'May 25–29',
    registerBy: 'April 27',
    camp: 'Lake Aurora Christian Camp',
    town: 'Lake Wales',
    coordinators: 'Charlene Phipps',
    fees: { noCare: 650, care: 850, cit: 325 },
    registrationUrl,
  },
  {
    state: 'Ohio',
    abbr: 'OH',
    dates: 'Aug 10–14',
    registerBy: 'July 13',
    camp: 'Heartland Conference & Retreat Center',
    town: 'Marengo',
    coordinators: 'Duane & Tracie Corll',
    fees: { noCare: 575, care: 695, cit: 375 },
    registrationUrl,
  },
  {
    state: 'Wisconsin',
    abbr: 'WI',
    dates: 'Aug 10–14',
    registerBy: 'July 13',
    camp: 'Spencer Lake Christian Center',
    town: 'Waupaca',
    coordinators: 'Debbie Chivers · Steve & Bekah Kjetland',
    fees: { noCare: 560, care: 735, cit: 325 },
    registrationUrl,
  },
  {
    state: 'Georgia',
    abbr: 'GA',
    dates: 'Aug 17–21',
    registerBy: 'July 20',
    camp: 'Timber Lake Retreat Center',
    town: 'Forsyth',
    coordinators: 'Joe & Ann Trementozzi',
    fees: { noCare: 575, care: 700, cit: 350 },
    registrationUrl,
  },
]

/** "May 18–22" → { month: "May", days: "18–22" } for the arch date badges. */
export function splitDates(dates: string): { month: string; days: string } {
  const [month = '', days = ''] = dates.split(' ')
  return { month, days }
}

/** The camp shown with the "Next" badge. */
export const nextCamp: Camp = camps[0]!
