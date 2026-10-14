import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

/** Scrolls to the top on navigation, or to the #anchor when one is present. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    // Lazy-loaded pages render after this effect: wait (up to ~2 s) for the anchor to exist.
    const targetId = decodeURIComponent(hash.slice(1))
    let frame = 0
    let attempts = 0
    const tryScroll = () => {
      const target = document.getElementById(targetId)
      if (target) target.scrollIntoView()
      else if (attempts++ < 120) frame = requestAnimationFrame(tryScroll)
      else window.scrollTo(0, 0)
    }
    tryScroll()
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])
  return null
}

export function Layout() {
  return (
    <>
      <a
        href="#contenu"
        className="sr-only z-[100] rounded-lg bg-navy px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Aller au contenu
      </a>
      <ScrollManager />
      <Header />
      <main id="contenu" tabIndex={-1} className="outline-none">
        <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
