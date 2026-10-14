import { useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AlertCircle, ArrowUpRight, CheckCircle2, ChevronDown, Info, Loader2, MessageCircle, Send } from 'lucide-react'
import { contactDelivery, site, whatsappUrl } from '../config/site'
import { levelValues, serviceValues } from '../data/content'
import { useI18n } from '../i18n/context'
import type { Messages } from '../i18n/messages/fr'
import { buttonClass } from './buttonStyles'
import { LocalLink } from './LocalLink'

interface FormValues {
  name: string
  phone: string
  email: string
  level: string
  service: string
  message: string
  /** Honeypot — must stay empty. */
  website: string
}

type Field = Exclude<keyof FormValues, 'website'>
type Errors = Partial<Record<Field, string>>
type Status = 'idle' | 'submitting' | 'success' | 'demo' | 'whatsapp' | 'error'
type FormText = Messages['form']

const FIELD_ORDER: Field[] = ['name', 'phone', 'email', 'level', 'service', 'message']
const MESSAGE_MAX = 1000

const useNetlifyForms = contactDelivery === 'netlify'
const useWhatsApp = contactDelivery === 'whatsapp'
const isDemo = contactDelivery === 'demo'

/** Must match the hidden form declared in index.html (Netlify detects forms at deploy time). */
const NETLIFY_FORM_NAME = 'contact'

function validate(values: FormValues, e: FormText['errors']): Errors {
  const errors: Errors = {}
  const name = values.name.trim()
  if (!name) errors.name = e.nameMissing
  else if (name.length < 3) errors.name = e.nameShort

  const phone = values.phone.replace(/[\s.\-()]/g, '')
  if (!phone) errors.phone = e.phoneMissing
  else if (!/^(?:(?:\+|00)216)?\d{8}$/.test(phone) && !/^(?:\+|00)\d{8,15}$/.test(phone)) errors.phone = e.phoneInvalid

  const email = values.email.trim()
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = e.emailInvalid

  if (!values.level) errors.level = e.levelMissing
  if (!values.service) errors.service = e.serviceMissing

  const message = values.message.trim()
  if (!message) errors.message = e.messageMissing
  else if (message.length < 10) errors.message = e.messageShort
  else if (message.length > MESSAGE_MAX) errors.message = e.messageLong(MESSAGE_MAX)

  return errors
}

function levelLabel(value: string, f: FormText) {
  return (levelValues as readonly string[]).includes(value) ? f.levels[value as keyof FormText['levels']] : ''
}

function serviceLabel(value: string, f: FormText) {
  return (serviceValues as readonly string[]).includes(value) ? f.services[value as keyof FormText['services']] : ''
}

/** The pre-filled WhatsApp message, written in the visitor's language. */
function whatsappMessage(values: FormValues, f: FormText) {
  const lines = [
    f.wa.greeting,
    '',
    f.wa.intro,
    `- ${f.wa.name} : ${values.name.trim()}`,
    `- ${f.wa.phone} : ${values.phone.trim()}`,
    ...(values.email.trim() ? [`- ${f.wa.email} : ${values.email.trim()}`] : []),
    `- ${f.wa.level} : ${levelLabel(values.level, f)}`,
    `- ${f.wa.service} : ${serviceLabel(values.service, f)}`,
    '',
    values.message.trim(),
  ]
  return lines.join('\n')
}

function initialService(param: string | null): string {
  if (param === 'informatique') return 'informatique'
  if (param === 'primaire' || param === 'college' || param === 'lycee' || param === 'soutien') return 'soutien'
  return ''
}

function initialLevel(param: string | null): string {
  return (levelValues as readonly string[]).includes(param ?? '') ? (param as string) : ''
}

export function ContactForm() {
  const { t } = useI18n()
  const f = t.form
  const [params] = useSearchParams()
  const service = params.get('service')
  const emptyValues: FormValues = {
    name: '',
    phone: '',
    email: '',
    level: initialLevel(service),
    service: initialService(service),
    message: '',
    website: '',
  }
  const [values, setValues] = useState<FormValues>(emptyValues)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [waLink, setWaLink] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const uid = useId()
  const id = (field: string) => `${uid}-${field}`

  const update = (field: keyof FormValues) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [field]: event.target.value }
    setValues(next)
    if (submitted) setErrors(validate(next, f.errors))
    if (status === 'error') setStatus('idle')
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    const found = validate(values, f.errors)
    setErrors(found)
    const firstInvalid = FIELD_ORDER.find((field) => found[field])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(firstInvalid))}`)?.focus()
      return
    }

    // Silently drop bot submissions.
    if (values.website) {
      setStatus('success')
      return
    }

    if (useWhatsApp) {
      // Open WhatsApp synchronously (inside the submit event) so pop-up blockers allow it.
      const link = whatsappUrl(whatsappMessage(values, f))
      setWaLink(link)
      const opened = window.open(link, '_blank')
      if (opened) opened.opener = null
      setStatus('whatsapp')
      requestAnimationFrame(() => statusRef.current?.focus())
      return
    }

    setStatus('submitting')

    if (isDemo) {
      await new Promise((resolve) => setTimeout(resolve, 600))
      setStatus('demo')
      requestAnimationFrame(() => statusRef.current?.focus())
      return
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)
    try {
      const payload = {
        nom: values.name.trim(),
        telephone: values.phone.trim(),
        email: values.email.trim(),
        niveau: levelLabel(values.level, f),
        service: serviceLabel(values.service, f),
        message: values.message.trim(),
      }
      const response = useNetlifyForms
        ? await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ 'form-name': NETLIFY_FORM_NAME, ...payload }).toString(),
            signal: controller.signal,
          })
        : await fetch(site.contactEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ ...payload, email: payload.email || undefined }),
            signal: controller.signal,
          })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      setStatus('success')
      setValues({ ...emptyValues, level: '', service: '' })
      setSubmitted(false)
    } catch {
      setStatus('error')
    } finally {
      clearTimeout(timeout)
      requestAnimationFrame(() => statusRef.current?.focus())
    }
  }

  const errorCount = FIELD_ORDER.filter((field) => errors[field]).length
  const panel =
    'rounded-[var(--radius-panel)] border border-line bg-white p-8 shadow-[var(--shadow-soft)] outline-none md:p-10'

  if (status === 'whatsapp') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className={panel}>
        <MessageCircle className="h-9 w-9 text-[#1f8a5b]" aria-hidden="true" />
        <h3 className="text-heading mt-5">{f.whatsappReadyTitle}</h3>
        <p className="mt-3 text-ink-muted">
          {f.whatsappReadyText} <strong className="text-ink">{f.whatsappReadyStrong}</strong> {f.whatsappReadyEnd}
        </p>
        <p className="mt-3 text-[0.95rem] text-ink-muted">{f.whatsappFallback}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={waLink} target="_blank" rel="noopener noreferrer" className={buttonClass('primary')}>
            {f.openWhatsapp}
            <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
            <span className="sr-only">{t.common.newTab}</span>
          </a>
          <button type="button" className={buttonClass('outline')} onClick={() => setStatus('idle')}>
            {f.editRequest}
          </button>
        </div>
      </div>
    )
  }

  if (status === 'success' || status === 'demo') {
    const demo = status === 'demo'
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className={panel}>
        {demo ? (
          <Info className="h-9 w-9 text-blue" aria-hidden="true" />
        ) : (
          <CheckCircle2 className="h-9 w-9 text-[#1f8a5b]" aria-hidden="true" />
        )}
        <h3 className="text-heading mt-5">{demo ? f.demoTitle : f.successTitle}</h3>
        <p className="mt-3 text-ink-muted">{demo ? f.demoText : f.successText}</p>
        <button
          type="button"
          className={buttonClass('outline', 'mt-8')}
          onClick={() => {
            setStatus('idle')
            if (!demo) setValues({ ...emptyValues, level: '', service: '' })
          }}
        >
          {demo ? f.backToForm : f.another}
        </button>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-describedby={isDemo || useWhatsApp ? id('notice') : undefined}
      className="rounded-[var(--radius-panel)] border border-line bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8 md:p-10"
    >
      {isDemo && (
        <p
          id={id('notice')}
          className="mb-8 flex gap-3 rounded-xl border border-blue/20 bg-blue/[0.06] p-4 text-[0.92rem] leading-relaxed text-ink"
        >
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue" aria-hidden="true" />
          <span>
            <strong>{f.demoNoticeTitle}</strong> {f.demoNotice}
          </span>
        </p>
      )}

      {useWhatsApp && (
        <p
          id={id('notice')}
          className="mb-8 flex gap-3 rounded-xl border border-[#1f8a5b]/25 bg-[#1f8a5b]/[0.06] p-4 text-[0.92rem] leading-relaxed text-ink"
        >
          <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#1f8a5b]" aria-hidden="true" />
          <span>
            <strong>{f.whatsappNoticeTitle}</strong> {f.whatsappNotice}
          </span>
        </p>
      )}

      {submitted && errorCount > 0 && (
        <div role="alert" className="mb-8 flex gap-3 rounded-xl border border-[#c2412d]/25 bg-[#c2412d]/[0.06] p-4 text-[0.95rem] text-[#8f2c1d]">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>{f.errors.summary(errorCount)}</p>
        </div>
      )}

      <p className="mb-6 text-[0.88rem] text-ink-muted">{f.required}</p>

      <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
        <FieldShell id={id('name')} label={f.name} error={errors.name} className="sm:col-span-2">
          <input
            id={id('name')}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={update('name')}
            {...fieldProps(id('name'), errors.name, true)}
          />
        </FieldShell>

        <FieldShell id={id('phone')} label={f.phone} error={errors.phone}>
          <input
            id={id('phone')}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            placeholder="20 123 456"
            value={values.phone}
            onChange={update('phone')}
            {...fieldProps(id('phone'), errors.phone, true, 'rtl:text-right')}
          />
        </FieldShell>

        <FieldShell id={id('email')} label={f.email} optional={f.optional} error={errors.email}>
          <input
            id={id('email')}
            name="email"
            type="email"
            autoComplete="email"
            dir="ltr"
            value={values.email}
            onChange={update('email')}
            {...fieldProps(id('email'), errors.email, false, 'rtl:text-right')}
          />
        </FieldShell>

        <FieldShell id={id('level')} label={f.level} error={errors.level}>
          <SelectWrap>
            <select id={id('level')} name="level" value={values.level} onChange={update('level')} {...fieldProps(id('level'), errors.level, true)}>
              <option value="" disabled>
                {f.levelPlaceholder}
              </option>
              {levelValues.map((value) => (
                <option key={value} value={value}>
                  {f.levels[value]}
                </option>
              ))}
            </select>
          </SelectWrap>
        </FieldShell>

        <FieldShell id={id('service')} label={f.service} error={errors.service}>
          <SelectWrap>
            <select
              id={id('service')}
              name="service"
              value={values.service}
              onChange={update('service')}
              {...fieldProps(id('service'), errors.service, true)}
            >
              <option value="" disabled>
                {f.servicePlaceholder}
              </option>
              {serviceValues.map((value) => (
                <option key={value} value={value}>
                  {f.services[value]}
                </option>
              ))}
            </select>
          </SelectWrap>
        </FieldShell>

        <FieldShell
          id={id('message')}
          label={f.message}
          error={errors.message}
          className="sm:col-span-2"
          hint={`${values.message.trim().length} / ${MESSAGE_MAX}`}
        >
          <textarea
            id={id('message')}
            name="message"
            rows={5}
            maxLength={MESSAGE_MAX + 200}
            placeholder={f.messagePlaceholder}
            value={values.message}
            onChange={update('message')}
            {...fieldProps(id('message'), errors.message, true, 'min-h-36 resize-y')}
          />
        </FieldShell>

        {/* Honeypot: hidden from people and assistive tech. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor={id('website')}>{f.honeypot}</label>
          <input id={id('website')} name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={update('website')} />
        </div>
      </div>

      {status === 'error' && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mt-8 flex gap-3 rounded-xl border border-[#c2412d]/25 bg-[#c2412d]/[0.06] p-4 text-[0.95rem] text-[#8f2c1d] outline-none"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>{f.sendError}</p>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[0.85rem] leading-relaxed text-ink-muted">
          {f.privacyNote}{' '}
          <LocalLink to="/confidentialite" className="font-medium text-blue-ink underline underline-offset-2">
            {f.privacyLink}
          </LocalLink>
        </p>
        <button type="submit" className={buttonClass('primary', 'shrink-0')} disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              {f.submitting}
            </>
          ) : (
            <>
              {f.submit}
              {useWhatsApp ? (
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Send className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
              )}
            </>
          )}
        </button>
      </div>
    </form>
  )
}

function inputClass(invalid: boolean) {
  return `block w-full rounded-[var(--radius-control)] border bg-paper/60 px-4 py-3 text-[1rem] text-ink placeholder:text-ink-muted/60 transition-[border-color,box-shadow,background-color] duration-150 focus:bg-white focus:outline-none focus:ring-4 ${
    invalid
      ? 'border-[#c2412d]/70 focus:border-[#c2412d] focus:ring-[#c2412d]/15'
      : 'border-line hover:border-navy/30 focus:border-blue focus:ring-blue/15'
  }`
}

function fieldProps(fieldId: string, error: string | undefined, required: boolean, extraClass = '') {
  return {
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${fieldId}-error` : undefined,
    'aria-required': required || undefined,
    className: `${inputClass(Boolean(error))} ${extraClass}`,
  } as const
}

function SelectWrap({ children }: { children: ReactNode }) {
  return (
    <div className="relative [&>select]:appearance-none [&>select]:pe-11">
      {children}
      <ChevronDown className="pointer-events-none absolute end-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden="true" />
    </div>
  )
}

interface FieldShellProps {
  id: string
  label: string
  error?: string
  /** Text shown after the label for optional fields, e.g. "(facultatif)". */
  optional?: string
  hint?: string
  className?: string
  children: ReactNode
}

function FieldShell({ id, label, error, optional, hint, className = '', children }: FieldShellProps) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[0.95rem] font-semibold text-navy">
          {label}
          {optional ? (
            <span className="ms-1.5 font-normal text-ink-muted">{optional}</span>
          ) : (
            <span className="ms-0.5 text-[#c2412d]" aria-hidden="true">
              *
            </span>
          )}
        </label>
        {hint && (
          <span className="text-xs text-ink-muted tabular-nums" aria-hidden="true" dir="ltr">
            {hint}
          </span>
        )}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-[0.88rem] text-[#a33421]">
          <AlertCircle className="mt-[3px] h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}
