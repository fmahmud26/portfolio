import { useGsapStagger } from '../hooks/useGsapScroll'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SectionShell } from '../components/ui/SectionShell'
import { certifications, education } from '../data/content'
import { Award, GraduationCap, ExternalLink } from 'lucide-react'

export function Certifications() {
  const ref = useGsapStagger<HTMLDivElement>()

  return (
    <SectionShell id="certifications" atmosphere="subtle">
      <SectionHeading
        label="Credentials"
        title="Certified & educated"
        subtitle="Cloud-native certifications backed by a CS degree."
      />

      <div ref={ref} className="grid gap-5 sm:gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="grid gap-4 sm:gap-5 lg:col-span-8 lg:grid-cols-1 xl:col-span-9 xl:grid-cols-3 xl:gap-5">
          {certifications.map((cert, index) => (
            <div
              key={cert.name}
              data-stagger
              className={`surface-panel interactive-lift rounded-2xl p-5 sm:p-6 ${
                index === 0 ? 'border-accent/20' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`rounded-xl p-3 ${index === 0 ? 'bg-accent/12' : 'bg-surface-elevated'}`}
                >
                  <Award
                    size={20}
                    className={index === 0 ? 'text-accent' : 'text-muted'}
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  {cert.link ? (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-start gap-2 font-medium leading-snug transition-colors hover:text-accent"
                    >
                      <span>{cert.name}</span>
                      <ExternalLink
                        size={14}
                        className="mt-1 shrink-0 opacity-60 transition-opacity group-hover/link:opacity-100"
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <p className="font-medium leading-snug">{cert.name}</p>
                  )}
                  <p className="mt-1.5 text-sm text-muted">{cert.issuer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          data-stagger
          className="surface-panel glow-accent flex flex-col justify-center rounded-2xl p-6 sm:p-8 lg:col-span-4 xl:col-span-3 lg:p-9"
        >
          <div className="w-fit rounded-xl bg-cyan/10 p-3">
            <GraduationCap size={22} className="text-cyan" aria-hidden="true" />
          </div>
          <h3 className="font-display mt-6 text-xl font-semibold sm:text-2xl">{education.degree}</h3>
          <p className="mt-2 max-w-none text-base text-muted">{education.school}</p>
          <p className="mt-4 font-mono text-sm text-accent">Class of {education.year}</p>
        </div>
      </div>
    </SectionShell>
  )
}
