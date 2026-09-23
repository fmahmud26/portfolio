import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useGsapReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) {
      if (el) gsap.set(el, { clearProps: 'opacity,transform' })
      return
    }

    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: 28,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}

export function useGsapStagger<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const items = el.querySelectorAll('[data-stagger]')
    if (!items.length) return

    if (prefersReducedMotion()) {
      gsap.set(items, { clearProps: 'opacity,transform' })
      return
    }

    const ctx = gsap.context(() => {
      gsap.from(items, {
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.07,
        ease: 'power3.out',
        // Keep grid tops aligned — no scale (center-origin scale skews tall cells)
        clearProps: 'transform',
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}
