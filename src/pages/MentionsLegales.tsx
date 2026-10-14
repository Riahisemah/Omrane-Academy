import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { LegalLayout, LegalList, LegalSection } from '../components/LegalLayout'
import { LegalValue } from '../components/Placeholder'
import { locationLabel, site } from '../config/site'

export default function MentionsLegales() {
  return (
    <>
      <Seo
        path="/mentions-legales"
        title="Mentions légales"
        description="Mentions légales du site Omrane Academy : éditeur, hébergement, propriété intellectuelle et crédits."
      />
      <LegalLayout
        crumb="Mentions légales"
        title="Mentions légales"
        intro={`Informations relatives à l’éditeur et à l’hébergement du site ${site.name}.`}
      >
        <LegalSection title="Éditeur du site">
          <LegalList
            items={[
              { label: 'Nom du projet', value: site.name },
              { label: 'Raison sociale', value: <LegalValue field="legalName" label="raison sociale" /> },
              { label: 'Forme juridique', value: <LegalValue field="legalForm" label="forme juridique" /> },
              { label: 'Localisation', value: `${locationLabel}, ${site.location.country}` },
              { label: 'Adresse complète', value: <LegalValue field="fullAddress" label="adresse postale" /> },
              {
                label: 'Immatriculation',
                value: <LegalValue field="registration" label="identifiant au registre national des entreprises" />,
              },
              { label: 'Matricule fiscal', value: <LegalValue field="taxId" label="matricule fiscal" /> },
              { label: 'Téléphone', value: <LegalValue field="phone" label="téléphone" /> },
              { label: 'E-mail', value: <LegalValue field="email" label="adresse e-mail" /> },
              {
                label: 'Directeur de la publication',
                value: <LegalValue field="publicationDirector" label="nom du responsable" />,
              },
            ]}
          />
        </LegalSection>

        <LegalSection title="Hébergement">
          <LegalList
            items={[{ label: 'Hébergeur', value: <LegalValue field="host" label="nom, adresse et contact de l’hébergeur" /> }]}
          />
        </LegalSection>

        <LegalSection title="Nature du projet">
          <p>
            {site.name} est un projet de centre éducatif. Les informations présentées sur ce site décrivent les
            programmes envisagés ; elles ne constituent pas une offre contractuelle et peuvent évoluer.
          </p>
        </LegalSection>

        <LegalSection title="Propriété intellectuelle">
          <p>
            Les textes, la charte graphique et le logotype d’{site.name} sont protégés. Toute reproduction ou
            réutilisation sans autorisation préalable est interdite.
          </p>
          <p>
            Les photographies proviennent de la plateforme{' '}
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-ink underline underline-offset-2">
              Unsplash
            </a>{' '}
            et sont utilisées conformément à sa licence. Elles sont illustratives et ne représentent pas les locaux ni
            les élèves d’{site.name}.
          </p>
        </LegalSection>

        <LegalSection title="Responsabilité">
          <p>
            L’éditeur s’efforce de fournir des informations exactes et à jour, sans pouvoir garantir l’absence
            d’erreurs. Les liens vers des sites externes (par exemple Google Maps) sont fournis à titre pratique ;
            l’éditeur n’est pas responsable de leur contenu.
          </p>
        </LegalSection>

        <LegalSection title="Données personnelles">
          <p>
            Le traitement des informations transmises via le formulaire de contact est décrit dans notre{' '}
            <Link to="/confidentialite" className="font-medium text-blue-ink underline underline-offset-2">
              politique de confidentialité
            </Link>
            .
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  )
}
