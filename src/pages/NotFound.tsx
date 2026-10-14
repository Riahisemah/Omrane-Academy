import { Seo } from '../components/Seo'
import { ButtonLink } from '../components/Button'

export default function NotFound() {
  return (
    <>
      <Seo path="/404" title="Page introuvable" description="Cette page n’existe pas ou a été déplacée." noindex />
      <section className="container-page flex min-h-[60vh] flex-col justify-center py-24">
        <p className="text-[0.95rem] font-semibold text-blue-ink">Erreur 404</p>
        <h1 className="text-display mt-4 max-w-[14ch]">Cette page est introuvable.</h1>
        <p className="text-lead mt-6 max-w-xl text-ink-muted">
          Le lien est peut-être incorrect, ou la page a été déplacée. Reprenez depuis l’accueil ou consultez nos
          programmes.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to="/">Revenir à l’accueil</ButtonLink>
          <ButtonLink to="/programmes" variant="outline">
            Voir les programmes
          </ButtonLink>
        </div>
      </section>
    </>
  )
}
