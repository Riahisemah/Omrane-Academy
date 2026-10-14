import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface PageHeroProps {
  title: string
  intro?: ReactNode
  crumb: string
  children?: ReactNode
}

/** Header for secondary pages: breadcrumb, large title, and a gold path rule. */
export function PageHero({ title, intro, crumb, children }: PageHeroProps) {
  return (
    <section className="container-page pt-10 pb-14 md:pt-16 md:pb-20">
      <nav aria-label="Fil d’Ariane">
        <ol className="flex items-center gap-1.5 text-sm text-ink-muted">
          <li>
            <Link to="/" className="hover:text-navy">
              Accueil
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li aria-current="page" className="font-medium text-navy">
            {crumb}
          </li>
        </ol>
      </nav>
      <h1 className="text-display mt-8 max-w-[18ch]">{title}</h1>
      <svg aria-hidden="true" viewBox="0 0 240 16" className="mt-8 h-4 w-48 md:w-60" fill="none">
        <path
          d="M2 12C50 12 70 4 120 4S190 12 238 8"
          stroke="var(--color-gold)"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={1}
          className="path-draw"
        />
      </svg>
      {intro && <div className="text-lead mt-8 max-w-2xl text-ink-muted">{intro}</div>}
      {children}
    </section>
  )
}
