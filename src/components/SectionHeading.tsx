import type { ReactNode } from 'react'

interface SectionHeadingProps {
  id?: string
  title: string
  intro?: ReactNode
  /** Short context line above the title, in sentence case. */
  kicker?: string
  tone?: 'dark' | 'light'
  className?: string
}

/** Title on the left, supporting text on the right on wide screens — an editorial split. */
export function SectionHeading({ id, title, intro, kicker, tone = 'dark', className = '' }: SectionHeadingProps) {
  const light = tone === 'light'
  return (
    <div className={`grid gap-6 lg:grid-cols-12 lg:items-end ${className}`}>
      <div className="lg:col-span-7">
        {kicker && (
          <p className={`mb-4 text-[0.95rem] font-semibold ${light ? 'text-gold' : 'text-blue-ink'}`}>{kicker}</p>
        )}
        <h2 id={id} className={`text-title max-w-[16ch] ${light ? 'text-white' : ''}`}>
          {title}
        </h2>
      </div>
      {intro && (
        <div className={`text-lead max-w-xl lg:col-span-5 lg:pb-2 ${light ? 'text-white/75' : 'text-ink-muted'}`}>
          {intro}
        </div>
      )}
    </div>
  )
}
