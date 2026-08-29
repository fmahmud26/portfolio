import type { ReactNode } from 'react'
import { Button } from './Button'

type FooterPressableProps = {
  href: string
  children: ReactNode
  className?: string
  external?: boolean
  ariaLabel?: string
  variant?: 'pill' | 'icon'
}

export function FooterPressable({
  href,
  children,
  className = '',
  external = false,
  ariaLabel,
  variant = 'pill',
}: FooterPressableProps) {
  return (
    <Button
      href={href}
      external={external}
      aria-label={ariaLabel}
      variant={variant === 'icon' ? 'outlined' : 'tertiary'}
      size={variant === 'icon' ? 'icon' : 'sm'}
      iconOnly={variant === 'icon'}
      className={className}
    >
      {children}
    </Button>
  )
}
