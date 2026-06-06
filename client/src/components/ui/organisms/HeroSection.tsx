import { Badge } from '../atoms/Badge'
import { Button } from '../atoms/Button'
import { Card } from '../atoms/Card'
import { CompanyMark } from '../atoms/CompanyMark'
import { Container } from '../atoms/Container'
import { ArrowRightIcon, EyeIcon, SparklesIcon } from '../icons'
import { StatusBadge } from '../molecules/StatusBadge'
import { getCompanyColor, sampleApplications } from '../../landing/landingData'

const stats = [
  { color: '#0284C7', label: 'Applied', value: '18' },
  { color: '#F59E0B', label: 'Interviews', value: '4' },
  { color: '#10B981', label: 'Offers', value: '1' },
  { color: '#E11D48', label: 'Rejected', value: '6' },
]

export function HeroSection() {
  return (
    <section className="overflow-hidden border-b border-app-border bg-[radial-gradient(60%_80%_at_70%_20%,rgba(124,58,237,0.08),transparent_60%),radial-gradient(50%_70%_at_10%_30%,rgba(79,70,229,0.07),transparent_60%)] py-10 sm:py-16 lg:py-[72px]">
      <Container className="grid min-w-0 items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="min-w-0">
          <div className="mb-[18px] inline-flex max-w-full items-center gap-2 rounded-full bg-app-ai-soft py-1 pr-3 pl-1.5 text-xs font-medium text-app-ai-600">
            <span className="rounded-full bg-app-ai px-2 py-0.5 text-[11px] font-semibold text-white">NEW</span>
            <span className="truncate">AI cover-letter drafts in one click</span>
          </div>
          <h1 className="max-w-2xl text-[34px] leading-[1.05] font-bold tracking-[-0.035em] text-app-text min-[390px]:text-[38px] sm:text-[46px] lg:text-[52px]">
            Track applications.
            <br />
            <span className="bg-[linear-gradient(90deg,var(--color-app-primary),var(--color-app-violet))] bg-clip-text text-transparent">Tailor resumes faster.</span>
          </h1>
          <p className="mt-5 mb-8 max-w-xl text-[15px] leading-7 text-app-text-2 sm:text-lg">
            Manage your entire job search pipeline and generate AI-powered resume suggestions tailored to every role you apply for.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button className="w-full sm:w-auto" href="/register" size="lg">
              Get Started — free <ArrowRightIcon size={16} />
            </Button>
            <Button className="w-full sm:w-auto" href="/login" size="lg" variant="ghost">
              <EyeIcon size={16} /> View Demo
            </Button>
          </div>
          <div className="mt-7 flex items-center gap-4 text-[13px] font-medium text-app-text-3">
            <div className="flex" aria-hidden="true">
              {['#4F46E5', '#10B981', '#F59E0B', '#7C3AED'].map((color, index) => (
                <span
                  className="size-7 rounded-full border-2 border-white"
                  key={color}
                  style={{ backgroundColor: color, marginLeft: index ? -8 : 0 }}
                />
              ))}
            </div>
            <p>
              <strong className="font-semibold text-app-text-2">12,400+</strong> job seekers tracking with us
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full min-w-0 max-w-[560px] lg:max-w-none">
          <Card className="p-3 sm:rotate-[0.5deg] sm:p-4" shadow="lg">
            <div className="flex items-center gap-2 border-b border-app-border px-1 pt-1 pb-3.5">
              <span className="size-2.5 rounded-full bg-app-border" aria-hidden="true" />
              <span className="size-2.5 rounded-full bg-app-border" aria-hidden="true" />
              <span className="size-2.5 rounded-full bg-app-border" aria-hidden="true" />
              <span className="ml-2 truncate font-mono text-[11px] font-medium text-app-text-4">app.jobtrack.ai/dashboard</span>
            </div>
            <div className="px-1 pt-4 pb-1">
              <div className="mb-3.5 flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-app-text">Your pipeline</p>
                <Badge dot variant="success">5 active</Badge>
              </div>
              <div className="mb-3.5 grid grid-cols-2 gap-2 min-[520px]:grid-cols-4">
                {stats.map((stat) => (
                  <div className="rounded-[10px] bg-app-subtle p-2.5" key={stat.label}>
                    <p className="text-[10px] font-medium tracking-[0.04em] text-app-text-3 uppercase">{stat.label}</p>
                    <p className="mt-0.5 text-xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-1.5">
                {sampleApplications.slice(0, 3).map((application) => (
                  <div className="flex flex-wrap items-center gap-2.5 rounded-[10px] bg-app-subtle px-2.5 py-2 min-[430px]:flex-nowrap" key={application.id}>
                    <CompanyMark color={getCompanyColor(application.company)} name={application.company} size={28} />
                    <div className="min-w-0 flex-1">
                      <p className="text-[12.5px] font-semibold text-app-text">{application.company}</p>
                      <p className="truncate text-[11px] text-app-text-3">{application.role}</p>
                    </div>
                    <span className="ml-auto shrink-0">
                      <StatusBadge status={application.status} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          <Card className="right-2 bottom-4 mt-4 w-full border-app-ai-soft-2 p-3 sm:absolute sm:right-[-22px] sm:bottom-8 sm:mt-0 sm:w-[220px] sm:rotate-[-1.5deg]" shadow="lg">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex size-6 items-center justify-center rounded-md bg-app-ai-soft text-app-ai-600">
                <SparklesIcon size={14} />
              </span>
              <p className="text-xs font-semibold text-app-ai-600">AI Tailor</p>
            </div>
            <p className="text-[11.5px] leading-[1.45] text-app-text-2">
              "Architected a React 18 design system used across 7 surfaces, cutting build time 35%."
            </p>
          </Card>
        </div>
      </Container>
    </section>
  )
}
