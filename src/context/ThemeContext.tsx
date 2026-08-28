import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type Theme = 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'portfolio-theme'

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  if (typeof window.matchMedia !== 'function') return 'light'

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored

  return null
}

function getInitialTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme()
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

type ThemeProviderProps = {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)
  const [hasUserPreference, setHasUserPreference] = useState(() => getStoredTheme() !== null)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    if (hasUserPreference) {
      localStorage.setItem(STORAGE_KEY, theme)
      return
    }

    localStorage.removeItem(STORAGE_KEY)
  }, [theme, hasUserPreference])

  useEffect(() => {
    if (hasUserPreference) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const syncWithSystem = () => setThemeState(getSystemTheme())

    syncWithSystem()
    mediaQuery.addEventListener('change', syncWithSystem)
    return () => mediaQuery.removeEventListener('change', syncWithSystem)
  }, [hasUserPreference])

  const setTheme = (next: Theme) => {
    setHasUserPreference(true)
    setThemeState(next)
  }

  const toggleTheme = () => {
    setHasUserPreference(true)
    setThemeState((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
