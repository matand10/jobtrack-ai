import { AppShell } from '../components/layout/AppShell'
import { DashboardError } from '../components/dashboard/DashboardError'
import { DashboardHeader } from '../components/dashboard/DashboardHeader'
import { DashboardSkeleton } from '../components/dashboard/DashboardSkeleton'
import { EmptyState } from '../components/dashboard/EmptyState'
import { QuickActionCard } from '../components/dashboard/QuickActionCard'
import { StatCard } from '../components/dashboard/StatCard'
import { StatusBreakdownCard } from '../components/dashboard/StatusBreakdownCard'
import { BriefcaseIcon, ChartIcon, CheckIcon, FileTextIcon } from '../components/ui/icons'
import { useApplicationStats } from '../hooks/application.hooks'
import { useMe } from '../hooks/auth.hooks'
import type { ApiError } from '../types/api/error.types'

export function DashboardPage() {
  const meQuery = useMe()
  const statsQuery = useApplicationStats()

  const isLoading = meQuery.isLoading || statsQuery.isLoading
  const isError = meQuery.isError || (!meQuery.isLoading && !meQuery.data?.user)

  if (isLoading) {
    return (
      <AppShell title="Dashboard">
        <DashboardSkeleton />
      </AppShell>
    )
  }

  if (isError) {
    const apiError = meQuery.error as unknown as ApiError
    return (
      <AppShell title="Dashboard">
        <DashboardHeader subtitle="Overview of your job search progress." />
        <DashboardError
          isUnauthenticated={apiError?.status === 401}
          onRefresh={() => {
            void meQuery.refetch()
            void statsQuery.refetch()
          }}
        />
      </AppShell>
    )
  }

  const { user } = meQuery.data!
  const stats = statsQuery.data ?? {
    total: 0,
    saved: 0,
    applied: 0,
    interviewing: 0,
    offers: 0,
    rejected: 0,
  }

  return (
    <AppShell title="Dashboard" user={user}>
      <DashboardHeader subtitle="Overview of your job search progress." />

      {stats.total === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
            <StatCard
              icon={BriefcaseIcon}
              label="Total"
              value={stats.total}
              tileClassName="bg-app-primary-soft text-app-primary"
            />
            <StatCard
              icon={FileTextIcon}
              label="Applied"
              value={stats.applied}
              tileClassName="bg-app-sky-soft text-app-sky"
            />
            <StatCard
              icon={ChartIcon}
              label="Interviewing"
              value={stats.interviewing}
              tileClassName="bg-app-amber-soft text-amber-600"
            />
            <StatCard
              icon={CheckIcon}
              label="Offers"
              value={stats.offers}
              tileClassName="bg-app-ai-soft text-app-ai-600"
            />
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
            <StatusBreakdownCard stats={stats} />
            <QuickActionCard />
          </div>
        </>
      )}
    </AppShell>
  )
}
