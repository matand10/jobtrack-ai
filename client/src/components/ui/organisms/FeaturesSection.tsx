import type { ComponentType } from 'react'
import { Card } from '../atoms/Card'
import { CompanyMark } from '../atoms/CompanyMark'
import { Container } from '../atoms/Container'
import { Section } from '../atoms/Section'
import { BriefcaseIcon, ChartIcon, FileTextIcon, SearchIcon, SparklesIcon } from '../icons'
import { SectionIntro } from '../molecules/SectionIntro'
import { StatusBadge } from '../molecules/StatusBadge'
import { getCompanyColor, sampleApplications } from '../../landing/landingData'

type IconProps = { size?: number }

type Feature = {
  description: string
  icon: ComponentType<IconProps>
  tileClassName: string
  title: string
}

const features: Feature[] = [
  {
    description: 'Paste a JD, get bullet rewrites, keywords to include, and a cover letter draft tuned to the role.',
    icon: SparklesIcon,
    tileClassName: 'bg-app-ai-soft text-app-ai-600',
    title: 'AI resume suggestions',
  },
  {
    description: 'Find any role by company, status, location, or recency. Save filtered views.',
    icon: SearchIcon,
    tileClassName: 'bg-app-violet-soft text-app-violet',
    title: 'Search and filters',
  },
  {
    description: "Response rates, time-to-interview, offers per week - know what's working.",
    icon: ChartIcon,
    tileClassName: 'bg-app-amber-soft text-amber-700',
    title: 'Dashboard stats',
  },
  {
    description: 'Recruiter names, salary bands, interview prep - keep it all attached to the application.',
    icon: FileTextIcon,
    tileClassName: 'bg-app-sky-soft text-app-sky',
    title: 'Notes per role',
  },
]

export function FeaturesSection() {
  return (
    <Section id="features" tone="card">
      <Container>
        <SectionIntro eyebrow="FEATURES" title="Everything you need to run a sharper job search." />
        <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          <Card className="flex flex-col justify-between bg-[linear-gradient(180deg,#FAFBFF_0%,#FFFFFF_100%)] p-5 sm:p-7 lg:row-span-2" interactive>
            <div>
              <span className="inline-flex size-10 items-center justify-center rounded-[10px] bg-app-primary-soft text-app-primary">
                <BriefcaseIcon size={20} />
              </span>
              <h3 className="mt-[18px] mb-2 text-[22px] font-semibold text-app-text">Application pipeline</h3>
              <p className="max-w-sm text-[14.5px] leading-[1.55] text-app-text-3">
                See every role at a glance - applied, interviewing, offer, rejected. Update status in one click.
              </p>
            </div>
            <div className="mt-7 flex flex-col gap-2">
              {sampleApplications.slice(0, 4).map((application) => (
                <div className="flex flex-wrap items-center gap-3 rounded-[10px] border border-app-border bg-white px-3 py-2.5 min-[430px]:flex-nowrap sm:px-3.5" key={application.id}>
                  <CompanyMark color={getCompanyColor(application.company)} name={application.company} size={30} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-app-text">
                      {application.company} <span className="font-normal text-app-text-3">· {application.role}</span>
                    </p>
                  </div>
                  <span className="ml-auto shrink-0">
                    <StatusBadge status={application.status} />
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid gap-5 sm:grid-cols-2">
            {features.map((feature) => (
              <Card className="p-6" interactive key={feature.title}>
                <span className={`inline-flex size-9 items-center justify-center rounded-[9px] ${feature.tileClassName}`}>
                  <feature.icon size={18} />
                </span>
                <h3 className="mt-3.5 mb-1.5 text-[17px] font-semibold text-app-text">{feature.title}</h3>
                <p className="text-[13.5px] leading-normal text-app-text-3">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
