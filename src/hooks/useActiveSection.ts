import { useEffect, useState } from 'react'
import type Lenis from 'lenis'

const ACTIVATION_OFFSET = 128
const BOTTOM_THRESHOLD = 96
/** Last sections may stop slightly below the nav line when the page ends. */
const NEAR_LINE_THRESHOLD = 160

function getLenis() {
  return (window as Window & { __lenis?: Lenis }).__lenis
}

function getScrollMetrics() {
  const lenis = getLenis()
  const scrollY = lenis?.scroll ?? window.scrollY
  const limit =
    lenis?.limit ?? Math.max(document.documentElement.scrollHeight - window.innerHeight, 0)

  return { scrollY, limit }
}

function isNearPageBottom() {
  const { scrollY, limit } = getScrollMetrics()
  return limit - scrollY <= BOTTOM_THRESHOLD
}

function computeActiveSection(sectionIds: string[]) {
  if (!sectionIds.length) return ''

  const activationY = ACTIVATION_OFFSET
  let passed = sectionIds[0] ?? ''

  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (!el) continue

    if (el.getBoundingClientRect().top <= activationY) {
      passed = id
    }
  }

  const passedIndex = sectionIds.indexOf(passed)

  // Scrolled to a section whose top sits just below the nav line (common for Contact at page end).
  for (let i = passedIndex + 1; i < sectionIds.length; i++) {
    const id = sectionIds[i]
    const el = document.getElementById(id)
    if (!el) continue

    const top = el.getBoundingClientRect().top
    if (top > activationY && top < activationY + NEAR_LINE_THRESHOLD) {
      return id
    }
  }

  if (isNearPageBottom()) {
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const id = sectionIds[i]
      const el = document.getElementById(id)
      if (!el) continue

      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > activationY) {
        return id
      }
    }
  }

  return passed
}

export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(() => sectionIds[0] ?? '')

  useEffect(() => {
    if (!sectionIds.length) return

    let raf = 0
    let attempts = 0
    let unbindLenis: (() => void) | undefined

    const update = () => {
      const next = computeActiveSection(sectionIds)
      setActive((prev) => (prev === next ? prev : next))
    }

    const bindLenis = () => {
      const lenis = getLenis()
      if (lenis) {
        lenis.on('scroll', update)
        unbindLenis = () => lenis.off('scroll', update)
        update()
        return true
      }
      return false
    }

    const tryBind = () => {
      if (bindLenis()) return
      if (attempts < 40) {
        attempts += 1
        raf = requestAnimationFrame(tryBind)
      } else {
        update()
      }
    }

    tryBind()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      cancelAnimationFrame(raf)
      unbindLenis?.()
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [sectionIds])

  return active
}

export const NAV_SCROLL_OFFSET = -ACTIVATION_OFFSET
