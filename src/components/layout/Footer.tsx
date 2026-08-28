import { Container } from './Container'
import { FooterPressable } from '../ui/FooterPressable'
import { FooterSocialLink, type SocialLabel } from '../ui/FooterSocialLink'
import { navLinks, profile } from '../../data/content'

const socialLinks: { href: string; label: SocialLabel; external: boolean }[] = [
  { href: profile.github, label: 'GitHub', external: true },
  { href: profile.linkedin, label: 'LinkedIn', external: true },
  { href: profile.credly, label: 'Credly', external: true },
  { href: `mailto:${profile.email}`, label: 'Email', external: false },
]

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-border bg-surface/40">
      <div className="section-divider absolute inset-x-0 top-0" aria-hidden="true" />

      {/* Subtle cosmic depth behind social area */}
      <div
        className="pointer-events-none absolute -bottom-16 right-[8%] h-40 w-40 rounded-full blur-3xl opacity-50 cosmos-drift-slow"
        style={{ background: 'var(--theme-nebula)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-10 left-[12%] h-28 w-28 rounded-full blur-3xl opacity-30"
        style={{ background: 'color-mix(in srgb, var(--color-cyan) 10%, transparent)' }}
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
            className="order-1 flex flex-wrap items-center justify-center gap-1 sm:order-2"
          >
            {navLinks.map((link) => (
              <FooterPressable
                key={link.href}
                href={link.href}
                variant="pill"
                className="glass-hover rounded-full px-3 py-1.5 text-xs text-muted transition-colors hover:text-foreground sm:text-sm"
              >
                {link.label}
              </FooterPressable>
            ))}
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
