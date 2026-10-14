/**
 * Central configuration for Omrane Academy.
 *
 * Only verified information is filled in. Every `null` value is rendered on the
 * site as a clearly marked placeholder ("À compléter") until the real, verified
 * information is provided. Do not replace a null with a guess.
 */

export const site = {
  name: 'Omrane Academy',
  slogan: 'Le chemin vers la réussite',
  location: {
    area: 'El Omrane Supérieur',
    city: 'Tunis',
    country: 'Tunisie',
  },
  /** Production URL without trailing slash (env: VITE_SITE_URL). */
  url: (import.meta.env.VITE_SITE_URL ?? '').replace(/\/+$/, ''),
  /** Verified contact channels, provided by the academy. */
  contact: {
    /** WhatsApp number in international format, digits only (used for wa.me links). */
    whatsapp: '21626653690',
    whatsappLabel: '+216 26 653 690',
    facebook: 'https://www.facebook.com/profile.php?id=61595131151964',
  },
  /** JSON endpoint for the contact form (env: VITE_CONTACT_ENDPOINT). */
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT ?? '',
  /** 'netlify' = deliver the contact form through Netlify Forms (env: VITE_CONTACT_PROVIDER). */
  contactProvider: import.meta.env.VITE_CONTACT_PROVIDER === 'netlify' ? 'netlify' : '',
} as const

/**
 * How the contact form is delivered, in order of priority:
 * Netlify Forms, a JSON endpoint, then WhatsApp (the default), or a demo mode if none is set.
 */
export type ContactDelivery = 'netlify' | 'endpoint' | 'whatsapp' | 'demo'
export const contactDelivery: ContactDelivery =
  site.contactProvider === 'netlify'
    ? 'netlify'
    : site.contactEndpoint
      ? 'endpoint'
      : site.contact.whatsapp
        ? 'whatsapp'
        : 'demo'

/** wa.me link, optionally with a pre-filled message. */
export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${site.contact.whatsapp}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

/** Business and legal details — to be completed once verified. */
export const legal: Record<LegalKey, string | null> = {
  legalName: null,
  legalForm: null,
  fullAddress: null,
  registration: null,
  taxId: null,
  phone: '+216 26 653 690 (WhatsApp)',
  email: null,
  publicationDirector: null,
  host: null,
  formProvider:
    'WhatsApp (Meta) : le formulaire prépare un message que vous envoyez vous-même depuis votre application WhatsApp.',
  dataRetention: null,
  privacyContact: null,
}

export type LegalKey =
  | 'legalName'
  | 'legalForm'
  | 'fullAddress'
  | 'registration'
  | 'taxId'
  | 'phone'
  | 'email'
  | 'publicationDirector'
  | 'host'
  | 'formProvider'
  | 'dataRetention'
  | 'privacyContact'

export const locationLabel = `${site.location.area}, ${site.location.city}`

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.location.area}, ${site.location.city}, ${site.location.country}`,
)}`

export const navigation = [
  { to: '/programmes', label: 'Programmes' },
  { to: '/approche', label: 'Notre approche' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
] as const
