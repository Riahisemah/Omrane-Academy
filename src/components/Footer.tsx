import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { Logo } from './Logo'
import { locationLabel, mapsUrl, navigation, site } from '../config/site'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-navy-deep text-white/75">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Logo tone="light" />
          <p className="mt-6 max-w-sm text-[1.35rem] font-semibold leading-snug tracking-[-0.02em] text-white">
            {site.slogan}.
          </p>
          <p className="mt-3 max-w-sm text-[0.95rem]">
            Soutien scolaire du primaire au lycée et initiation à l’informatique.
          </p>
        </div>

        <nav aria-label="Pages du site" className="md:col-span-3 md:col-start-7">
          <h2 className="text-sm font-semibold text-white">Le site</h2>
          <ul className="mt-4 space-y-2.5 text-[0.95rem]">
            <li>
              <Link to="/" className="hover:text-gold">
                Accueil
              </Link>
            </li>
            {navigation.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="text-sm font-semibold text-white">Où nous trouver</h2>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-start gap-2 text-[0.95rem] hover:text-gold"
          >
            <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            <span>
              {locationLabel}, {site.location.country}
              <span className="sr-only"> (ouvre Google Maps dans un nouvel onglet)</span>
            </span>
          </a>
          <p className="mt-4 text-[0.95rem]">
            Pour toute question :{' '}
            <Link to="/contact" className="font-medium text-white underline decoration-gold/60 underline-offset-4 hover:text-gold">
              formulaire de contact
            </Link>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-[0.85rem] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Photographies :{' '}
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
              Unsplash
            </a>
            .
          </p>
          <ul className="flex gap-6">
            <li>
              <Link to="/mentions-legales" className="hover:text-white">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link to="/confidentialite" className="hover:text-white">
                Confidentialité
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
