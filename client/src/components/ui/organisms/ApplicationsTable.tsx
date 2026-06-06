import { ChevronDownIcon, TrashIcon } from '../icons'
import { CompanyAvatar } from '../molecules/CompanyAvatar'
import { StatusBadge } from '../molecules/StatusBadge'
import { Card } from '../atoms/Card'
import type {
  Application,
  ApplicationStatus,
  ListApplicationsParams,
  ListApplicationsResponse,
} from '../../../types/application.types'

// ─── helpers ────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateStr))
}

function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

// ─── constants ───────────────────────────────────────────────────────────────

const STATUS_TABS: Array<{ label: string; value: ApplicationStatus | undefined }> = [
  { label: 'All', value: undefined },
  { label: 'Saved', value: 'SAVED' },
  { label: 'Applied', value: 'APPLIED' },
  { label: 'Interviewing', value: 'INTERVIEWING' },
  { label: 'Offer', value: 'OFFER' },
  { label: 'Rejected', value: 'REJECTED' },
]

// ─── sub-components ──────────────────────────────────────────────────────────

const TH_CLASS =
  'px-4 py-2.5 text-left text-[11.5px] font-semibold uppercase tracking-[0.06em] text-app-text-3'

function SkeletonRow() {
  const cell = 'px-4 py-3'
  return (
    <tr>
      <td className={cell}>
        <div className="flex items-center gap-3">
          <div className="size-9 animate-pulse rounded-lg bg-app-subtle" />
          <div className="flex flex-col gap-1.5">
            <div className="h-3 w-28 animate-pulse rounded bg-app-subtle" />
            <div className="h-2.5 w-16 animate-pulse rounded bg-app-subtle" />
          </div>
        </div>
      </td>
      <td className={cell}><div className="h-3 w-32 animate-pulse rounded bg-app-subtle" /></td>
      <td className={cell}><div className="h-5 w-20 animate-pulse rounded-full bg-app-subtle" /></td>
      <td className={cell}><div className="h-3 w-20 animate-pulse rounded bg-app-subtle" /></td>
      <td className={cell}><div className="ml-auto size-7 animate-pulse rounded-lg bg-app-subtle" /></td>
    </tr>
  )
}

type RowProps = {
  app: Application
  onDelete: (id: string) => void
  isDeleting: boolean
}

function ApplicationRow({ app, onDelete, isDeleting }: RowProps) {
  return (
    <tr className="border-b border-app-border last:border-b-0 transition-colors duration-100 hover:bg-app-subtle/40">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <CompanyAvatar company={app.company} size={36} />
          <div className="min-w-0">
            <p className="truncate text-[13.5px] font-semibold text-app-text">{app.company}</p>
            {app.location && (
              <p className="truncate text-[12px] text-app-text-3">{app.location}</p>
            )}
          </div>
        </div>
      </td>

      <td className="px-4 py-3">
        <p className="text-[13px] text-app-text">{app.role}</p>
        {app.jobUrl && (
          <a
            href={app.jobUrl}
            target="_blank"
            rel="noreferrer"
            className="block max-w-[180px] truncate text-[11.5px] text-app-text-3 hover:text-app-primary"
          >
            {getHostname(app.jobUrl)}
          </a>
        )}
      </td>

      <td className="px-4 py-3">
        <StatusBadge status={app.status} />
      </td>

      <td className="px-4 py-3 text-[13px] text-app-text-3">
        {app.status === 'SAVED' ? '—' : formatDate(app.createdAt)}
      </td>

      <td className="px-4 py-3 text-right">
        <button
          type="button"
          onClick={() => onDelete(app.id)}
          disabled={isDeleting}
          aria-label={`Delete ${app.company} – ${app.role}`}
          className="inline-flex size-7 items-center justify-center rounded-lg text-app-text-3 transition-colors hover:bg-app-rose-soft hover:text-app-rose disabled:pointer-events-none disabled:opacity-50"
        >
          <TrashIcon size={14} />
        </button>
      </td>
    </tr>
  )
}

// ─── main organism ────────────────────────────────────────────────────────────

type ApplicationsTableProps = {
  data: ListApplicationsResponse | undefined
  isLoading: boolean
  params: ListApplicationsParams
  onTabChange: (status: ApplicationStatus | undefined) => void
  onSortChange: (sort: 'newest' | 'oldest' | 'company') => void
  onPageChange: (page: number) => void
  onDelete: (id: string) => void
  isDeleting: boolean
}

export function ApplicationsTable({
  data,
  isLoading,
  params,
  onTabChange,
  onSortChange,
  onPageChange,
  onDelete,
  isDeleting,
}: ApplicationsTableProps) {
  const applications = data?.applications ?? []
  const pagination = data?.pagination
  const total = pagination?.total ?? 0
  const showingFrom = pagination ? (pagination.page - 1) * pagination.limit + 1 : 0
  const showingTo = pagination ? Math.min(pagination.page * pagination.limit, total) : 0

  return (
    <Card className="overflow-hidden">
      {/* ── Filter tabs + sort ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 border-b border-app-border px-4">
        <div className="flex overflow-x-auto">
          {STATUS_TABS.map((tab) => {
            const active = params.status === tab.value
            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => onTabChange(tab.value)}
                className={[
                  'shrink-0 border-b-2 px-3 py-2.5 text-[13px] font-medium transition-colors duration-100',
                  active
                    ? 'border-app-primary text-app-primary'
                    : 'border-transparent text-app-text-3 hover:text-app-text',
                ].join(' ')}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="relative flex-shrink-0">
          <select
            value={params.sort ?? 'newest'}
            onChange={(e) => onSortChange(e.target.value as 'newest' | 'oldest' | 'company')}
            className="h-8 appearance-none cursor-pointer rounded-lg border border-app-border bg-app-card pl-3 pr-8 text-[13px] font-medium text-app-text focus:outline-none focus:ring-2 focus:ring-app-primary/20"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="company">Company A-Z</option>
          </select>
          <ChevronDownIcon
            size={14}
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-app-text-3"
          />
        </div>
      </div>

      {/* ── Table ─────────────────────────────────────────────────────── */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-app-border bg-app-subtle/40">
              <th className={TH_CLASS}>Company</th>
              <th className={TH_CLASS}>Role</th>
              <th className={TH_CLASS}>Status</th>
              <th className={TH_CLASS}>Applied</th>
              <th className={`${TH_CLASS} w-14`} aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            ) : applications.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-16 text-center text-[13px] text-app-text-3"
                >
                  {params.status
                    ? `No ${params.status.charAt(0) + params.status.slice(1).toLowerCase()} applications yet.`
                    : 'No applications yet. Add your first one!'}
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <ApplicationRow
                  key={app.id}
                  app={app}
                  onDelete={onDelete}
                  isDeleting={isDeleting}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ────────────────────────────────────────────────── */}
      {pagination && total > 0 && (
        <div className="flex items-center justify-between border-t border-app-border px-4 py-3">
          <p className="text-[12.5px] text-app-text-3">
            Showing{' '}
            <span className="font-medium text-app-text">{showingFrom}–{showingTo}</span> of{' '}
            <span className="font-medium text-app-text">{total}</span>{' '}
            {total === 1 ? 'application' : 'applications'}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page <= 1 || isLoading}
              className="inline-flex h-8 items-center rounded-lg border border-app-border bg-app-card px-3 text-[12.5px] font-medium text-app-text transition-colors hover:bg-app-subtle disabled:pointer-events-none disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages || isLoading}
              className="inline-flex h-8 items-center rounded-lg border border-app-border bg-app-card px-3 text-[12.5px] font-medium text-app-text transition-colors hover:bg-app-subtle disabled:pointer-events-none disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </Card>
  )
}
