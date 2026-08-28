import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGsapStagger } from '../hooks/useGsapScroll'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SectionShell } from '../components/ui/SectionShell'
import { sections, skillCategories } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function Skills() {
  const ref = useGsapStagger<HTMLDivElement>()
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = useReducedMotion()
  const active = skillCategories[activeIndex]
  const copy = sections.skills

  return (
    <SectionShell id="skills" atmosphere="minimal">
      <SectionHeading label={copy.label} title={copy.title} subtitle={copy.subtitle} />

      <div ref={ref} className="grid gap-6 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-10 xl:grid-cols-[minmax(0,20rem)_1fr] xl:gap-12">
        <nav
          data-stagger
          aria-label="Skill categories"
          className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-col lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {skillCategories.map((category, index) => {
            const isActive = index === activeIndex
            return (
              <button
                key={category.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={isActive}
                className={`relative shrink-0 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors sm:text-base lg:w-full ${
                  isActive
                    ? 'border-accent/30 bg-accent/10 text-foreground'
                    : 'border-border bg-surface/40 text-muted hover:text-foreground'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="skill-active"
                    className="absolute inset-0 rounded-xl border border-accent/20 bg-accent/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{category.name}</span>
              </button>
            )
          })}
        </nav>

        <div data-stagger className="surface-panel rounded-2xl p-6 sm:p-8 lg:p-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.name}
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="font-display text-xl font-semibold sm:text-2xl">{active.name}</h3>
              <p className="mt-2 max-w-none text-sm leading-relaxed text-muted sm:text-base">
                {active.description}
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4">
                {active.skills.map((skill, i) => (
                  <motion.li
                    key={skill}
                    initial={reducedMotion ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reducedMotion ? 0 : i * 0.04, duration: 0.3 }}
                    className="flex items-center gap-3 rounded-xl border border-border/80 bg-bg-subtle/50 px-4 py-3 text-sm text-foreground sm:text-[0.9375rem]"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionShell>
  )
}
