import {
  useCallback,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type Ripple = { id: number; x: number; y: number }

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
  const ref = useRef<HTMLAnchorElement>(null)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [pressed, setPressed] = useState(false)
  const [glow, setGlow] = useState(false)
  const reducedMotion = useReducedMotion()

  const spawnRipple = useCallback(
    (clientX: number, clientY: number) => {
      if (reducedMotion) return
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const id = Date.now() + Math.random()
      setRipples((prev) => [
        ...prev,
        { id, x: clientX - rect.left, y: clientY - rect.top },
      ])
      setGlow(true)
      window.setTimeout(() => setGlow(false), 160)
    },
    [reducedMotion],
  )

  const handlePointerDown = (event: PointerEvent<HTMLAnchorElement>) => {
    setPressed(true)
    spawnRipple(event.clientX, event.clientY)
  }

  const handlePointerUp = () => setPressed(false)
  const handlePointerLeave = () => setPressed(false)

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.detail === 0) return
    spawnRipple(event.clientX, event.clientY)
  }

  const removeRipple = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id))
  }

  const tapTransition = { duration: 0.12, ease: [0.22, 1, 0.36, 1] as const }
  const hoverMotion = reducedMotion
    ? undefined
    : variant === 'icon'
      ? { y: -2 }
      : { y: -1 }
  const tapMotion = reducedMotion ? undefined : { scale: variant === 'icon' ? 0.94 : 0.97 }

  return (
    <motion.a
      ref={ref}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      aria-label={ariaLabel}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      onClick={handleClick}
      whileHover={hoverMotion}
      whileTap={tapMotion}
      transition={tapTransition}
      data-pressed={pressed || undefined}
      className={`footer-pressable footer-pressable-${variant} group relative overflow-hidden ${className}`.trim()}
    >
      <span
        className={`pointer-events-none absolute inset-0 transition-opacity duration-150 ${
          glow ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(circle at center, color-mix(in srgb, var(--color-accent) 18%, transparent), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="pointer-events-none absolute rounded-full bg-accent/20"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 12,
              height: 12,
              translate: '-50% -50%',
            }}
            initial={{ scale: 0, opacity: 0.45 }}
            animate={{ scale: variant === 'icon' ? 5 : 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => removeRipple(ripple.id)}
          />
        ))}
      </AnimatePresence>

      <span className="relative z-10 flex items-center justify-center">{children}</span>
    </motion.a>
  )
}
