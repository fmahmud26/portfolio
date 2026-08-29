import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useGsapStagger } from '../hooks/useGsapScroll'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SectionShell } from '../components/ui/SectionShell'
import { Button } from '../components/ui/Button'
import { GlassSelectIndicator } from '../components/ui/GlassSelectIndicator'
import { sections, skillCategories } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function Skills() {
  const ref = useGsapStagger<HTMLDivElement>()
  const navRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = useReducedMotion()
  const active = skillCategories[activeIndex]
  const copy = sections.skills

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const activeBtn = nav.querySelector<HTMLElement>('[aria-pressed="true"]')
    activeBtn?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'nearest',
    })
  }, [activeIndex, reducedMotion])

  return (
    <SectionShell id="skills" atmosphere="minimal">
      <SectionHeading label={copy.label} title={copy.title} subtitle={copy.subtitle} />

      <div ref={ref} className="grid gap-6 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-10 xl:grid-cols-[minmax(0,20rem)_1fr] xl:gap-12">
        <LayoutGroup id="skills-nav">
          <nav
            ref={navRef}
            data-stagger
            aria-label="Skill categories"
            className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-col lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {skillCategories.map((category, index) => {
              const isActive = index === activeIndex
              return (
                <div key={category.name} className="relative shrink-0 lg:w-full">
                  <GlassSelectIndicator
                    layoutId="skills-tab-glass"
                    active={isActive}
                    className="rounded-[var(--btn-radius)]"
                  />
                  <Button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-pressed={isActive}
                    variant="outlined"
                    size="md"
                    selected={isActive}
                    glassLayers={false}
                    className="btn--tab relative z-10 w-full justify-start text-left"
                  >
                    {category.name}
                  </Button>
                </div>
              )
            })}
          </nav>
        </LayoutGroup>

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
