import { Seo } from '../components/Seo'
import { LegalLayout, LegalList, LegalSection } from '../components/LegalLayout'
import { LegalValue } from '../components/Placeholder'
import { LocalLink } from '../components/LocalLink'
import { useI18n } from '../i18n/context'

export default function Confidentialite() {
  const { t } = useI18n()
  const p = t.privacy
  return (
    <>
      <Seo path="/confidentialite" title={p.seoTitle} description={p.seoDescription} />
      <LegalLayout crumb={t.footer.privacy} title={p.title} intro={p.intro}>
        <LegalSection title={p.controllerTitle}>
          <LegalList
            items={[
              { label: p.controller, value: <LegalValue field="legalName" label="controller" /> },
              { label: p.contact, value: <LegalValue field="privacyContact" label="privacyContact" /> },
            ]}
          />
        </LegalSection>

        <LegalSection title={p.collectedTitle}>
          <p>{p.collectedIntro}</p>
          <ul className="list-disc space-y-1.5 ps-6">
            {p.collected.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{p.sensitive}</p>
        </LegalSection>

        <LegalSection title={p.purposeTitle}>
          <p>{p.purpose}</p>
        </LegalSection>

        <LegalSection title={p.recipientsTitle}>
          {p.recipients.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <LegalList items={[{ label: p.provider, value: p.providerValue }]} />
        </LegalSection>

        <LegalSection title={p.retentionTitle}>
          <LegalList items={[{ label: p.retention, value: <LegalValue field="dataRetention" label="dataRetention" /> }]} />
        </LegalSection>

        <LegalSection title={p.cookiesTitle}>
          <p>{p.cookies}</p>
        </LegalSection>

        <LegalSection title={p.rightsTitle}>
          {p.rights.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </LegalSection>

        <LegalSection title={p.seeAlso}>
          <p>
            <LocalLink to="/mentions-legales" className="font-medium text-blue-ink underline underline-offset-2">
              {t.mentions.title}
            </LocalLink>
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  )
}
