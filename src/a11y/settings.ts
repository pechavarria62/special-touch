// Accessibility settings: what exists, how many levels each has, the quick profiles,
// and how they are saved (localStorage) and applied (data-st-<id>="<level>" on <html>).
// The visual effects themselves are CSS rules in src/style.css (@layer base).
import type { IconName } from '../icons.js'

export type SettingId =
  | 'text'
  | 'line-height'
  | 'spacing'
  | 'align'
  | 'font'
  | 'contrast'
  | 'grayscale'
  | 'images'
  | 'motion'
  | 'cursor'
  | 'links'
  | 'focus'
  | 'mask'
  | 'guide'
  | 'speak'

export interface SettingDef {
  id: SettingId
  label: string
  icon: IconName
  /** One label per level (level 1 = first). A single label means a simple on/off setting. */
  levels: string[]
}

export type GroupId = 'text' | 'visual' | 'reading' | 'speech'

export const groups: { id: GroupId; title: string; settings: SettingDef[] }[] = [
  {
    id: 'text',
    title: 'Text',
    settings: [
      { id: 'text', label: 'Bigger text', icon: 'text', levels: ['125%', '150%', '200%'] },
      { id: 'line-height', label: 'Line height', icon: 'lineHeight', levels: ['Taller', 'Tallest'] },
      { id: 'spacing', label: 'Text spacing', icon: 'spacing', levels: ['Wider', 'Widest'] },
      { id: 'align', label: 'Align text left', icon: 'alignLeft', levels: ['On'] },
      { id: 'font', label: 'Readable font', icon: 'text', levels: ['On'] },
    ],
  },
  {
    id: 'visual',
    title: 'Visual',
    settings: [
      { id: 'contrast', label: 'High contrast', icon: 'contrast', levels: ['Dark', 'Light'] },
      { id: 'grayscale', label: 'Grayscale', icon: 'droplet', levels: ['On'] },
      { id: 'images', label: 'Hide images', icon: 'image', levels: ['Hidden'] },
      { id: 'motion', label: 'Pause animations', icon: 'pause', levels: ['Paused'] },
      { id: 'cursor', label: 'Big cursor', icon: 'pointer', levels: ['On'] },
    ],
  },
  {
    id: 'reading',
    title: 'Reading & navigation',
    settings: [
      { id: 'links', label: 'Highlight links', icon: 'link', levels: ['On'] },
      { id: 'focus', label: 'Strong focus', icon: 'focus', levels: ['On'] },
      { id: 'mask', label: 'Reading mask', icon: 'mask', levels: ['On'] },
      { id: 'guide', label: 'Reading guide', icon: 'guide', levels: ['On'] },
    ],
  },
  {
    id: 'speech',
    title: 'Read aloud & page tools',
    settings: [{ id: 'speak', label: 'Read on click', icon: 'speaker', levels: ['On'] }],
  },
]

export const settingDefs: SettingDef[] = groups.flatMap((g) => g.settings)

export function settingDef(id: SettingId): SettingDef {
  return settingDefs.find((s) => s.id === id)!
}

export interface Profile {
  id: string
  label: string
  description: string
  icon: IconName
  settings: Partial<Record<SettingId, number>>
}

export const profiles: Profile[] = [
  {
    id: 'low-vision',
    label: 'Low vision',
    description: 'Bigger text, strong focus, highlighted links, big cursor',
    icon: 'eye',
    settings: { text: 2, 'line-height': 1, links: 1, focus: 1, cursor: 1 },
  },
  {
    id: 'dyslexia',
    label: 'Dyslexia friendly',
    description: 'Readable font, extra spacing, left-aligned text, reading guide',
    icon: 'text',
    settings: { font: 1, spacing: 1, 'line-height': 1, align: 1, guide: 1 },
  },
  {
    id: 'motion',
    label: 'Motion & seizure safe',
    description: 'Stops animations and removes strong color',
    icon: 'clock',
    settings: { motion: 1, grayscale: 1 },
  },
]

export type Settings = Record<SettingId, number>

const storageKey = 'st-a11y:v1'

export function emptySettings(): Settings {
  return Object.fromEntries(settingDefs.map((s) => [s.id, 0])) as Settings
}

/** Reads saved settings, ignoring anything unknown or out of range. Never throws. */
export function loadSettings(): Settings {
  const settings = emptySettings()
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) ?? '{}') as { settings?: Record<string, unknown> }
    for (const def of settingDefs) {
      const level = saved.settings?.[def.id]
      if (typeof level === 'number' && Number.isInteger(level) && level >= 0 && level <= def.levels.length) settings[def.id] = level
    }
  } catch {
    // Private mode or blocked storage: start with everything off.
  }
  return settings
}

export function saveSettings(settings: Settings): void {
  try {
    const onlyOn = Object.fromEntries(Object.entries(settings).filter(([, level]) => level > 0))
    localStorage.setItem(storageKey, JSON.stringify({ settings: onlyOn }))
  } catch {
    // Storage unavailable: settings still apply for this page view.
  }
}

/** Writes every setting to <html> as data-st-<id>="<level>" (removed when off). */
export function applySettings(settings: Settings): void {
  const root = document.documentElement
  for (const def of settingDefs) {
    const level = settings[def.id]
    if (level > 0) root.setAttribute(`data-st-${def.id}`, String(level))
    else root.removeAttribute(`data-st-${def.id}`)
  }
}

/** "Off", "On", or "150% · 2 of 3". */
export function stateText(def: SettingDef, level: number): string {
  if (level === 0) return 'Off'
  if (def.levels.length === 1) return def.levels[0]!
  return `${def.levels[level - 1]} · ${level} of ${def.levels.length}`
}

/** A profile is on while every one of its settings is at least at the profile's level. */
export function profileActive(profile: Profile, settings: Settings): boolean {
  return Object.entries(profile.settings).every(([id, level]) => settings[id as SettingId] >= level)
}

/** Turns a profile on or off. Turning off keeps settings another active profile still needs. */
export function toggleProfile(profile: Profile, settings: Settings): Settings {
  const next = { ...settings }
  if (!profileActive(profile, settings)) {
    for (const [id, level] of Object.entries(profile.settings)) next[id as SettingId] = Math.max(next[id as SettingId], level)
    return next
  }
  const others = profiles.filter((p) => p !== profile && profileActive(p, settings))
  for (const id of Object.keys(profile.settings) as SettingId[]) {
    const stillNeeded = others.map((p) => p.settings[id] ?? 0)
    next[id] = Math.max(0, ...stillNeeded)
  }
  return next
}

// ---------- Launcher visibility ("Hide" lasts for this browser session) ----------

const hiddenKey = 'st-a11y:launcher-hidden'

export function launcherHidden(): boolean {
  try {
    return sessionStorage.getItem(hiddenKey) === '1'
  } catch {
    return false
  }
}

export function setLauncherHidden(hidden: boolean): void {
  try {
    if (hidden) sessionStorage.setItem(hiddenKey, '1')
    else sessionStorage.removeItem(hiddenKey)
  } catch {
    // Ignore: the launcher simply comes back on the next page load.
  }
}
