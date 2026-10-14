import type { ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
import { PageHero } from './PageHero'
import { useI18n } from '../i18n/context'

/** Shared layout for legal pages: readable measure, notice about placeholders. */
export function LegalLayout({ crumb, title, intro, children }: { crumb: string; title: string; intro: ReactNode; children: ReactNode }) {
  const { t } = useI18n()
  return (
    <>
      <PageHero crumb={crumb} title={title} intro={intro} />
      <div className="container-page pb-24 md:pb-32">
        <div className="max-w-3xl">
          <aside className="mb-12 flex gap-3 rounded-xl border border-gold-deep/30 bg-gold-wash p-5 text-[0.95rem] text-[#5e4207]">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p>
              <strong>{t.legal.noticeTitle}</strong> {t.legal.notice}
            </p>
          </aside>
          <div className="space-y-12">{children}</div>
        </div>
      </div>
    </>
  )
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-heading">{title}</h2>
      <div className="mt-4 space-y-4 text-ink-muted [&_strong]:text-ink">{children}</div>
    </section>
  )
}

export function LegalList({ items }: { items: { label: string; value: ReactNode }[] }) {
  return (
    <dl className="divide-y divide-line rounded-[var(--radius-panel)] border border-line bg-white">
      {items.map((item) => (
        <div key={item.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
          <dt className="font-semibold text-navy">{item.label}</dt>
          <dd className="text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
