import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import type { Locale } from './i18n/locale'

// Secondary pages are split into their own chunks.
const Programmes = lazy(() => import('./pages/Programmes'))
const Approche = lazy(() => import('./pages/Approche'))
const APropos = lazy(() => import('./pages/APropos'))
const Contact = lazy(() => import('./pages/Contact'))
const MentionsLegales = lazy(() => import('./pages/MentionsLegales'))
const Confidentialite = lazy(() => import('./pages/Confidentialite'))
const NotFound = lazy(() => import('./pages/NotFound'))

/** The same pages for every language. Keep in sync with ROUTES in vite.config.ts (sitemap). */
function pages(locale: Locale) {
  return (
    <>
      <Route index element={<Home key={locale} />} />
      <Route path="programmes" element={<Programmes />} />
      <Route path="approche" element={<Approche />} />
      <Route path="a-propos" element={<APropos />} />
      <Route path="contact" element={<Contact />} />
      <Route path="mentions-legales" element={<MentionsLegales />} />
      <Route path="confidentialite" element={<Confidentialite />} />
      <Route path="*" element={<NotFound />} />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Arabic under /ar, French at the root. */}
        <Route path="ar" element={<Layout locale="ar" />}>
          {pages('ar')}
        </Route>
        <Route element={<Layout locale="fr" />}>{pages('fr')}</Route>
      </Routes>
    </BrowserRouter>
  )
}
