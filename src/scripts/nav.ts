// Phone/tablet menu: toggles the main nav under 64rem. Without JS the nav is always visible.
export function initNav(): void {
  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]')
  const nav = document.getElementById('site-nav')
  if (!toggle || !nav) return

  const isOpen = (): boolean => toggle.getAttribute('aria-expanded') === 'true'
  const setOpen = (open: boolean): void => {
    toggle.setAttribute('aria-expanded', String(open))
    nav.toggleAttribute('data-open', open)
  }

  toggle.addEventListener('click', () => setOpen(!isOpen()))

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false)
      toggle.focus()
    }
  })

  window.matchMedia('(min-width: 64rem)').addEventListener('change', () => setOpen(false))
}
