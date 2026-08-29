import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks, profile } from '../../data/content'
import { ContainerNav } from './Container'
import { ThemeToggle } from '../ui/ThemeToggle'
import { ProfileAvatar } from '../ui/ProfileAvatar'
import { GlassSelectIndicator } from '../ui/GlassSelectIndicator'
import { Button } from '../ui/Button'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [pendingSection, setPendingSection] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobileNav, setIsMobileNav] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 1023px)').matches : false,
  )
  const reducedMotion = useReducedMotion()
  const sectionIds = navLinks.map((l) => l.href.slice(1))
  const activeSection = useActiveSection(sectionIds)
  const displayActive = pendingSection ?? activeSection

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (pendingSection && activeSection === pendingSection) {
      setPendingSection(null)
    }
  }, [pendingSection, activeSection])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const update = () => {
      setIsMobileNav(mq.matches)
      if (!mq.matches) setMobileMenuOpen(false)
    }
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen || !isMobileNav) return

    const lenis = (window as Window & { __lenis?: { stop: () => void; start: () => void } }).__lenis
    lenis?.stop()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobileMenu()
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      lenis?.start()
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [mobileMenuOpen, isMobileNav, closeMobileMenu])

  const handleNavClick = (sectionId: string) => {
    setPendingSection(sectionId)
    closeMobileMenu()
  }

  const menuTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 right-0 left-0 z-50 w-full pt-[env(safe-area-inset-top,0px)] transition-all duration-500 ${
        scrolled ? 'pt-2 sm:pt-3' : ''
      }`}
    >
      <div
        className={`site-header transition-all duration-500 ${
          scrolled ? 'site-header--floating nav-floating glow-accent backdrop-blur-xl' : 'backdrop-blur-md'
        }`}
      >
        <div className="header-shine pointer-events-none h-px w-full opacity-70" />

        <ContainerNav className="relative z-50 grid grid-cols-[auto_1fr_auto] items-center gap-1.5 py-2.5 sm:gap-2 sm:py-3 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-3">
          <a href="#" className="group relative z-20 flex min-w-0 shrink-0 items-center gap-3">
            <ProfileAvatar interactive />
            <div className="hidden min-w-0 md:block">
              <p className="truncate text-sm font-semibold leading-tight">{profile.name}</p>
              <p className="truncate text-xs text-muted">{profile.title}</p>
            </div>
          </a>

          <div className="hidden min-w-0 justify-center lg:flex">
            <LayoutGroup id="header-nav">
              <nav aria-label="Primary">
                <ul className="nav-track site-nav-list relative z-20 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {navLinks.map((link) => {
                    const id = link.href.slice(1)
                    const isActive = displayActive === id
                    return (
                      <li key={link.href} className="relative shrink-0">
                        <GlassSelectIndicator layoutId="header-nav-glass" active={isActive} />
                        <Button
                          href={link.href}
                          onClick={() => handleNavClick(id)}
                          aria-current={isActive ? 'page' : undefined}
                          variant="tertiary"
                          size="sm"
                          selected={isActive}
                          glassLayers={false}
                          className="btn--nav relative z-10"
                        >
                          {link.label}
                        </Button>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </LayoutGroup>
          </div>

          <div className="relative z-30 flex shrink-0 items-center justify-end gap-1">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>

            {isMobileNav && (
              <Button
                type="button"
                variant="outlined"
                size="sm"
                iconOnly
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-menu"
                onClick={() => setMobileMenuOpen((open) => !open)}
              >
                {mobileMenuOpen ? <X size={20} strokeWidth={2.25} /> : <Menu size={20} strokeWidth={2.25} />}
              </Button>
            )}
          </div>
        </ContainerNav>

        <AnimatePresence>
          {isMobileNav && mobileMenuOpen && (
            <>
              <motion.button
                type="button"
                aria-label="Close menu"
                className="mobile-nav-backdrop fixed inset-0 z-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={menuTransition}
                onClick={closeMobileMenu}
              />

              <motion.div
                id="mobile-nav-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Site navigation"
                className="mobile-nav-panel relative z-40 border-t border-[var(--theme-header-border)]"
                initial={reducedMotion ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={menuTransition}
              >
                <ContainerNav className="py-3">
                  <LayoutGroup id="mobile-header-nav">
                    <nav aria-label="Primary">
                      <ul className="mobile-nav-list">
                        {navLinks.map((link) => {
                          const id = link.href.slice(1)
                          const isActive = displayActive === id
                          return (
                            <li key={link.href} className="relative">
                              <GlassSelectIndicator layoutId="mobile-header-nav-glass" active={isActive} />
                              <Button
                                href={link.href}
                                onClick={() => handleNavClick(id)}
                                aria-current={isActive ? 'page' : undefined}
                                variant="tertiary"
                                size="md"
                                fullWidth
                                selected={isActive}
                                glassLayers={false}
                                className="btn--nav relative z-10 justify-start"
                              >
                                {link.label}
                              </Button>
                            </li>
                          )
                        })}
                      </ul>
                    </nav>
                  </LayoutGroup>

                  <div className="mobile-nav-theme mt-4 flex items-center justify-between gap-3 px-1">
                    <span className="text-sm font-medium text-muted">Theme</span>
                    <ThemeToggle />
                  </div>
                </ContainerNav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
