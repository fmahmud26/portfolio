import { useGsapReveal } from '../hooks/useGsapScroll'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SectionShell } from '../components/ui/SectionShell'
import { profile, stats } from '../data/content'

export function About() {
  const ref = useGsapReveal<HTMLDivElement>()

  return (
    <SectionShell id="about" atmosphere="subtle">
      <div ref={ref}>
        <SectionHeading
          label="About"
          title="From prototype to production"
          subtitle="Scoping with stakeholders, prototyping fast, then hardening what sticks."
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="space-y-5 text-base leading-relaxed text-muted sm:space-y-6 sm:text-lg lg:col-span-7 xl:col-span-8">
            <p className="max-w-none xl:reading-width">{profile.summary}</p>
            <p className="max-w-none xl:reading-width">
              Currently at{' '}
              <span className="font-medium text-foreground">Brain Station 23</span>, I own
              technical delivery for enterprise SaaS — mentoring engineers on backend and cloud
              patterns while driving CI/CD, Kubernetes, and DevSecOps practices on AWS.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-5 xl:col-span-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="surface-panel interactive-lift rounded-xl p-4 sm:rounded-2xl sm:p-5"
              >
                <div className="font-display text-2xl font-bold text-gradient sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1.5 text-xs leading-snug text-muted sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
