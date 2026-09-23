import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

type CredentialStackProps = {
  children: ReactNode
  className?: string
}

export function CredentialStack({ children, className = '' }: CredentialStackProps) {
  return <ul className={`credential-stack ${className}`.trim()}>{children}</ul>
}

type CredentialRowProps = {
  index: number
  title: string
  detail: string
  meta?: string
  href?: string
  linkLabel?: string
  badge?: string
}

export function CredentialRow({
  index,
  title,
  detail,
  meta,
  href,
  linkLabel = 'Verify',
  badge,
}: CredentialRowProps) {
  return (
    <li className="credential-row" data-stagger>
      <span className="credential-index" aria-hidden="true">
        {String(index).padStart(2, '0')}
      </span>

      <div className="min-w-0 flex-1">
        <p className="credential-title">{title}</p>
        {badge ? <p className="credential-badge">{badge}</p> : null}
        <p className={`text-sm leading-relaxed text-muted ${badge ? 'mt-1' : 'mt-1.5'}`}>
          {detail}
        </p>
      </div>

      {(meta || href) && (
        <div className="credential-meta">
          {meta ? <span className="credential-meta-label">{meta}</span> : null}
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="credential-action inline-flex items-center gap-1"
              aria-label={`${linkLabel}: ${title}`}
            >
              {linkLabel}
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      )}
    </li>
  )
}
