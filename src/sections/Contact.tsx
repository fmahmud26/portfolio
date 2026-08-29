import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { GitHubIcon } from '../components/ui/BrandIcons'
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

          <div className="btn-group btn-group--stack-sm flex flex-col items-stretch justify-center pr-0 lg:items-start">
            <Button href={`mailto:${profile.email}`} variant="primary" size="lg" fullWidth className="lg:w-auto">
              {copy.emailCta}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Button>
            <Button href={profile.linkedin} variant="outlined" size="lg" fullWidth className="lg:w-auto" external>
              {copy.linkedinCta}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Button>
            <Button href={profile.github} variant="outlined" size="lg" fullWidth className="lg:w-auto" external>
              <GitHubIcon size={18} />
              {copy.githubCta}
            </Button>
          </div>
        </div>
      </motion.div>
    </SectionShell>
  )
}
