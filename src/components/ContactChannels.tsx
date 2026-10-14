import { Facebook, MessageCircle } from 'lucide-react'
import { site, whatsappUrl } from '../config/site'
import { useI18n } from '../i18n/context'

interface ContactChannelsProps {
  tone?: 'dark' | 'light'
  className?: string
}

/** Direct contact links: WhatsApp and the Facebook page. */
export function ContactChannels({ tone = 'dark', className = '' }: ContactChannelsProps) {
  const { t } = useI18n()
  const light = tone === 'light'
  const item = `group flex items-center gap-3 rounded-xl py-1 pe-2 text-[0.95rem] font-medium transition-colors ${
    light ? 'text-white/85 hover:text-gold' : 'text-navy hover:text-blue-ink'
  }`
  const badge = `flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
    light ? 'bg-white/10' : 'bg-white shadow-[var(--shadow-soft)] ring-1 ring-line'
  }`
  const caption = `block text-[0.8rem] font-normal ${light ? 'text-white/60' : 'text-ink-muted'}`
  return (
    <ul className={`space-y-3 ${className}`}>
      <li>
        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={item}>
          <span className={badge}>
            <MessageCircle className={`h-[18px] w-[18px] ${light ? 'text-gold' : 'text-[#1f8a5b]'}`} aria-hidden="true" />
          </span>
          <span>
            <span className={caption}>{t.common.whatsapp}</span>
            <span dir="ltr">{site.contact.whatsappLabel}</span>
          </span>
          <span className="sr-only">{t.common.whatsappNewTab}</span>
        </a>
      </li>
      <li>
        <a href={site.contact.facebook} target="_blank" rel="noopener noreferrer" className={item}>
          <span className={badge}>
            <Facebook className={`h-[18px] w-[18px] ${light ? 'text-gold' : 'text-blue'}`} aria-hidden="true" />
          </span>
          <span>
            <span className={caption}>{t.common.facebook}</span>
            {t.common.facebookPage}
          </span>
          <span className="sr-only">{t.common.facebookNewTab}</span>
        </a>
      </li>
    </ul>
  )
}
