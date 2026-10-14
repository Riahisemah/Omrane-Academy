/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Production URL, e.g. https://www.example.tn — used for canonical URLs and the sitemap. */
  readonly VITE_SITE_URL?: string
  /** Endpoint receiving contact form submissions as JSON (Formspree, own API…). Empty = demo mode. */
  readonly VITE_CONTACT_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
