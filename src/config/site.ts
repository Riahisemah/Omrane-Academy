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
  /** JSON endpoint for the contact form (env: VITE_CONTACT_ENDPOINT). Empty = demo mode. */
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT ?? '',
} as const

/** Business and legal details — to be completed once verified. */
export const legal: Record<LegalKey, string | null> = {
  legalName: null,
  legalForm: null,
  fullAddress: null,
  registration: null,
  taxId: null,
  phone: null,
  email: null,
  publicationDirector: null,
  host: null,
  formProvider: null,
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
