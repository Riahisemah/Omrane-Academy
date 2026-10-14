import { Seo } from '../components/Seo'
import { PageHero } from '../components/PageHero'
import { CtaBand } from '../components/CtaBand'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { images, principleIcons } from '../data/content'
import { useI18n } from '../i18n/context'

export default function Approche() {
  const { t } = useI18n()
  const page = t.approachPage
  return (
    <>
      <Seo path="/approche" title={page.seoTitle} description={page.seoDescription} />
      <PageHero crumb={page.crumb} title={page.title} intro={page.intro} />

      <section aria-labelledby="principes-title" className="bg-white py-20 md:py-28">
        <div className="container-page">
          <h2 id="principes-title" className="sr-only">
            {page.principlesHeading}
          </h2>
          <div className="grid gap-16 lg:grid-cols-3 lg:gap-12">
            {t.principles.map(({ title, text, detail }, index) => {
              const Icon = principleIcons[index]
              return (
                <article key={title} className="border-t-2 border-navy pt-8">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-wash text-gold-deep">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="text-heading mt-7">{title}</h3>
                  <p className="mt-4 font-medium text-ink">{text}</p>
                  <p className="mt-4 text-ink-muted">{detail}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="valeurs-title" className="container-page py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ResponsiveImage
              image={images.approche}
              alt={t.home.approach.imageAlt}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="frame-arch aspect-[4/5] w-full bg-mist object-cover"
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 id="valeurs-title" className="text-title max-w-[15ch]">
              {page.valuesTitle}
            </h2>
            <div className="text-lead mt-6 space-y-5 text-ink-muted">
              {page.values.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="etapes-title" className="container-page pb-4">
        <h2 id="etapes-title" className="text-title max-w-[16ch]">
          {page.stepsTitle}
        </h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {page.steps.map((step, index) => (
            <li key={step.title} className="relative">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-[1rem] font-bold text-white tabular-nums">
                {index + 1}
              </span>
              <h3 className="text-heading mt-6">{step.title}</h3>
              <p className="mt-3 max-w-sm text-ink-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <CtaBand />
    </>
  )
}
