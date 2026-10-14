import { useEffect } from 'react'
import { site } from '../config/site'

interface SeoProps {
  title: string
  description: string
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

function setLink(rel: string, href: string | null) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!href) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

/** Per-page title, description, canonical and Open Graph tags. */
export function Seo({ title, description, path, noindex = false }: SeoProps) {
  useEffect(() => {
    const fullTitle = path === '/' ? title : `${title} | ${site.name}`
    const url = site.url ? `${site.url}${path}` : null

    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow')
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:image', `${site.url}/images/og-image.jpg`)
    if (url) setMeta('property', 'og:url', url)
    setLink('canonical', url)
  }, [title, description, path, noindex])

  return null
}
