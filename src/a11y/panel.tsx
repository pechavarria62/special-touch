// The accessibility tool — design/screens/20-a11y-panel-pc.png, 21-a11y-panel-active-pc.png, 22-a11y-panel-phone.png
// A round launcher (bottom-right) opens a panel on the right (a bottom sheet on phones).
// Light DOM + Tailwind classes; every tile is a <button aria-pressed> and every change is announced.
import { Icon } from '../components/ui.js'
import type { IconName } from '../icons.js'
import { Fragment, h, type Child, type Html } from '../jsx.js'
import { syncOverlays } from './overlays.js'
import {
  applySettings,
  emptySettings,
  groups,
  launcherHidden,
  loadSettings,
  profileActive,
  profiles,
  saveSettings,
  setLauncherHidden,
  settingDef,
  stateText,
  toggleProfile,
  type Profile,
  type SettingDef,
  type SettingId,
  type Settings,
} from './settings.js'
import { isSpeaking, onSpeakingChange, readPage, speak, speechSupported, stopSpeaking } from './speech.js'

// ---------- Rendering ----------

const tileBase =
  'group relative flex w-full cursor-pointer items-center gap-3 rounded-xl border-2 border-navy-500 bg-cream p-3 text-left text-navy-900 hover:bg-navy-50 ' +
  'aria-pressed:border-[3px] aria-pressed:border-navy-900 aria-pressed:bg-navy-700 aria-pressed:p-[0.6875rem] aria-pressed:text-cream aria-pressed:hover:bg-navy-800'

function TileIcon({ name }: { name: IconName }): Html {
  return (
    <span class="grid h-11 w-10 shrink-0 place-items-center rounded-t-full rounded-b-md border border-navy-200 bg-navy-50 text-navy-700 group-aria-pressed:border-cream group-aria-pressed:bg-cream">
      <Icon name={name} class="size-5" />
    </span>
  )
}

function CornerCheck(): Html {
  return (
    <span aria-hidden="true" class="absolute top-1.5 right-1.5 hidden size-6 place-items-center rounded-full border-2 border-cream bg-navy-700 text-cream group-aria-pressed:grid">
      <Icon name="check" class="size-3.5" />
    </span>
  )
}

/** Inner content of a setting tile (re-rendered on every change). */
function tileContent(def: SettingDef, level: number): string {
  const multi = def.levels.length > 1
  return String(
    <>
      <TileIcon name={def.icon} />
      <span class="min-w-0 pr-5">
        <span class="block leading-tight font-bold">{def.label}</span>
        <span class="mt-0.5 block text-sm font-bold text-ink-muted group-aria-pressed:text-cream">{stateText(def, level)}</span>
        {multi && (
          <span aria-hidden="true" class="mt-1.5 flex gap-1">
            {def.levels.map((_, i) => (
              <span class={`size-2.5 rounded-full border-2 border-navy-700 group-aria-pressed:border-cream ${i < level ? 'bg-navy-700 group-aria-pressed:bg-cream' : ''}`}></span>
            ))}
          </span>
        )}
      </span>
      <CornerCheck />
    </>,
  )
}

function SettingTile({ def }: { def: SettingDef }): Html {
  return (
    <button type="button" class={tileBase} data-setting={def.id} aria-pressed="false">
      {/* filled in by update() */}
    </button>
  )
}

function ProfileTile({ profile }: { profile: Profile }): Html {
  return (
    <button type="button" class={tileBase} data-profile={profile.id} aria-pressed="false">
      <TileIcon name={profile.icon} />
      <span class="pr-6">
        <span class="block font-bold">{profile.label}</span>
        <span class="block text-sm text-ink-muted group-aria-pressed:text-cream">{profile.description}</span>
      </span>
      <CornerCheck />
    </button>
  )
}

function Group({ title, id, children }: { title: string; id: string; children?: Child }): Html {
  return (
    <section aria-labelledby={`st-g-${id}`} class="rounded-2xl border border-cream-300 bg-cream p-4">
      <h3 id={`st-g-${id}`} class="font-sans text-base font-bold text-ink">
        {title}
      </h3>
      <div class="mt-3">{children}</div>
    </section>
  )
}

const headerButton =
  'inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center gap-1.5 rounded-full px-2 text-sm font-bold text-cream hover:bg-navy-800 hover:underline sm:px-3'

function Panel(): Html {
  return (
    <div
      id="st-a11y-panel"
      role="dialog"
      aria-modal="false"
      aria-labelledby="st-a11y-title"
      hidden
      data-st-keep
      class="fixed inset-x-0 bottom-0 z-100 flex max-h-[86dvh] flex-col overflow-hidden rounded-t-3xl bg-cream-200 text-ink shadow-[0_-8px_40px_-12px_rgb(15_31_51/0.45)] sm:inset-x-auto sm:right-[max(1.25rem,env(safe-area-inset-right))] sm:bottom-[calc(max(1.25rem,env(safe-area-inset-bottom))+4.75rem)] sm:max-h-[calc(100dvh-7rem)] sm:w-[27rem] sm:max-w-[calc(100vw-2.5rem)] sm:rounded-3xl sm:border sm:border-cream-300"
    >
      <div class="on-dark flex shrink-0 items-center justify-between gap-2 bg-navy-700 px-4 py-3 text-cream sm:px-5">
        <h2 id="st-a11y-title" tabindex="-1" class="flex items-center gap-3 font-sans text-2xl font-bold text-cream focus:shadow-none focus:outline-none">
          <span class="grid size-10 place-items-center rounded-full bg-cream text-navy-700">
            <Icon name="accessibility" class="size-6" />
          </span>
          Accessibility
        </h2>
        <div class="flex items-center">
          <button type="button" class={headerButton} data-st-reset>
            <Icon name="reset" class="size-5" />
            <span class="max-sm:sr-only">Reset</span>
            <span class="sr-only"> all settings</span>
          </button>
          <button type="button" class={headerButton} data-st-hide>
            <Icon name="eyeOff" class="size-5" />
            <span class="max-sm:sr-only">Hide</span>
            <span class="sr-only"> the accessibility button</span>
          </button>
          <button type="button" class={headerButton} data-st-close aria-label="Close accessibility options">
            <Icon name="close" class="size-6" />
          </button>
        </div>
      </div>

      <div class="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-4 sm:p-5">
        <Group title="Quick profiles" id="profiles">
          <div class="space-y-2.5">
            {profiles.map((p) => (
              <ProfileTile profile={p} />
            ))}
          </div>
        </Group>

        {groups.map((group) => (
          <Group title={group.title} id={group.id}>
            <div class="grid grid-cols-2 gap-2.5">
              {group.settings.map((def) => (
                <div data-st-speech-only={def.id === 'speak' ? '' : undefined}>
                  <SettingTile def={def} />
                </div>
              ))}
              {group.id === 'speech' && (
                <button type="button" class={tileBase.replace(/aria-pressed:\S+/g, '')} data-st-structure aria-expanded="false" aria-controls="st-structure">
                  <TileIcon name="list" />
                  <span>
                    <span class="block leading-tight font-bold">Page structure</span>
                    <span class="mt-0.5 block text-sm text-ink-muted">Jump to a section</span>
                  </span>
                </button>
              )}
            </div>
            {group.id === 'speech' && (
              <div>
                <div id="st-structure" hidden class="mt-3 rounded-xl border-2 border-navy-500 bg-cream p-3">
                  <p class="text-sm font-bold text-ink">Headings and regions on this page</p>
                  <ul class="mt-2 space-y-1" role="list" data-st-structure-list></ul>
                </div>
                <div class="mt-3 flex flex-wrap gap-2.5" data-st-speech-only>
                  <button type="button" class="btn btn-outline btn-sm" data-st-read>
                    <Icon name="speaker" class="size-4.5" />
                    Read this page
                  </button>
                  <button type="button" class="btn btn-outline btn-sm" data-st-stop aria-disabled="true">
                    <Icon name="stop" class="size-4.5" />
                    Stop reading
                  </button>
                </div>
                <p class="mt-3 hidden text-sm text-ink-muted" data-st-no-speech>
                  Read aloud isn’t available in this browser. A screen reader, or your device’s built-in “speak screen” option, can read pages for you.
                </p>
              </div>
            )}
          </Group>
        ))}
      </div>

      <p class="shrink-0 border-t border-cream-300 bg-cream-200 px-5 py-3 text-sm text-ink-muted">Your settings are saved on this device.</p>
      <p class="sr-only" aria-live="polite" data-st-status></p>
    </div>
  )
}

function Launcher(): Html {
  return (
    <button
      type="button"
      id="st-a11y-launcher"
      aria-label="Accessibility options"
      aria-expanded="false"
      aria-controls="st-a11y-panel"
      class="fixed right-[max(1.25rem,env(safe-area-inset-right))] bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-95 grid size-15 cursor-pointer place-items-center rounded-full bg-navy-700 text-cream shadow-[0_6px_20px_-4px_rgb(15_31_51/0.5)] ring-4 ring-cream hover:bg-navy-800"
    >
      <Icon name="accessibility" class="size-8" />
    </button>
  )
}

// ---------- Behavior ----------

export function initA11yPanel(): void {
  const root = document.createElement('div')
  root.id = 'st-a11y'
  root.innerHTML = String(<Launcher />) + String(<Panel />)
  document.body.append(root)

  const panel = root.querySelector<HTMLElement>('#st-a11y-panel')!
  const launcher = root.querySelector<HTMLButtonElement>('#st-a11y-launcher')!
  const title = root.querySelector<HTMLElement>('#st-a11y-title')!
  const status = root.querySelector<HTMLElement>('[data-st-status]')!
  const structureButton = root.querySelector<HTMLButtonElement>('[data-st-structure]')!
  const structureBox = root.querySelector<HTMLElement>('#st-structure')!
  const structureList = root.querySelector<HTMLElement>('[data-st-structure-list]')!
  const stopButton = root.querySelector<HTMLButtonElement>('[data-st-stop]')!

  let settings: Settings = loadSettings()
  let opener: HTMLElement | null = null
  launcher.hidden = launcherHidden()

  if (!speechSupported) {
    for (const el of root.querySelectorAll<HTMLElement>('[data-st-speech-only]')) el.hidden = true
    root.querySelector('[data-st-no-speech]')?.classList.remove('hidden')
  }

  const announce = (message: string): void => {
    status.textContent = ''
    window.setTimeout(() => (status.textContent = message), 50)
  }

  const update = (): void => {
    applySettings(settings)
    syncOverlays()
    for (const button of root.querySelectorAll<HTMLButtonElement>('[data-setting]')) {
      const def = settingDef(button.dataset.setting as SettingId)
      const level = settings[def.id]
      button.setAttribute('aria-pressed', String(level > 0))
      button.innerHTML = tileContent(def, level)
    }
    for (const button of root.querySelectorAll<HTMLButtonElement>('[data-profile]')) {
      const profile = profiles.find((p) => p.id === button.dataset.profile)!
      button.setAttribute('aria-pressed', String(profileActive(profile, settings)))
    }
  }

  const change = (next: Settings, message: string): void => {
    settings = next
    saveSettings(settings)
    update()
    announce(message)
  }

  const open = (from: HTMLElement | null): void => {
    opener = from
    panel.hidden = false
    launcher.setAttribute('aria-expanded', 'true')
    title.focus()
  }

  const close = (): void => {
    if (panel.hidden) return
    panel.hidden = true
    launcher.setAttribute('aria-expanded', 'false')
    // getClientRects() also works for position:fixed openers like the launcher (offsetParent is null for those).
    const back = opener && opener.isConnected && opener.getClientRects().length > 0 ? opener : document.querySelector<HTMLElement>('#site-header [data-a11y-open]')
    back?.focus()
  }

  const buildStructure = (): void => {
    const targets: { label: string; el: HTMLElement; level: number }[] = []
    const add = (el: Element | null, label: string, level: number): void => {
      if (el instanceof HTMLElement && el.getClientRects().length > 0) targets.push({ label, el, level })
    }
    add(document.getElementById('site-nav'), 'Main menu', 0)
    add(document.getElementById('main'), 'Main content', 0)
    for (const heading of document.querySelectorAll<HTMLElement>('#main :is(h1, h2, h3)')) {
      add(heading, heading.textContent?.replace(/\s+/g, ' ').trim() ?? '', Number(heading.tagName[1]))
    }
    add(document.getElementById('site-footer'), 'Footer', 0)
    structureList.innerHTML = targets
      .map(({ label, level }, i) => {
        const indent = level === 2 ? 'pl-4' : level === 3 ? 'pl-8' : ''
        const kind = level === 0 ? 'Region' : `Heading ${level}`
        return String(
          <li class={indent}>
            <button type="button" data-st-jump={i} class="min-h-11 w-full cursor-pointer rounded-lg px-2 py-1.5 text-left text-navy-700 underline underline-offset-[0.18em] hover:bg-navy-50">
              <span class="sr-only">{kind}: </span>
              {label}
            </button>
          </li>,
        )
      })
      .join('')
    structureList.onclick = (event) => {
      const button = (event.target as Element | null)?.closest<HTMLElement>('[data-st-jump]')
      if (!button) return
      const target = targets[Number(button.dataset.stJump)]?.el
      if (!target) return
      opener = null
      close()
      if (!target.matches('a, button, input, select, textarea, [tabindex]')) target.tabIndex = -1
      target.scrollIntoView({ block: 'start' })
      target.focus({ preventScroll: true })
    }
  }

  root.addEventListener('click', (event) => {
    const el = (event.target as Element | null)?.closest<HTMLElement>('button')
    if (!el) return
    if (el === launcher) return panel.hidden ? open(launcher) : close()

    if (el.dataset.setting) {
      const def = settingDef(el.dataset.setting as SettingId)
      const level = (settings[def.id] + 1) % (def.levels.length + 1)
      change({ ...settings, [def.id]: level }, `${def.label}: ${stateText(def, level)}`)
    } else if (el.dataset.profile) {
      const profile = profiles.find((p) => p.id === el.dataset.profile)!
      const next = toggleProfile(profile, settings)
      change(next, `${profile.label} profile ${profileActive(profile, next) ? 'on' : 'off'}`)
    } else if (el.hasAttribute('data-st-reset')) {
      stopSpeaking()
      change(emptySettings(), 'All accessibility settings are off')
    } else if (el.hasAttribute('data-st-hide')) {
      setLauncherHidden(true)
      launcher.hidden = true
      opener = null
      close()
      announce('Accessibility button hidden. Use “Accessibility” at the top of the page to open these options again.')
    } else if (el.hasAttribute('data-st-close')) {
      close()
    } else if (el === structureButton) {
      const expanded = structureButton.getAttribute('aria-expanded') !== 'true'
      if (expanded) buildStructure()
      structureButton.setAttribute('aria-expanded', String(expanded))
      structureBox.hidden = !expanded
    } else if (el.hasAttribute('data-st-read')) {
      readPage()
    } else if (el === stopButton && stopButton.getAttribute('aria-disabled') !== 'true') {
      stopSpeaking()
    }
  })

  // Anything with data-a11y-open (top-bar pill, footer button, skip link, Contact page) opens the panel.
  document.addEventListener('click', (event) => {
    const trigger = (event.target as Element | null)?.closest<HTMLElement>('[data-a11y-open]')
    if (trigger) open(trigger)
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) close()
  })

  // Read on click: speak the block of text that was clicked (links and buttons still work as usual).
  document.addEventListener('click', (event) => {
    if (!settings.speak || !(event.target instanceof Element) || root.contains(event.target)) return
    const block = event.target.closest('a, button, label, summary, p, li, h1, h2, h3, h4, blockquote, figcaption, dt, dd, td, th')
    if (block instanceof HTMLElement) speak(block.getAttribute('aria-label') ?? block.innerText)
  })

  onSpeakingChange((speaking) => stopButton.setAttribute('aria-disabled', String(!speaking)))
  stopButton.setAttribute('aria-disabled', String(!isSpeaking()))

  window.addEventListener('route:change', () => {
    stopSpeaking()
    structureButton.setAttribute('aria-expanded', 'false')
    structureBox.hidden = true
  })

  update()
}
