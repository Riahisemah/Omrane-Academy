import { useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AlertCircle, CheckCircle2, Info, Loader2, Send, ChevronDown, MessageCircle, ArrowUpRight } from 'lucide-react'
import { contactDelivery, site, whatsappUrl } from '../config/site'
import { levelOptions, serviceOptions } from '../data/content'
import { buttonClass } from './buttonStyles'

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

const FIELD_ORDER: Field[] = ['name', 'phone', 'email', 'level', 'service', 'message']
const MESSAGE_MAX = 1000

const useNetlifyForms = contactDelivery === 'netlify'
const useWhatsApp = contactDelivery === 'whatsapp'
const isDemo = contactDelivery === 'demo'

/** Must match the hidden form declared in index.html (Netlify detects forms at deploy time). */
const NETLIFY_FORM_NAME = 'contact'

function validate(values: FormValues): Errors {
  const errors: Errors = {}
  const name = values.name.trim()
  if (!name) errors.name = 'Indiquez votre nom et prénom.'
  else if (name.length < 3) errors.name = 'Le nom saisi semble incomplet.'

  const phone = values.phone.replace(/[\s.\-()]/g, '')
  if (!phone) errors.phone = 'Indiquez un numéro de téléphone pour que nous puissions vous rappeler.'
  else if (!/^(?:(?:\+|00)216)?\d{8}$/.test(phone) && !/^(?:\+|00)\d{8,15}$/.test(phone))
    errors.phone = 'Saisissez un numéro valide, par exemple 20 123 456 ou +216 20 123 456.'

  const email = values.email.trim()
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    errors.email = 'Cette adresse e-mail n’est pas valide. Vous pouvez aussi laisser ce champ vide.'

  if (!values.level) errors.level = 'Choisissez le niveau scolaire concerné.'
  if (!values.service) errors.service = 'Choisissez le service qui vous intéresse.'

  const message = values.message.trim()
  if (!message) errors.message = 'Décrivez brièvement votre demande.'
  else if (message.length < 10) errors.message = 'Ajoutez quelques mots de plus pour décrire votre demande.'
  else if (message.length > MESSAGE_MAX) errors.message = `Le message ne doit pas dépasser ${MESSAGE_MAX} caractères.`

  return errors
}

/** The pre-filled WhatsApp message built from the form. */
function whatsappMessage(values: FormValues) {
  const level = levelOptions.find((o) => o.value === values.level)?.label ?? ''
  const service = serviceOptions.find((o) => o.value === values.service)?.label ?? ''
  const lines = [
    `Bonjour ${site.name},`,
    '',
    'Nouvelle demande depuis le site :',
    `- Nom : ${values.name.trim()}`,
    `- Téléphone : ${values.phone.trim()}`,
    ...(values.email.trim() ? [`- E-mail : ${values.email.trim()}`] : []),
    `- Niveau : ${level}`,
    `- Service : ${service}`,
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
  return levelOptions.some((option) => option.value === param) ? (param as string) : ''
}

export function ContactForm() {
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
    if (submitted) setErrors(validate(next))
    if (status === 'error') setStatus('idle')
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    const found = validate(values)
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
      const link = whatsappUrl(whatsappMessage(values))
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
        niveau: levelOptions.find((o) => o.value === values.level)?.label ?? '',
        service: serviceOptions.find((o) => o.value === values.service)?.label ?? '',
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

  if (status === 'whatsapp') {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-[var(--radius-panel)] border border-line bg-white p-8 shadow-[var(--shadow-soft)] outline-none md:p-10"
      >
        <MessageCircle className="h-9 w-9 text-[#1f8a5b]" aria-hidden="true" />
        <h3 className="text-heading mt-5">Votre message est prêt dans WhatsApp</h3>
        <p className="mt-3 text-ink-muted">
          WhatsApp s’est ouvert avec votre demande déjà rédigée.{' '}
          <strong className="text-ink">Appuyez sur « Envoyer » dans WhatsApp</strong> pour nous la transmettre : tant
          que ce n’est pas fait, nous ne l’avons pas reçue.
        </p>
        <p className="mt-3 text-[0.95rem] text-ink-muted">WhatsApp ne s’est pas ouvert ? Utilisez le bouton ci-dessous.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={waLink} target="_blank" rel="noopener noreferrer" className={buttonClass('primary')}>
            Ouvrir WhatsApp
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">(nouvel onglet)</span>
          </a>
          <button type="button" className={buttonClass('outline')} onClick={() => setStatus('idle')}>
            Modifier ma demande
          </button>
        </div>
      </div>
    )
  }

  if (status === 'success' || status === 'demo') {
    const demo = status === 'demo'
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-[var(--radius-panel)] border border-line bg-white p-8 shadow-[var(--shadow-soft)] outline-none md:p-10"
      >
        {demo ? (
          <Info className="h-9 w-9 text-blue" aria-hidden="true" />
        ) : (
          <CheckCircle2 className="h-9 w-9 text-[#1f8a5b]" aria-hidden="true" />
        )}
        <h3 className="text-heading mt-5">{demo ? 'Formulaire valide — mode démonstration' : 'Demande envoyée'}</h3>
        {demo ? (
          <p className="mt-3 text-ink-muted">
            Votre demande est correctement remplie, mais <strong className="text-ink">elle n’a pas été envoyée</strong> :
            aucun service d’envoi n’est encore relié à ce formulaire. Les informations saisies n’ont été transmises
            nulle part.
          </p>
        ) : (
          <p className="mt-3 text-ink-muted">
            Merci, votre demande a bien été transmise à {site.name}. Nous reviendrons vers vous par téléphone ou par
            e-mail.
          </p>
        )}
        <button
          type="button"
          className={buttonClass('outline', 'mt-8')}
          onClick={() => {
            setStatus('idle')
            if (!demo) setValues({ ...emptyValues, level: '', service: '' })
          }}
        >
          {demo ? 'Revenir au formulaire' : 'Envoyer une autre demande'}
        </button>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-describedby={isDemo || useWhatsApp ? id('demo') : undefined}
      className="rounded-[var(--radius-panel)] border border-line bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8 md:p-10"
    >
      {isDemo && (
        <p
          id={id('demo')}
          className="mb-8 flex gap-3 rounded-xl border border-blue/20 bg-blue/[0.06] p-4 text-[0.92rem] leading-relaxed text-ink"
        >
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue" aria-hidden="true" />
          <span>
            <strong>Version de démonstration.</strong> Ce formulaire n’est pas encore relié à un service d’envoi : vous
            pouvez le tester, mais aucune demande ne sera transmise.
          </span>
        </p>
      )}

      {useWhatsApp && (
        <p
          id={id('demo')}
          className="mb-8 flex gap-3 rounded-xl border border-[#1f8a5b]/25 bg-[#1f8a5b]/[0.06] p-4 text-[0.92rem] leading-relaxed text-ink"
        >
          <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#1f8a5b]" aria-hidden="true" />
          <span>
            <strong>Envoi par WhatsApp.</strong> Après validation, WhatsApp s’ouvre avec votre demande déjà rédigée :
            il vous suffit d’appuyer sur « Envoyer ».
          </span>
        </p>
      )}

      {submitted && errorCount > 0 && (
        <div role="alert" className="mb-8 flex gap-3 rounded-xl border border-[#c2412d]/25 bg-[#c2412d]/[0.06] p-4 text-[0.95rem] text-[#8f2c1d]">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>
            {errorCount === 1 ? 'Un champ est à corriger' : `${errorCount} champs sont à corriger`} avant l’envoi.
          </p>
        </div>
      )}

      <p className="mb-6 text-[0.88rem] text-ink-muted">
        Les champs marqués d’un astérisque (<span className="text-[#c2412d]">*</span>) sont obligatoires.
      </p>

      <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
        <FieldShell id={id('name')} label="Nom et prénom" error={errors.name} className="sm:col-span-2">
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

        <FieldShell id={id('phone')} label="Numéro de téléphone" error={errors.phone}>
          <input
            id={id('phone')}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="20 123 456"
            value={values.phone}
            onChange={update('phone')}
            {...fieldProps(id('phone'), errors.phone, true)}
          />
        </FieldShell>

        <FieldShell id={id('email')} label="Adresse e-mail" optional error={errors.email}>
          <input
            id={id('email')}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={update('email')}
            {...fieldProps(id('email'), errors.email, false)}
          />
        </FieldShell>

        <FieldShell id={id('level')} label="Niveau scolaire concerné" error={errors.level}>
          <SelectWrap>
            <select id={id('level')} name="level" value={values.level} onChange={update('level')} {...fieldProps(id('level'), errors.level, true)}>
              <option value="" disabled>
                Sélectionnez un niveau
              </option>
              {levelOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </SelectWrap>
        </FieldShell>

        <FieldShell id={id('service')} label="Service souhaité" error={errors.service}>
          <SelectWrap>
            <select
              id={id('service')}
              name="service"
              value={values.service}
              onChange={update('service')}
              {...fieldProps(id('service'), errors.service, true)}
            >
              <option value="" disabled>
                Sélectionnez un service
              </option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </SelectWrap>
        </FieldShell>

        <FieldShell
          id={id('message')}
          label="Message"
          error={errors.message}
          className="sm:col-span-2"
          hint={`${values.message.trim().length} / ${MESSAGE_MAX}`}
        >
          <textarea
            id={id('message')}
            name="message"
            rows={5}
            maxLength={MESSAGE_MAX + 200}
            placeholder="Par exemple : la classe de l’élève, ses besoins, vos questions…"
            value={values.message}
            onChange={update('message')}
            {...fieldProps(id('message'), errors.message, true)}
            className={`${inputClass(Boolean(errors.message))} min-h-36 resize-y`}
          />
        </FieldShell>

        {/* Honeypot: hidden from people and assistive tech. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor={id('website')}>Ne pas remplir</label>
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
          <p>
            L’envoi n’a pas abouti. Vérifiez votre connexion Internet puis réessayez ; vos informations sont
            conservées dans le formulaire.
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[0.85rem] leading-relaxed text-ink-muted">
          Vos informations servent uniquement à répondre à votre demande.{' '}
          <Link to="/confidentialite" className="font-medium text-blue-ink underline underline-offset-2">
            Politique de confidentialité
          </Link>
        </p>
        <button type="submit" className={buttonClass('primary', 'shrink-0')} disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Envoi en cours…
            </>
          ) : (
            <>
              Envoyer ma demande
              {useWhatsApp ? (
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Send className="h-4 w-4" aria-hidden="true" />
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

function fieldProps(fieldId: string, error: string | undefined, required: boolean) {
  return {
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${fieldId}-error` : undefined,
    'aria-required': required || undefined,
    className: inputClass(Boolean(error)),
  } as const
}

function SelectWrap({ children }: { children: ReactNode }) {
  return (
    <div className="relative [&>select]:appearance-none [&>select]:pr-11">
      {children}
      <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden="true" />
    </div>
  )
}

interface FieldShellProps {
  id: string
  label: string
  error?: string
  optional?: boolean
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
            <span className="ml-1.5 font-normal text-ink-muted">(facultatif)</span>
          ) : (
            <span className="ml-0.5 text-[#c2412d]" aria-hidden="true">
              *
            </span>
          )}
        </label>
        {hint && (
          <span className="text-xs text-ink-muted tabular-nums" aria-hidden="true">
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
