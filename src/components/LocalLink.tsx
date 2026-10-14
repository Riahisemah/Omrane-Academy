import { Link, NavLink, type LinkProps, type NavLinkProps } from 'react-router-dom'
import { useI18n } from '../i18n/context'

/** <Link> that keeps the current language: to="/contact" → "/ar/contact" in Arabic. */
export function LocalLink({ to, ...props }: Omit<LinkProps, 'to'> & { to: string }) {
  const { path } = useI18n()
  return <Link to={path(to)} {...props} />
}

export function LocalNavLink({ to, ...props }: Omit<NavLinkProps, 'to'> & { to: string }) {
  const { path } = useI18n()
  return <NavLink to={path(to)} {...props} />
}
