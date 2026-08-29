import type { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  className?: string
}

/** Single global layout gutter — width includes responsive side margins, no nested px-* */
export const containerClassName = 'page-container w-full'

export function Container({ children, className = '' }: ContainerProps) {
  return <div className={`${containerClassName} ${className}`.trim()}>{children}</div>
}

export function ContainerNav({ children, className = '' }: ContainerProps) {
  return <div className={`${containerClassName} ${className}`.trim()}>{children}</div>
}
