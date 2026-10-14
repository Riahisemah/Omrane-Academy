import { legal, type LegalKey } from '../config/site'

/**
 * Renders a verified value from `legal`, or a clearly visible placeholder
 * when the information has not been provided yet.
 */
export function LegalValue({ field, label }: { field: LegalKey; label: string }) {
  const value = legal[field]
  if (value) return <>{value}</>
  return (
    <mark className="rounded-md border border-dashed border-gold-deep/60 bg-gold-wash px-1.5 py-0.5 text-[0.92em] font-medium text-[#7a5408]">
      [À compléter : {label}]
    </mark>
  )
}
