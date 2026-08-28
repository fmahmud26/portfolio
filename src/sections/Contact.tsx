import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { MagneticButton } from '../components/ui/MagneticButton'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SectionShell } from '../components/ui/SectionShell'
import { profile, sections } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reducedMotion = useReducedMotion()
  const copy = sections.contact

  return (
    <SectionShell id="contact" atmosphere="minimal">
      <SectionHeading label={copy.label} title={copy.title} subtitle={copy.subtitle} />

      <motion.div
        ref={ref}
        initial={reducedMotion ? false : { opacity: 0, y: 32 }}
        animate={inView || reducedMotion ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="surface-panel glow-accent relative overflow-hidden rounded-2xl p-6 sm:rounded-3xl sm:p-10 lg:p-12 xl:p-14"
      >
        <div
          className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full blur-3xl"
          style={{ background: 'var(--theme-nebula)' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full blur-3xl"
          style={{ background: 'color-mix(in srgb, var(--color-cyan) 12%, transparent)' }}
          aria-hidden="true"
        />

        <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div>
            <h3 className="font-display text-2xl font-semibold sm:text-3xl">{copy.innerTitle}</h3>
            <p className="mt-3 max-w-none text-base leading-relaxed text-muted sm:mt-4 sm:text-lg">
              {copy.intro}
            </p>

            <ul className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-foreground sm:text-base"
                >
                  <Mail size={18} className="shrink-0 text-accent" aria-hidden="true" />
                  <span className="break-all">{profile.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profile.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-foreground sm:text-base"
                >
                  <Phone size={18} className="shrink-0 text-accent" aria-hidden="true" />
                  {profile.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted sm:text-base">
                <MapPin size={18} className="shrink-0 text-accent" aria-hidden="true" />
                {profile.location}
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-stretch justify-center gap-3 pr-14 sm:gap-4 sm:pr-20 lg:items-start lg:pr-24">
            <MagneticButton href={`mailto:${profile.email}`} variant="primary" className="w-full lg:w-auto">
              {copy.emailCta}
              <ArrowUpRight size={18} aria-hidden="true" />
            </MagneticButton>
            <MagneticButton href={profile.linkedin} variant="secondary" className="w-full lg:w-auto">
              {copy.linkedinCta}
              <ArrowUpRight size={18} aria-hidden="true" />
            </MagneticButton>
            <MagneticButton href={profile.credly} variant="secondary" className="w-full lg:w-auto">
              {copy.credlyCta}
              <ArrowUpRight size={18} aria-hidden="true" />
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </SectionShell>
  )
}
