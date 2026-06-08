import { useMemo } from 'react'
import { AppShell } from '../components/layout/AppShell'
import { DashboardError } from '../components/dashboard/DashboardError'
import { DashboardHeader } from '../components/dashboard/DashboardHeader'
import { DashboardSkeleton } from '../components/dashboard/DashboardSkeleton'
import { EmptyState } from '../components/dashboard/EmptyState'
import { QuickActionCard } from '../components/dashboard/QuickActionCard'
import { RecentApplicationsCard } from '../components/dashboard/RecentApplicationsCard'
import { StatCard } from '../components/dashboard/StatCard'
import { StatusBreakdownCard } from '../components/dashboard/StatusBreakdownCard'
import {
  ArrowRightIcon,
  BriefcaseIcon,
  FileTextIcon,
  SparklesIcon,
  UserIcon,
  XIcon,
} from '../components/ui/icons'
import { useApplications, useApplicationStats } from '../hooks/application.hooks'
import { useMe } from '../hooks/auth.hooks'
import { isWithinDays } from '../lib/relativeTime'
import type { ApiError } from '../types/api/error.types'

const RECENT_FETCH_LIMIT = 50

export function DashboardPage() {
  const meQuery = useMe()
  const statsQuery = useApplicationStats()
  const recentQuery = useApplications({ limit: RECENT_FETCH_LIMIT, page: 1, sort: 'newest' })

  const isLoading = meQuery.isLoading || statsQuery.isLoading
  const isError = meQuery.isError || (!meQuery.isLoading && !meQuery.data?.user)

  const applications = recentQuery.data?.applications ?? []

  const { interviewingThisWeek, hasNewOffer } = useMemo(() => {
    let interviewing = 0
    let newOffer = false
    for (const app of applications) {
      if (app.status === 'INTERVIEWING' && isWithinDays(app.createdAt, 7)) interviewing += 1
      if (app.status === 'OFFER' && isWithinDays(app.createdAt, 7)) newOffer = true
    }
    return { interviewingThisWeek: interviewing, hasNewOffer: newOffer }
  }, [applications])

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
            void recentQuery.refetch()
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
          <div className="mb-5 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
            <StatCard
              icon={BriefcaseIcon}
              label="Total"
              value={stats.total}
              tileClassName="bg-app-primary-soft text-app-primary"
            />
            <StatCard
              icon={FileTextIcon}
              label="Saved"
              value={stats.saved}
              tileClassName="bg-app-subtle text-app-text-3"
            />
            <StatCard
              icon={ArrowRightIcon}
              label="Applied"
              value={stats.applied}
              tileClassName="bg-app-sky-soft text-app-sky"
            />
            <StatCard
              icon={UserIcon}
              label="Interviewing"
              value={stats.interviewing}
              sub={interviewingThisWeek > 0 ? `+${interviewingThisWeek} this week` : undefined}
              tileClassName="bg-app-amber-soft text-amber-600"
            />
            <StatCard
              icon={SparklesIcon}
              label="Offers"
              value={stats.offers}
              sub={hasNewOffer ? 'New!' : undefined}
              subClassName="text-app-primary"
              tileClassName="bg-app-ai-soft text-app-ai-600"
            />
            <StatCard
              icon={XIcon}
              label="Rejected"
              value={stats.rejected}
              tileClassName="bg-app-rose-soft text-app-rose"
            />
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
            <RecentApplicationsCard
              applications={applications}
              isLoading={recentQuery.isLoading}
            />
            <div className="flex flex-col gap-5">
              <StatusBreakdownCard stats={stats} />
              <QuickActionCard />
            </div>
          </div>
        </>
      )}
    </AppShell>
  )
}
