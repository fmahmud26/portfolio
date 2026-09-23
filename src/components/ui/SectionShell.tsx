import type { ReactNode } from 'react'
import { Container } from '../layout/Container'
import { CosmicAtmosphere } from './CosmicAtmosphere'

type SectionShellProps = {
  id: string
  children: ReactNode
  className?: string
  atmosphere?: 'minimal' | 'none'
  /** Compact vertical rhythm for thin sections (e.g. Education) */
  density?: 'default' | 'compact'
}

export function SectionShell({
  id,
  children,
  className = '',
  atmosphere = 'minimal',
  density = 'default',
}: SectionShellProps) {
  const densityClass = density === 'compact' ? 'section-shell--compact' : ''

  return (
    <section
      id={id}
      className={`section-shell relative w-full ${densityClass} ${className}`.trim()}
    >
      <div className="section-readability-scrim pointer-events-none absolute inset-0" aria-hidden="true" />
      {atmosphere !== 'none' && <CosmicAtmosphere variant="minimal" />}
      <Container className="relative">{children}</Container>
    </section>
  )
}
