import { Link } from 'react-router-dom'

interface LogoProps {
  tone?: 'dark' | 'light'
  onClick?: () => void
}

/** Monogram: an arch (the school doorway) with a gold path rising through it. */
export function LogoMark({ tone = 'dark', className = '' }: { tone?: 'dark' | 'light'; className?: string }) {
  const stroke = tone === 'dark' ? 'var(--color-navy)' : '#fff'
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <path
        d="M7 28V14a9 9 0 0 1 18 0v14"
        fill="none"
        stroke={stroke}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path d="M11.5 28c0-6.5 9-6 9-13" fill="none" stroke="var(--color-gold)" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}

export function Logo({ tone = 'dark', onClick }: LogoProps) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="group inline-flex items-center gap-2.5 rounded-lg"
      aria-label="Omrane Academy — accueil"
    >
      <LogoMark tone={tone} className="h-9 w-9 shrink-0" />
      <span
        className={`text-[1.12rem] font-extrabold leading-none tracking-[-0.03em] ${
          tone === 'dark' ? 'text-navy' : 'text-white'
        }`}
      >
        Omrane Academy
      </span>
    </Link>
  )
}
