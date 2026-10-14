import { ArrowRight } from 'lucide-react'
import { ButtonLink } from './Button'
import { useI18n } from '../i18n/context'

export function CtaBand({ to = '/contact' }: { to?: string }) {
  const { t } = useI18n()
  return (
    <section aria-labelledby="cta-title" className="container-page py-20 md:py-28">
      <div className="relative isolate overflow-hidden rounded-[var(--radius-frame)] bg-navy px-6 py-14 sm:px-12 md:px-16 md:py-20">
        {/* The path motif, quietly echoed from the hero (mirrored in Arabic). */}
        <svg
          aria-hidden="true"
          viewBox="0 0 600 300"
          preserveAspectRatio="xMaxYMid slice"
          className="pointer-events-none absolute inset-y-0 end-0 -z-10 hidden h-full w-[48%] md:block rtl:-scale-x-100"
          fill="none"
        >
          <path
            d="M40 300C140 290 210 250 260 190S360 70 470 60 590 20 600 0"
            stroke="var(--color-gold)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="2 10"
          />
          <path d="M150 300C240 280 300 230 340 170S430 90 520 80" stroke="rgb(255 255 255 / 0.08)" strokeWidth="60" strokeLinecap="round" />
        </svg>
        <div className="max-w-2xl">
          <h2 id="cta-title" className="text-title text-white">
            {t.cta.title}
          </h2>
          <p className="text-lead mt-6 max-w-xl text-white/75">{t.cta.text}</p>
          <ButtonLink to={to} variant="gold" className="mt-10">
            {t.cta.button}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
