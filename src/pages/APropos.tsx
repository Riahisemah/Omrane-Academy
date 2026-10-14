import { MapPin, BookOpenText, Laptop, Users } from 'lucide-react'
import { Seo } from '../components/Seo'
import { PageHero } from '../components/PageHero'
import { CtaBand } from '../components/CtaBand'
import { locationLabel, mapsUrl, site } from '../config/site'

const ambitions = [
  {
    icon: BookOpenText,
    title: 'Renforcer les connaissances scolaires',
    text: 'Aider les élèves du primaire, du collège et du lycée à consolider leurs acquis et à mieux comprendre leurs cours.',
  },
  {
    icon: Laptop,
    title: 'Ouvrir au numérique',
    text: 'Permettre de découvrir les outils informatiques et d’en acquérir les bases, pour un usage plus autonome et plus sûr.',
  },
  {
    icon: Users,
    title: 'Être un lieu de proximité',
    text: 'Proposer aux familles du quartier un environnement accueillant, facile d’accès, où l’on vient apprendre sereinement.',
  },
]

export default function APropos() {
  return (
    <>
      <Seo
        path="/a-propos"
        title="À propos"
        description="Omrane Academy est un projet de centre éducatif à El Omrane Supérieur, Tunis : soutien scolaire et initiation à l’informatique dans un environnement accueillant."
      />
      <PageHero
        crumb="À propos"
        title="Bienvenue chez Omrane Academy"
        intro="Omrane Academy est un projet de centre éducatif à El Omrane Supérieur, Tunis. Notre ambition est de proposer un environnement accueillant où les élèves peuvent renforcer leurs connaissances scolaires et découvrir les outils numériques."
      />

      <div className="container-page">
        <img
          src="/images/classe.webp"
          alt="Une salle de classe lumineuse : des élèves à leur table écoutent l’enseignant au tableau"
          width={1400}
          height={800}
          decoding="async"
          className="aspect-[4/3] w-full rounded-[var(--radius-frame)] bg-mist object-cover sm:aspect-[16/8]"
        />
      </div>

      <section aria-labelledby="ambition-title" className="container-page py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 id="ambition-title" className="text-title max-w-[12ch]">
              Notre ambition
            </h2>
            <p className="text-lead mt-6 max-w-md text-ink-muted">
              Notre devise, « {site.slogan} », résume ce que nous voulons offrir : un accompagnement qui aide chaque
              élève à avancer, pas à pas.
            </p>
          </div>
          <ul className="space-y-10 lg:col-span-6 lg:col-start-7">
            {ambitions.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-blue ring-1 ring-line">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-heading">{title}</h3>
                  <p className="mt-3 text-ink-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="lieu-title" className="bg-white py-20 md:py-24">
        <div className="container-page grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <h2 id="lieu-title" className="text-title max-w-[16ch]">
              Ancré à El&nbsp;Omrane&nbsp;Supérieur.
            </h2>
            <p className="text-lead mt-6 max-w-xl text-ink-muted">
              Le projet s’adresse en premier lieu aux familles d’El Omrane Supérieur et des quartiers voisins de Tunis,
              pour un accompagnement proche de chez elles.
            </p>
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
                <span className="text-[0.92rem] text-blue-ink underline underline-offset-4">Voir sur la carte</span>
                <span className="sr-only">(ouvre Google Maps dans un nouvel onglet)</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
