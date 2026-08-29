import { useGsapStagger } from '../hooks/useGsapScroll'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SectionShell } from '../components/ui/SectionShell'
import { experience, sections } from '../data/content'
import { Briefcase, ArrowUpRight } from 'lucide-react'

function formatDateTimeRange(role: (typeof experience)[0]['roles'][0]) {
  if (role.dateTimeEnd) {
    return `${role.dateTimeStart}/${role.dateTimeEnd}`
  }
  return role.dateTimeStart
}

export function Experience() {
  const ref = useGsapStagger<HTMLDivElement>()
  const copy = sections.experience

  return (
    <SectionShell id="experience" atmosphere="minimal">
      <SectionHeading label={copy.label} title={copy.title} subtitle={copy.subtitle} />

      <div ref={ref} className="relative w-full">
        <div
          className="timeline-rail absolute top-2 bottom-2 left-[11px] w-px sm:left-5"
          aria-hidden="true"
        />

        <div className="space-y-10 sm:space-y-12">
          {experience.map((job, jobIndex) => (
            <article key={job.company} data-stagger className="relative pl-10 sm:pl-14">
              <div
                className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-accent/30 bg-surface sm:left-2 sm:h-7 sm:w-7"
                aria-hidden="true"
              >
                <Briefcase size={12} className="text-accent" />
              </div>

              <header className="mb-6 sm:mb-8">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-xl font-semibold sm:text-2xl">
                    {job.url ? (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                      >
                        {job.company}
                        <ArrowUpRight size={16} className="shrink-0 text-accent/80" aria-hidden="true" />
                        <span className="sr-only"> (opens in new tab)</span>
                      </a>
                    ) : (
                      job.company
                    )}
                  </h3>
                  <span className="font-mono text-xs text-muted">{String(jobIndex + 1).padStart(2, '0')}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{job.location}</p>
              </header>

              <div className="space-y-8">
                {job.roles.map((role) => (
                  <div
                    key={role.title + role.period}
                    className="surface-panel interactive-lift rounded-xl p-5 sm:rounded-2xl sm:p-6 lg:p-7"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <h4 className="text-base font-medium text-accent-glow sm:text-lg">
                        {role.title}
                      </h4>
                      <time
                        className="font-mono shrink-0 text-xs text-muted sm:text-sm"
                        dateTime={formatDateTimeRange(role)}
                      >
                        {role.period}
                      </time>
                    </div>

                    <ul className="mt-4 space-y-3 sm:mt-5">
                      {role.highlights.map((item) => (
                        <li
                          key={item.slice(0, 48)}
                          className="flex gap-3 text-sm leading-relaxed text-muted sm:text-[0.9375rem]"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
