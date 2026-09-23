import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react'
import { Loader2 } from 'lucide-react'
import { useMaterialRipple } from '../../hooks/useMaterialRipple'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'outlined'
  | 'danger'
  | 'success'
  | 'ghost'

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

type SharedButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
  iconOnly?: boolean
  selected?: boolean
  glassLayers?: boolean
  ripple?: boolean
  className?: string
  children?: ReactNode
}

type ButtonAsButton = SharedButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedButtonProps> & {
    href?: undefined
  }

type ButtonAsAnchor = SharedButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedButtonProps> & {
    href: string
    external?: boolean
  }

export type ButtonProps = ButtonAsButton | ButtonAsAnchor

function isExternalHref(href: string) {
  return href.startsWith('http://') || href.startsWith('https://')
}

function buildClassName({
  variant = 'secondary',
  size = 'md',
  loading = false,
  fullWidth = false,
  iconOnly = false,
  selected = false,
  className = '',
}: SharedButtonProps) {
  return [
    'btn',
    `btn--${variant}`,
    size === 'icon' || iconOnly ? 'btn--icon' : `btn--${size}`,
    fullWidth && 'btn--full',
    loading && 'btn--loading',
    selected && 'btn--selected',
    className,
  ]
    .filter(Boolean)
    .join(' ')
}

function ButtonGlassLayers() {
  return (
    <>
      <span className="btn__edge" aria-hidden="true" />
      <span className="btn__shine" aria-hidden="true" />
      <span className="btn__state" aria-hidden="true" />
    </>
  )
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const {
      variant = 'secondary',
      size = 'md',
      loading = false,
      fullWidth = false,
      iconOnly = false,
      selected = false,
      glassLayers = true,
      ripple = true,
      className = '',
      children,
      ...rest
    } = props

    const onRipple = useMaterialRipple()
    const classes = buildClassName({
      variant,
      size,
      loading,
      fullWidth,
      iconOnly,
      selected,
      className,
    })

    const spinnerSize = size === 'sm' || size === 'icon' ? 16 : 18

    const content = (
      <>
        {glassLayers && <ButtonGlassLayers />}
        {!glassLayers && <span className="btn__state" aria-hidden="true" />}
        {loading && (
          <Loader2 className="btn__spinner" size={spinnerSize} strokeWidth={2} aria-hidden="true" />
        )}
        <span className={`btn__label${loading ? ' btn__label--hidden' : ''}`}>{children}</span>
      </>
    )

    if ('href' in props && props.href) {
      const { href, external, onPointerDown, ...anchorRest } = rest as Omit<
        ButtonAsAnchor,
        keyof SharedButtonProps
      > & { onPointerDown?: ButtonAsAnchor['onPointerDown'] }
      const openInNewTab = external ?? isExternalHref(href)

      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          aria-busy={loading || undefined}
          aria-disabled={loading || undefined}
          onPointerDown={(e) => {
            if (ripple) onRipple(e)
            onPointerDown?.(e)
          }}
          {...(openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...anchorRest}
        >
          {content}
        </a>
      )
    }

    const { disabled, type = 'button', onPointerDown, ...buttonRest } = rest as Omit<
      ButtonAsButton,
      keyof SharedButtonProps
    > & { onPointerDown?: ButtonAsButton['onPointerDown'] }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled || loading}
        className={classes}
        aria-busy={loading || undefined}
        onPointerDown={(e) => {
          if (ripple) onRipple(e)
          onPointerDown?.(e)
        }}
        {...buttonRest}
      >
        {content}
      </button>
    )
  },
)

Button.displayName = 'Button'
