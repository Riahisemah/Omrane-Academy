import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react'
import { Seo } from '../components/Seo'
import { ButtonLink } from '../components/Button'
import { SectionHeading } from '../components/SectionHeading'
import { CtaBand } from '../components/CtaBand'
import { ContactForm } from '../components/ContactForm'
import { LogoMark } from '../components/Logo'
import { HeroPath } from '../components/HeroPath'
import { homePrograms, principles } from '../data/content'
import { locationLabel, mapsUrl, site } from '../config/site'

export default function Home() {
  return (
    <>
      <Seo
        path="/"
        title="Omrane Academy — Soutien scolaire et informatique à El Omrane Supérieur, Tunis"
        description="Omrane Academy, projet de centre éducatif à El Omrane Supérieur (Tunis) : soutien scolaire pour le primaire, le collège et le lycée, et initiation à l’informatique."
      />
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
  const gridRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLSpanElement>(null)
  const archRef = useRef<HTMLImageElement>(null)
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="container-page relative pt-6 pb-12 md:pt-10 lg:pt-14 lg:pb-12">
        <div ref={gridRef} className="relative grid gap-12 lg:grid-cols-12 lg:gap-12">
          <HeroPath container={gridRef} from={pinRef} to={archRef} />

          <div className="relative flex flex-col justify-center lg:col-span-7">
            <p className="flex items-center gap-3 text-[0.78rem] font-bold tracking-[0.14em] text-blue-ink">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              ACCOMPAGNEMENT SCOLAIRE & NUMÉRIQUE
            </p>
            <h1 id="hero-title" className="text-display mt-6 max-w-[12.5ch]">
              Chaque élève a le potentiel de réussir.
            </h1>
            <p className="text-lead mt-7 max-w-[34rem] text-ink-muted">
              Un accompagnement adapté au primaire, au collège et au lycée, pour progresser avec confiance et
              développer de nouvelles compétences.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink to="/programmes">
                Découvrir nos programmes
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink to="/contact" variant="outline">
                Nous contacter
              </ButtonLink>
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-12 inline-flex items-center gap-3 self-start rounded-full py-1 pr-3 text-[0.95rem] font-medium text-navy"
            >
              <span ref={pinRef} className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[var(--shadow-soft)] ring-1 ring-line">
                <MapPin className="h-[18px] w-[18px] text-blue" aria-hidden="true" />
              </span>
              <span className="underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-gold">
                {locationLabel}
              </span>
              <span className="sr-only">(ouvre Google Maps dans un nouvel onglet)</span>
            </a>
          </div>

          <div className="relative lg:col-span-5">
            <figure className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none">
              <picture>
                <source media="(min-width: 640px)" srcSet="/images/hero-classe.webp" type="image/webp" />
                <img
                  ref={archRef}
                  src="/images/hero-classe-sm.webp"
                  alt="Des lycéens attentifs en classe ; une élève, cahiers à la main, sourit en écoutant"
                  width={960}
                  height={1200}
                  fetchPriority="high"
                  decoding="async"
                  className="frame-arch h-full w-full bg-mist object-cover shadow-[var(--shadow-lift)]"
                />
              </picture>
              <figcaption className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl bg-white py-3.5 pr-5 pl-3.5 shadow-[var(--shadow-lift)] ring-1 ring-line/70 sm:left-[-1.5rem] lg:bottom-10 lg:left-[-3rem]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy">
                  <LogoMark tone="light" className="h-7 w-7" />
                </span>
                <span className="text-[0.98rem] leading-tight font-semibold tracking-[-0.01em] text-navy">
                  {site.slogan}
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
  const { primaire, collegeLycee, informatique } = homePrograms
  return (
    <section aria-labelledby="programmes-title" className="container-page py-20 md:py-28">
      <SectionHeading
        id="programmes-title"
        title="Des solutions pour apprendre et progresser."
        intro="Trois accompagnements, pensés pour chaque étape de la scolarité et pour l’ouverture au numérique."
      />

      <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-20">
        <article className="group lg:col-span-7">
          <Link to={primaire.to} className="block rounded-[var(--radius-frame)]" aria-label={`${primaire.title} — en savoir plus`}>
            <div className="overflow-hidden rounded-[var(--radius-frame)] bg-mist">
              <img
                src={primaire.image.src}
                alt={primaire.image.alt}
                width={primaire.image.width}
                height={primaire.image.height}
                loading="lazy"
                decoding="async"
                className="aspect-[11/8] w-full object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
              />
            </div>
          </Link>
          <ProgramText {...primaire} />
        </article>

        <article className="group lg:col-span-5 lg:mt-44">
          <Link to={collegeLycee.to} className="block rounded-[var(--radius-frame)]" aria-label={`${collegeLycee.title} — en savoir plus`}>
            <div className="overflow-hidden rounded-[var(--radius-frame)] bg-mist">
              <img
                src={collegeLycee.image.src}
                alt={collegeLycee.image.alt}
                width={collegeLycee.image.width}
                height={collegeLycee.image.height}
                loading="lazy"
                decoding="async"
                className="aspect-[8/9] w-full object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
              />
            </div>
          </Link>
          <ProgramText {...collegeLycee} />
        </article>

        <article className="group relative overflow-hidden rounded-[var(--radius-frame)] bg-navy lg:col-span-12">
          <div className="grid items-center gap-0 md:grid-cols-2">
            <div className="order-2 p-7 sm:p-10 md:order-1 md:p-14">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold text-navy">
                <informatique.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="text-heading mt-6 text-white">{informatique.title}</h3>
              <p className="mt-4 max-w-md text-white/75">{informatique.text}</p>
              <Link
                to={informatique.to}
                className="mt-8 inline-flex items-center gap-2 font-semibold text-gold underline decoration-gold/0 underline-offset-[6px] transition-colors hover:decoration-gold"
              >
                En savoir plus <span className="sr-only">sur l’initiation à l’informatique</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            </div>
            <div className="order-1 h-full md:order-2">
              <img
                src={informatique.image.src}
                alt={informatique.image.alt}
                width={informatique.image.width}
                height={informatique.image.height}
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

interface ProgramTextProps {
  title: string
  text: string
  to: string
  icon: (typeof homePrograms)['primaire']['icon']
}

function ProgramText({ title, text, to, icon: Icon }: ProgramTextProps) {
  return (
    <div className="mt-7 flex gap-5 md:pr-8">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-blue shadow-[var(--shadow-soft)] ring-1 ring-line">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <div>
        <h3 className="text-heading">{title}</h3>
        <p className="mt-3 max-w-md text-ink-muted">{text}</p>
        <Link
          to={to}
          className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-ink underline decoration-blue/0 underline-offset-[6px] transition-colors hover:decoration-blue"
        >
          En savoir plus <span className="sr-only">: {title}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function Approach() {
  return (
    <section aria-labelledby="approche-title" className="bg-white py-20 md:py-28">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 id="approche-title" className="text-title max-w-[14ch]">
              Apprendre à son rythme. Progresser avec confiance.
            </h2>
            <p className="text-lead mt-6 max-w-md text-ink-muted">
              Trois principes guident notre manière d’accompagner les élèves, quel que soit leur niveau.
            </p>
            <img
              src="/images/approche.webp"
              alt="Trois jeunes travaillent ensemble autour d’une table, ordinateurs ouverts, dans une ambiance détendue"
              width={1000}
              height={1100}
              loading="lazy"
              decoding="async"
              className="mt-10 hidden aspect-[5/4] w-full rounded-[var(--radius-frame)] rounded-tr-[7rem] bg-mist object-cover lg:block"
            />
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ul className="border-b border-line">
            {principles.map(({ title, text, icon: Icon }) => (
              <li key={title} className="flex gap-6 border-t border-line py-10 md:gap-8 md:py-12">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold-wash text-gold-deep">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-heading">{title}</h3>
                  <p className="mt-3 max-w-lg text-ink-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link
            to="/approche"
            className="mt-10 inline-flex items-center gap-2 font-semibold text-blue-ink underline decoration-blue/0 underline-offset-[6px] transition-colors hover:decoration-blue"
          >
            Découvrir notre approche
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function About() {
  return (
    <section aria-labelledby="about-title" className="container-page pt-20 md:pt-28">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <img
            src="/images/classe.webp"
            alt="Une salle de classe lumineuse : des élèves à leur table écoutent l’enseignant au tableau"
            width={1400}
            height={800}
            loading="lazy"
            decoding="async"
            className="aspect-[7/5] w-full rounded-[var(--radius-frame)] rounded-bl-[7rem] bg-mist object-cover md:aspect-[7/4]"
          />
        </div>
        <div className="lg:col-span-5">
          <h2 id="about-title" className="text-title">
            Bienvenue chez Omrane Academy
          </h2>
          <p className="text-lead mt-6 text-ink-muted">
            Omrane Academy est un projet de centre éducatif à El Omrane Supérieur, Tunis. Notre ambition est de
            proposer un environnement accueillant où les élèves peuvent renforcer leurs connaissances scolaires et
            découvrir les outils numériques.
          </p>
          <Link
            to="/a-propos"
            className="mt-8 inline-flex items-center gap-2 font-semibold text-blue-ink underline decoration-blue/0 underline-offset-[6px] transition-colors hover:decoration-blue"
          >
            En savoir plus sur le projet
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="container-page pb-24 md:pb-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 id="contact-title" className="text-title max-w-[12ch]">
            Une question ? Écrivez-nous.
          </h2>
          <p className="text-lead mt-6 max-w-md text-ink-muted">
            Indiquez-nous le niveau de l’élève et ce que vous recherchez. Nous pourrons ainsi échanger sur ses besoins
            et sur nos programmes.
          </p>
          <div className="mt-10 flex gap-4 border-t border-line pt-8">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-blue" aria-hidden="true" />
            <div>
              <p className="font-semibold text-navy">{locationLabel}</p>
              <p className="text-ink-muted">{site.location.country}</p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-blue-ink underline underline-offset-4"
              >
                Voir sur la carte
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">(ouvre Google Maps dans un nouvel onglet)</span>
              </a>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
