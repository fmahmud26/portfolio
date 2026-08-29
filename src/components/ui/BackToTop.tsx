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
    lenis.scrollTo(0, { duration: 1.4 })
    return
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function OrbitDots({ active, reduced }: { active: boolean; reduced: boolean }) {
  if (reduced) return null

  const dots = [0, 90, 180, 270]

  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      animate={{ rotate: 360 }}
      transition={{ duration: active ? 2.8 : 7, repeat: Infinity, ease: 'linear' }}
    >
      {dots.map((angle, i) => (
        <motion.span
          key={angle}
          className="absolute left-1/2 top-[2px] h-1.5 w-1.5 -translate-x-1/2 rounded-full shadow-[0_0_8px_rgba(103,232,249,0.9)]"
          style={{
            transformOrigin: '50% 26px',
            rotate: `${angle}deg`,
            background: i % 2 === 0 ? 'var(--color-cyan)' : 'var(--color-accent-glow)',
          }}
          animate={{
            opacity: active ? [0.35, 1, 0.35] : [0.25, 0.65, 0.25],
            scale: active ? [0.85, 1.35, 0.85] : [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: active ? 1.1 : 2.2,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.div>
  )
}

function PulseRing({ reduced }: { reduced: boolean }) {
  if (reduced) return null

  return (
    <>
      {[0, 1.4].map((delay) => (
        <motion.span
          key={delay}
          className="pointer-events-none absolute inset-0 rounded-full border border-accent/25"
          initial={{ scale: 1, opacity: 0.35 }}
          animate={{ scale: 1.55, opacity: 0 }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </>
  )
}

function LaunchBurst({ id, onDone }: { id: number; onDone: () => void }) {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    angle: (i / 8) * Math.PI * 2,
    dist: 18 + (i % 3) * 6,
  }))

  return (
    <>
      {particles.map((p, i) => (
        <motion.span
          key={`${id}-${i}`}
          className="pointer-events-none absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-accent"
          initial={{ x: 0, y: 0, opacity: 0.9, scale: 1 }}
          animate={{
            x: Math.cos(p.angle) * p.dist,
            y: Math.sin(p.angle) * p.dist,
            opacity: 0,
            scale: 0.2,
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={i === particles.length - 1 ? onDone : undefined}
        />
      ))}
    </>
  )
}

export function BackToTop() {
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [launching, setLaunching] = useState(false)
  const [ripples, setRipples] = useState<number[]>([])
  const [bursts, setBursts] = useState<number[]>([])

  const springProgress = useSpring(reducedMotion ? progress : 0, { stiffness: 120, damping: 22 })
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
    const now = Date.now()
    setRipples((prev) => [...prev, now, now + 1])
    if (!reducedMotion) setBursts((prev) => [...prev, now])
    scrollToTop()
    window.setTimeout(() => setLaunching(false), 700)
  }

  const progressPercent = Math.round(progress * 100)
  const nearTop = progress > 0.85

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.65, rotate: -20 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, rotate: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.65, rotate: 20 }}
          transition={{ type: 'spring', stiffness: 280, damping: 20 }}
          className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6"
          style={{
            marginRight: 'env(safe-area-inset-right, 0px)',
            marginBottom: 'env(safe-area-inset-bottom, 0px)',
          }}
        >
          <motion.div
            animate={reducedMotion ? undefined : { y: [0, -5, 0] }}
            transition={
              reducedMotion ? undefined : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
            }
          >
          <Tooltip text="Back to top" position="left">
            <motion.button
              type="button"
              onClick={handleClick}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              aria-label={`Back to top — ${progressPercent}% scrolled`}
              whileTap={reducedMotion ? undefined : { scale: 0.88 }}
              animate={{
                scale: hovered && !reducedMotion ? 1.12 : 1,
                rotate: hovered && !reducedMotion ? [0, -3, 3, 0] : 0,
              }}
              transition={{
                scale: { type: 'spring', stiffness: 400, damping: 16 },
                rotate: hovered
                  ? { duration: 0.6, repeat: Infinity, ease: 'easeInOut' }
                  : { duration: 0.2 },
              }}
              className="group relative flex items-center justify-center"
              style={{ width: BUTTON_SIZE, height: BUTTON_SIZE }}
            >
              <PulseRing reduced={reducedMotion} />

              <motion.span
                className="absolute inset-0 rounded-full blur-md"
                animate={
                  reducedMotion
                    ? { opacity: hovered ? 0.55 : 0.4 }
                    : {
                        opacity: hovered ? [0.5, 1, 0.5] : [0.3, 0.6, 0.3],
                        scale: hovered ? [1, 1.2, 1] : [1, 1.1, 1],
                      }
                }
                transition={{
                  duration: hovered ? 1 : 2.2,
                  repeat: reducedMotion ? 0 : Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  background:
                    'conic-gradient(from 0deg, var(--color-accent), var(--color-cyan), var(--color-accent-glow), var(--color-accent))',
                }}
              />

              {!reducedMotion && (
                <motion.span
                  className="absolute inset-0 rounded-full p-[2px]"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: hovered ? 1.2 : 3.5,
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
              )}

              {!reducedMotion && (
                <motion.span
                  className="absolute inset-[4px] rounded-full border border-cyan/25"
                  animate={{ rotate: -360, opacity: hovered ? 0.85 : 0.35 }}
                  transition={{
                    rotate: { duration: hovered ? 2.2 : 5.5, repeat: Infinity, ease: 'linear' },
                    opacity: { duration: 0.25 },
                  }}
                />
              )}

              <OrbitDots active={hovered || nearTop} reduced={reducedMotion} />

              <AnimatePresence>
                {ripples.map((id) => (
                  <motion.span
                    key={id}
                    className="pointer-events-none absolute inset-0 rounded-full border-2"
                    style={{
                      borderColor:
                        id % 2 === 0
                          ? 'color-mix(in srgb, var(--color-accent) 55%, transparent)'
                          : 'color-mix(in srgb, var(--color-cyan) 45%, transparent)',
                    }}
                    initial={{ scale: 0.75, opacity: 0.75 }}
                    animate={{ scale: 2.4, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75, ease: 'easeOut', delay: id % 2 === 0 ? 0 : 0.08 }}
                    onAnimationComplete={() =>
                      setRipples((prev) => prev.filter((r) => r !== id))
                    }
                  />
                ))}
              </AnimatePresence>

              <AnimatePresence>
                {bursts.map((id) => (
                  <LaunchBurst
                    key={id}
                    id={id}
                    onDone={() => setBursts((prev) => prev.filter((b) => b !== id))}
                  />
                ))}
              </AnimatePresence>

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
                  animate={
                    reducedMotion
                      ? undefined
                      : {
                          filter: nearTop
                            ? [
                                'drop-shadow(0 0 2px var(--color-accent))',
                                'drop-shadow(0 0 8px var(--color-cyan))',
                                'drop-shadow(0 0 2px var(--color-accent))',
                              ]
                            : 'drop-shadow(0 0 0px transparent)',
                        }
                  }
                  transition={{ duration: 1.8, repeat: nearTop ? Infinity : 0, ease: 'easeInOut' }}
                />
                <defs>
                  <linearGradient id="backToTopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-accent)" />
                    <stop offset="100%" stopColor="var(--color-cyan)" />
                  </linearGradient>
                </defs>
              </svg>

              <span className="btn btn--fab relative z-10">
                <motion.span
                  animate={
                    launching && !reducedMotion
                      ? { y: -22, opacity: 0, scale: 1.45, rotate: -8 }
                      : hovered && !reducedMotion
                        ? { y: [0, -4, 0], scale: [1, 1.04, 1] }
                        : !reducedMotion
                          ? { y: [0, -2, 0], scale: 1 }
                          : { y: 0, scale: 1 }
                  }
                  transition={
                    launching
                      ? { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                      : { repeat: Infinity, duration: hovered ? 0.75 : 1.4, ease: 'easeInOut' }
                  }
                >
                  <ArrowUp
                    size={20}
                    className="relative text-accent"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                </motion.span>
              </span>

              <motion.span
                className="pointer-events-none absolute -top-1 -right-1 z-20 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-white"
                initial={false}
                animate={{
                  opacity: hovered || nearTop ? 1 : 0,
                  scale: hovered || nearTop ? [1, 1.08, 1] : 0.6,
                  y: hovered || nearTop ? 0 : 4,
                }}
                transition={{
                  opacity: { duration: 0.2 },
                  scale: nearTop && !hovered ? { duration: 1.2, repeat: Infinity } : { type: 'spring', stiffness: 400, damping: 22 },
                  y: { type: 'spring', stiffness: 400, damping: 22 },
                }}
              >
                {progressPercent}%
              </motion.span>
            </motion.button>
          </Tooltip>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
