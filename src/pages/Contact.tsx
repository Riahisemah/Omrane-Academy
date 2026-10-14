import { ArrowUpRight, MapPin } from 'lucide-react'
import { Seo } from '../components/Seo'
import { PageHero } from '../components/PageHero'
import { ContactForm } from '../components/ContactForm'
import { ContactChannels } from '../components/ContactChannels'
import { mapsUrl } from '../config/site'
import { useI18n } from '../i18n/context'

export default function Contact() {
  const { t, locationLabel } = useI18n()
  const page = t.contactPage
  return (
    <>
      <Seo path="/contact" title={page.seoTitle} description={page.seoDescription} />
      <PageHero crumb={page.crumb} title={page.title} intro={page.intro} />

      <section aria-label={page.formAria} className="container-page pb-24 md:pb-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <ContactForm />
          </div>
          <aside className="order-1 lg:order-2 lg:col-span-4 lg:col-start-9" aria-labelledby="adresse-title">
            <div className="rounded-[var(--radius-panel)] bg-navy p-8 text-white">
              <MapPin className="h-6 w-6 text-gold" aria-hidden="true" />
              <h2 id="adresse-title" className="mt-5 text-[1.3rem] font-bold tracking-[-0.02em] text-white">
                {t.footer.findUs}
              </h2>
              <p className="mt-2 text-white/80">
                {locationLabel}
                <br />
                {t.brand.country}
              </p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 font-semibold text-gold underline underline-offset-4"
              >
                {t.common.seeOnMap}
                <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
                <span className="sr-only">{t.common.mapsNewTab}</span>
              </a>
            </div>
            <div className="mt-6 rounded-[var(--radius-panel)] border border-line bg-white p-6">
              <h2 className="text-[1.05rem] font-bold tracking-[-0.01em] text-navy">{page.direct}</h2>
              <ContactChannels className="mt-4" />
            </div>
            <p className="mt-6 px-1 text-[0.95rem] text-ink-muted">{page.hint}</p>
          </aside>
        </div>
      </section>
    </>
  )
}
