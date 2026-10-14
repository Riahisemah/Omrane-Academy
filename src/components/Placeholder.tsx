import { legal, type LegalKey } from '../config/site'
import { useI18n } from '../i18n/context'
import type { Messages } from '../i18n/messages/fr'

type LabelKey = keyof Messages['legal']['labels']

/**
 * Renders a verified value from `legal`, or a clearly visible placeholder
 * when the information has not been provided yet.
 */
export function LegalValue({ field, label }: { field?: LegalKey; label: LabelKey }) {
  const { t } = useI18n()
  const value = field ? legal[field] : null
  if (value) return <>{value}</>
  return (
    <mark className="rounded-md border border-dashed border-gold-deep/60 bg-gold-wash px-1.5 py-0.5 text-[0.92em] font-medium text-[#7a5408]">
      {t.legal.placeholder(t.legal.labels[label])}
    </mark>
  )
}
