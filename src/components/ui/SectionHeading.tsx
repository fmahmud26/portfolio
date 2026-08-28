import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type SectionHeadingProps = {
  label: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = 'left',
}: SectionHeadingProps) {
  const reducedMotion = useReducedMotion()
  const motionProps = reducedMotion
    ? { initial: false as const }
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
      }

  return (
    <div
      className={`mb-10 sm:mb-12 lg:mb-16 xl:mb-[4.5rem] ${
        align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl xl:max-w-4xl'
      }`}
    >
      <motion.div
        {...motionProps}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}
      >
        <span className="h-px w-8 bg-accent/40 sm:w-10" aria-hidden="true" />
        <span className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase sm:text-xs">
          {label}
        </span>
      </motion.div>

      <motion.h2
        {...motionProps}
        transition={{ duration: 0.6, delay: reducedMotion ? 0 : 0.06, ease: [0.22, 1, 0.36, 1] }}
        className="font-display mt-4 text-[clamp(1.875rem,3.2vw,3rem)] font-semibold tracking-tight text-balance"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          {...motionProps}
          transition={{ duration: 0.6, delay: reducedMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-3 max-w-2xl text-base text-muted sm:mt-4 sm:text-lg ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
