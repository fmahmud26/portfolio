import { useRef, useState } from 'react'
import { Button } from './Button'
import { GlassSelectIndicator } from './GlassSelectIndicator'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type FooterNavLinkProps = {
  href: string
  label: string
  isActive: boolean
  onSelect: (sectionId: string) => void
}

export function FooterNavLink({ href, label, isActive, onSelect }: FooterNavLinkProps) {
  const sectionId = href.slice(1)
  const [justClicked, setJustClicked] = useState(false)
  const reducedMotion = useReducedMotion()
  const timeoutRef = useRef<number | null>(null)

  const handleClick = () => {
    onSelect(sectionId)
    if (!reducedMotion) {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
      setJustClicked(true)
      timeoutRef.current = window.setTimeout(() => setJustClicked(false), 480)
    }
  }

  const highlighted = isActive || justClicked

  return (
    <li className="relative shrink-0">
      <GlassSelectIndicator layoutId="footer-nav-glass" active={highlighted} />
      <Button
        href={href}
        onClick={handleClick}
        aria-current={isActive ? 'page' : undefined}
        variant="tertiary"
        size="sm"
        selected={highlighted}
        glassLayers={false}
        className="btn--nav relative z-10"
      >
        {label}
      </Button>
    </li>
  )
}
