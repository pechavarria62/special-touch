// Contact — design/screens/16-contact-pc.png, 17-contact-phone.png
import { ArchIcon, Breadcrumb, ChoiceCard, Eyebrow, Honeypot, Icon, Required, SideCard } from '../components/ui.js'
import { initForm } from '../forms.js'
import { Fragment, h, type Child, type Html } from '../jsx.js'

const topics = ['Summer Get Away (camp)', 'Blind Services', 'Disability Friendly Church', 'Chapters', 'Family of Hope', 'A missionary or missions associate', 'Something else']

function Hero(): Html {
  return (
    <section aria-labelledby="contact-h1" class="py-10 md:py-14 lg:py-16">
      <div class="wrap">
        <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
        <Eyebrow class="mt-8">Contact us</Eyebrow>
        <h1 id="contact-h1" class="mt-4 text-[2.125rem] leading-[1.1] sm:text-5xl lg:text-6xl">
          We’d love to hear from you
        </h1>
        <p class="mt-4 max-w-2xl text-lg text-ink-muted">Our staff has limited hours, so the form or email is usually the fastest way to reach us.</p>

        <ul class="mt-10 grid gap-5 md:grid-cols-3" role="list">
          <li class="card p-6">
            <ArchIcon name="mail" class="h-14 w-13" />
            <h2 class="mt-5 text-2xl">Email</h2>
            <a href="mailto:ministry@specialtouch.org" class="mt-1 block font-display text-xl font-semibold break-all sm:text-2xl">
              ministry@specialtouch.org
            </a>
            <p class="mt-2 text-sm text-ink-muted">Fastest response</p>
          </li>
          <li class="card p-6">
            <ArchIcon name="phone" class="h-14 w-13" />
            <h2 class="mt-5 text-2xl">Call</h2>
            <a href="tel:+17152582713" class="mt-1 block font-display text-2xl font-semibold">
              715-258-2713
            </a>
            <p class="mt-2 text-sm text-ink-muted">Mon–Thu, 10am–4pm CST. Choose the right department when you call.</p>
          </li>
          <li class="card p-6">
            <ArchIcon name="pin" class="h-14 w-13" />
            <h2 class="mt-5 text-2xl">Mail</h2>
            <address class="mt-1 font-display text-2xl font-semibold text-navy-700 not-italic">
              P.O. Box 25
              <br />
              Waupaca, WI 54981
            </address>
            <p class="mt-2 text-sm text-ink-muted">National office</p>
          </li>
        </ul>
      </div>
    </section>
  )
}

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

function MessageForm(): Html {
  return (
    // TODO(confirm): where contact messages are sent (the form only validates and thanks for now).
    <form id="contact-form" aria-labelledby="message-h" class="card border-t-[6px] border-t-sage-500 p-6 sm:p-9" data-contact-form>
      <h2 id="message-h" class="text-3xl">
        Send us a message
      </h2>
      <p class="mt-2 text-ink-muted">Fields marked “required” must be filled in.</p>
      <div data-error-summary hidden tabindex="-1" class="alert mt-5"></div>
      <div class="mt-5 grid gap-5 sm:grid-cols-2">
        <Field id="ct-first" label="First name" required>
          <input class="field-input" id="ct-first" name="firstName" autocomplete="given-name" required />
        </Field>
        <Field id="ct-last" label="Last name" required>
          <input class="field-input" id="ct-last" name="lastName" autocomplete="family-name" required />
        </Field>
        <Field id="ct-email" label="Email" required>
          <input class="field-input" id="ct-email" name="email" type="email" inputmode="email" autocomplete="email" required />
        </Field>
        <Field id="ct-phone" label="Phone">
          <input class="field-input" id="ct-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" />
        </Field>
      </div>
      <fieldset class="mt-6" data-error="Choose what your question is about">
        <legend class="field-label">
          What is your question about? <Required />
        </legend>
        <div class="grid gap-3 sm:grid-cols-2">
          {topics.map((topic, i) => (
            <ChoiceCard type="radio" name="topic" value={topic} id={`ct-topic-${i}`} required>
              {topic}
            </ChoiceCard>
          ))}
        </div>
      </fieldset>
      <div class="mt-6">
        <Field id="ct-message" label="How can we help?" required>
          <textarea class="field-input min-h-32" id="ct-message" name="message" rows={5} required data-error="Tell us how we can help"></textarea>
        </Field>
      </div>
      <Honeypot />
      <button type="submit" class="btn btn-primary mt-6">
        <Icon name="mail" />
        Send message
      </button>
      <p class="mt-4 text-sm text-ink-muted">No puzzles or “are you human” checks. Spam is filtered invisibly.</p>
      <div data-form-status role="status" class="mt-4 empty:hidden"></div>
    </form>
  )
}

function Sidebar(): Html {
  return (
    <aside aria-label="More ways to reach us" class="space-y-5">
      {/* TODO(confirm): the full phone menu options. */}
      <SideCard title="Calling? Choose a department">
        <p class="mt-1 text-sm text-ink-muted">
          When you call <a href="tel:+17152582713">715-258-2713</a>, press:
        </p>
        <dl class="mt-4 divide-y divide-cream-300">
          <div class="flex items-center gap-4 py-3">
            <dt class="grid size-10 shrink-0 place-items-center rounded-full bg-navy-700 font-display text-lg font-semibold text-cream">
              <span class="sr-only">Option </span>2
            </dt>
            <dd>
              <strong class="block text-ink">Blind Services</strong>
              <span class="text-ink-muted">Nettamara</span>
            </dd>
          </div>
          <div class="flex items-center gap-4 py-3">
            <dt class="grid size-10 shrink-0 place-items-center rounded-full bg-navy-700 font-display text-lg font-semibold text-cream">
              <span class="sr-only">Option </span>7
            </dt>
            <dd>
              <strong class="block text-ink">God’s Word for Today</strong>
              <span class="text-ink-muted">Daily devotional recording</span>
            </dd>
          </div>
        </dl>
        <p class="mt-2 text-sm text-ink-muted">Other options are read in the recorded greeting.</p>
      </SideCard>

      <SideCard title="Office hours">
        <dl class="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
          <dt class="font-bold text-ink">Mon–Thu</dt>
          <dd>10:00am – 4:00pm CST</dd>
          <dt class="font-bold text-ink">Fri–Sun</dt>
          <dd>Closed. Email us any time.</dd>
        </dl>
      </SideCard>

      <SideCard title="Need prayer?" class="border-sage-300 bg-sage-100">
        <p class="mt-2 text-ink-muted">Send a prayer request and our team will pray for you.</p>
        <a class="btn btn-outline btn-sm mt-4" href="/prayer-request">
          <Icon name="prayer" class="size-4.5" />
          Send a prayer request
        </a>
      </SideCard>

      <SideCard title="Website hard to use?">
        <p class="mt-2 text-sm text-ink-muted">
          Email us with “Disabled Access” in the subject line, or open the accessibility options.
        </p>
        <button type="button" class="btn btn-primary btn-sm mt-4" data-a11y-open>
          <Icon name="accessibility" class="size-4.5" />
          Accessibility options
        </button>
      </SideCard>
    </aside>
  )
}

export function render(): Html {
  return (
    <>
      <Hero />
      <section aria-label="Message and phone options" class="bg-cream-200 py-14 lg:py-20">
        <div class="wrap grid items-start gap-10 lg:grid-cols-[1fr_27rem] lg:gap-12">
          <MessageForm />
          <Sidebar />
        </div>
      </section>
    </>
  )
}

export function mount(root: HTMLElement): () => void {
  const form = root.querySelector<HTMLFormElement>('[data-contact-form]')
  if (!form) return () => {}
  return initForm(form, {
    onSuccess(f) {
      const name = f.querySelector<HTMLInputElement>('#ct-first')?.value.trim() ?? ''
      const status = f.querySelector<HTMLElement>('[data-form-status]')
      if (status) {
        status.innerHTML = String(
          <div class="alert alert-success">
            <Icon name="checkCircle" class="mt-0.5 size-6" />
            <p>
              <strong>Thank you{name ? `, ${name}` : ''}!</strong> We received your message and will reply by email.
            </p>
          </div>,
        )
      }
      f.reset()
    },
  })
}
