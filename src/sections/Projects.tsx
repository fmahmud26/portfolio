import { useState } from 'react'
import { ArrowUpRight, Layers } from 'lucide-react'
import { useGsapStagger } from '../hooks/useGsapScroll'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SectionShell } from '../components/ui/SectionShell'
import { projects } from '../data/content'

export function Projects() {
  const ref = useGsapStagger<HTMLDivElement>()
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <SectionShell id="work" atmosphere="subtle">
      <SectionHeading
        label="Selected Work"
        title="Systems I've built"
        subtitle="Production systems spanning AI pipelines, enterprise backends, cloud infrastructure, and DevSecOps."
      />

      <div ref={ref} className="grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 xl:gap-7">
        {projects.map((project) => {
          const isActive = activeId === project.id
          const isFeatured = project.featured

          return (
            <article
              key={project.id}
              data-stagger
              onMouseEnter={() => setActiveId(project.id)}
              onMouseLeave={() => setActiveId(null)}
              className={`surface-panel interactive-lift group relative overflow-hidden rounded-2xl p-5 sm:p-7 lg:p-8 ${
                isFeatured
                  ? 'sm:col-span-2 xl:col-span-2 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10 xl:gap-12'
                  : ''
              } ${isActive ? 'border-accent/25' : ''}`}
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 font-display text-[5rem] font-bold leading-none text-foreground/[0.03] sm:text-[6rem]"
                aria-hidden="true"
              >
                {project.id}
              </div>

              <div
                className={`pointer-events-none absolute inset-0 bg-linear-to-br from-accent/[0.04] via-transparent to-cyan/[0.05] transition-opacity duration-500 ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden="true"
              />

              <div className="relative min-w-0">
                <div className="flex items-center gap-2">
                  <Layers size={14} className="text-accent" aria-hidden="true" />
                  <span className="font-mono text-xs tracking-wider text-accent uppercase">
                    Case study {project.id}
                  </span>
                </div>

                <h3 className="font-display mt-3 text-xl font-semibold sm:text-2xl lg:text-[1.75rem]">
                  {project.title}
                </h3>

                <p className="mt-3 max-w-none text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                {(project.link || project.github) && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-glow"
                      >
                        View project
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
                      >
                        Source
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                )}
              </div>

              {isFeatured && (
                <div className="relative mt-6 min-h-[180px] overflow-hidden rounded-xl border border-border bg-bg-subtle/80 sm:mt-8 sm:min-h-[220px] lg:mt-0 lg:min-h-[240px]">
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-accent)_12%,transparent),transparent_55%,color-mix(in_srgb,var(--color-cyan)_10%,transparent))]" />
                  <div className="absolute inset-0 opacity-[0.07]">
                    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id={`grid-${project.id}`} width="24" height="24" patternUnits="userSpaceOnUse">
                          <path
                            d="M24 0H0V24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.5"
                          />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#grid-${project.id})`} />
                    </svg>
                  </div>
                  <div className="relative flex h-full min-h-[180px] flex-col justify-end p-5 sm:min-h-[220px] lg:min-h-[240px] lg:p-6">
                    <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                      Stack layers
                    </p>
                    <div className="mt-3 space-y-2">
                      {project.tags.slice(0, 4).map((tag, i) => (
                        <div
                          key={tag}
                          className="flex items-center gap-3 rounded-lg border border-border/80 bg-surface/50 px-3 py-2 text-xs text-foreground sm:text-sm"
                          style={{ marginLeft: `${i * 8}px`, width: `calc(100% - ${i * 8}px)` }}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </SectionShell>
  )
}
