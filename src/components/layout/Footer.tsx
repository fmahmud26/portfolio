import { useState } from 'react'
import { LayoutGroup } from 'framer-motion'
import { Container } from './Container'
import { FooterNavLink } from '../ui/FooterNavLink'
import { FooterSocialLink, type SocialLabel } from '../ui/FooterSocialLink'
import { useActiveSection } from '../../hooks/useActiveSection'
import { navLinks, profile } from '../../data/content'

const socialLinks: { href: string; label: SocialLabel; external: boolean }[] = [
  { href: profile.github, label: 'GitHub', external: true },
  { href: profile.linkedin, label: 'LinkedIn', external: true },
  { href: profile.credly, label: 'Credly', external: true },
  { href: `mailto:${profile.email}`, label: 'Email', external: false },
]

export function Footer() {
  const sectionIds = navLinks.map((link) => link.href.slice(1))
  const activeSection = useActiveSection(sectionIds)
  const [pendingSection, setPendingSection] = useState<string | null>(null)

  const displayActive = pendingSection ?? activeSection

  const handleSelect = (sectionId: string) => {
    setPendingSection(sectionId)
    window.setTimeout(() => setPendingSection(null), 900)
  }

  return (
    <footer className="relative z-10 w-full overflow-hidden border-t border-border-strong bg-surface/95 backdrop-blur-md">
      <div className="section-divider absolute inset-x-0 top-0" aria-hidden="true" />

      <div
        className="pointer-events-none absolute -bottom-20 right-[10%] h-32 w-32 rounded-full blur-3xl opacity-25"
        style={{ background: 'var(--theme-nebula)' }}
        aria-hidden="true"
      />

      <Container className="relative py-6 sm:py-7">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between sm:gap-4">
          <p className="order-3 text-center text-xs text-muted sm:order-1 sm:text-left">
            © {new Date().getFullYear()} {profile.name}
            <span className="mx-2 text-border" aria-hidden="true">
              ·
            </span>
            <span className="text-muted/80">{profile.title}</span>
          </p>

          <nav
            aria-label="Footer navigation"
            className="order-1 sm:order-2"
          >
            <ul className="site-nav-list site-nav-list--wrap">
              <LayoutGroup id="footer-nav">
                {navLinks.map((link) => {
                  const id = link.href.slice(1)
                  return (
                    <FooterNavLink
                      key={link.href}
                      href={link.href}
                      label={link.label}
                      isActive={displayActive === id}
                      onSelect={handleSelect}
                    />
                  )
                })}
              </LayoutGroup>
            </ul>
          </nav>

          <div className="order-2 flex items-center gap-2 pr-12 sm:order-3 sm:gap-2.5 sm:pr-16">
            <nav
              aria-label="Social and contact links"
              className="flex items-center gap-2 sm:gap-2.5"
            >
              {socialLinks.map((link) => (
                <FooterSocialLink key={link.label} {...link} />
              ))}
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  )
}
