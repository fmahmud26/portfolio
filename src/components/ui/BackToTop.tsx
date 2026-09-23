import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import type Lenis from 'lenis'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useMaterialRipple } from '../../hooks/useMaterialRipple'
import { Tooltip } from './Tooltip'

const SCROLL_THRESHOLD = 320
const BUTTON_SIZE = 56
const RING_RADIUS = 23
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
  const onRipple = useMaterialRipple()
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  const springProgress = useSpring(progress, {
    stiffness: reducedMotion ? 400 : 140,
    damping: reducedMotion ? 40 : 24,
    mass: 0.5,
  })
  const strokeDashoffset = useTransform(
    springProgress,
    (value) => RING_CIRCUMFERENCE * (1 - value),
  )
  const ringGlow = useTransform(springProgress, [0, 1], [0.25, 0.85])

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
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.72, rotate: -8 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, rotate: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.85, rotate: 4 }}
          transition={{
            type: 'spring',
            stiffness: reducedMotion ? 380 : 320,
            damping: reducedMotion ? 36 : 22,
            mass: 0.7,
          }}
          className="back-to-top fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6"
          style={{
            marginRight: 'env(safe-area-inset-right, 0px)',
            marginBottom: 'env(safe-area-inset-bottom, 0px)',
          }}
        >
          <Tooltip text="Back to top" position="left">
            <motion.button
              type="button"
              onClick={() => {
                setPressed(true)
                scrollToTop()
                window.setTimeout(() => setPressed(false), reducedMotion ? 120 : 520)
              }}
              onPointerDown={onRipple}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              aria-label={`Back to top — ${progressPercent}% scrolled`}
              whileTap={reducedMotion ? undefined : { scale: 0.9 }}
              animate={
                reducedMotion
                  ? undefined
                  : {
                      scale: hovered ? 1.08 : 1,
                      y: hovered ? -3 : 0,
                    }
              }
              transition={{ type: 'spring', stiffness: 420, damping: 22 }}
              className="back-to-top__hit group relative flex items-center justify-center overflow-hidden rounded-full focus-visible:outline-none"
              style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
            >
              {/* Soft breathing aura */}
              {!reducedMotion && (
                <motion.span
                  className="back-to-top__aura"
                  aria-hidden="true"
                  animate={{ scale: [1, 1.16, 1] }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{ opacity: ringGlow }}
                />
              )}

              <motion.span
                className="back-to-top__glow"
                aria-hidden="true"
                animate={
                  reducedMotion
                    ? undefined
                    : hovered
                      ? { opacity: 0.95, scale: 1.08 }
                      : { opacity: 0.6, scale: 1 }
                }
                transition={{ duration: 0.35 }}
              />

              <svg
                className="back-to-top__ring absolute inset-0 -rotate-90"
                viewBox="0 0 56 56"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="back-to-top-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-accent)" />
                    <stop offset="55%" stopColor="var(--color-cyan)" />
                    <stop offset="100%" stopColor="var(--color-accent-glow)" />
                  </linearGradient>
                  <filter id="back-to-top-ring-glow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="1.4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <circle
                  cx="28"
                  cy="28"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-border/55"
                />
                <motion.circle
                  cx="28"
                  cy="28"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="url(#back-to-top-ring)"
                  strokeWidth="2.75"
                  strokeLinecap="round"
                  strokeDasharray={RING_CIRCUMFERENCE}
                  filter="url(#back-to-top-ring-glow)"
                  style={{ strokeDashoffset, opacity: ringGlow }}
                />
              </svg>

              <span className="back-to-top__fab btn btn--fab relative z-10">
                <span className="btn__shine" aria-hidden="true" />
                <motion.span
                  className="back-to-top__icon relative flex items-center justify-center text-accent"
                  aria-hidden="true"
                  animate={
                    reducedMotion
                      ? undefined
                      : pressed
                        ? { y: -10, opacity: [1, 0], scale: 0.85 }
                        : hovered
                          ? { y: [0, -4, 0] }
                          : { y: [0, -2.5, 0] }
                  }
                  transition={
                    pressed
                      ? { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
                      : {
                          duration: hovered ? 0.9 : 2.2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }
                  }
                >
                  <ArrowUp size={19} strokeWidth={2.4} />
                </motion.span>
              </span>
            </motion.button>
          </Tooltip>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
