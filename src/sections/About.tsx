import { motion } from 'framer-motion'
import { useGsapReveal } from '../hooks/useGsapScroll'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SectionShell } from '../components/ui/SectionShell'
import { profile, sections, workPrinciples } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function About() {
  const ref = useGsapReveal<HTMLDivElement>()
  const copy = sections.about
  const reducedMotion = useReducedMotion()

  return (
    <SectionShell id="about" atmosphere="minimal">
      <div ref={ref} className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10 xl:gap-12">
        <div className="lg:col-span-7 xl:col-span-8">
          <SectionHeading label={copy.label} title={copy.title} subtitle={copy.subtitle} />
          <div className="space-y-4 text-[0.9375rem] leading-relaxed text-foreground/80 sm:text-base">
            <p className="max-w-none lg:reading-width">{profile.summary}</p>
            <p className="max-w-none lg:reading-width">{copy.continued}</p>
          </div>
        </div>

        <aside className="space-y-3 lg:col-span-5 lg:pt-1 xl:col-span-4">
          <p className="label-micro text-accent">How I work</p>
          <ul className="space-y-2.5">
            {workPrinciples.map((principle, index) => (
              <motion.li
                key={principle.title}
                className="principle-card"
                initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.42,
                  delay: reducedMotion ? 0 : index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={reducedMotion ? undefined : { y: -2 }}
              >
                <div className="flex items-baseline gap-2.5">
                  <span
                    className="font-mono text-[0.625rem] tracking-[0.14em] text-accent/70"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-sm font-semibold text-foreground sm:text-[0.9375rem]">
                    {principle.title}
                  </h3>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted sm:pl-[1.625rem]">
                  {principle.description}
                </p>
              </motion.li>
            ))}
          </ul>
        </aside>
      </div>
    </SectionShell>
  )
}
