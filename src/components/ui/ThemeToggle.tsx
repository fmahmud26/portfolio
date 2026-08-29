import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Tooltip } from './Tooltip'

type ThemeToggleProps = {
  className?: string
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const reducedMotion = useReducedMotion()
  const tooltipText = isDark ? 'Switch to light mode' : 'Switch to dark mode'

  const thumbTransition = reducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 520, damping: 34, mass: 0.72 }

  return (
    <Tooltip text={tooltipText} position="left" autoHideMs={2200}>
      <motion.button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={tooltipText}
        onClick={toggleTheme}
        whileTap={reducedMotion ? undefined : { scale: 0.94 }}
        whileFocus={reducedMotion ? undefined : { scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 460, damping: 24 }}
        className={`theme-switch ${className}`.trim()}
      >
        <span className="theme-switch__track" aria-hidden="true">
          <motion.span
            className="theme-switch__thumb"
            animate={{ x: isDark ? '100%' : '0%' }}
            transition={thumbTransition}
          />

          <span className={`theme-switch__slot${isDark ? '' : ' theme-switch__slot--active'}`}>
            <Sun size={16} strokeWidth={2.25} />
          </span>

          <span className={`theme-switch__slot${isDark ? ' theme-switch__slot--active' : ''}`}>
            <Moon size={16} strokeWidth={2.25} />
          </span>
        </span>

        <span className="theme-switch__focus-ring" aria-hidden="true" />
      </motion.button>
    </Tooltip>
  )
}
