import { Seo } from '../components/Seo'
import { LegalLayout, LegalList, LegalSection } from '../components/LegalLayout'
import { LegalValue } from '../components/Placeholder'
import { LocalLink } from '../components/LocalLink'
import { site } from '../config/site'
import { useI18n } from '../i18n/context'

export default function MentionsLegales() {
  const { t, locale, locationLabel } = useI18n()
  const m = t.mentions
  const r = m.rows
  return (
    <>
      <Seo path="/mentions-legales" title={m.seoTitle} description={m.seoDescription} />
      <LegalLayout crumb={m.title} title={m.title} intro={m.intro}>
        <LegalSection title={m.publisher}>
          <LegalList
            items={[
              { label: r.project, value: site.name },
              { label: r.legalName, value: <LegalValue field="legalName" label="legalName" /> },
              { label: r.legalForm, value: <LegalValue field="legalForm" label="legalForm" /> },
              { label: r.location, value: `${locationLabel}${locale === 'ar' ? '، ' : ', '}${t.brand.country}` },
              { label: r.fullAddress, value: <LegalValue field="fullAddress" label="fullAddress" /> },
              { label: r.registration, value: <LegalValue field="registration" label="registration" /> },
              { label: r.taxId, value: <LegalValue field="taxId" label="taxId" /> },
              {
                label: r.phone,
                value: (
                  <>
                    <span dir="ltr">{site.contact.whatsappLabel}</span> ({t.common.whatsapp})
                  </>
                ),
              },
              { label: r.email, value: <LegalValue field="email" label="email" /> },
              { label: r.publicationDirector, value: <LegalValue field="publicationDirector" label="publicationDirector" /> },
            ]}
          />
        </LegalSection>

        <LegalSection title={m.hosting}>
          <LegalList items={[{ label: r.host, value: <LegalValue field="host" label="host" /> }]} />
        </LegalSection>

        <LegalSection title={m.natureTitle}>
          <p>{m.nature}</p>
        </LegalSection>

        <LegalSection title={m.ipTitle}>
          <p>{m.ip}</p>
          <p>
            {m.photosBefore}{' '}
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-ink underline underline-offset-2">
              Unsplash
            </a>{' '}
            {m.photosAfter}
          </p>
        </LegalSection>

        <LegalSection title={m.liabilityTitle}>
          <p>{m.liability}</p>
        </LegalSection>

        <LegalSection title={m.dataTitle}>
          <p>
            {m.dataBefore}{' '}
            <LocalLink to="/confidentialite" className="font-medium text-blue-ink underline underline-offset-2">
              {m.dataLink}
            </LocalLink>
            .
          </p>
        </LegalSection>
      </LegalLayout>
    </>
  )
}
