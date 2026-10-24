// Reading mask (dims the page except a band around the pointer or focused element)
// and reading guide (a bar under the line being read). Both follow the mouse, touch and keyboard focus.

const band = 112 // px of clear space in the reading mask

let y = 0
let mask: HTMLElement[] = []
let guide: HTMLElement | null = null

function create(className: string): HTMLElement {
  const el = document.createElement('div')
  el.className = className
  el.setAttribute('aria-hidden', 'true')
  el.dataset.stKeep = '' // high contrast must not repaint these
  el.hidden = true
  document.body.append(el)
  return el
}

function position(): void {
  const [top, bottom] = mask
  if (top && bottom) {
    top.style.height = `${Math.max(0, y - band / 2)}px`
    bottom.style.top = `${y + band / 2}px`
  }
  if (guide) guide.style.top = `${y + 14}px`
}

function follow(newY: number): void {
  y = newY
  window.requestAnimationFrame(position)
}

/** Shows or hides the overlays to match the current <html> data-st-* attributes. */
export function syncOverlays(): void {
  const root = document.documentElement
  const maskOn = root.hasAttribute('data-st-mask')
  const guideOn = root.hasAttribute('data-st-guide')
  for (const el of mask) el.hidden = !maskOn
  if (guide) guide.hidden = !guideOn
  position()
}

export function initOverlays(): void {
  y = window.innerHeight / 2
  mask = [
    create('pointer-events-none fixed inset-x-0 top-0 z-90 bg-navy-900/75'),
    create('pointer-events-none fixed inset-x-0 bottom-0 z-90 bg-navy-900/75'),
  ]
  guide = create('pointer-events-none fixed inset-x-0 z-90 h-1.5 bg-navy-700 shadow-[0_0_0_3px_var(--color-cream)]')

  window.addEventListener('pointermove', (event) => follow(event.clientY), { passive: true })
  document.addEventListener('focusin', (event) => {
    if (!(event.target instanceof Element)) return
    const rect = event.target.getBoundingClientRect()
    follow(rect.top + rect.height / 2)
  })
  syncOverlays()
}
