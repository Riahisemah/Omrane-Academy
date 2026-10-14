/**
 * Central configuration for Omrane Academy — language-neutral data only.
 * All visible text lives in src/i18n/messages/{fr,ar}.ts.
 *
 * Only verified information is filled in. Every `null` value is rendered on the
 * site as a clearly marked placeholder ("À compléter" / "يُستكمل") until the real,
 * verified information is provided. Do not replace a null with a guess.
 */

export const site = {
  name: 'Omrane Academy',
  /** Used for the Google Maps search link. */
  mapsQuery: 'El Omrane Supérieur, Tunis, Tunisie',
  /** Verified contact channels, provided by the academy. */
  contact: {
    /** WhatsApp number in international format, digits only (used for wa.me links). */
    whatsapp: '21626653690',
    whatsappLabel: '+216 26 653 690',
    facebook: 'https://www.facebook.com/profile.php?id=61595131151964',
  },
  /** Production URL without trailing slash (env: VITE_SITE_URL). */
  url: (import.meta.env.VITE_SITE_URL ?? '').replace(/\/+$/, ''),
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

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`

/** Business and legal details — to be completed once verified. */
export const legal: Record<LegalKey, string | null> = {
  legalName: null,
  legalForm: null,
  fullAddress: null,
  registration: null,
  taxId: null,
  email: null,
  publicationDirector: null,
  host: null,
  dataRetention: null,
  privacyContact: null,
}

export type LegalKey =
  | 'legalName'
  | 'legalForm'
  | 'fullAddress'
  | 'registration'
  | 'taxId'
  | 'email'
  | 'publicationDirector'
  | 'host'
  | 'dataRetention'
  | 'privacyContact'

/** Main navigation: route + dictionary key under `nav`. */
export const navigation = [
  { to: '/programmes', key: 'programmes' },
  { to: '/approche', key: 'approach' },
  { to: '/a-propos', key: 'about' },
  { to: '/contact', key: 'contact' },
] as const
