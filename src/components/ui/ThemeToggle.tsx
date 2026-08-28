import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { Tooltip } from './Tooltip'

type ThemeToggleProps = {
  className?: string
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const tooltipText = isDark ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <Tooltip text={tooltipText} position="left" autoHideMs={2200}>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={tooltipText}
        className={`glass glass-hover relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full transition-colors ${className}`}
      >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon size={18} className="text-accent-glow" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? -180 : 0, scale: isDark ? 0 : 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun size={18} className="text-amber-500" />
      </motion.div>
    </button>
    </Tooltip>
  )
}
