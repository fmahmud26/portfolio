import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { GitHubIcon, LinkedInIcon } from '../components/ui/BrandIcons'
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
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        animate={inView || reducedMotion ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="panel-card relative overflow-hidden p-5 sm:p-6"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-br from-accent/[0.06] via-transparent to-cyan/[0.04]"
          aria-hidden="true"
        />
        <div className="relative grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-10">
          <div>
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-foreground/80 sm:text-base">
              {copy.intro}
            </p>

            <ul className="mt-5 space-y-0.5">
              {(
                [
                  {
                    key: 'email',
                    href: `mailto:${profile.email}`,
                    icon: Mail,
                    label: profile.email,
                    className: 'break-all text-sm',
                  },
                  {
                    key: 'phone',
                    href: `tel:${profile.phone.replace(/[^\d+]/g, '')}`,
                    icon: Phone,
                    label: profile.phone,
                    className: 'text-sm',
                  },
                ] as const
              ).map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.li
                    key={item.key}
                    initial={reducedMotion ? false : { opacity: 0, x: -8 }}
                    animate={inView || reducedMotion ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.35,
                      delay: reducedMotion ? 0 : 0.12 + i * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <a href={item.href} className="contact-detail-row">
                      <Icon size={15} className="shrink-0 text-accent" aria-hidden="true" />
                      <span className={item.className}>{item.label}</span>
                    </a>
                  </motion.li>
                )
              })}
              <motion.li
                initial={reducedMotion ? false : { opacity: 0, x: -8 }}
                animate={inView || reducedMotion ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.35,
                  delay: reducedMotion ? 0 : 0.24,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="contact-detail-row contact-detail-row--static">
                  <MapPin size={15} className="shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-sm">{profile.location}</span>
                </span>
              </motion.li>
            </ul>
          </div>

          <div className="btn-group flex flex-col items-stretch gap-2.5 sm:max-w-xs lg:ml-auto lg:items-stretch">
            <Button href={`mailto:${profile.email}`} variant="primary" size="md" fullWidth>
              {copy.emailCta}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Button>
            <Button href={profile.linkedin} variant="outlined" size="md" fullWidth external>
              <LinkedInIcon size={15} />
              {copy.linkedinCta}
            </Button>
            <Button href={profile.github} variant="ghost" size="md" fullWidth external>
              <GitHubIcon size={15} />
              {copy.githubCta}
            </Button>
          </div>
        </div>
      </motion.div>
    </SectionShell>
  )
}
