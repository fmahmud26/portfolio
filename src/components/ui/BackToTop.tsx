import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import type Lenis from 'lenis'
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
    lenis.scrollTo(0, { duration: 1.4 })
    return
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function OrbitDots({ active }: { active: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      animate={{ rotate: 360 }}
      transition={{ duration: active ? 4 : 10, repeat: Infinity, ease: 'linear' }}
    >
      {[0, 120, 240].map((angle) => (
        <motion.span
          key={angle}
          className="absolute left-1/2 top-[3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_8px_rgba(103,232,249,0.9)]"
          style={{ transformOrigin: '50% 25px', rotate: `${angle}deg` }}
          animate={{
            opacity: active ? [0.4, 1, 0.4] : 0.35,
            scale: active ? [0.9, 1.2, 0.9] : 1,
          }}
          transition={{
            opacity: { duration: 1.6, repeat: Infinity, delay: angle / 360 },
            scale: { duration: 1.6, repeat: Infinity, delay: angle / 360 },
          }}
        />
      ))}
    </motion.div>
  )
}

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [launching, setLaunching] = useState(false)
  const [ripples, setRipples] = useState<number[]>([])

  const springProgress = useSpring(0, { stiffness: 120, damping: 22 })
  const strokeDashoffset = useTransform(
    springProgress,
    (v) => RING_CIRCUMFERENCE * (1 - v),
  )

  useEffect(() => {
    springProgress.set(progress)
  }, [progress, springProgress])

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

  const handleClick = () => {
    setLaunching(true)
    setRipples((prev) => [...prev, Date.now()])
    scrollToTop()
    window.setTimeout(() => setLaunching(false), 700)
  }

  const progressPercent = Math.round(progress * 100)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.65, rotate: -20 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, y: 32, scale: 0.65, rotate: 20 }}
          transition={{ type: 'spring', stiffness: 280, damping: 20 }}
          className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6"
          style={{
            marginRight: 'env(safe-area-inset-right, 0px)',
            marginBottom: 'env(safe-area-inset-bottom, 0px)',
          }}
        >
          <Tooltip text="Back to top" position="left">
            <motion.button
              type="button"
              onClick={handleClick}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              aria-label={`Back to top — ${progressPercent}% scrolled`}
              whileTap={{ scale: 0.9 }}
              animate={{
                scale: hovered ? 1.1 : 1,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              className="group relative flex items-center justify-center"
              style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
            >
              {/* Breathing glow */}
              <motion.span
                className="absolute inset-0 rounded-full blur-md"
                animate={{
                  opacity: hovered ? [0.5, 0.9, 0.5] : [0.35, 0.55, 0.35],
                  scale: hovered ? [1, 1.15, 1] : [1, 1.08, 1],
                }}
                transition={{ duration: hovered ? 1.2 : 2.4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  background:
                    'conic-gradient(from 0deg, var(--color-accent), var(--color-cyan), var(--color-accent-glow), var(--color-accent))',
                }}
              />

              {/* Spinning border — speeds up on hover */}
              <motion.span
                className="absolute inset-0 rounded-full p-[2px]"
                animate={{ rotate: 360 }}
                transition={{
                  duration: hovered ? 1.5 : 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  background:
                    'conic-gradient(from 0deg, transparent 0%, var(--color-accent) 25%, var(--color-cyan) 50%, var(--color-accent-glow) 75%, transparent 100%)',
                }}
              >
                <span className="block h-full w-full rounded-full bg-bg" />
              </motion.span>

              {/* Counter-spin inner ring on hover */}
              <motion.span
                className="absolute inset-[5px] rounded-full border border-accent/20"
                animate={{ rotate: hovered ? -360 : 0, opacity: hovered ? 0.8 : 0 }}
                transition={{
                  rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                  opacity: { duration: 0.25 },
                }}
              />

              <OrbitDots active={hovered} />

              {/* Click ripples */}
              <AnimatePresence>
                {ripples.map((id) => (
                  <motion.span
                    key={id}
                    className="pointer-events-none absolute inset-0 rounded-full border-2 border-accent/50"
                    initial={{ scale: 0.8, opacity: 0.7 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.65, ease: 'easeOut' }}
                    onAnimationComplete={() =>
                      setRipples((prev) => prev.filter((r) => r !== id))
                    }
                  />
                ))}
              </AnimatePresence>

              {/* Progress ring */}
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
                  className="text-border"
                />
                <motion.circle
                  cx="28"
                  cy="28"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="url(#backToTopGradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={RING_CIRCUMFERENCE}
                  style={{ strokeDashoffset }}
                />
                <defs>
                  <linearGradient id="backToTopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-accent)" />
                    <stop offset="100%" stopColor="var(--color-cyan)" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Core */}
              <motion.span
                className="glass relative z-10 flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-border shadow-[0_8px_32px_rgba(99,102,241,0.25)]"
                animate={{
                  boxShadow: hovered
                    ? '0 12px 40px rgba(99,102,241,0.5), 0 0 24px rgba(103,232,249,0.25)'
                    : '0 8px 32px rgba(99,102,241,0.25)',
                }}
              >
                {/* Shimmer sweep on hover */}
                <motion.span
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: hovered ? '100%' : '-100%' }}
                  transition={{
                    duration: hovered ? 0.7 : 0,
                    repeat: hovered ? Infinity : 0,
                    repeatDelay: 0.8,
                  }}
                />

                <motion.span
                  animate={
                    launching
                      ? { y: -18, opacity: 0, scale: 1.3 }
                      : hovered
                        ? { y: [0, -5, 0] }
                        : { y: [0, -3, 0] }
                  }
                  transition={
                    launching
                      ? { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
                      : { repeat: Infinity, duration: hovered ? 0.9 : 1.6, ease: 'easeInOut' }
                  }
                >
                  <ArrowUp
                    size={20}
                    className="relative text-accent transition-colors group-hover:text-accent-glow"
                    strokeWidth={2.5}
                  />
                </motion.span>
              </motion.span>

              {/* Progress badge on hover */}
              <motion.span
                className="pointer-events-none absolute -top-1 -right-1 z-20 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-white"
                initial={false}
                animate={{
                  opacity: hovered ? 1 : 0,
                  scale: hovered ? 1 : 0.6,
                  y: hovered ? 0 : 4,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              >
                {progressPercent}%
              </motion.span>
            </motion.button>
          </Tooltip>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
