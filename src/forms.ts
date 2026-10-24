// Accessible form validation shared by every form on the site.
// - Validates on submit (forms use novalidate so we control the messages).
// - Shows an error summary at the top with links to each field, and inline "Error: …" messages
//   with a warning icon, linked to the field with aria-describedby; sets aria-invalid.
// - Moves focus to the first invalid field.
// - Radio groups are validated once per group; the message goes at the end of their <fieldset>.
// - A filled honeypot field (name="website") silently "succeeds" without sending.
import { icon } from './icons.js'

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

export interface FormOptions {
  /** Called with the valid form. Show your own success message here. */
  onSuccess(form: HTMLFormElement): void
}

interface FieldError {
  control: Control
  message: string
}

function isRadio(control: Control): control is HTMLInputElement {
  return control instanceof HTMLInputElement && control.type === 'radio'
}

function labelText(control: Control): string {
  const legend = isRadio(control) ? control.closest('fieldset')?.querySelector('legend')?.textContent : undefined
  const text = (legend ?? control.labels?.[0]?.textContent ?? control.name).replace(/\(required\)/i, '').trim()
  return text.charAt(0).toLowerCase() + text.slice(1)
}

/** Returns the error message for a control, or '' when it is valid. */
function errorFor(control: Control): string {
  if (control.validity.valid) return ''
  // data-error is the message for a missing answer; other problems keep their specific messages.
  const custom = isRadio(control) ? control.closest('fieldset')?.dataset.error : control.dataset.error
  if (custom && control.validity.valueMissing) return custom
  if (isRadio(control)) return `Choose an answer for “${labelText(control).replace(/\?$/, '')}”`
  if (control.validity.valueMissing) return control instanceof HTMLSelectElement ? `Choose your ${labelText(control)}` : `Enter your ${labelText(control)}`
  if (control.validity.typeMismatch && control.type === 'email') return 'Enter an email address like name@example.com'
  if (control.validity.typeMismatch && control.type === 'tel') return 'Enter a phone number like 715-258-2713'
  if (control.validity.rangeUnderflow && control instanceof HTMLInputElement) return control.dataset.minError ?? `Enter at least ${control.min}`
  return `Check your ${labelText(control)}`
}

function describedBy(control: Control, id: string, add: boolean): void {
  const ids = new Set((control.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean))
  if (add) ids.add(id)
  else ids.delete(id)
  if (ids.size) control.setAttribute('aria-describedby', [...ids].join(' '))
  else control.removeAttribute('aria-describedby')
}

/** The controls an error belongs to: the whole group for radios, otherwise the control itself. */
function groupOf(control: Control): Control[] {
  if (!isRadio(control) || !control.form) return [control]
  return Array.from(control.form.querySelectorAll<HTMLInputElement>(`input[type="radio"][name="${CSS.escape(control.name)}"]`))
}

function setFieldError(control: Control, message: string): void {
  const id = `${isRadio(control) ? control.name : control.id}-error`
  document.getElementById(id)?.remove()
  const group = groupOf(control)
  if (!message) {
    for (const c of group) {
      c.removeAttribute('aria-invalid')
      describedBy(c, id, false)
    }
    return
  }
  const html = `<p id="${id}" class="field-error">${icon('warning', 'size-5 mt-0.5')}<span>Error: ${message}</span></p>`
  const fieldset = isRadio(control) ? control.closest('fieldset') : null
  if (fieldset) fieldset.insertAdjacentHTML('beforeend', html)
  else control.insertAdjacentHTML('afterend', html)
  for (const c of group) {
    c.setAttribute('aria-invalid', 'true')
    describedBy(c, id, true)
  }
}

/** Visible, enabled controls inside `scope` (one per radio group). */
function controlsIn(scope: HTMLElement): Control[] {
  const seenRadioGroups = new Set<string>()
  return Array.from(scope.querySelectorAll<Control>('input, select, textarea')).filter((el) => {
    if (el.name === 'website' || el.type === 'hidden' || el.disabled || !el.willValidate) return false
    if (el.closest('[hidden]')) return false
    if (isRadio(el)) {
      if (seenRadioGroups.has(el.name)) return false
      seenRadioGroups.add(el.name)
    }
    return true
  })
}

function renderSummary(summary: HTMLElement, errors: FieldError[]): void {
  if (!errors.length) {
    summary.hidden = true
    summary.innerHTML = ''
    return
  }
  const count = errors.length === 1 ? 'There is 1 problem' : `There are ${errors.length} problems`
  summary.innerHTML = `${icon('warning', 'size-6 mt-0.5')}
    <div>
      <p class="font-bold text-ink">Error: ${count} with this form</p>
      <ul class="mt-2 space-y-1" role="list">
        ${errors.map(({ control, message }) => `<li><a href="#${control.id}">${message}</a></li>`).join('')}
      </ul>
    </div>`
  summary.hidden = false
}

/**
 * Validates the controls inside `scope` (the whole form, or one step of it): updates inline errors
 * and the form's error summary, and focuses the first invalid field. Returns true when valid.
 */
export function validate(form: HTMLFormElement, scope: HTMLElement = form): boolean {
  const controls = controlsIn(scope)
  const errors = controls.map((control) => ({ control, message: errorFor(control) })).filter((e) => e.message)
  for (const control of controls) setFieldError(control, errors.find((e) => e.control === control)?.message ?? '')
  const summary = form.querySelector<HTMLElement>('[data-error-summary]')
  if (summary) renderSummary(summary, errors)
  errors[0]?.control.focus()
  return errors.length === 0
}

/** Wires up validation for `form`. Returns a cleanup function. */
export function initForm(form: HTMLFormElement, options: FormOptions): () => void {
  form.noValidate = true
  const summary = form.querySelector<HTMLElement>('[data-error-summary]')

  const onSubmit = (event: SubmitEvent): void => {
    event.preventDefault()
    form.dataset.submitted = 'true'
    if (!validate(form)) return
    const honeypot = form.querySelector<HTMLInputElement>('input[name="website"]')
    if (honeypot?.value) return // a bot: pretend nothing happened
    delete form.dataset.submitted
    options.onSuccess(form)
  }

  // After a failed attempt, fix messages as people correct each field.
  const onChange = (event: Event): void => {
    const target = event.target
    if (!form.dataset.submitted || !(target instanceof HTMLElement)) return
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) return
    if (target.name === 'website') return
    const control: Control = target
    if (control.getAttribute('aria-invalid') === 'true' || errorFor(control) === '') setFieldError(control, errorFor(control))
  }

  // Summary links: focus the field instead of only scrolling to it.
  const onSummaryClick = (event: MouseEvent): void => {
    const link = (event.target as Element | null)?.closest('a[href^="#"]')
    if (!link || !summary?.contains(link)) return
    const target = document.getElementById(link.getAttribute('href')!.slice(1))
    if (!target) return
    event.preventDefault()
    target.focus()
  }

  form.addEventListener('submit', onSubmit)
  form.addEventListener('input', onChange)
  form.addEventListener('change', onChange)
  form.addEventListener('click', onSummaryClick)
  return () => {
    form.removeEventListener('submit', onSubmit)
    form.removeEventListener('input', onChange)
    form.removeEventListener('change', onChange)
    form.removeEventListener('click', onSummaryClick)
  }
}
