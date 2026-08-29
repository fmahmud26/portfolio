import { useGsapReveal } from '../hooks/useGsapScroll'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SectionShell } from '../components/ui/SectionShell'
import { profile, sections, workPrinciples } from '../data/content'

export function About() {
  const ref = useGsapReveal<HTMLDivElement>()
  const copy = sections.about

  return (
    <SectionShell id="about" atmosphere="minimal">
      <div ref={ref}>
        <SectionHeading label={copy.label} title={copy.title} subtitle={copy.subtitle} />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="space-y-5 text-base leading-relaxed text-muted sm:space-y-6 sm:text-lg lg:col-span-7 xl:col-span-8">
            <p className="max-w-none xl:reading-width">{profile.summary}</p>
            <p className="max-w-none xl:reading-width">{copy.continued}</p>
          </div>

          <div className="space-y-4 lg:col-span-5 xl:col-span-4">
            <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase sm:text-xs">
              How I work
            </p>
            <ul className="space-y-3 sm:space-y-4">
              {workPrinciples.map((principle) => (
                <li
                  key={principle.title}
                  className="surface-panel rounded-xl p-4 sm:rounded-2xl sm:p-5"
                >
                  <h3 className="font-display text-base font-semibold text-foreground sm:text-lg">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                    {principle.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
