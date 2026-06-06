import { useState } from 'react'
import { AppShell } from '../components/layout/AppShell'
import { Button } from '../components/ui/atoms/Button'
import { PlusIcon } from '../components/ui/icons'
import { ApplicationsTable } from '../components/ui/organisms/ApplicationsTable'
import { useApplications, useDeleteApplication } from '../hooks/application.hooks'
import { useMe } from '../hooks/auth.hooks'
import type { ApplicationStatus, ListApplicationsParams } from '../types/application.types'

export function ApplicationsPage() {
  const [params, setParams] = useState<ListApplicationsParams>({
    sort: 'newest',
    page: 1,
    limit: 20,
  })

  const meQuery = useMe()
  const query = useApplications(params)
  const deleteMutation = useDeleteApplication()

  const user = meQuery.data?.user

  function handleTabChange(status: ApplicationStatus | undefined) {
    setParams((prev) => ({ ...prev, status, page: 1 }))
  }

  function handleSortChange(sort: 'newest' | 'oldest' | 'company') {
    setParams((prev) => ({ ...prev, sort, page: 1 }))
  }

  function handlePageChange(page: number) {
    setParams((prev) => ({ ...prev, page }))
  }

  function handleDelete(id: string) {
    if (!window.confirm('Delete this application? This cannot be undone.')) return
    deleteMutation.mutate(id)
  }

  return (
    <AppShell title="Applications" user={user}>
      <div className="mb-[22px] flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[28px] font-bold tracking-[-0.02em] text-app-text">Applications</h1>
          <p className="mt-1 text-[13px] text-app-text-3">Track and manage your job applications.</p>
        </div>
        <Button className="w-full sm:w-auto" href="/applications/new">
          <PlusIcon size={15} /> Add Application
        </Button>
      </div>

      <ApplicationsTable
        data={query.data}
        isLoading={query.isLoading}
        params={params}
        onTabChange={handleTabChange}
        onSortChange={handleSortChange}
        onPageChange={handlePageChange}
        onDelete={handleDelete}
        isDeleting={deleteMutation.isPending}
      />
    </AppShell>
  )
}
