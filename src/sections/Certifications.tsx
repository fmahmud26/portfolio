import { ArrowUpRight } from 'lucide-react'
import { useGsapStagger } from '../hooks/useGsapScroll'
import { CredentialRow, CredentialStack } from '../components/ui/CredentialStack'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SectionShell } from '../components/ui/SectionShell'
import { certifications, profile, sections } from '../data/content'

export function Certifications() {
  const ref = useGsapStagger<HTMLDivElement>()
  const copy = sections.certifications

  return (
    <SectionShell id="certifications" atmosphere="minimal">
      <SectionHeading label={copy.label} title={copy.title} subtitle={copy.subtitle} />

      <div ref={ref}>
        <CredentialStack>
          {certifications.map((cert, index) => (
            <CredentialRow
              key={cert.name}
              index={index + 1}
              title={cert.name}
              detail={cert.issuer}
              href={cert.link}
            />
          ))}
        </CredentialStack>

        <a
          href={profile.credly}
          target="_blank"
          rel="noopener noreferrer"
          className="credential-footer-link group"
          data-stagger
        >
          {copy.credlyLink}
          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
    </SectionShell>
  )
}
