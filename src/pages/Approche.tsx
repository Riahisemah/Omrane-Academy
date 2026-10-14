import { Seo } from '../components/Seo'
import { PageHero } from '../components/PageHero'
import { CtaBand } from '../components/CtaBand'
import { principles } from '../data/content'

const steps = [
  {
    title: 'Vous nous contactez',
    text: 'Par le formulaire, vous nous indiquez le niveau de l’élève et ce que vous recherchez.',
  },
  {
    title: 'Nous échangeons',
    text: 'Nous prenons le temps de comprendre la situation de l’élève : ses points forts, ses difficultés, ses attentes.',
  },
  {
    title: 'Nous vous orientons',
    text: 'Nous vous présentons l’accompagnement qui nous paraît le plus adapté, pour que vous puissiez décider en connaissance de cause.',
  },
]

export default function Approche() {
  return (
    <>
      <Seo
        path="/approche"
        title="Notre approche pédagogique"
        description="Comprendre avant de mémoriser, un accompagnement adapté et le développement de l’autonomie : la philosophie d’apprentissage d’Omrane Academy, El Omrane Supérieur, Tunis."
      />
      <PageHero
        crumb="Notre approche"
        title="Apprendre à son rythme. Progresser avec confiance."
        intro="Bien accompagner un élève, c’est d’abord l’aider à comprendre, puis lui donner les moyens d’avancer par lui-même. Voici les principes qui guident notre manière de travailler."
      />

      <section aria-labelledby="principes-title" className="bg-white py-20 md:py-28">
        <div className="container-page">
          <h2 id="principes-title" className="sr-only">
            Nos principes
          </h2>
          <div className="grid gap-16 lg:grid-cols-3 lg:gap-12">
            {principles.map(({ title, text, detail, icon: Icon }) => (
              <article key={title} className="border-t-2 border-navy pt-8">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-wash text-gold-deep">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="text-heading mt-7">{title}</h3>
                <p className="mt-4 font-medium text-ink">{text}</p>
                <p className="mt-4 text-ink-muted">{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="valeurs-title" className="container-page py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <img
              src="/images/approche.webp"
              alt="Trois jeunes travaillent ensemble autour d’une table, ordinateurs ouverts, dans une ambiance détendue"
              width={1000}
              height={1100}
              loading="lazy"
              decoding="async"
              className="frame-arch aspect-[4/5] w-full bg-mist object-cover"
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 id="valeurs-title" className="text-title max-w-[15ch]">
              Un cadre bienveillant et exigeant.
            </h2>
            <div className="text-lead mt-6 space-y-5 text-ink-muted">
              <p>
                La confiance se construit dans un climat serein : un élève qui ose poser ses questions et se tromper
                apprend davantage. Nous voulons offrir ce cadre, tout en gardant une exigence de travail régulier.
              </p>
              <p>
                Les progrès dépendent de nombreux facteurs, et chaque parcours est différent. Notre rôle est
                d’accompagner l’élève avec sérieux et attention, en restant en dialogue avec sa famille.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="etapes-title" className="container-page pb-4">
        <h2 id="etapes-title" className="text-title max-w-[16ch]">
          Les premières étapes
        </h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
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
