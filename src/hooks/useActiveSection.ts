import { useEffect, useState } from 'react'
import type Lenis from 'lenis'

const ACTIVATION_OFFSET = 128

function getLenis() {
  return (window as Window & { __lenis?: Lenis }).__lenis
}

function computeActiveSection(sectionIds: string[]) {
  let current = sectionIds[0] ?? ''

  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (!el) continue

    const top = el.getBoundingClientRect().top
    if (top <= ACTIVATION_OFFSET) {
      current = id
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
