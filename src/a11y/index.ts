// Accessibility tool: settings panel, page effects, reading overlays and read-aloud.
import { initOverlays } from './overlays.js'
import { initA11yPanel } from './panel.js'

export function initA11y(): void {
  initOverlays()
  initA11yPanel()
}
