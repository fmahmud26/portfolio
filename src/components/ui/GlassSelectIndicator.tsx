import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type GlassSelectIndicatorProps = {
  layoutId: string
  active: boolean
  className?: string
}

export function GlassSelectIndicator({
  layoutId,
  active,
  className = 'rounded-full',
}: GlassSelectIndicatorProps) {
  const reducedMotion = useReducedMotion()

  if (!active) return null

  return (
    <motion.span
      layoutId={layoutId}
      className={`btn-glass-indicator pointer-events-none absolute inset-0 ${className}`.trim()}
      style={{ pointerEvents: 'none' }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { type: 'spring', stiffness: 420, damping: 34, mass: 0.82 }
      }
    />
  )
}
