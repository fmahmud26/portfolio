import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navLinks, profile } from '../../data/content'
import { ContainerNav, containerClassName } from './Container'
import { ThemeToggle } from '../ui/ThemeToggle'
import { ProfileAvatar } from '../ui/ProfileAvatar'
import { useActiveSection } from '../../hooks/useActiveSection'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeSection = useActiveSection(navLinks.map((l) => l.href.slice(1)))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 right-0 left-0 z-50 w-full pt-[env(safe-area-inset-top,0px)] transition-all duration-500 ${
          scrolled ? 'px-3 pt-2 sm:px-4 sm:pt-3' : ''
        }`}
      >
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? 'nav-floating glow-accent rounded-2xl border border-border bg-bg/90 shadow-[0_8px_32px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.28)]'
              : 'border-b border-border/50 bg-bg/50 backdrop-blur-md'
          }`}
        >
          <div className="header-shine h-px w-full opacity-70" />

          <ContainerNav className="flex items-center justify-between gap-2 py-2.5 sm:gap-3 sm:py-3 lg:gap-4">
            <a href="#" className="group flex min-w-0 shrink-0 items-center gap-3">
              <ProfileAvatar interactive />
              <div className="hidden min-w-0 sm:block">
                <p className="truncate text-sm font-semibold leading-tight">{profile.name}</p>
                <p className="truncate text-xs text-muted">{profile.title}</p>
              </div>
            </a>

            <ul className="nav-track hidden min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto rounded-full border border-border bg-surface/50 p-1 [-ms-overflow-style:none] [scrollbar-width:none] md:flex [&::-webkit-scrollbar]:hidden">
              {navLinks.map((link) => {
                const id = link.href.slice(1)
                const isActive = activeSection === id
                return (
                  <li key={link.href} className="relative shrink-0">
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-indicator"
                        className="nav-active-indicator absolute inset-0 rounded-full"
                        transition={{ type: 'spring', stiffness: 420, damping: 32, mass: 0.8 }}
                      />
                    )}
                    <a
                      href={link.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`relative z-10 block rounded-full px-2.5 py-1.5 text-sm whitespace-nowrap transition-[color,transform,letter-spacing] duration-200 focus-visible:outline-none lg:px-3.5 xl:px-4 ${
                        isActive
                          ? 'nav-link-active font-semibold'
                          : 'text-muted hover:text-foreground'
                      }`}
                    >
                      <span className="relative">
                        {link.label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-active-underline"
                            className="nav-active-underline absolute -bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full"
                            transition={{ type: 'spring', stiffness: 480, damping: 30 }}
                          />
                        )}
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>

            <div className="hidden shrink-0 items-center gap-2 md:flex">
              <ThemeToggle />
              <a
                href="#contact"
                className="nav-cta inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-white lg:px-5"
              >
                Get in touch
                <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="glass rounded-xl p-2.5"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </ContainerNav>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-bg/96 backdrop-blur-2xl md:hidden"
          >
            <div className="header-shine h-px w-full opacity-80" />
            <div className={`flex items-center justify-between py-4 ${containerClassName}`}>
              <div className="flex items-center gap-3">
                <ProfileAvatar />
                <div>
                  <p className="text-sm font-semibold">{profile.name}</p>
                  <p className="text-xs text-muted">{profile.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="glass rounded-xl p-2.5"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <ul className="flex flex-1 flex-col justify-center gap-3">
              {navLinks.map((link, i) => {
                const id = link.href.slice(1)
                const isActive = activeSection === id
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="relative"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="mobile-nav-active"
                        className="absolute top-1/2 left-0 h-10 w-1 -translate-y-1/2 rounded-r-full bg-accent shadow-[0_0_12px_var(--color-accent)]"
                        transition={{ type: 'spring', stiffness: 460, damping: 34 }}
                      />
                    )}
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`relative flex items-center justify-between rounded-2xl px-5 py-4 text-base transition-all duration-200 ${
                        isActive
                          ? 'nav-mobile-active border border-accent/35 bg-accent/12 font-semibold text-foreground shadow-[0_0_24px_color-mix(in_srgb,var(--color-accent)_12%,transparent)]'
                          : 'glass glass-hover font-medium'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`font-mono text-xs ${isActive ? 'text-accent-glow' : 'text-accent'}`}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {link.label}
                      </span>
                      <ArrowUpRight
                        size={17}
                        className={isActive ? 'text-accent' : 'text-muted'}
                      />
                    </a>
                  </motion.li>
                )
              })}
            </ul>

            <div className={`pb-8 ${containerClassName}`}>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="nav-cta flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-medium text-white"
              >
                Get in touch
                <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
