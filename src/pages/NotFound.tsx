import { Seo } from '../components/Seo'
import { ButtonLink } from '../components/Button'
import { useI18n } from '../i18n/context'

export default function NotFound() {
  const { t } = useI18n()
  const n = t.notFound
  return (
    <>
      <Seo path="/404" title={n.seoTitle} description={n.seoDescription} noindex />
      <section className="container-page flex min-h-[60vh] flex-col justify-center py-24">
        <p className="text-[0.95rem] font-semibold text-blue-ink">{n.kicker}</p>
        <h1 className="text-display mt-4 max-w-[14ch]">{n.title}</h1>
        <p className="text-lead mt-6 max-w-xl text-ink-muted">{n.text}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to="/">{n.home}</ButtonLink>
          <ButtonLink to="/programmes" variant="outline">
            {n.programs}
          </ButtonLink>
        </div>
      </section>
    </>
  )
}
