import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'

// Secondary pages are split into their own chunks.
const Programmes = lazy(() => import('./pages/Programmes'))
const Approche = lazy(() => import('./pages/Approche'))
const APropos = lazy(() => import('./pages/APropos'))
const Contact = lazy(() => import('./pages/Contact'))
const MentionsLegales = lazy(() => import('./pages/MentionsLegales'))
const Confidentialite = lazy(() => import('./pages/Confidentialite'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Keep this list in sync with ROUTES in vite.config.ts (sitemap).
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="programmes" element={<Programmes />} />
          <Route path="approche" element={<Approche />} />
          <Route path="a-propos" element={<APropos />} />
          <Route path="contact" element={<Contact />} />
          <Route path="mentions-legales" element={<MentionsLegales />} />
          <Route path="confidentialite" element={<Confidentialite />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
