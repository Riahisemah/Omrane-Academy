import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { LegalLayout, LegalList, LegalSection } from '../components/LegalLayout'
import { LegalValue } from '../components/Placeholder'
import { site } from '../config/site'

export default function Confidentialite() {
  return (
    <>
      <Seo
        path="/confidentialite"
        title="Politique de confidentialité"
        description="Comment Omrane Academy traite les informations transmises via le formulaire de contact : données collectées, finalité, conservation et droits."
      />
      <LegalLayout
        crumb="Confidentialité"
        title="Politique de confidentialité"
        intro="Ce document explique quelles informations sont collectées sur ce site, pourquoi, et comment exercer vos droits."
      >
        <LegalSection title="Responsable du traitement">
          <LegalList
            items={[
              { label: 'Responsable', value: <LegalValue field="legalName" label="raison sociale ou nom du responsable" /> },
              { label: 'Contact', value: <LegalValue field="privacyContact" label="e-mail ou adresse pour les demandes relatives aux données" /> },
            ]}
          />
        </LegalSection>

        <LegalSection title="Données collectées">
          <p>Le site collecte uniquement les informations que vous saisissez dans le formulaire de contact :</p>
          <ul className="list-disc space-y-1.5 pl-6">
            <li>nom et prénom ;</li>
            <li>numéro de téléphone ;</li>
            <li>adresse e-mail, si vous choisissez de la renseigner ;</li>
            <li>niveau scolaire concerné et service souhaité ;</li>
            <li>le contenu de votre message.</li>
          </ul>
          <p>
            Évitez d’indiquer dans votre message des informations sensibles (santé, situation personnelle détaillée)
            qui ne sont pas nécessaires à votre demande.
          </p>
        </LegalSection>

        <LegalSection title="Finalité">
          <p>
            Ces informations servent uniquement à répondre à votre demande et à échanger avec vous au sujet des
            programmes d’{site.name}. Elles ne sont ni vendues ni utilisées à des fins publicitaires.
          </p>
        </LegalSection>

        <LegalSection title="Destinataires et transmission">
          <p>
            Les informations sont destinées à l’équipe d’{site.name}. Le site lui-même n’enregistre ni ne transmet
            rien : lorsque vous validez le formulaire, il prépare un message dans WhatsApp, et c’est vous qui choisissez
            de l’envoyer depuis votre propre application.
          </p>
          <p>
            Une fois envoyé, le message est transmis par WhatsApp, un service de Meta, et traité selon ses propres
            conditions et sa politique de confidentialité. Il en va de même si vous nous contactez via notre page
            Facebook.
          </p>
          <LegalList
            items={[{ label: 'Prestataire d’envoi', value: <LegalValue field="formProvider" label="service utilisé pour recevoir les messages" /> }]}
          />
        </LegalSection>

        <LegalSection title="Durée de conservation">
          <LegalList items={[{ label: 'Durée', value: <LegalValue field="dataRetention" label="durée de conservation" /> }]} />
        </LegalSection>

        <LegalSection title="Cookies et mesure d’audience">
          <p>
            Dans sa version actuelle, le site n’utilise ni cookie publicitaire ni outil de mesure d’audience. Les
            polices de caractères sont hébergées sur le site lui-même. Les liens vers WhatsApp, Facebook et Google
            Maps ouvrent ces services, qui appliquent leurs propres règles en matière de cookies. Si un outil de ce type est ajouté, cette page
            devra être mise à jour en conséquence.
          </p>
        </LegalSection>

        <LegalSection title="Vos droits">
          <p>
            Vous pouvez demander l’accès aux informations vous concernant, leur rectification ou leur suppression, et
            vous opposer à leur traitement, en écrivant au contact indiqué ci-dessus.
          </p>
          <p>
            En Tunisie, la protection des données personnelles est notamment encadrée par la loi organique n° 2004-63
            du 27 juillet 2004, sous le contrôle de l’Instance nationale de protection des données personnelles
            (INPDP). Les obligations applicables au projet (déclaration, autorisations éventuelles) sont à vérifier
            auprès d’un professionnel ou de l’INPDP.
          </p>
        </LegalSection>

        <LegalSection title="Voir aussi">
          <p>
            <Link to="/mentions-legales" className="font-medium text-blue-ink underline underline-offset-2">
              Mentions légales
            </Link>
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  )
}
