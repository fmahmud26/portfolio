import { Award, Mail } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from './BrandIcons'
import { FooterPressable } from './FooterPressable'
import { Tooltip } from './Tooltip'

export type SocialLabel = 'GitHub' | 'LinkedIn' | 'Credly' | 'Email'

type FooterSocialLinkProps = {
  href: string
  label: SocialLabel
  external?: boolean
}

const hoverAccent: Record<SocialLabel, string> = {
  GitHub: 'hover:text-foreground hover:border-foreground/20',
  LinkedIn: 'hover:text-[#0A66C2] dark:hover:text-[#70b5ff]',
  Credly: 'hover:text-accent hover:border-accent/35',
  Email: 'hover:text-cyan hover:border-cyan/30',
}

function SocialIcon({ label }: { label: SocialLabel }) {
  switch (label) {
    case 'GitHub':
      return <GitHubIcon />
    case 'LinkedIn':
      return <LinkedInIcon />
    case 'Credly':
      return <Award size={19} strokeWidth={1.75} aria-hidden="true" />
    case 'Email':
      return <Mail size={19} strokeWidth={1.75} aria-hidden="true" />
  }
}

export function FooterSocialLink({ href, label, external = false }: FooterSocialLinkProps) {
  return (
    <Tooltip text={label} position="top" autoHideMs={2000}>
      <FooterPressable
        href={href}
        external={external}
        ariaLabel={label}
        variant="icon"
        className={`footer-social-icon flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface/60 text-muted backdrop-blur-sm transition-[color,border-color,background-color,box-shadow] duration-200 ${hoverAccent[label]}`}
      >
        <SocialIcon label={label} />
      </FooterPressable>
    </Tooltip>
  )
}
