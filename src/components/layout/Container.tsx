import type { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  className?: string
}

/** Full-width layout with shared edge inset — matches header & footer */
export const containerClassName = 'page-container w-full'

export function Container({ children, className = '' }: ContainerProps) {
  return <div className={`${containerClassName} ${className}`.trim()}>{children}</div>
}

export function ContainerNav({ children, className = '' }: ContainerProps) {
  return <div className={`${containerClassName} ${className}`.trim()}>{children}</div>
}
