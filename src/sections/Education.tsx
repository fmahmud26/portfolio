import { useGsapStagger } from '../hooks/useGsapScroll'
import { CredentialRow, CredentialStack } from '../components/ui/CredentialStack'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SectionShell } from '../components/ui/SectionShell'
import { education, sections } from '../data/content'

export function Education() {
  const ref = useGsapStagger<HTMLDivElement>()
  const copy = sections.education

  return (
    <SectionShell id="education" atmosphere="minimal">
      <SectionHeading label={copy.label} title={copy.title} subtitle={copy.subtitle} />

      <div ref={ref}>
        <CredentialStack>
          <CredentialRow
            index={1}
            title={education.degree}
            detail={education.school}
            meta={education.year}
          />
        </CredentialStack>
      </div>
    </SectionShell>
  )
}
