import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

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
        const urls = ROUTES.map(
          (path) =>
            `  <url>\n    <loc>${base}${path === '/' ? '/' : path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
        ).join('\n')
        writeFileSync(
          resolve(outDir, 'sitemap.xml'),
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        )
      }
      writeFileSync(
        resolve(outDir, 'robots.txt'),
        `User-agent: *\nAllow: /\n${base ? `\nSitemap: ${base}/sitemap.xml\n` : ''}`,
      )
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [react(), tailwindcss(), seoFiles(env.VITE_SITE_URL ?? '')],
  }
})
