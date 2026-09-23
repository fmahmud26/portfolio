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

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          <div className="space-y-4 text-[0.9375rem] leading-relaxed text-foreground/80 sm:text-base lg:col-span-7 xl:col-span-8">
            <p className="max-w-none lg:reading-width">{profile.summary}</p>
            <p className="max-w-none lg:reading-width">{copy.continued}</p>
          </div>

          <div className="space-y-3 lg:col-span-5 xl:col-span-4">
            <p className="label-micro text-accent">How I work</p>
            <ul className="space-y-2">
              {workPrinciples.map((principle, index) => (
                <li key={principle.title} className="principle-card">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono text-[0.625rem] tracking-[0.14em] text-accent/70" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-sm font-semibold text-foreground sm:text-[0.9375rem]">
                      {principle.title}
                    </h3>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted sm:pl-[1.625rem]">
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
