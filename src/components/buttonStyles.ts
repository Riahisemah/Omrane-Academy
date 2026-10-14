export type Variant = 'primary' | 'gold' | 'outline' | 'outline-light'

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-control)] px-6 py-3 text-[0.98rem] font-semibold tracking-[-0.01em] transition-[background-color,color,box-shadow,transform] duration-200 ease-out active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary: 'bg-navy text-white shadow-[var(--shadow-soft)] hover:bg-navy-soft',
  gold: 'bg-gold text-navy hover:bg-[#f7c662] shadow-[0_10px_30px_-12px_rgb(244_185_66/0.7)]',
  outline: 'border border-navy/20 bg-white/60 text-navy hover:border-navy/40 hover:bg-white',
  'outline-light': 'border border-white/30 text-white hover:border-white/60 hover:bg-white/5',
}

export function buttonClass(variant: Variant = 'primary', extra = '') {
  return `${base} ${variants[variant]} ${extra}`
}

