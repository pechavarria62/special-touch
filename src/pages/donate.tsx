// Donate — design/screens/18-donate-pc.png, 19-donate-phone.png
import { ArchPhoto, ArchTile, Breadcrumb, Eyebrow, Icon, Picture, Required } from '../components/ui.js'
import { validate } from '../forms.js'
import type { IconName } from '../icons.js'
import { Fragment, h, type Html } from '../jsx.js'

// TODO(confirm): the real Stripe donation link (checkout with amount, frequency and designation).
const stripeCheckoutUrl = ''

const amounts = [25, 50, 100, 200, 500]
const defaultAmount = 50
const minimumGift = 8
const designations = ['Where it’s needed most', 'Blind Services', 'A missionary', 'A camp location', 'A chapter', 'Family of Hope']

/** Card processing fee to cover: Stripe's 2.9% + $0.30 (e.g. $50 → $1.75). */
export function processingFee(amount: number): number {
  return Math.round((amount * 0.029 + 0.3) * 100) / 100
}

function money(n: number): string {
  return `$${n.toFixed(2)}`
}

const chip =
  'group flex min-h-12 cursor-pointer items-center justify-center gap-1.5 rounded-xl border-2 border-navy-500 bg-cream px-3 font-bold text-navy-700 hover:bg-navy-50 has-checked:border-[3px] has-checked:border-navy-900 has-checked:bg-navy-700 has-checked:text-cream has-focus-visible:shadow-[0_0_0_3px_var(--color-cream)] has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-navy-700'

function Check(): Html {
  return (
    <span class="hidden group-has-checked:contents">
      <Icon name="check" class="size-4" />
    </span>
  )
}

function CheckboxRow({ id, name, children }: { id: string; name: string; children?: Html | string | (Html | string)[] }): Html {
  return (
    <label for={id} class="group flex min-h-11 cursor-pointer items-start gap-3 py-1 text-ink">
      <input class="peer sr-only" type="checkbox" id={id} name={name} />
      <span
        aria-hidden="true"
        class="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border-2 border-navy-700 bg-cream text-cream group-has-checked:bg-navy-700 group-has-focus-visible:shadow-[0_0_0_3px_var(--color-cream)] group-has-focus-visible:outline-3 group-has-focus-visible:outline-offset-3 group-has-focus-visible:outline-navy-700"
      >
        <span class="hidden group-has-checked:contents">
          <Icon name="check" class="size-4" />
        </span>
      </span>
      <span>{children}</span>
    </label>
  )
}

function GiftForm(): Html {
  return (
    <form id="gift" aria-labelledby="gift-h" class="card border-t-[6px] border-t-navy-700 p-6 sm:p-8 lg:sticky lg:top-6" data-gift-form>
      <h2 id="gift-h" class="text-3xl">
        Make a gift
      </h2>
      <div data-error-summary hidden tabindex="-1" class="alert mt-5"></div>

      <fieldset class="mt-5">
        <legend class="field-label">How often?</legend>
        <div class="grid grid-cols-2 gap-1 rounded-full border-2 border-navy-500 p-1">
          {['One time', 'Monthly'].map((label, i) => (
            <label class="group flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-full font-bold text-navy-700 hover:bg-navy-50 has-checked:bg-navy-700 has-checked:text-cream has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-navy-700">
              <input class="sr-only" type="radio" name="frequency" value={i === 0 ? 'once' : 'monthly'} checked={i === 0} />
              <Check />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset class="mt-6">
        <legend class="field-label">Amount</legend>
        <div class="grid grid-cols-3 gap-2.5">
          {amounts.map((n) => (
            <label class={chip}>
              <input class="sr-only" type="radio" name="amount" value={n} checked={n === defaultAmount} />
              <Check />${n}
            </label>
          ))}
          <label class={chip}>
            <input class="sr-only" type="radio" name="amount" value="other" />
            <Check />
            Other
          </label>
        </div>
        <div class="mt-4" data-other-amount hidden>
          <label class="field-label" for="gift-other">
            Other amount in US dollars <Required />
          </label>
          <div class="relative">
            <span aria-hidden="true" class="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 font-bold text-ink">
              $
            </span>
            <input
              class="field-input pl-8"
              id="gift-other"
              name="otherAmount"
              type="number"
              inputmode="decimal"
              min={minimumGift}
              step="0.01"
              required
              data-error={`Enter an amount of $${minimumGift} or more`}
              data-min-error={`The minimum gift is $${minimumGift}`}
            />
          </div>
        </div>
      </fieldset>

      <div class="mt-6">
        <label class="field-label" for="gift-to">
          Give to
        </label>
        <div class="relative">
          <select class="field-input appearance-none pr-11" id="gift-to" name="designation" aria-describedby="gift-to-hint">
            {designations.map((d) => (
              <option value={d}>{d}</option>
            ))}
          </select>
          <span class="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-navy-700">
            <Icon name="chevronDown" />
          </span>
        </div>
        <p id="gift-to-hint" class="mt-2 text-sm text-ink-muted">
          Or choose Blind Services, a missionary, a camp location, a chapter or Family of Hope.
        </p>
      </div>

      <div class="mt-4 space-y-1">
        <CheckboxRow id="gift-tribute" name="tribute">
          Give in honor or memory of someone
        </CheckboxRow>
        <div data-tribute-fields hidden class="space-y-4 border-l-4 border-sage-500 py-2 pl-4">
          <fieldset>
            <legend class="field-label">This gift is</legend>
            <div class="grid grid-cols-2 gap-2.5">
              {['In honor of', 'In memory of'].map((label, i) => (
                <label class={chip}>
                  <input class="sr-only" type="radio" name="tributeType" value={label} checked={i === 0} />
                  <Check />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
          <div>
            <label class="field-label" for="gift-honoree">
              Their name <Required />
            </label>
            <input class="field-input" id="gift-honoree" name="honoree" autocomplete="off" required data-error="Enter the name of the person you are honoring" />
          </div>
          <div>
            <label class="field-label" for="gift-notify">
              Email to let someone know (optional)
            </label>
            <input class="field-input" id="gift-notify" name="notifyEmail" type="email" inputmode="email" autocomplete="off" />
          </div>
        </div>
        <CheckboxRow id="gift-fees" name="coverFees">
          Add <span data-fee-amount>{money(processingFee(defaultAmount))}</span> to cover card processing fees
        </CheckboxRow>
      </div>

      <div class="mt-5 flex items-end justify-between gap-4 border-t border-dashed border-cream-300 pt-5">
        <p class="text-ink-muted" data-total-label>
          Gift total
        </p>
        <p class="font-display text-4xl font-semibold text-navy-700" data-total>
          {money(defaultAmount)}
        </p>
      </div>
      {/* Screen readers hear one short sentence when the total changes. */}
      <p class="sr-only" aria-live="polite" data-total-status></p>

      <button type="submit" class="btn btn-primary mt-5 w-full">
        <Icon name="heart" />
        Continue to secure payment
      </button>
      <p class="mt-4 flex items-center justify-center gap-2 text-center text-sm text-ink-muted">
        <Icon name="lock" class="size-4" />
        Secure checkout with Stripe · Minimum gift ${minimumGift}
      </p>
      <div data-form-status role="status" class="mt-4 empty:hidden"></div>
    </form>
  )
}

function WhereItGoes(): Html {
  const items: [IconName, string, string][] = [
    ['tent', 'Summer Get Away', 'Camp scholarships and care for guests at five locations'],
    ['braille', 'Blind Services', 'Braille, large-print and audio resources, often at no cost'],
    ['users', 'Chapters & Family of Hope', 'Local gatherings and support for families'],
  ]
  return (
    <section aria-labelledby="where-h">
      <h2 id="where-h" class="text-2xl md:text-3xl">
        Where your gift goes
      </h2>
      <ul class="mt-4 space-y-3" role="list">
        {items.map(([iconName, title, text]) => (
          <li class="flex items-center gap-4 rounded-2xl border border-cream-300 bg-cream p-4">
            <ArchTile class="h-12 w-11">
              <Icon name={iconName} class="size-5" />
            </ArchTile>
            <p>
              <strong class="block text-navy-700">{title}</strong>
              <span class="text-ink-muted">{text}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

function MoreWays(): Html {
  const ways: [string, string][] = [
    ['Employer matching', 'Many employers double your gift.'],
    ['Memorial & honor gifts', 'Celebrate someone you love.'],
    ['IRA rollover & legacy', 'Give from retirement or your will.'],
    ['Donor-advised funds', 'Recommend a grant to Special Touch.'],
  ]
  return (
    <section aria-labelledby="ways-h" class="bg-cream-200 py-16 lg:py-20">
      <div class="wrap">
        <Eyebrow>More ways to give</Eyebrow>
        <h2 id="ways-h" class="mt-3 text-3xl md:text-4xl">
          Multiply your impact
        </h2>
        <ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {ways.map(([title, text]) => (
            <li class="rounded-3xl border border-sage-300 bg-cream p-6">
              <h3 class="text-xl">{title}</h3>
              <p class="mt-2 text-ink-muted">{text}</p>
            </li>
          ))}
        </ul>
        <p class="mt-6 text-ink-muted">
          Gifts to the general fund are tax-deductible. Questions about camp tuition payments: <a href="mailto:cpo@specialtouch.org">cpo@specialtouch.org</a>.
        </p>
      </div>
    </section>
  )
}

export function render(): Html {
  return (
    <>
      <div class="wrap grid items-start gap-10 py-10 md:py-14 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:py-16">
        <div>
          <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Donate' }]} />
          <Eyebrow class="mt-8">Give</Eyebrow>
          <h1 id="donate-h1" class="mt-4 text-[2.125rem] leading-[1.1] sm:text-5xl lg:text-6xl">
            Help make the Cross accessible to everyone
          </h1>
          <p class="mt-4 max-w-2xl text-lg text-ink-muted">Your gift brings faith-based support to people impacted by disability, from camp scholarships to Braille Bibles.</p>
          <ArchPhoto class="mt-10 hidden aspect-[2.35] lg:block">
            <Picture name="friends" alt="Two smiling friends at a Special Touch event, one giving a thumbs up." width={1400} height={459} class="size-full object-cover" />
          </ArchPhoto>
          <div class="mt-8">
            <WhereItGoes />
          </div>
        </div>
        <GiftForm />
      </div>
      <MoreWays />
    </>
  )
}

interface Gift {
  frequency: 'once' | 'monthly'
  amount: number
  fee: number
  total: number
}

function readGift(form: HTMLFormElement): Gift {
  const data = new FormData(form)
  const frequency = data.get('frequency') === 'monthly' ? 'monthly' : 'once'
  const choice = String(data.get('amount') ?? defaultAmount)
  const amount = choice === 'other' ? Math.max(0, Number(data.get('otherAmount')) || 0) : Number(choice)
  const fee = amount > 0 ? processingFee(amount) : 0
  const total = amount + (data.get('coverFees') ? fee : 0)
  return { frequency, amount, fee, total }
}

/** Live total (announced politely), reveal "Other amount" and tribute fields, and validate before checkout. */
export function mount(root: HTMLElement): () => void {
  const form = root.querySelector<HTMLFormElement>('[data-gift-form]')
  if (!form) return () => {}
  form.noValidate = true
  const otherBox = form.querySelector<HTMLElement>('[data-other-amount]')!
  const otherInput = form.querySelector<HTMLInputElement>('#gift-other')!
  const tributeBox = form.querySelector<HTMLElement>('[data-tribute-fields]')!
  const totalEl = form.querySelector<HTMLElement>('[data-total]')!
  const totalLabel = form.querySelector<HTMLElement>('[data-total-label]')!
  const feeEl = form.querySelector<HTMLElement>('[data-fee-amount]')!
  const status = form.querySelector<HTMLElement>('[data-total-status]')!
  let announceTimer = 0

  const update = (event?: Event): void => {
    const otherChosen = form.querySelector<HTMLInputElement>('input[name="amount"][value="other"]')!.checked
    otherBox.hidden = !otherChosen
    if (event?.target instanceof HTMLInputElement && event.target.name === 'amount' && otherChosen) otherInput.focus()
    tributeBox.hidden = !form.querySelector<HTMLInputElement>('#gift-tribute')!.checked

    const gift = readGift(form)
    const label = gift.frequency === 'monthly' ? 'Monthly total' : 'Gift total'
    totalLabel.textContent = label
    totalEl.textContent = money(gift.total)
    feeEl.textContent = money(gift.fee)
    if (!event) return // first render: nothing to announce
    // Wait for typing to pause so "Other amount" isn't announced on every keystroke.
    window.clearTimeout(announceTimer)
    announceTimer = window.setTimeout(() => (status.textContent = `${label}: ${money(gift.total)}`), 600)
  }

  const onSubmit = (event: SubmitEvent): void => {
    event.preventDefault()
    if (!validate(form)) return
    const gift = readGift(form)
    const box = form.querySelector<HTMLElement>('[data-form-status]')!
    if (stripeCheckoutUrl) {
      window.location.assign(`${stripeCheckoutUrl}?amount=${gift.total.toFixed(2)}&frequency=${gift.frequency}`)
      return
    }
    box.innerHTML = String(
      <div class="alert">
        <Icon name="info" class="mt-0.5 size-6" />
        <p>
          <strong>Online giving is almost ready.</strong> To give {money(gift.total)}
          {gift.frequency === 'monthly' ? ' a month' : ''} today, call <a href="tel:+17152582713">715-258-2713</a> or mail a check to P.O. Box 25, Waupaca, WI 54981.
        </p>
      </div>,
    )
  }

  form.addEventListener('change', update)
  form.addEventListener('input', update)
  form.addEventListener('submit', onSubmit)
  update()
  return () => {
    window.clearTimeout(announceTimer)
    form.removeEventListener('change', update)
    form.removeEventListener('input', update)
    form.removeEventListener('submit', onSubmit)
  }
}
