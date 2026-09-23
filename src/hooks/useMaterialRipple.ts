import { useCallback, type PointerEvent as ReactPointerEvent } from 'react'

function prefersReducedMotion() {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Material-style ink ripple on pointer down. Safe for anchors + buttons. */
export function useMaterialRipple() {
  return useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (event.button !== 0) return
    if (prefersReducedMotion()) return

    const target = event.currentTarget
    if (target.getAttribute('aria-disabled') === 'true') return
    if ((target as HTMLButtonElement).disabled) return

    const rect = target.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2.1
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    const ripple = document.createElement('span')
    ripple.className = 'btn__ripple'
    ripple.style.width = `${size}px`
    ripple.style.height = `${size}px`
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    target.appendChild(ripple)

    const cleanup = () => ripple.remove()
    ripple.addEventListener('animationend', cleanup, { once: true })
    window.setTimeout(cleanup, 650)
  }, [])
}
