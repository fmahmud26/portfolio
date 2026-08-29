import { ArrowUpRight } from 'lucide-react'
import { useGsapStagger } from '../hooks/useGsapScroll'
import { CredentialRow, CredentialStack } from '../components/ui/CredentialStack'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SectionShell } from '../components/ui/SectionShell'
import { certifications, education, profile, sections } from '../data/content'

export function Credentials() {
  const ref = useGsapStagger<HTMLDivElement>()
  const copy = sections.credentials

  return (
    <SectionShell id="credentials" atmosphere="minimal">
      <SectionHeading label={copy.label} title={copy.title} subtitle={copy.subtitle} />

      <div ref={ref} className="grid gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div>
          <h3 className="font-display text-lg font-semibold sm:text-xl">Certifications</h3>
          <p className="mt-2 text-sm text-muted sm:text-base">
            Verified credentials from AWS, HashiCorp, and the CNCF.
          </p>

          <CredentialStack className="mt-6">
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

        <div data-stagger>
          <h3 className="font-display text-lg font-semibold sm:text-xl">{copy.educationHeading}</h3>
          <p className="mt-2 text-sm text-muted sm:text-base">
            Foundation in computer science and software engineering.
          </p>

          <CredentialStack className="mt-6">
            <CredentialRow
              index={1}
              title={education.degree}
              detail={education.school}
              meta={education.year}
            />
          </CredentialStack>
        </div>
      </div>
    </SectionShell>
  )
}
