import { useGsapStagger } from '../hooks/useGsapScroll'
import { Button } from '../components/ui/Button'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SectionShell } from '../components/ui/SectionShell'
import { projects, sections } from '../data/content'

export function Projects() {
  const ref = useGsapStagger<HTMLDivElement>()
  const copy = sections.projects

  return (
    <SectionShell id="projects" atmosphere="minimal">
      <SectionHeading label={copy.label} title={copy.title} subtitle={copy.subtitle} />

      <div ref={ref} className="projects-bento">
        {projects.map((project) => {
          const isFeatured = Boolean(project.featured)
          const isWideCase = project.id === '01' || project.id === '02' || project.id === '04'
          const isTallSide = project.id === '03'

          return (
            <article
              key={project.id}
              data-stagger
              className={`panel-card group relative flex h-full min-h-0 flex-col overflow-hidden p-5 outline-none sm:p-6 projects-bento__${project.id}`}
            >
              <div
                className="pointer-events-none absolute inset-0 bg-linear-to-br from-accent/[0.05] via-transparent to-cyan/[0.04] opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                aria-hidden="true"
              />
              <div className="relative flex items-center justify-between gap-3">
                <span className="label-micro text-accent/80">
                  {String(project.id).padStart(2, '0')}
                </span>
                {isFeatured && (
                  <span className="project-featured-badge rounded-full border border-accent/30 bg-linear-to-r from-accent/15 to-cyan/10 px-2.5 py-0.5 text-[0.625rem] font-medium tracking-wide text-accent">
                    Featured
                  </span>
                )}
              </div>

              <h3 className="font-display relative mt-3 text-lg font-semibold tracking-tight sm:text-xl">
                {project.title}
              </h3>

              <p className="relative mt-2 max-w-none text-sm leading-relaxed text-foreground/90">
                {project.summary}
              </p>

              <dl
                className={`relative mt-5 grid flex-1 gap-4 ${
                  isWideCase ? 'project-case-grid lg:grid-cols-3 lg:gap-0' : 'content-start'
                } ${isTallSide ? 'sm:gap-5' : ''}`}
              >
                <div className={isWideCase ? 'project-case-cell' : ''}>
                  <dt className="label-micro text-accent/75">Problem</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-foreground/78">{project.problem}</dd>
                </div>
                <div className={isWideCase ? 'project-case-cell' : ''}>
                  <dt className="label-micro text-accent/75">Approach</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-foreground/78">{project.approach}</dd>
                </div>
                <div className={isWideCase ? 'project-case-cell project-case-cell--outcome' : ''}>
                  <dt className="label-micro text-accent/75">Outcome</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-foreground/85">{project.outcome}</dd>
                </div>
              </dl>

              <div className="relative mt-auto flex flex-wrap gap-1.5 pt-5">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>

              {(project.link || project.github) && (
                <div className="relative mt-4 flex flex-wrap gap-2">
                  {project.link && (
                    <Button href={project.link} variant="tertiary" size="sm" external>
                      View project
                    </Button>
                  )}
                  {project.github && (
                    <Button href={project.github} variant="ghost" size="sm" external>
                      Source
                    </Button>
                  )}
                </div>
              )}
            </article>
          )
        })}
      </div>
    </SectionShell>
  )
}
