import { useEffect, useState } from 'react'
import type Lenis from 'lenis'

const ACTIVATION_OFFSET = 128
const BOTTOM_THRESHOLD = 96

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

  let current = sectionIds[0] ?? ''

  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (!el) continue

    const top = el.getBoundingClientRect().top
    if (top <= ACTIVATION_OFFSET) {
      current = id
    }
  }

  const lastId = sectionIds[sectionIds.length - 1]
  const lastEl = lastId ? document.getElementById(lastId) : null

  if (lastEl && lastId && isNearPageBottom()) {
    const rect = lastEl.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      current = lastId
    }
  }

  return current
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
