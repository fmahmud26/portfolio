import { useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type MagneticButtonProps = {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  external?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
}

function isExternalHref(href: string) {
  return href.startsWith('http://') || href.startsWith('https://')
}

const variantClasses = {
  primary: 'bg-primary text-primary-foreground shadow-[0_4px_20px_rgba(15,23,42,0.12)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)]',
  secondary: 'glass',
  ghost: 'border border-border bg-transparent hover:bg-surface/60',
}

export function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  external,
  variant = 'secondary',
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const reducedMotion = useReducedMotion()

  const handleMouse = (e: MouseEvent) => {
    if (reducedMotion) return
    const el = ref.current
    if (!el) return

    const { left, top, width, height } = el.getBoundingClientRect()
    const x = e.clientX - (left + width / 2)
    const y = e.clientY - (top + height / 2)
    setPosition({ x: x * 0.18, y: y * 0.18 })
  }

  const reset = () => setPosition({ x: 0, y: 0 })

  const shared = {
    ref: ref as React.RefObject<HTMLAnchorElement & HTMLButtonElement>,
    onMouseMove: handleMouse,
    onMouseLeave: reset,
    animate: reducedMotion ? undefined : { x: position.x, y: position.y },
    transition: { type: 'spring' as const, stiffness: 180, damping: 18, mass: 0.12 },
    whileTap: reducedMotion ? undefined : { scale: 0.97 },
    className: `group relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-2.5 text-sm font-medium transition-colors sm:min-h-12 sm:px-7 sm:py-3 ${variantClasses[variant]} ${className}`,
  }

  const inner = (
    <>
      {variant !== 'primary' && (
        <span className="absolute inset-0 bg-linear-to-r from-accent/90 to-cyan/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-linear-to-r from-accent to-accent-glow opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
      <span
        className={`relative z-10 flex items-center gap-2 ${
          variant === 'primary' ? 'text-primary-foreground' : 'group-hover:text-white'
        }`}
      >
        {children}
      </span>
    </>
  )

  if (href) {
    const openInNewTab = external ?? isExternalHref(href)

    return (
      <motion.a
        href={href}
        {...(openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...shared}
      >
        {inner}
      </motion.a>
    )
  }

  return (
    <motion.button type="button" onClick={onClick} {...shared}>
      {inner}
    </motion.button>
  )
}
