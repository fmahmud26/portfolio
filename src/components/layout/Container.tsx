import type { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  className?: string
}

/** Section content width — capped at --content-max with side gutters */
export const containerClassName = 'page-container'

/** Header / footer chrome — full bleed with gutter padding */
export const containerNavClassName = 'page-container--edge'

export function Container({ children, className = '' }: ContainerProps) {
  return <div className={`${containerClassName} ${className}`.trim()}>{children}</div>
}

export function ContainerNav({ children, className = '' }: ContainerProps) {
  return <div className={`${containerNavClassName} ${className}`.trim()}>{children}</div>
}
