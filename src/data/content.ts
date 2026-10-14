import { BookOpenText, GraduationCap, Laptop, Lightbulb, Compass, Sprout, type LucideIcon } from 'lucide-react'

export type ServiceId = 'primaire' | 'college' | 'lycee' | 'informatique'

export interface Program {
  id: ServiceId
  title: string
  level: string
  summary: string
  aims: string[]
  image: { src: string; alt: string; width: number; height: number }
  icon: LucideIcon
}

const images = {
  primaire: {
    src: '/images/primaire.webp',
    alt: 'Des enfants de primaire concentrés sur leurs exercices autour d’une table de classe',
    width: 1100,
    height: 800,
  },
  collegeLycee: {
    src: '/images/college-lycee.webp',
    alt: 'Une lycéenne souriante prend des notes dans son cahier',
    width: 800,
    height: 900,
  },
  lycee: {
    src: '/images/lycee.webp',
    alt: 'Des lycéens révisent ensemble autour d’une table, livres et ordinateurs ouverts',
    width: 1000,
    height: 800,
  },
  informatique: {
    src: '/images/informatique.webp',
    alt: 'Deux jeunes apprennent ensemble devant un écran d’ordinateur',
    width: 1000,
    height: 750,
  },
}

/** Detailed programmes (used on /programmes). No subjects, prices or schedules are invented. */
export const programs: Program[] = [
  {
    id: 'primaire',
    title: 'Soutien scolaire — Primaire',
    level: 'Primaire',
    summary:
      'Accompagner les élèves dans l’apprentissage des fondamentaux et les aider à construire des bases solides.',
    aims: [
      'Reprendre calmement les notions vues en classe',
      'Consolider les fondamentaux, étape par étape',
      'Prendre de bonnes habitudes de travail',
      'Gagner en assurance face aux exercices',
    ],
    image: images.primaire,
    icon: BookOpenText,
  },
  {
    id: 'college',
    title: 'Soutien scolaire — Collège',
    level: 'Collège',
    summary:
      'Renforcer les acquis, mieux comprendre les cours et préparer les évaluations avec davantage de confiance.',
    aims: [
      'Clarifier les points du cours restés flous',
      'Combler progressivement les lacunes',
      'Apprendre à s’organiser et à réviser',
      'Préparer les évaluations sereinement',
    ],
    image: images.collegeLycee,
    icon: GraduationCap,
  },
  {
    id: 'lycee',
    title: 'Soutien scolaire — Lycée',
    level: 'Lycée',
    summary:
      'Approfondir les notions, gagner en méthode et aborder les échéances importantes avec davantage de sérénité.',
    aims: [
      'Approfondir la compréhension des notions',
      'Travailler la méthode et la rigueur',
      'Structurer ses révisions dans la durée',
      'Aborder les examens avec plus de confiance',
    ],
    image: images.lycee,
    icon: GraduationCap,
  },
  {
    id: 'informatique',
    title: 'Initiation à l’informatique',
    level: 'Tous niveaux',
    summary:
      'Découvrir les outils numériques, apprendre les bases de l’informatique et développer de nouvelles compétences.',
    aims: [
      'Prendre en main l’ordinateur et ses outils',
      'Comprendre les notions de base de l’informatique',
      'Adopter de bons réflexes pour un usage sûr',
      'Gagner en autonomie avec le numérique',
    ],
    image: images.informatique,
    icon: Laptop,
  },
]

/** The three offers as presented on the home page. */
export const homePrograms = {
  primaire: {
    title: 'Soutien scolaire — Primaire',
    text: 'Accompagner les élèves dans l’apprentissage des fondamentaux et les aider à construire des bases solides.',
    to: '/programmes#primaire',
    image: images.primaire,
    icon: BookOpenText,
  },
  collegeLycee: {
    title: 'Soutien scolaire — Collège & Lycée',
    text: 'Renforcer les acquis, mieux comprendre les cours et préparer les évaluations avec davantage de confiance.',
    to: '/programmes#college',
    image: images.collegeLycee,
    icon: GraduationCap,
  },
  informatique: {
    title: 'Initiation à l’informatique',
    text: 'Découvrir les outils numériques, apprendre les bases de l’informatique et développer de nouvelles compétences.',
    to: '/programmes#informatique',
    image: images.informatique,
    icon: Laptop,
  },
}

export interface Principle {
  title: string
  text: string
  detail: string
  icon: LucideIcon
}

export const principles: Principle[] = [
  {
    title: 'Comprendre avant de mémoriser',
    text: 'Nous prenons le temps d’expliquer le sens des notions, pour que l’élève sache les réutiliser plutôt que simplement les réciter.',
    detail:
      'Une notion comprise se retient mieux et se transfère plus facilement d’un exercice à l’autre. Nous privilégions les questions, les exemples concrets et la reformulation par l’élève lui-même.',
    icon: Lightbulb,
  },
  {
    title: 'Un accompagnement adapté',
    text: 'Chaque élève avance différemment. Les explications et les exercices s’ajustent à son niveau, à ses difficultés et à son rythme.',
    detail:
      'Partir de là où en est l’élève, et non de là où il « devrait » être : c’est le point de départ d’un accompagnement utile. Le dialogue avec la famille aide à mieux cerner ses besoins.',
    icon: Compass,
  },
  {
    title: 'Développer l’autonomie',
    text: 'S’organiser, chercher, vérifier son travail : des habitudes qui servent en classe comme à la maison.',
    detail:
      'L’objectif n’est pas de faire à la place de l’élève, mais de l’aider à acquérir des méthodes qu’il pourra appliquer seul, au fil de sa scolarité.',
    icon: Sprout,
  },
]

export const levelOptions = [
  { value: 'primaire', label: 'Primaire' },
  { value: 'college', label: 'Collège' },
  { value: 'lycee', label: 'Lycée' },
  { value: 'autre', label: 'Autre / non concerné' },
] as const

export const serviceOptions = [
  { value: 'soutien', label: 'Soutien scolaire' },
  { value: 'informatique', label: 'Initiation à l’informatique' },
  { value: 'indecis', label: 'Je ne sais pas encore' },
] as const

export type LevelValue = (typeof levelOptions)[number]['value']
export type ServiceValue = (typeof serviceOptions)[number]['value']
