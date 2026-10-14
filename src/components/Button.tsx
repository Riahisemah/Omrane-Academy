import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { buttonClass, type Variant } from './buttonStyles'

interface ButtonLinkProps {
  to: string
  variant?: Variant
  children: ReactNode
  className?: string
}

export function ButtonLink({ to, variant = 'primary', children, className = '' }: ButtonLinkProps) {
  return (
    <Link to={to} className={buttonClass(variant, className)}>
      {children}
    </Link>
  )
}
