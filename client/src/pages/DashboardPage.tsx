import { AppShell } from '../components/layout/AppShell'
import { DashboardError } from '../components/dashboard/DashboardError'
import { DashboardHeader } from '../components/dashboard/DashboardHeader'
import { DashboardSkeleton } from '../components/dashboard/DashboardSkeleton'
import { EmptyState } from '../components/dashboard/EmptyState'
import { useMe } from '../hooks/auth.hooks'
import type { ApiError } from '../types/api/error.types'

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
      <EmptyState />
    </AppShell>
  )
}
