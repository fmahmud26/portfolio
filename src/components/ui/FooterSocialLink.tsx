import { Award, Mail } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from './BrandIcons'
import { Button } from './Button'
import { Tooltip } from './Tooltip'

export type SocialLabel = 'GitHub' | 'LinkedIn' | 'Credly' | 'Email'

type FooterSocialLinkProps = {
  href: string
  label: SocialLabel
  external?: boolean
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
      <Button
        href={href}
        external={external}
        aria-label={label}
        variant="outlined"
        size="icon"
        iconOnly
      >
        <SocialIcon label={label} />
      </Button>
    </Tooltip>
  )
}
