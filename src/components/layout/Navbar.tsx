import { useEffect, useState } from 'react'
import { LayoutGroup, motion } from 'framer-motion'
import { navLinks, profile } from '../../data/content'
import { ContainerNav } from './Container'
import { ThemeToggle } from '../ui/ThemeToggle'
import { ProfileAvatar } from '../ui/ProfileAvatar'
import { GlassSelectIndicator } from '../ui/GlassSelectIndicator'
import { Button } from '../ui/Button'
import { useActiveSection } from '../../hooks/useActiveSection'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [pendingSection, setPendingSection] = useState<string | null>(null)
  const sectionIds = navLinks.map((l) => l.href.slice(1))
  const activeSection = useActiveSection(sectionIds)
  const displayActive = pendingSection ?? activeSection

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

  const handleNavClick = (sectionId: string) => {
    setPendingSection(sectionId)
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 right-0 left-0 z-50 w-full pt-[env(safe-area-inset-top,0px)] transition-all duration-500 ${
        scrolled ? 'px-3 pt-2 sm:px-4 sm:pt-3' : ''
      }`}
    >
      <div
        className={`site-header transition-all duration-500 ${
          scrolled ? 'site-header--floating nav-floating glow-accent backdrop-blur-xl' : 'backdrop-blur-md'
        }`}
      >
        <div className="header-shine pointer-events-none h-px w-full opacity-70" />

        <ContainerNav className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 py-2.5 sm:gap-3 sm:py-3 lg:gap-4">
          <a href="#" className="group relative z-20 flex min-w-0 shrink-0 items-center gap-3">
            <ProfileAvatar interactive />
            <div className="hidden min-w-0 md:block">
              <p className="truncate text-sm font-semibold leading-tight">{profile.name}</p>
              <p className="truncate text-xs text-muted">{profile.title}</p>
            </div>
          </a>

          <div className="flex min-w-0 justify-center">
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

          <div className="relative z-30 flex shrink-0 items-center justify-end">
            <ThemeToggle />
          </div>
        </ContainerNav>
      </div>
    </motion.header>
  )
}
