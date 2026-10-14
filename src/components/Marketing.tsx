import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { whatsappUrl } from '../config/site'
import { useI18n } from '../i18n/context'

/** Slim bar above the header: the project's status, with a way to hear about the opening. */
export function AnnouncementBar() {
  const { t } = useI18n()
  const m = t.marketing
  return (
    <div className="bg-navy-deep text-[0.88rem] text-white/80">
      <div className="container-page flex min-h-10 flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center">
        <span>{m.announce}</span>
        <a
          href={whatsappUrl(m.announceMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
        >
          {m.announceCta}
          <ArrowUpRight className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden="true" />
          <span className="sr-only">{t.common.whatsappNewTab}</span>
        </a>
      </div>
    </div>
  )
}

/** Floating WhatsApp button: the channel Tunisian parents use most, one tap away on every page. */
export function WhatsAppFab() {
  const { t } = useI18n()
  return (
    <a
      href={whatsappUrl(t.marketing.fabMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.marketing.fabAria}
      className="fixed end-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 inline-flex h-14 items-center gap-2 rounded-full bg-[#1f8a5b] ps-4 pe-5 font-semibold text-white shadow-[0_12px_32px_-10px_rgb(20_70_45/0.65)] transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#1a774e] sm:end-6 sm:bottom-6"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
      <span>{t.marketing.fabLabel}</span>
    </a>
  )
}
