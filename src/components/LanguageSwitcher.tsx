import { Languages } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n/context'
import { localizePath, stripLocale, storeLocale } from '../i18n/locale'

/** Link to the same page in the other language; the choice is remembered. */
export function LanguageSwitcher({ className = '', compact = false }: { className?: string; compact?: boolean }) {
  const { locale, t } = useI18n()
  const { pathname, search, hash } = useLocation()
  const other = locale === 'fr' ? 'ar' : 'fr'
  const to = localizePath(stripLocale(pathname), other) + search + hash

  return (
    <Link
      to={to}
      onClick={() => storeLocale(other)}
      hrefLang={other}
      className={`inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] border border-navy/15 px-3.5 text-[0.95rem] font-semibold text-navy transition-colors hover:border-navy/35 hover:bg-white ${className}`}
    >
      <Languages className={`h-4 w-4 text-blue ${compact ? 'hidden min-[400px]:block' : ''}`} aria-hidden="true" />
      {/* The accessible name starts with the visible label (WCAG 2.5.3), then explains it. */}
      <span lang={other}>{compact ? t.meta.switchShort : t.meta.switchLabel}</span>
      <span className="sr-only"> — {t.meta.switchAria}</span>
    </Link>
  )
}
