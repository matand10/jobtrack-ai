import { AppShell } from '../components/layout/AppShell'
import { DashboardError } from '../components/dashboard/DashboardError'
import { DashboardHeader } from '../components/dashboard/DashboardHeader'
import { DashboardSkeleton } from '../components/dashboard/DashboardSkeleton'
import { EmptyState } from '../components/dashboard/EmptyState'
import { QuickActionCard } from '../components/dashboard/QuickActionCard'
import { StatCard } from '../components/dashboard/StatCard'
import { StatusBreakdownCard } from '../components/dashboard/StatusBreakdownCard'
import { ArrowRightIcon, BriefcaseIcon, FileTextIcon, SparklesIcon, UserIcon, XIcon } from '../components/ui/icons'
import { useMe } from '../hooks/auth.hooks'
import type { ApiError } from '../types/api/error.types'

const dashboardStats = [
  { icon: BriefcaseIcon, label: 'Total applications', tileClassName: 'bg-app-primary-soft text-app-primary', value: 0 },
  { icon: FileTextIcon, label: 'Saved', tileClassName: 'bg-app-subtle text-app-text-3', value: 0 },
  { icon: ArrowRightIcon, label: 'Applied', tileClassName: 'bg-app-sky-soft text-app-sky', value: 0 },
  { icon: UserIcon, label: 'Interviewing', tileClassName: 'bg-app-amber-soft text-amber-700', value: 0 },
  { icon: SparklesIcon, label: 'Offers', tileClassName: 'bg-app-ai-soft text-app-ai-600', value: 0 },
  { icon: XIcon, label: 'Rejected', tileClassName: 'bg-app-rose-soft text-app-rose', value: 0 },
]

export function DashboardPage() {
  const meQuery = useMe()

  if (meQuery.isLoading) {
    return (
      <AppShell title="Dashboard">
        <DashboardSkeleton />
      </AppShell>
    )
  }

  if (meQuery.isError || !meQuery.data?.user) {
    const apiError = meQuery.error as unknown as ApiError

    return (
      <AppShell title="Dashboard">
        <DashboardHeader subtitle="Overview of your job search progress." />
        <DashboardError isUnauthenticated={apiError?.status === 401} onRefresh={() => void meQuery.refetch()} />
      </AppShell>
    )
  }

  const { user } = meQuery.data

  return (
    <AppShell title="Dashboard" user={user}>
      <DashboardHeader subtitle="Overview of your job search progress." />
      <div className="mb-7 grid grid-cols-2 gap-3.5 min-[700px]:grid-cols-3 min-[1100px]:grid-cols-6">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
      <div className="grid gap-5 min-[1100px]:grid-cols-[1.6fr_1fr]">
        <section aria-labelledby="recent-applications-title">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-app-text" id="recent-applications-title">Recent applications</h2>
            <p className="mt-0.5 text-[13px] text-app-text-3">No roles have been added yet.</p>
          </div>
          <EmptyState />
        </section>
        <aside className="flex flex-col gap-5">
          <StatusBreakdownCard />
          <QuickActionCard />
        </aside>
      </div>
    </AppShell>
  )
}
