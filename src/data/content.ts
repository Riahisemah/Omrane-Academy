import { BookOpenText, GraduationCap, Laptop, Lightbulb, Compass, Sprout, type LucideIcon } from 'lucide-react'

/**
 * Language-neutral structure of the content: ids, images and icons.
 * Text for each id lives in the dictionaries (src/i18n/messages).
 */

export type ServiceId = 'primaire' | 'college' | 'lycee' | 'informatique'

export interface ImageAsset {
  src: string
  width: number
  height: number
}

export const images = {
  primaire: { src: '/images/primaire.webp', width: 1100, height: 800 },
  collegeLycee: { src: '/images/college-lycee.webp', width: 800, height: 900 },
  lycee: { src: '/images/lycee.webp', width: 1000, height: 800 },
  informatique: { src: '/images/informatique.webp', width: 1000, height: 750 },
  approche: { src: '/images/approche.webp', width: 1000, height: 1100 },
  classe: { src: '/images/classe.webp', width: 1400, height: 800 },
} satisfies Record<string, ImageAsset>

export const programs: { id: ServiceId; image: ImageAsset; icon: LucideIcon }[] = [
  { id: 'primaire', image: images.primaire, icon: BookOpenText },
  { id: 'college', image: images.collegeLycee, icon: GraduationCap },
  { id: 'lycee', image: images.lycee, icon: GraduationCap },
  { id: 'informatique', image: images.informatique, icon: Laptop },
]

/** Icons for the three principles, in dictionary order. */
export const principleIcons: LucideIcon[] = [Lightbulb, Compass, Sprout]

export const levelValues = ['primaire', 'college', 'lycee', 'autre'] as const
export const serviceValues = ['soutien', 'informatique', 'indecis'] as const

export type LevelValue = (typeof levelValues)[number]
export type ServiceValue = (typeof serviceValues)[number]
