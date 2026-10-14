import { createContext, useContext } from 'react'
import type { Locale } from './locale'
import type { Messages } from './messages/fr'

export interface I18nValue {
  locale: Locale
  t: Messages
  dir: 'ltr' | 'rtl'
  /** Localises an internal path: path('/contact') → '/ar/contact' in Arabic. */
  path: (to: string) => string
  /** "El Omrane Supérieur, Tunis" / "العمران الأعلى، تونس العاصمة" */
  locationLabel: string
}

export const I18nContext = createContext<I18nValue | null>(null)

export function useI18n(): I18nValue {
  const value = useContext(I18nContext)
  if (!value) throw new Error('useI18n must be used inside <I18nProvider>')
  return value
}
