import { Check, Info } from 'lucide-react'
import { Seo } from '../components/Seo'
import { PageHero } from '../components/PageHero'
import { CtaBand } from '../components/CtaBand'
import { ButtonLink } from '../components/Button'
import { programs } from '../data/content'

export default function Programmes() {
  return (
    <>
      <Seo
        path="/programmes"
        title="Programmes : soutien scolaire et initiation à l’informatique"
        description="Soutien scolaire pour le primaire, le collège et le lycée, et initiation à l’informatique : découvrez les programmes d’Omrane Academy à El Omrane Supérieur, Tunis."
      />
      <PageHero
        crumb="Programmes"
        title="Des programmes pour chaque étape de la scolarité."
        intro="Du primaire au lycée, et pour celles et ceux qui souhaitent découvrir l’informatique : voici les accompagnements que propose Omrane Academy à El Omrane Supérieur, Tunis."
      >
        <nav aria-label="Aller à un programme" className="mt-10">
          <ul className="flex flex-wrap gap-2.5">
            {programs.map((program) => (
              <li key={program.id}>
                <a
                  href={`#${program.id}`}
                  className="inline-flex items-center rounded-full border border-line bg-white px-4 py-2 text-[0.92rem] font-medium text-navy transition-colors hover:border-navy/30"
                >
                  {program.level === 'Tous niveaux' ? 'Informatique' : program.level}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="container-page space-y-24 pb-8 md:space-y-32">
        {programs.map((program, index) => {
          const reversed = index % 2 === 1
          const Icon = program.icon
          return (
            <section
              key={program.id}
              id={program.id}
              aria-labelledby={`${program.id}-title`}
              className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-12 lg:gap-16"
            >
              <div className={`lg:col-span-6 ${reversed ? 'lg:order-2 lg:col-start-7' : ''}`}>
                <img
                  src={program.image.src}
                  alt={program.image.alt}
                  width={program.image.width}
                  height={program.image.height}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className={`aspect-[5/4] w-full bg-mist object-cover ${reversed ? 'rounded-[var(--radius-frame)] rounded-tl-[7rem]' : 'rounded-[var(--radius-frame)] rounded-tr-[7rem]'}`}
                />
              </div>
              <div className={`lg:col-span-6 ${reversed ? 'lg:order-1' : ''}`}>
                <p className="flex items-center gap-3 text-[0.95rem] font-semibold text-blue-ink">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue ring-1 ring-line">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  {program.level}
                </p>
                <h2 id={`${program.id}-title`} className="text-title mt-6 max-w-[16ch]">
                  {program.title}
                </h2>
                <p className="text-lead mt-5 max-w-xl text-ink-muted">{program.summary}</p>
                <h3 className="mt-9 text-[1rem] font-semibold text-navy">Ce que l’accompagnement vise</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {program.aims.map((aim) => (
                    <li key={aim} className="flex gap-3 text-[0.98rem] text-ink">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-gold-deep" strokeWidth={3} aria-hidden="true" />
                      {aim}
                    </li>
                  ))}
                </ul>
                <ButtonLink to={`/contact?service=${program.id}`} variant="outline" className="mt-10">
                  Poser une question sur ce programme
                </ButtonLink>
              </div>
            </section>
          )
        })}

        <section
          aria-labelledby="pratique-title"
          className="grid gap-6 rounded-[var(--radius-panel)] border border-line bg-white p-7 sm:p-10 md:grid-cols-12 md:gap-10"
        >
          <div className="md:col-span-5">
            <Info className="h-7 w-7 text-blue" aria-hidden="true" />
            <h2 id="pratique-title" className="text-heading mt-4">
              Matières, horaires et modalités
            </h2>
          </div>
          <div className="space-y-4 text-ink-muted md:col-span-7">
            <p>
              Omrane Academy est un projet en cours de préparation. Les matières proposées, les horaires, le format des
              séances et les tarifs seront précisés ultérieurement.
            </p>
            <p>
              Pour être informé ou pour partager les besoins de votre enfant, le plus simple est de nous écrire via le
              formulaire de contact.
            </p>
          </div>
        </section>
      </div>

      <CtaBand />
    </>
  )
}
