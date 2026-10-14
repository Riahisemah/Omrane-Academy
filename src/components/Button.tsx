import type { ReactNode } from 'react'
import { LocalLink } from './LocalLink'
import { buttonClass, type Variant } from './buttonStyles'

interface ButtonLinkProps {
  to: string
  variant?: Variant
  children: ReactNode
  className?: string
}

export function ButtonLink({ to, variant = 'primary', children, className = '' }: ButtonLinkProps) {
  return (
    <LocalLink to={to} className={buttonClass(variant, className)}>
      {children}
    </LocalLink>
  )
}
