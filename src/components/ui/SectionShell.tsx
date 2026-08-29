import type { ReactNode } from 'react'
import { Container } from '../layout/Container'
import { CosmicAtmosphere } from './CosmicAtmosphere'

type SectionShellProps = {
  id: string
  children: ReactNode
  className?: string
  atmosphere?: 'subtle' | 'minimal' | 'none'
}

export function SectionShell({
  id,
  children,
  className = '',
  atmosphere = 'subtle',
}: SectionShellProps) {
  return (
    <section id={id} className={`section-shell relative w-full ${className}`.trim()}>
      <div className="section-readability-scrim pointer-events-none absolute inset-0" aria-hidden="true" />
      {atmosphere !== 'none' && <CosmicAtmosphere variant={atmosphere} />}
      <Container className="relative">{children}</Container>
    </section>
  )
}
