import { MapPin } from 'lucide-react'
import { Logo } from './Logo'
import { LocalLink } from './LocalLink'
import { ContactChannels } from './ContactChannels'
import { mapsUrl, navigation, site } from '../config/site'
import { useI18n } from '../i18n/context'

export function Footer() {
  const { t, locationLabel } = useI18n()
  const year = new Date().getFullYear()
  return (
    <footer className="bg-navy-deep text-white/75">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Logo tone="light" />
          <p className="mt-6 max-w-sm text-[1.35rem] font-semibold leading-snug tracking-[-0.02em] text-white">
            {t.brand.slogan}.
          </p>
          <p className="mt-3 max-w-sm text-[0.95rem]">{t.footer.tagline}</p>
        </div>

        <nav aria-label={t.footer.pagesAria} className="md:col-span-3 md:col-start-7">
          <h2 className="text-sm font-semibold text-white">{t.footer.siteHeading}</h2>
          <ul className="mt-4 space-y-2.5 text-[0.95rem]">
            {[{ to: '/', key: 'home' } as const, ...navigation].map((item) => (
              <li key={item.to}>
                <LocalLink to={item.to} className="hover:text-gold">
                  {t.nav[item.key]}
                </LocalLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="text-sm font-semibold text-white">{t.footer.findUs}</h2>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-start gap-2 text-[0.95rem] hover:text-gold"
          >
            <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            <span>
              {locationLabel}
              <span className="sr-only"> {t.common.mapsNewTab}</span>
            </span>
          </a>
          <ContactChannels tone="light" className="mt-5" />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 pt-6 pb-24 text-[0.85rem] sm:pb-6 text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {t.footer.photos}{' '}
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
              Unsplash
            </a>
            .
          </p>
          <ul className="flex gap-6">
            <li>
              <LocalLink to="/mentions-legales" className="hover:text-white">
                {t.footer.legal}
              </LocalLink>
            </li>
            <li>
              <LocalLink to="/confidentialite" className="hover:text-white">
                {t.footer.privacy}
              </LocalLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
