import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import type Lenis from 'lenis'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Tooltip } from './Tooltip'

const SCROLL_THRESHOLD = 320
const BUTTON_SIZE = 52
const RING_RADIUS = 22
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

function getLenis() {
  return (window as Window & { __lenis?: Lenis }).__lenis
}

function scrollToTop() {
  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.05 })
    return
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function BackToTop() {
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [hovered, setHovered] = useState(false)

  const springProgress = useSpring(progress, {
    stiffness: reducedMotion ? 400 : 160,
    damping: reducedMotion ? 40 : 26,
    mass: 0.55,
  })
  const strokeDashoffset = useTransform(
    springProgress,
    (value) => RING_CIRCUMFERENCE * (1 - value),
  )

  useEffect(() => {
    let lenis = getLenis()
    let raf = 0
    let attempts = 0

    const updateFromWindow = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const scroll = window.scrollY
      setVisible(scroll > SCROLL_THRESHOLD)
      setProgress(max > 0 ? Math.min(scroll / max, 1) : 0)
    }

    const bindLenis = (instance: Lenis) => {
      const onScroll = ({ scroll, limit }: { scroll: number; limit: number }) => {
        setVisible(scroll > SCROLL_THRESHOLD)
        setProgress(limit > 0 ? Math.min(scroll / limit, 1) : 0)
      }

      instance.on('scroll', onScroll)
      onScroll({ scroll: instance.scroll, limit: instance.limit })

      return () => instance.off('scroll', onScroll)
    }

    let unbindLenis: (() => void) | undefined

    const tryBind = () => {
      lenis = getLenis()
      if (lenis) {
        unbindLenis = bindLenis(lenis)
        return
      }

      if (attempts < 40) {
        attempts += 1
        raf = requestAnimationFrame(tryBind)
      } else {
        updateFromWindow()
        window.addEventListener('scroll', updateFromWindow, { passive: true })
      }
    }

    tryBind()

    return () => {
      cancelAnimationFrame(raf)
      unbindLenis?.()
      window.removeEventListener('scroll', updateFromWindow)
    }
  }, [])

  const progressPercent = Math.round(progress * 100)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.9 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.92 }}
          transition={{ duration: reducedMotion ? 0.15 : 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="back-to-top fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6"
          style={{
            marginRight: 'env(safe-area-inset-right, 0px)',
            marginBottom: 'env(safe-area-inset-bottom, 0px)',
          }}
        >
          <Tooltip text="Back to top" position="left">
            <motion.button
              type="button"
              onClick={scrollToTop}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              aria-label={`Back to top — ${progressPercent}% scrolled`}
              whileTap={reducedMotion ? undefined : { scale: 0.94 }}
              animate={
                reducedMotion
                  ? undefined
                  : { scale: hovered ? 1.06 : 1, y: hovered ? -1 : 0 }
              }
              transition={{ type: 'spring', stiffness: 420, damping: 24 }}
              className="back-to-top__hit group relative flex items-center justify-center rounded-full focus-visible:outline-none"
              style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
            >
              <span className="back-to-top__glow" aria-hidden="true" />

              <svg
                className="back-to-top__ring absolute inset-0 -rotate-90"
                viewBox="0 0 52 52"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="back-to-top-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-accent)" />
                    <stop offset="100%" stopColor="var(--color-cyan)" />
                  </linearGradient>
                </defs>
                <circle
                  cx="26"
                  cy="26"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  className="text-border/70"
                />
                <motion.circle
                  cx="26"
                  cy="26"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="url(#back-to-top-ring)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={RING_CIRCUMFERENCE}
                  style={{ strokeDashoffset }}
                />
              </svg>

              <span className="back-to-top__fab btn btn--fab relative z-10">
                <span className="btn__shine" aria-hidden="true" />
                <ArrowUp
                  size={18}
                  strokeWidth={2.35}
                  className="relative text-accent transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
            </motion.button>
          </Tooltip>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
