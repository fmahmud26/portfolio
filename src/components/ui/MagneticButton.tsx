import type { ReactNode } from 'react'
import { Button, type ButtonProps, type ButtonVariant } from './Button'

type MagneticButtonProps = {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  external?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: ButtonProps['size']
  fullWidth?: boolean
  loading?: boolean
  disabled?: boolean
}

const variantMap: Record<NonNullable<MagneticButtonProps['variant']>, ButtonVariant> = {
  primary: 'primary',
  secondary: 'secondary',
  ghost: 'tertiary',
}

/** @deprecated Use `Button` directly — kept for existing imports. */
export function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  external,
  variant = 'secondary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
}: MagneticButtonProps) {
  const mappedVariant = variantMap[variant]

  if (href) {
    return (
      <Button
        href={href}
        external={external}
        variant={mappedVariant}
        size={size}
        className={className}
        fullWidth={fullWidth}
        loading={loading}
        aria-disabled={disabled || undefined}
      >
        {children}
      </Button>
    )
  }

  return (
    <Button
      type="button"
      onClick={onClick}
      variant={mappedVariant}
      size={size}
      className={className}
      fullWidth={fullWidth}
      loading={loading}
      disabled={disabled}
    >
      {children}
    </Button>
  )
}
