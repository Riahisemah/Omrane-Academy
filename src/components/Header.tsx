import { useEffect, useId, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu, X, MapPin } from 'lucide-react'
import { Logo } from './Logo'
import { ButtonLink } from './Button'
import { LocalNavLink } from './LocalLink'
import { LanguageSwitcher } from './LanguageSwitcher'
import { navigation } from '../config/site'
import { useI18n } from '../i18n/context'

export function Header() {
  const { t, locationLabel } = useI18n()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const panelId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the menu on navigation.
  useEffect(() => setOpen(false), [pathname])

  // Lock scroll, handle Escape and move focus while the mobile menu is open.
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onResize = () => window.matchMedia('(min-width: 1024px)').matches && setOpen(false)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative py-2 text-[0.95rem] font-medium transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-gold after:transition-transform after:duration-300 after:origin-left rtl:after:origin-right ${
      isActive ? 'text-navy after:scale-x-100' : 'text-ink-muted hover:text-navy after:scale-x-0'
    }`

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled || open
          ? 'border-b border-line/80 bg-paper/90 backdrop-blur-md'
          : 'border-b border-transparent bg-paper/0'
      }`}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-3 lg:gap-6">
        <Logo onClick={() => setOpen(false)} />

        <nav aria-label={t.nav.mainAria} className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navigation
              .filter((item) => item.to !== '/contact')
              .map((item) => (
                <li key={item.to}>
                  <LocalNavLink to={item.to} className={linkClass}>
                    {t.nav[item.key]}
                  </LocalNavLink>
                </li>
              ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <ButtonLink to="/contact" className="min-h-11 px-5">
            {t.nav.cta}
          </ButtonLink>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher compact className="px-3" />
          <button
            ref={toggleRef}
            type="button"
            className="-me-2 inline-flex h-11 w-11 items-center justify-center rounded-xl text-navy hover:bg-mist"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id={panelId}
          ref={panelRef}
          className="menu-panel-enter fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto border-t border-line bg-paper lg:hidden"
        >
          <nav aria-label={t.nav.mobileAria} className="container-page flex min-h-full flex-col pt-6 pb-10">
            <ul className="divide-y divide-line border-b border-line">
              {[{ to: '/', key: 'home' } as const, ...navigation].map((item) => (
                <li key={item.to}>
                  <LocalNavLink
                    to={item.to}
                    end
                    className={({ isActive }) =>
                      `flex items-center justify-between py-4 text-[1.6rem] font-bold tracking-[-0.03em] ${
                        isActive ? 'text-navy' : 'text-navy/70'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {t.nav[item.key]}
                        {isActive && <span className="h-2.5 w-2.5 rounded-full bg-gold" aria-hidden="true" />}
                      </>
                    )}
                  </LocalNavLink>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-10">
              <ButtonLink to="/contact" className="w-full">
                {t.nav.cta}
              </ButtonLink>
              <p className="mt-5 flex items-center gap-2 text-sm text-ink-muted">
                <MapPin className="h-4 w-4 text-blue" aria-hidden="true" />
                {locationLabel}
              </p>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
