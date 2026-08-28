import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

type TooltipProps = {
  text: string
  children: ReactNode
  position?: 'top' | 'bottom' | 'left'
  className?: string
  /** How long the tooltip stays visible before auto-hiding (ms). */
  autoHideMs?: number
}

const transformClasses = {
  top: '-translate-x-1/2 -translate-y-full',
  bottom: '-translate-x-1/2',
  left: '-translate-x-full -translate-y-1/2',
}

export function Tooltip({
  text,
  children,
  position = 'top',
  className = '',
  autoHideMs = 2500,
}: TooltipProps) {
  const triggerRef = useRef<HTMLSpanElement>(null)
  const hideTimerRef = useRef<number | undefined>(undefined)
  const leaveTimerRef = useRef<number | undefined>(undefined)
  const tooltipId = useId()
  const [visible, setVisible] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0 })

  const clearTimers = useCallback(() => {
    window.clearTimeout(hideTimerRef.current)
    window.clearTimeout(leaveTimerRef.current)
  }, [])

  const updateCoords = useCallback(() => {
    const el = triggerRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const gap = 10

    switch (position) {
      case 'top':
        setCoords({ top: rect.top - gap, left: rect.left + rect.width / 2 })
        break
      case 'bottom':
        setCoords({ top: rect.bottom + gap, left: rect.left + rect.width / 2 })
        break
      case 'left':
        setCoords({ top: rect.top + rect.height / 2, left: rect.left - gap })
        break
    }
  }, [position])

  const hide = useCallback(() => {
    clearTimers()
    setVisible(false)
  }, [clearTimers])

  const show = useCallback(() => {
    clearTimers()
    window.clearTimeout(leaveTimerRef.current)
    updateCoords()
    setVisible(true)

    hideTimerRef.current = window.setTimeout(() => {
      setVisible(false)
    }, autoHideMs)
  }, [autoHideMs, clearTimers, updateCoords])

  const scheduleHide = useCallback(() => {
    window.clearTimeout(leaveTimerRef.current)
    leaveTimerRef.current = window.setTimeout(hide, 180)
  }, [hide])

  const cancelScheduledHide = useCallback(() => {
    window.clearTimeout(leaveTimerRef.current)
  }, [])

  useEffect(() => {
    if (!visible) return

    const onScrollOrResize = () => {
      updateCoords()
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true, capture: true })
    window.addEventListener('resize', onScrollOrResize)

    return () => {
      window.removeEventListener('scroll', onScrollOrResize, { capture: true })
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [visible, updateCoords])

  useEffect(() => clearTimers, [clearTimers])

  return (
    <>
      <span
        ref={triggerRef}
        className={`inline-flex ${className}`.trim()}
        onMouseEnter={() => {
          cancelScheduledHide()
          show()
        }}
        onMouseLeave={scheduleHide}
        onFocusCapture={() => {
          cancelScheduledHide()
          show()
        }}
        onBlurCapture={(event) => {
          const next = event.relatedTarget
          if (!next || !triggerRef.current?.contains(next)) {
            scheduleHide()
          }
        }}
      >
        {children}
      </span>

      {createPortal(
        <AnimatePresence>
          {visible && (
            <motion.span
              role="tooltip"
              id={tooltipId}
              initial={{ opacity: 0, scale: 0.94, y: position === 'top' ? 4 : position === 'bottom' ? -4 : 0 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: position === 'top' ? 4 : position === 'bottom' ? -4 : 0 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className={`pointer-events-none fixed z-[100] whitespace-nowrap rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-foreground shadow-[0_8px_24px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] ${transformClasses[position]}`}
              style={{ top: coords.top, left: coords.left }}
            >
              {text}
            </motion.span>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
