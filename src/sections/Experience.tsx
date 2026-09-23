import { useGsapStagger } from '../hooks/useGsapScroll'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SectionShell } from '../components/ui/SectionShell'
import { experience, sections } from '../data/content'
import { ArrowUpRight } from 'lucide-react'

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
          className="timeline-rail absolute top-1 bottom-1 left-[7px] w-px"
          aria-hidden="true"
        />

        <div className="space-y-7 sm:space-y-8">
          {experience.map((job, jobIndex) => (
            <article key={job.company} data-stagger className="relative pl-8 sm:pl-10">
              <div
                className="timeline-node absolute left-0 top-1.5 h-3.5 w-3.5"
                aria-hidden="true"
              >
                <span className="timeline-node__core" />
              </div>

              <header className="mb-4">
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                  <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                    {job.url ? (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="experience-company-link inline-flex items-center gap-1 transition-colors hover:text-accent"
                      >
                        {job.company}
                        <ArrowUpRight
                          size={14}
                          className="experience-company-link__icon shrink-0 text-accent/70"
                          aria-hidden="true"
                        />
                        <span className="sr-only"> (opens in new tab)</span>
                      </a>
                    ) : (
                      job.company
                    )}
                  </h3>
                  <span className="font-mono text-[0.6875rem] text-muted/80">
                    {String(jobIndex + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-muted">{job.location}</p>
              </header>

              <div className="space-y-4">
                {job.roles.map((role) => (
                  <div key={role.title + role.period} className="experience-role">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <h4 className="experience-role__title text-sm font-medium sm:text-[0.9375rem]">
                        {role.title}
                      </h4>
                      <time
                        className="font-mono shrink-0 text-[0.6875rem] text-muted sm:text-xs"
                        dateTime={formatDateTimeRange(role)}
                      >
                        {role.period}
                      </time>
                    </div>

                    <ul className="mt-3 space-y-2">
                      {role.highlights.map((item) => (
                        <li
                          key={item.slice(0, 48)}
                          className="flex gap-2.5 text-sm leading-relaxed text-foreground/78"
                        >
                          <span
                            className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent/70"
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
