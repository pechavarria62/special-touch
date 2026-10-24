// Family Support (Family of Hope) — design/screens/14-family-support-pc.png, 15-family-support-phone.png
import { ArchPhoto, Breadcrumb, ChoiceCard, Eyebrow, Honeypot, Icon, Picture, Required } from '../components/ui.js'
import { validate } from '../forms.js'
import type { IconName } from '../icons.js'
import { Fragment, h, type Child, type Html } from '../jsx.js'

// TODO(confirm): where questionnaire answers are sent, and the missionaries' story page.
const missionariesStoryUrl = '/about#leadership'

function Hero(): Html {
  return (
    <section aria-labelledby="family-h1">
      <div class="wrap grid items-center gap-12 py-10 md:py-14 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:py-16">
        <div>
          <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Family Support' }]} />
          <Eyebrow class="mt-8">Family of Hope</Eyebrow>
          <h1 id="family-h1" class="mt-4 text-[2.125rem] leading-[1.1] sm:text-5xl lg:text-6xl">
            Hope and encouragement for families facing disability
          </h1>
          <p class="mt-4 max-w-2xl text-lg text-ink-muted">
            Family of Hope provides faith-based support to families, and equips local churches to meet the specific needs of family members impacted by disability.
          </p>
          <div class="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
            <a class="btn btn-primary" href="#share">
              <Icon name="arrowRight" />
              Share your story
            </a>
            <a class="btn btn-outline" href="/contact">
              <Icon name="phone" />
              Talk with us
            </a>
          </div>
        </div>
        {/* TODO(confirm): higher-resolution family photo (family3.jpg is 300px wide). */}
        <ArchPhoto outline class="mx-auto aspect-square w-full max-w-md lg:mr-0 lg:aspect-[1.2]">
          <Picture name="family3" alt="A smiling mother, father and adult daughter hugging outdoors." width={300} height={200} class="size-full object-cover" eager />
        </ArchPhoto>
      </div>
    </section>
  )
}

function Burdens(): Html {
  const items: [IconName, string, string][] = [
    ['calendar', 'Constant appointments', 'Therapies, visits and paperwork'],
    ['hand', 'Advocacy', 'Speaking up at school, work and church'],
    ['clock', 'Exhaustion', 'Little time to rest or recharge'],
    ['users', 'Isolation', 'Strained relationships and loneliness'],
  ]
  return (
    <section aria-labelledby="burden-h" class="bg-cream-200 py-16 lg:py-20">
      <div class="wrap">
        <Eyebrow>We understand</Eyebrow>
        <h2 id="burden-h" class="mt-3 text-3xl md:text-4xl">
          Parents and caregivers carry so much
        </h2>
        <p class="mt-2 text-lg text-ink-muted">More families are facing disability every year, and the load can be heavy.</p>
        <ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {items.map(([iconName, title, text]) => (
            <li class="rounded-3xl border-t-4 border-navy-700 bg-cream p-6">
              <Icon name={iconName} class="size-6 text-sage-800" />
              <h3 class="mt-3 text-xl">{title}</h3>
              <p class="mt-1 text-ink-muted">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Missionaries(): Html {
  return (
    <section aria-labelledby="who-h" class="py-16 lg:py-24">
      <div class="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow>Led by STM missionaries</Eyebrow>
          <h2 id="who-h" class="mt-3 text-3xl md:text-4xl">
            A calling shaped by their own family
          </h2>
          <p class="mt-3 text-ink">
            Rev. Joe and Ann Trementozzi know these challenges firsthand. Prompted by the Holy Spirit and inspired by their daughter, BethAnn, they serve families with the compassion and love of Christ.
          </p>
          <div class="mt-6 flex items-center gap-4 rounded-2xl border border-sage-300 bg-cream p-5">
            <span class="grid size-12 shrink-0 place-items-center rounded-full border border-sage-300 bg-sage-100 text-navy-700">
              <Icon name="homeHeart" />
            </span>
            <p>
              <strong class="block text-navy-700">Rev. Joe &amp; Ann Trementozzi</strong>
              <span class="text-ink-muted">STM Missionaries, Family of Hope</span>
            </p>
          </div>
          <blockquote class="mt-6 border-l-4 border-sage-500 pl-5 font-display text-2xl leading-snug text-navy-700">
            <p>“Providing faith-based support, offering hope, and equipping churches.”</p>
          </blockquote>
          <a href={missionariesStoryUrl} class="mt-5 inline-flex min-h-11 items-center gap-2 font-bold">
            Read about their heart for ministry
            <Icon name="arrowRight" class="size-4" />
          </a>
        </div>
        <ArchPhoto class="aspect-[1.1] lg:aspect-[1.6]">
          <Picture name="sisters" alt="A young woman and a young girl looking up together in wonder." width={1400} height={350} class="size-full object-cover object-[45%_center]" />
        </ArchPhoto>
      </div>
    </section>
  )
}

// ---------- "Share your story" questionnaire ----------

const steps = ['Contact', 'Your household', 'Support', 'Your thoughts']
const stepTitles = ['How can we reach you?', 'Your household', 'Support and family life', 'Your thoughts']

function Field({ id, label, required, children }: { id: string; label: string; required?: boolean; children?: Child }): Html {
  return (
    <div>
      <label class="field-label" for={id}>
        {label} {required && <Required />}
      </label>
      {children}
    </div>
  )
}

function Select({ id, name, options, required }: { id: string; name: string; options: string[]; required?: boolean }): Html {
  return (
    <select class="field-input" id={id} name={name} required={required}>
      <option value="">Choose one</option>
      {options.map((o) => (
        <option value={o}>{o}</option>
      ))}
    </select>
  )
}

function StepPanel({ n, children }: { n: number; children?: Child }): Html {
  return (
    <div data-step={n} hidden={n !== 1} class="space-y-5">
      <h3 id={`step-${n}-h`} tabindex="-1" class="text-2xl focus:shadow-none focus:outline-none">
        {stepTitles[n - 1]}
      </h3>
      {children}
    </div>
  )
}

function Progress(): Html {
  return (
    <div>
      <ol aria-label="Progress" class="grid grid-cols-4 gap-2" role="list" data-progress>
        {steps.map((name, i) => (
          <li data-progress-step={i + 1} class="group text-xs font-bold text-navy-700 sm:text-sm">
            <span
              aria-hidden="true"
              class="block h-2 rounded-full bg-navy-100 group-data-[state=done]:bg-navy-700 group-data-[state=current]:bg-[repeating-linear-gradient(135deg,var(--color-navy-700)_0_6px,var(--color-navy-500)_6px_10px)]"
            ></span>
            <span class="mt-2 flex items-center gap-1">
              <span class="hidden group-data-[state=done]:contents">
                <Icon name="check" class="size-3.5" />
              </span>
              <span class="max-sm:sr-only">{name}</span>
              <span class="sr-only" data-progress-state></span>
            </span>
          </li>
        ))}
      </ol>
      <p class="mt-4 font-bold text-sage-800" data-step-count>
        Step 1 of 4
      </p>
    </div>
  )
}

function Questionnaire(): Html {
  const helps = ['Respite care', 'Support groups', 'Faith-based resources', 'Educational resources']
  const frequency = ['Never', 'A few times a year', 'Once a month', 'Several times a month', 'Weekly or more']
  return (
    <form id="share-form" aria-labelledby="share-form-h" class="card border-t-[6px] border-t-navy-700 p-6 sm:p-8" data-share-form>
      <h3 id="share-form-h" class="sr-only">
        Family questionnaire
      </h3>
      <Progress />
      <div data-error-summary hidden tabindex="-1" class="alert mt-5"></div>

      <div class="mt-5">
        <StepPanel n={1}>
          <div class="grid gap-5 sm:grid-cols-2">
            <Field id="fs-first" label="First name" required>
              <input class="field-input" id="fs-first" name="firstName" autocomplete="given-name" required />
            </Field>
            <Field id="fs-last" label="Last name">
              <input class="field-input" id="fs-last" name="lastName" autocomplete="family-name" />
            </Field>
          </div>
          <Field id="fs-email" label="Email" required>
            <input class="field-input" id="fs-email" name="email" type="email" inputmode="email" autocomplete="email" required />
          </Field>
          <Field id="fs-phone" label="Phone">
            <input class="field-input" id="fs-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" />
          </Field>
        </StepPanel>

        <StepPanel n={2}>
          <Field id="fs-relationship" label="Your relationship to the person with a disability" required>
            <Select id="fs-relationship" name="relationship" required options={['Parent', 'Grandparent', 'Brother or sister', 'Spouse', 'Other family member', 'Caregiver', 'I have a disability myself']} />
          </Field>
          <Field id="fs-age" label="Your loved one’s age" required>
            <Select id="fs-age" name="lovedOneAge" required options={['Under 5', '5–12', '13–17', '18–25', '26–40', '41–64', '65 or older']} />
          </Field>
          <Field id="fs-disability" label="Type of disability">
            <Select id="fs-disability" name="disability" options={['Intellectual', 'Developmental', 'Physical', 'Blind or low vision', 'Deaf or hard of hearing', 'More than one', 'Prefer not to say']} />
          </Field>
          <Field id="fs-household" label="How many people live in your home?">
            <Select id="fs-household" name="householdSize" options={['1', '2', '3', '4', '5', '6 or more']} />
          </Field>
        </StepPanel>

        <StepPanel n={3}>
          <fieldset aria-describedby="fs-helps-hint">
            <legend class="field-label">What helps you meet your loved one’s needs?</legend>
            <p class="-mt-1 mb-3 text-sm text-ink-muted" id="fs-helps-hint">
              Choose all that apply.
            </p>
            <div class="grid gap-3 sm:grid-cols-2">
              {helps.map((label, i) => (
                <ChoiceCard type="checkbox" name="helps" value={label} id={`fs-helps-${i}`}>
                  {label}
                </ChoiceCard>
              ))}
            </div>
          </fieldset>
          <fieldset data-error="Choose how often your family joins church activities">
            <legend class="field-label">
              How often does your family join church activities together? <Required />
            </legend>
            <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {frequency.map((label, i) => (
                <ChoiceCard type="radio" name="churchFrequency" value={label} id={`fs-freq-${i}`} required layout="stack">
                  {label}
                </ChoiceCard>
              ))}
            </div>
          </fieldset>
          <Field id="fs-barriers" label="What makes it hard to take part in church activities?">
            <textarea class="field-input min-h-28" id="fs-barriers" name="barriers" rows={4}></textarea>
          </Field>
        </StepPanel>

        <StepPanel n={4}>
          <Field id="fs-help-most" label="What would help your family most right now?">
            <textarea class="field-input min-h-28" id="fs-help-most" name="helpMost" rows={4}></textarea>
          </Field>
          <Field id="fs-church" label="How could your church better support you?">
            <textarea class="field-input min-h-28" id="fs-church" name="churchSupport" rows={4}></textarea>
          </Field>
          <ChoiceCard type="checkbox" name="optIn" value="yes" id="fs-optin">
            Yes, send me news from Family of Hope
          </ChoiceCard>
        </StepPanel>
      </div>
      <Honeypot />

      <div class="mt-6 flex items-center justify-between gap-3 border-t border-dashed border-cream-300 pt-5">
        <button type="button" class="btn btn-outline" data-back hidden>
          <span aria-hidden="true">←</span> Back
        </button>
        <button type="button" class="btn btn-primary ml-auto" data-next>
          Next step <span aria-hidden="true">→</span>
        </button>
        <button type="submit" class="btn btn-primary ml-auto" data-submit hidden>
          <Icon name="mail" />
          Send my answers
        </button>
      </div>
      <p class="mt-4 flex items-center gap-2 text-sm text-ink-muted">
        <Icon name="checkCircle" class="size-4.5" />
        Your answers stay filled in when you go back.
      </p>
      <div data-form-status role="status" class="mt-4 empty:hidden"></div>
    </form>
  )
}

function ShareYourStory(): Html {
  return (
    <section id="share" aria-labelledby="share-h" class="scroll-mt-6 bg-cream-200 py-16 lg:py-24">
      <div class="wrap grid items-start gap-10 lg:grid-cols-[1fr_2fr] lg:gap-12">
        <div>
          <Eyebrow>Share your story</Eyebrow>
          <h2 id="share-h" class="mt-3 text-3xl md:text-4xl">
            Help us serve you better
          </h2>
          <p class="mt-3 text-ink-muted">If you care for someone with a disability, a few minutes of your time will help us build the right family support programs.</p>
          <div class="alert alert-success mt-6">
            <Icon name="lock" class="mt-0.5 size-6" />
            <p>
              <strong>Your answers are confidential.</strong> We only use them to plan ministry for families.
            </p>
          </div>
          <p class="mt-5 text-sm text-ink-muted">Know a family who fits? Share this page with them.</p>
        </div>
        <Questionnaire />
      </div>
    </section>
  )
}

export function render(): Html {
  return (
    <>
      <Hero />
      <Burdens />
      <Missionaries />
      <ShareYourStory />
    </>
  )
}

/** Multi-step questionnaire: validate each step before Next; Back keeps answers (steps are only hidden). */
export function mount(root: HTMLElement): () => void {
  const form = root.querySelector<HTMLFormElement>('[data-share-form]')
  if (!form) return () => {}
  form.noValidate = true
  const panels = Array.from(form.querySelectorAll<HTMLElement>('[data-step]'))
  const back = form.querySelector<HTMLButtonElement>('[data-back]')!
  const next = form.querySelector<HTMLButtonElement>('[data-next]')!
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]')!
  const count = form.querySelector<HTMLElement>('[data-step-count]')!
  const summary = form.querySelector<HTMLElement>('[data-error-summary]')
  let current = 1

  const show = (step: number, moveFocus: boolean): void => {
    current = step
    panels.forEach((panel, i) => (panel.hidden = i + 1 !== step))
    for (const li of form.querySelectorAll<HTMLElement>('[data-progress-step]')) {
      const n = Number(li.dataset.progressStep)
      const state = n < step ? 'done' : n === step ? 'current' : 'todo'
      li.dataset.state = state
      if (state === 'current') li.setAttribute('aria-current', 'step')
      else li.removeAttribute('aria-current')
      const label = li.querySelector('[data-progress-state]')
      if (label) label.textContent = state === 'done' ? ' (completed)' : state === 'current' ? ' (current step)' : ''
    }
    count.textContent = `Step ${step} of ${panels.length}`
    back.hidden = step === 1
    next.hidden = step === panels.length
    submit.hidden = step !== panels.length
    if (summary) summary.hidden = true
    if (moveFocus) form.querySelector<HTMLElement>(`#step-${step}-h`)?.focus()
  }

  const panel = (): HTMLElement => panels[current - 1]!
  const onNext = (): void => {
    if (validate(form, panel())) show(current + 1, true)
  }
  const onBack = (): void => show(current - 1, true)
  const onSubmit = (event: SubmitEvent): void => {
    event.preventDefault()
    // Enter in a field before the last step means "Next step", not "send".
    if (current < panels.length) return onNext()
    if (!validate(form, panel())) return
    if (form.querySelector<HTMLInputElement>('input[name="website"]')?.value) return
    const status = form.querySelector<HTMLElement>('[data-form-status]')
    if (status) {
      status.innerHTML = String(
        <div class="alert alert-success">
          <Icon name="checkCircle" class="mt-0.5 size-6" />
          <p>
            <strong>Thank you for sharing your story.</strong> We received your answers.
          </p>
        </div>,
      )
    }
    form.reset()
    show(1, false)
  }

  show(1, false)
  next.addEventListener('click', onNext)
  back.addEventListener('click', onBack)
  form.addEventListener('submit', onSubmit)
  return () => {
    next.removeEventListener('click', onNext)
    back.removeEventListener('click', onBack)
    form.removeEventListener('submit', onSubmit)
  }
}
