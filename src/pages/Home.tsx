import { useRef, type ComponentType } from 'react'
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react'
import { Seo } from '../components/Seo'
import { ButtonLink } from '../components/Button'
import { SectionHeading } from '../components/SectionHeading'
import { CtaBand } from '../components/CtaBand'
import { ContactForm } from '../components/ContactForm'
import { ContactChannels } from '../components/ContactChannels'
import { LogoMark } from '../components/Logo'
import { HeroPath } from '../components/HeroPath'
import { LocalLink } from '../components/LocalLink'
import { images, principleIcons, programs, type ImageAsset, type ServiceId } from '../data/content'
import { mapsUrl } from '../config/site'
import { useI18n } from '../i18n/context'

type IconType = ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' }>

const linkClass =
  'inline-flex items-center gap-2 font-semibold text-blue-ink underline decoration-blue/0 underline-offset-[6px] transition-colors hover:decoration-blue'

const iconFor = (id: ServiceId): IconType => programs.find((program) => program.id === id)!.icon

export default function Home() {
  const { t } = useI18n()
  return (
    <>
      <Seo path="/" title={t.home.seoTitle} description={t.home.seoDescription} />
      <Hero />
      <Programs />
      <Approach />
      <About />
      <CtaBand to="/#contact" />
      <ContactSection />
    </>
  )
}

/* ------------------------------------------------------------------ */

function Hero() {
  const { t, locationLabel } = useI18n()
  const gridRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLSpanElement>(null)
  const archRef = useRef<HTMLImageElement>(null)
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="container-page relative pt-6 pb-12 md:pt-10 lg:pt-14 lg:pb-12">
        <div ref={gridRef} className="relative grid gap-12 lg:grid-cols-12 lg:gap-12">
          <HeroPath container={gridRef} from={pinRef} to={archRef} />

          <div className="relative flex flex-col justify-center lg:col-span-7">
            <p className="eyebrow flex items-center gap-3 text-[0.78rem] font-bold tracking-[0.14em] text-blue-ink">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              {t.home.eyebrow}
            </p>
            <h1 id="hero-title" className="text-display mt-6 max-w-[12.5ch]">
              {t.home.title}
            </h1>
            <p className="text-lead mt-7 max-w-[34rem] text-ink-muted">{t.home.lead}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink to="/programmes">
                {t.home.ctaPrograms}
                <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink to="/contact" variant="outline">
                {t.home.ctaContact}
              </ButtonLink>
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-12 inline-flex items-center gap-3 self-start rounded-full py-1 pe-3 text-[0.95rem] font-medium text-navy"
            >
              <span
                ref={pinRef}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[var(--shadow-soft)] ring-1 ring-line"
              >
                <MapPin className="h-[18px] w-[18px] text-blue" aria-hidden="true" />
              </span>
              <span className="underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-gold">
                {locationLabel}
              </span>
              <span className="sr-only">{t.common.mapsNewTab}</span>
            </a>
          </div>

          <div className="relative lg:col-span-5">
            <figure className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none">
              <picture>
                <source media="(min-width: 640px)" srcSet="/images/hero-classe.webp" type="image/webp" />
                <img
                  ref={archRef}
                  src="/images/hero-classe-sm.webp"
                  alt={t.home.heroAlt}
                  width={960}
                  height={1200}
                  fetchPriority="high"
                  decoding="async"
                  className="frame-arch h-full w-full bg-mist object-cover shadow-[var(--shadow-lift)]"
                />
              </picture>
              <figcaption className="absolute -bottom-6 start-4 flex items-center gap-3 rounded-2xl bg-white py-3.5 ps-3.5 pe-5 shadow-[var(--shadow-lift)] ring-1 ring-line/70 sm:-start-6 lg:bottom-10 lg:-start-12">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy">
                  <LogoMark tone="light" className="h-7 w-7" />
                </span>
                <span className="text-[0.98rem] leading-tight font-semibold tracking-[-0.01em] text-navy">
                  {t.brand.slogan}
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function Programs() {
  const { t } = useI18n()
  const p = t.home.programs
  const InfoIcon = iconFor('informatique')

  return (
    <section aria-labelledby="programmes-title" className="container-page py-20 md:py-28">
      <SectionHeading id="programmes-title" title={p.title} intro={p.intro} />

      <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-20">
        <article className="group lg:col-span-7">
          <ProgramImage
            to="/programmes#primaire"
            label={p.primaire.title}
            image={images.primaire}
            alt={t.programs.primaire.imageAlt}
            aspect="aspect-[11/8]"
          />
          <ProgramText title={p.primaire.title} text={p.primaire.text} to="/programmes#primaire" icon={iconFor('primaire')} />
        </article>

        <article className="group lg:col-span-5 lg:mt-44">
          <ProgramImage
            to="/programmes#college"
            label={p.collegeLycee.title}
            image={images.collegeLycee}
            alt={t.programs.college.imageAlt}
            aspect="aspect-[8/9]"
          />
          <ProgramText title={p.collegeLycee.title} text={p.collegeLycee.text} to="/programmes#college" icon={iconFor('college')} />
        </article>

        <article className="group relative overflow-hidden rounded-[var(--radius-frame)] bg-navy lg:col-span-12">
          <div className="grid items-center gap-0 md:grid-cols-2">
            <div className="order-2 p-7 sm:p-10 md:order-1 md:p-14">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold text-navy">
                <InfoIcon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="text-heading mt-6 text-white">{p.informatique.title}</h3>
              <p className="mt-4 max-w-md text-white/75">{p.informatique.text}</p>
              <LocalLink
                to="/programmes#informatique"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-gold underline decoration-gold/0 underline-offset-[6px] transition-colors hover:decoration-gold"
              >
                {t.common.learnMore} <span className="sr-only">: {p.informatique.title}</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 rtl:-scale-x-100"
                  aria-hidden="true"
                />
              </LocalLink>
            </div>
            <div className="order-1 h-full md:order-2">
              <img
                src={images.informatique.src}
                alt={t.programs.informatique.imageAlt}
                width={images.informatique.width}
                height={images.informatique.height}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] h-full w-full object-cover md:aspect-auto md:min-h-[26rem]"
              />
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

function ProgramImage({ to, label, image, alt, aspect }: { to: string; label: string; image: ImageAsset; alt: string; aspect: string }) {
  const { t } = useI18n()
  return (
    <LocalLink to={to} className="block rounded-[var(--radius-frame)]" aria-label={`${label} — ${t.common.learnMore}`}>
      <div className="overflow-hidden rounded-[var(--radius-frame)] bg-mist">
        <img
          src={image.src}
          alt={alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          className={`${aspect} w-full object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]`}
        />
      </div>
    </LocalLink>
  )
}

function ProgramText({ title, text, to, icon: Icon }: { title: string; text: string; to: string; icon: IconType }) {
  const { t } = useI18n()
  return (
    <div className="mt-7 flex gap-5 md:pe-8">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-blue shadow-[var(--shadow-soft)] ring-1 ring-line">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <div>
        <h3 className="text-heading">{title}</h3>
        <p className="mt-3 max-w-md text-ink-muted">{text}</p>
        <LocalLink to={to} className={`mt-5 ${linkClass}`}>
          {t.common.learnMore} <span className="sr-only">: {title}</span>
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 rtl:-scale-x-100"
            aria-hidden="true"
          />
        </LocalLink>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function Approach() {
  const { t } = useI18n()
  const a = t.home.approach
  return (
    <section aria-labelledby="approche-title" className="bg-white py-20 md:py-28">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 id="approche-title" className="text-title max-w-[14ch]">
              {a.title}
            </h2>
            <p className="text-lead mt-6 max-w-md text-ink-muted">{a.intro}</p>
            <img
              src={images.approche.src}
              alt={a.imageAlt}
              width={images.approche.width}
              height={images.approche.height}
              loading="lazy"
              decoding="async"
              className="mt-10 hidden aspect-[5/4] w-full rounded-[var(--radius-frame)] rounded-se-[7rem] bg-mist object-cover lg:block"
            />
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ul className="border-b border-line">
            {t.principles.map(({ title, text }, index) => {
              const Icon = principleIcons[index]
              return (
                <li key={title} className="flex gap-6 border-t border-line py-10 md:gap-8 md:py-12">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold-wash text-gold-deep">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-heading">{title}</h3>
                    <p className="mt-3 max-w-lg text-ink-muted">{text}</p>
                  </div>
                </li>
              )
            })}
          </ul>
          <LocalLink to="/approche" className={`mt-10 ${linkClass}`}>
            {a.link}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
          </LocalLink>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function About() {
  const { t } = useI18n()
  const a = t.home.about
  return (
    <section aria-labelledby="about-title" className="container-page pt-20 md:pt-28">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <img
            src={images.classe.src}
            alt={a.imageAlt}
            width={images.classe.width}
            height={images.classe.height}
            loading="lazy"
            decoding="async"
            className="aspect-[7/5] w-full rounded-[var(--radius-frame)] rounded-es-[7rem] bg-mist object-cover md:aspect-[7/4]"
          />
        </div>
        <div className="lg:col-span-5">
          <h2 id="about-title" className="text-title">
            {a.title}
          </h2>
          <p className="text-lead mt-6 text-ink-muted">{a.text}</p>
          <LocalLink to="/a-propos" className={`mt-8 ${linkClass}`}>
            {a.link}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
          </LocalLink>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function ContactSection() {
  const { t, locationLabel } = useI18n()
  const c = t.home.contact
  return (
    <section id="contact" aria-labelledby="contact-title" className="container-page pb-24 md:pb-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 id="contact-title" className="text-title max-w-[12ch]">
            {c.title}
          </h2>
          <p className="text-lead mt-6 max-w-md text-ink-muted">{c.text}</p>
          <div className="mt-10 flex gap-4 border-t border-line pt-8">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-blue" aria-hidden="true" />
            <div>
              <p className="font-semibold text-navy">{locationLabel}</p>
              <p className="text-ink-muted">{t.brand.country}</p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-blue-ink underline underline-offset-4"
              >
                {t.common.seeOnMap}
                <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
                <span className="sr-only">{t.common.mapsNewTab}</span>
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-line pt-8">
            <p className="font-semibold text-navy">{c.direct}</p>
            <ContactChannels className="mt-4" />
          </div>
        </div>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
