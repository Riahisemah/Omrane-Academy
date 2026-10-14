import { useEffect, useMemo, type ReactNode } from 'react'
import { I18nContext, type I18nValue } from './context'
import { localizePath, type Locale } from './locale'
import { fr, type Messages } from './messages/fr'
import { ar } from './messages/ar'

const dictionaries: Record<Locale, Messages> = { fr, ar }

export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const value = useMemo<I18nValue>(() => {
    const t = dictionaries[locale]
    const separator = locale === 'ar' ? '، ' : ', '
    return {
      locale,
      t,
      dir: t.meta.dir,
      path: (to: string) => localizePath(to, locale),
      locationLabel: `${t.brand.area}${separator}${t.brand.city}`,
    }
  }, [locale])

  // Keep <html lang/dir> in sync: drives fonts, RTL layout and screen readers.
  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = value.dir
  }, [locale, value.dir])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
