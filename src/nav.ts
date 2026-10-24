// Header disclosures: the phone/tablet menu and the Search panel. Both close on every page change.

interface Disclosure {
  toggle: HTMLButtonElement
  panel: HTMLElement
  isOpen(): boolean
  setOpen(open: boolean): void
}

function disclosure(toggleSelector: string): Disclosure | null {
  const toggle = document.querySelector<HTMLButtonElement>(toggleSelector)
  const panel = document.getElementById(toggle?.getAttribute('aria-controls') ?? '')
  if (!toggle || !panel) return null

  const d: Disclosure = {
    toggle,
    panel,
    isOpen: () => toggle.getAttribute('aria-expanded') === 'true',
    setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open))
      panel.toggleAttribute('data-open', open)
    },
  }
  toggle.addEventListener('click', () => d.setOpen(!d.isOpen()))
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && d.isOpen()) {
      d.setOpen(false)
      toggle.focus()
    }
  })
  window.addEventListener('route:change', () => d.setOpen(false))
  return d
}

export function initNav(): void {
  const menu = disclosure('[data-nav-toggle]')
  if (!menu) return
  window.matchMedia('(min-width: 64rem)').addEventListener('change', () => menu.setOpen(false))
}

export function initSearch(): void {
  const search = disclosure('[data-search-toggle]')
  if (!search) return
  search.toggle.addEventListener('click', () => {
    if (search.isOpen()) search.panel.querySelector<HTMLInputElement>('input[type="search"]')?.focus()
  })
}
