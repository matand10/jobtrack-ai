import { Card } from '../atoms/Card'
import { Container } from '../atoms/Container'
import { Section } from '../atoms/Section'
import { BriefcaseIcon, FileTextIcon, SparklesIcon } from '../icons'
import { SectionIntro } from '../molecules/SectionIntro'

const steps = [
  {
    description: 'Add roles you care about. Update status as you hear back. No more spreadsheets.',
    icon: BriefcaseIcon,
    number: '01',
    title: 'Track applications',
  },
  {
    description: 'Drop in any JD and your resume context. JobTrack AI does the matching.',
    icon: FileTextIcon,
    number: '02',
    title: 'Paste job descriptions',
  },
  {
    description: 'Get bullets, keywords, a cover letter draft, and what to study before the interview.',
    icon: SparklesIcon,
    number: '03',
    title: 'Generate tailored suggestions',
  },
]

export function HowItWorksSection() {
  return (
    <Section id="how-it-works">
      <Container>
        <SectionIntro align="center" eyebrow="HOW IT WORKS" title="From job posting to tailored application, in minutes." />
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <Card className="p-6" interactive key={step.number}>
              <div className="mb-[18px] flex items-center justify-between">
                <span className="inline-flex size-9 items-center justify-center rounded-[9px] bg-app-primary-soft text-app-primary">
                  <step.icon size={18} />
                </span>
                <span className="font-mono text-[28px] leading-none font-bold tracking-[-0.02em] text-app-subtle">{step.number}</span>
              </div>
              <h3 className="mb-1.5 text-lg font-semibold text-app-text">{step.title}</h3>
              <p className="text-sm leading-[1.55] text-app-text-3">{step.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
