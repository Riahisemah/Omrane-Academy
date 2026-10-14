/**
 * Locale routing for Omrane Academy.
 *
 * French is served at the root (/programmes), Arabic under /ar (/ar/programmes).
 * On first visit the browser language decides; an explicit choice made with the
 * language switcher is remembered and wins afterwards.
 */

export type Locale = 'fr' | 'ar'

export const LOCALES: Locale[] = ['fr', 'ar']
export const DEFAULT_LOCALE: Locale = 'fr'

const PREFERENCE_KEY = 'omrane-lang'

export function isLocale(value: unknown): value is Locale {
  return value === 'fr' || value === 'ar'
}

/** Locale encoded in a pathname. */
export function localeFromPath(pathname: string): Locale {
  return pathname === '/ar' || pathname.startsWith('/ar/') ? 'ar' : 'fr'
}

/** Pathname without the locale prefix (always starts with "/"). */
export function stripLocale(pathname: string): string {
  if (pathname === '/ar') return '/'
  if (pathname.startsWith('/ar/')) return pathname.slice(3)
  return pathname
}

/**
 * Localises an internal link. Accepts query strings and hashes:
 * localizePath('/contact?service=x', 'ar') → '/ar/contact?service=x'
 * localizePath('/#contact', 'ar') → '/ar#contact'
 */
export function localizePath(to: string, locale: Locale): string {
  if (locale === 'fr') return to
  const cut = to.search(/[?#]/)
  const path = cut === -1 ? to : to.slice(0, cut)
  const rest = cut === -1 ? '' : to.slice(cut)
  return `/ar${path === '/' ? '' : path}${rest}`
}

export function getStoredLocale(): Locale | null {
  try {
    const value = localStorage.getItem(PREFERENCE_KEY)
    return isLocale(value) ? value : null
  } catch {
    return null
  }
}

export function storeLocale(locale: Locale) {
  try {
    localStorage.setItem(PREFERENCE_KEY, locale)
  } catch {
    // Storage unavailable (private mode…): the URL still carries the language.
  }
}

/** First of the browser's preferred languages that the site supports; French otherwise. */
export function browserLocale(): Locale {
  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const language of preferred) {
    const code = language?.toLowerCase() ?? ''
    if (code.startsWith('ar')) return 'ar'
    if (code.startsWith('fr')) return 'fr'
  }
  return DEFAULT_LOCALE
}

/**
 * Runs once before React renders, so the right language shows without a flash.
 * - A remembered choice always applies.
 * - Otherwise an Arabic browser opening a French URL is sent to the Arabic version.
 *   Arabic URLs opened from a non-Arabic browser are respected (e.g. a shared link).
 */
export function applyInitialLocaleRedirect() {
  const { pathname, search, hash } = window.location
  const current = localeFromPath(pathname)
  const target = getStoredLocale() ?? (current === 'fr' ? browserLocale() : current)
  if (target !== current) {
    window.history.replaceState(null, '', localizePath(stripLocale(pathname), target) + search + hash)
  }
}
