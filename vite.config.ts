import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fr, type Messages } from './src/i18n/messages/fr'
import { ar } from './src/i18n/messages/ar'

/** Public routes listed in the sitemap. Keep in sync with src/App.tsx. */
const ROUTES = [
  '/',
  '/programmes',
  '/approche',
  '/a-propos',
  '/contact',
  '/mentions-legales',
  '/confidentialite',
]

/**
 * Writes sitemap.xml and robots.txt into the build output.
 * Absolute URLs need the production domain, provided through VITE_SITE_URL.
 */
function seoFiles(siteUrl: string): Plugin {
  let outDir = 'dist'
  return {
    name: 'omrane-seo-files',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const base = siteUrl.replace(/\/+$/, '')
      if (!base) {
        this.warn(
          'VITE_SITE_URL is not set: sitemap.xml was not generated and robots.txt has no Sitemap line. See README.',
        )
      } else {
        const today = new Date().toISOString().slice(0, 10)
        // Each page exists in French (/x) and Arabic (/ar/x); both list each other as alternates.
        const fr = (path: string) => `${base}${path}`
        const ar = (path: string) => `${base}/ar${path === '/' ? '' : path}`
        const alternates = (path: string) =>
          [
            `    <xhtml:link rel="alternate" hreflang="fr" href="${fr(path)}"/>`,
            `    <xhtml:link rel="alternate" hreflang="ar" href="${ar(path)}"/>`,
            `    <xhtml:link rel="alternate" hreflang="x-default" href="${fr(path)}"/>`,
          ].join('\n')
        const urls = ROUTES.flatMap((path) =>
          [fr(path), ar(path)].map(
            (loc) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n${alternates(path)}\n  </url>`,
          ),
        ).join('\n')
        writeFileSync(
          resolve(outDir, 'sitemap.xml'),
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
        )
      }
      writeFileSync(
        resolve(outDir, 'robots.txt'),
        `User-agent: *\nAllow: /\n${base ? `\nSitemap: ${base}/sitemap.xml\n` : ''}`,
      )
      prerenderHeads(outDir, base)
    },
  }
}

/** Title and description of each route, taken from the dictionaries (single source of truth). */
const PAGE_META: Record<string, (m: Messages) => { title: string; description: string }> = {
  '/': (m) => ({ title: m.home.seoTitle, description: m.home.seoDescription }),
  '/programmes': (m) => ({ title: m.programmesPage.seoTitle, description: m.programmesPage.seoDescription }),
  '/approche': (m) => ({ title: m.approachPage.seoTitle, description: m.approachPage.seoDescription }),
  '/a-propos': (m) => ({ title: m.aboutPage.seoTitle, description: m.aboutPage.seoDescription }),
  '/contact': (m) => ({ title: m.contactPage.seoTitle, description: m.contactPage.seoDescription }),
  '/mentions-legales': (m) => ({ title: m.mentions.seoTitle, description: m.mentions.seoDescription }),
  '/confidentialite': (m) => ({ title: m.privacy.seoTitle, description: m.privacy.seoDescription }),
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * Writes one HTML file per route and language (dist/programmes/index.html,
 * dist/ar/programmes/index.html…) with that page's <html lang/dir>, title,
 * description, Open Graph tags, canonical and hreflang links.
 * Link previews (WhatsApp, Facebook) and crawlers that do not run JavaScript
 * then see the right page; the React app takes over as usual in the browser.
 */
function prerenderHeads(outDir: string, base: string) {
  const template = readFileSync(resolve(outDir, 'index.html'), 'utf8')
  const dictionaries = { fr, ar } satisfies Record<'fr' | 'ar', Messages>
  const pathFor = (path: string, locale: 'fr' | 'ar') => (locale === 'fr' ? path : `/ar${path === '/' ? '' : path}`)

  for (const locale of ['fr', 'ar'] as const) {
    const m = dictionaries[locale]
    for (const path of ROUTES) {
      const { title, description } = PAGE_META[path](m)
      const fullTitle = escapeHtml(path === '/' ? title : `${title} | Omrane Academy`)
      const desc = escapeHtml(description)
      const url = base ? `${base}${pathFor(path, locale)}` : ''
      const links = base
        ? [
            `<link rel="canonical" href="${url}" />`,
            `<link rel="alternate" hreflang="fr" href="${base}${pathFor(path, 'fr')}" />`,
            `<link rel="alternate" hreflang="ar" href="${base}${pathFor(path, 'ar')}" />`,
            `<link rel="alternate" hreflang="x-default" href="${base}${pathFor(path, 'fr')}" />`,
          ].join('\n    ')
        : ''

      const html = template
        .replace(/<html lang="[^"]*">/, () => `<html lang="${locale}" dir="${m.meta.dir}">`)
        .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${fullTitle}</title>`)
        .replace(/(name="description"\s+content=")[^"]*"/, (_, start) => `${start}${desc}"`)
        .replace(/(property="og:title"\s+content=")[^"]*"/, (_, start) => `${start}${fullTitle}"`)
        .replace(/(property="og:description"\s+content=")[^"]*"/, (_, start) => `${start}${desc}"`)
        .replace(/(property="og:locale"\s+content=")[^"]*"/, (_, start) => `${start}${m.meta.ogLocale}"`)
        .replace(/(property="og:url"\s+content=")[^"]*"/, (_, start) => `${start}${url}"`)
        // Branded preview image in the page's language (see marketing/og-image.html).
        .replace(/(property="og:image"\s+content="[^"]*\/images\/)og-image\.jpg"/, (_, start) =>
          `${start}${locale === 'ar' ? 'og-image-ar' : 'og-image'}.jpg"`,
        )
        .replace('</head>', () => (links ? `  ${links}\n  </head>` : '</head>'))

      // Flat files (programmes.html, ar/programmes.html): Netlify serves them at /programmes
      // directly, whereas programmes/index.html triggers a 301 to /programmes/.
      const localized = pathFor(path, locale)
      const file = resolve(outDir, localized === '/' ? 'index.html' : `.${localized}.html`)
      mkdirSync(dirname(file), { recursive: true })
      writeFileSync(file, html)
    }
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [react(), tailwindcss(), seoFiles(env.VITE_SITE_URL ?? '')],
  }
})
