import { MapPin, BookOpenText, Laptop, Users } from 'lucide-react'
import { Seo } from '../components/Seo'
import { PageHero } from '../components/PageHero'
import { CtaBand } from '../components/CtaBand'
import { images } from '../data/content'
import { mapsUrl } from '../config/site'
import { useI18n } from '../i18n/context'

const ambitionIcons = [BookOpenText, Laptop, Users]

export default function APropos() {
  const { t, locationLabel } = useI18n()
  const page = t.aboutPage
  return (
    <>
      <Seo path="/a-propos" title={page.seoTitle} description={page.seoDescription} />
      <PageHero crumb={page.crumb} title={t.home.about.title} intro={t.home.about.text} />

      <div className="container-page">
        <img
          src={images.classe.src}
          alt={t.home.about.imageAlt}
          width={images.classe.width}
          height={images.classe.height}
          decoding="async"
          className="aspect-[4/3] w-full rounded-[var(--radius-frame)] bg-mist object-cover sm:aspect-[16/8]"
        />
      </div>

      <section aria-labelledby="ambition-title" className="container-page py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 id="ambition-title" className="text-title max-w-[12ch]">
              {page.ambitionTitle}
            </h2>
            <p className="text-lead mt-6 max-w-md text-ink-muted">{page.ambitionText}</p>
          </div>
          <ul className="space-y-10 lg:col-span-6 lg:col-start-7">
            {page.ambitions.map(({ title, text }, index) => {
              const Icon = ambitionIcons[index]
              return (
                <li key={title} className="flex gap-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-blue ring-1 ring-line">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-heading">{title}</h3>
                    <p className="mt-3 text-ink-muted">{text}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="lieu-title" className="bg-white py-20 md:py-24">
        <div className="container-page grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <h2 id="lieu-title" className="text-title max-w-[16ch]">
              {page.placeTitle}
            </h2>
            <p className="text-lead mt-6 max-w-xl text-ink-muted">{page.placeText}</p>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-[var(--radius-panel)] border border-line p-6 transition-colors hover:border-navy/30"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-gold">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-semibold text-navy">{locationLabel}</span>
                <span className="text-[0.92rem] text-blue-ink underline underline-offset-4">{t.common.seeOnMap}</span>
                <span className="sr-only">{t.common.mapsNewTab}</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
