import { ArrowUpRight, MapPin } from 'lucide-react'
import { Seo } from '../components/Seo'
import { PageHero } from '../components/PageHero'
import { ContactForm } from '../components/ContactForm'
import { locationLabel, mapsUrl, site } from '../config/site'

export default function Contact() {
  return (
    <>
      <Seo
        path="/contact"
        title="Contact"
        description="Contactez Omrane Academy, projet de centre éducatif à El Omrane Supérieur, Tunis, pour toute question sur le soutien scolaire ou l’initiation à l’informatique."
      />
      <PageHero
        crumb="Contact"
        title="Parlons de vos besoins."
        intro="Une question sur nos programmes, sur le niveau de votre enfant ou sur les prochaines étapes du projet ? Remplissez le formulaire ci-dessous."
      />

      <section aria-label="Formulaire de contact" className="container-page pb-24 md:pb-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <ContactForm />
          </div>
          <aside className="order-1 lg:order-2 lg:col-span-4 lg:col-start-9" aria-labelledby="adresse-title">
            <div className="rounded-[var(--radius-panel)] bg-navy p-8 text-white">
              <MapPin className="h-6 w-6 text-gold" aria-hidden="true" />
              <h2 id="adresse-title" className="mt-5 text-[1.3rem] font-bold tracking-[-0.02em] text-white">
                Où nous trouver
              </h2>
              <p className="mt-2 text-white/80">
                {locationLabel}
                <br />
                {site.location.country}
              </p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 font-semibold text-gold underline underline-offset-4"
              >
                Voir sur la carte
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">(ouvre Google Maps dans un nouvel onglet)</span>
              </a>
            </div>
            <div className="mt-6 space-y-3 px-1 text-[0.95rem] text-ink-muted">
              <p>
                Indiquez de préférence le niveau et la classe de l’élève : cela nous aidera à vous répondre plus
                précisément.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
