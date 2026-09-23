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
  const panelId = 'skills-panel'

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const activeBtn = nav.querySelector<HTMLElement>('[aria-selected="true"]')
    if (!activeBtn) return

    const navRect = nav.getBoundingClientRect()
    const btnRect = activeBtn.getBoundingClientRect()
    const offset = btnRect.left - navRect.left - (navRect.width - btnRect.width) / 2
    nav.scrollTo({
      left: nav.scrollLeft + offset,
      behavior: reducedMotion ? 'auto' : 'smooth',
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
            role="tablist"
            className="skills-tab-scroll flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-col lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
            onKeyDown={(e) => {
              const last = skillCategories.length - 1
              let next = activeIndex
              if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault()
                next = activeIndex === last ? 0 : activeIndex + 1
              } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault()
                next = activeIndex === 0 ? last : activeIndex - 1
              } else if (e.key === 'Home') {
                e.preventDefault()
                next = 0
              } else if (e.key === 'End') {
                e.preventDefault()
                next = last
              } else {
                return
              }
              setActiveIndex(next)
              requestAnimationFrame(() => {
                navRef.current
                  ?.querySelector<HTMLElement>(`#skills-tab-${next}`)
                  ?.focus()
              })
            }}
          >
            {skillCategories.map((category, index) => {
              const isActive = index === activeIndex
              const tabId = `skills-tab-${index}`
              return (
                <div key={category.name} className="relative shrink-0 lg:w-full" role="presentation">
                  <GlassSelectIndicator
                    layoutId="skills-tab-glass"
                    active={isActive}
                    className="rounded-[var(--btn-radius)]"
                  />
                  <Button
                    type="button"
                    id={tabId}
                    role="tab"
                    onClick={() => setActiveIndex(index)}
                    aria-selected={isActive}
                    aria-controls={panelId}
                    tabIndex={isActive ? 0 : -1}
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

        <div
          data-stagger
          id={panelId}
          role="tabpanel"
          aria-labelledby={`skills-tab-${activeIndex}`}
          className="panel-card relative overflow-hidden p-5 sm:p-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.name}
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display text-sm font-semibold tracking-tight text-foreground sm:text-base">
                {active.name}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground/75 sm:text-[0.9375rem]">
                {active.description}
              </p>

              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                {active.skills.map((skill, i) => (
                  <motion.li
                    key={skill}
                    initial={reducedMotion ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reducedMotion ? 0 : i * 0.04, duration: 0.3 }}
                    className="skill-chip"
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
