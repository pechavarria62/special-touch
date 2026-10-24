// Read aloud with the browser's Web Speech API. Shared by the accessibility tool
// ("Read this page", "Read on click") and Blind Services ("Listen to this page").

type Listener = (speaking: boolean) => void

const listeners = new Set<Listener>()

export const speechSupported: boolean = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window

function notify(speaking: boolean): void {
  for (const listener of listeners) listener(speaking)
}

/** Calls `listener` whenever reading starts or stops. Returns an unsubscribe function. */
export function onSpeakingChange(listener: Listener): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function isSpeaking(): boolean {
  return speechSupported && speechSynthesis.speaking
}

export function stopSpeaking(): void {
  if (!speechSupported) return
  speechSynthesis.cancel()
  notify(false)
}

export function speak(text: string): void {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (!speechSupported || !clean) return
  speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(clean)
  utterance.lang = 'en-US'
  utterance.onend = () => notify(false)
  utterance.onerror = () => notify(false)
  speechSynthesis.speak(utterance)
  notify(true)
}

/** Reads the main content of the current page. */
export function readPage(): void {
  const main = document.getElementById('main')
  if (main) speak(main.innerText)
}
