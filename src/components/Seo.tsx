import { useEffect } from 'react'
import { site } from '../config/site'
import { useI18n } from '../i18n/context'
import { LOCALES, localizePath } from '../i18n/locale'

interface SeoProps {
  title: string
  description: string
  /** Unlocalised path of the page, e.g. "/programmes". */
  path: string
  /** Set on pages that should not be indexed (e.g. 404). */
  noindex?: boolean
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string | null, hreflang?: string) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`
  let el = document.head.querySelector<HTMLLinkElement>(selector)
  if (!href) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    if (hreflang) el.hreflang = hreflang
    document.head.appendChild(el)
  }
  el.href = href
}

/** Per-page title, description, canonical, hreflang alternates and Open Graph tags. */
export function Seo({ title, description, path, noindex = false }: SeoProps) {
  const { locale, t } = useI18n()

  useEffect(() => {
    const isHome = path === '/'
    const fullTitle = isHome ? title : `${title} | ${site.name}`
    // Absolute URL of this page in a given language.
    const urlFor = (lang: (typeof LOCALES)[number]) => (site.url ? `${site.url}${localizePath(path, lang)}` : null)

    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow')
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:locale', t.meta.ogLocale)
    setMeta('property', 'og:image', `${site.url}/images/og-image.jpg`)
    const url = urlFor(locale)
    if (url) setMeta('property', 'og:url', url)
    setLink('canonical', noindex ? null : url)

    // Language alternates, so search engines show each family the right version.
    for (const lang of LOCALES) setLink('alternate', noindex ? null : urlFor(lang), lang)
    setLink('alternate', noindex ? null : urlFor('fr'), 'x-default')
  }, [title, description, path, noindex, locale, t.meta.ogLocale])

  return null
}
