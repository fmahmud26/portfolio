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
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
      }

  return (
    <div
      className={`mb-6 sm:mb-8 ${
        align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl xl:max-w-3xl'
      }`}
    >
      <motion.div
        {...motionProps}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`flex items-center gap-2.5 ${align === 'center' ? 'justify-center' : ''}`}
      >
        <span className="h-px w-6 bg-linear-to-r from-accent/70 to-cyan/40 sm:w-8" aria-hidden="true" />
        <span className="label-micro text-accent">{label}</span>
      </motion.div>

      <motion.h2
        {...motionProps}
        transition={{ duration: 0.5, delay: reducedMotion ? 0 : 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="font-display mt-3 text-[clamp(1.625rem,2.8vw,2.375rem)] font-semibold tracking-tight text-balance"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          {...motionProps}
          transition={{ duration: 0.5, delay: reducedMotion ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-2.5 max-w-xl text-[0.9375rem] leading-relaxed text-muted sm:text-base ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
