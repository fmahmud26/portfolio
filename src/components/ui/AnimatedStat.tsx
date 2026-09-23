import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type AnimatedStatProps = {
  value: string
  className?: string
}

/** Count-up for numeric hero metrics ("7+", "80%", "2"). Falls back to raw text. */
export function AnimatedStat({ value, className = '' }: AnimatedStatProps) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? Number(match[1]) : null
  const suffix = match?.[2] ?? ''
  const [display, setDisplay] = useState(reducedMotion || target === null ? value : `0${suffix}`)

  useEffect(() => {
    if (!inView || reducedMotion || target === null) {
      setDisplay(value)
      return
    }

    let frame = 0
    const duration = 900
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(`${Math.round(target * eased)}${suffix}`)
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reducedMotion, suffix, target, value])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
