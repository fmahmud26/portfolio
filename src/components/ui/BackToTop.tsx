import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import type Lenis from 'lenis'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Tooltip } from './Tooltip'

const SCROLL_THRESHOLD = 320
const BUTTON_SIZE = 56
const RING_RADIUS = 24
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

function getLenis() {
  return (window as Window & { __lenis?: Lenis }).__lenis
}

function scrollToTop() {
  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.1 })
    return
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function BackToTop() {
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [hovered, setHovered] = useState(false)

  const springProgress = useSpring(progress, { stiffness: 140, damping: 24, mass: 0.6 })
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
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.92 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.94 }}
          transition={{ duration: reducedMotion ? 0.15 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6"
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
              animate={reducedMotion ? undefined : { scale: hovered ? 1.04 : 1 }}
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
              className="group relative flex items-center justify-center rounded-full focus-visible:outline-none"
              style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
            >
              <svg
                className="absolute inset-0 -rotate-90"
                viewBox="0 0 56 56"
                aria-hidden="true"
              >
                <circle
                  cx="28"
                  cy="28"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-border/80"
                />
                <motion.circle
                  cx="28"
                  cy="28"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={RING_CIRCUMFERENCE}
                  style={{ strokeDashoffset }}
                />
              </svg>

              <span className="btn btn--fab relative z-10 shadow-none transition-shadow duration-200 group-hover:shadow-md">
                <ArrowUp
                  size={20}
                  strokeWidth={2.25}
                  className="text-accent transition-transform duration-200 group-hover:-translate-y-px"
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
