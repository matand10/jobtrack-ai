import { ChevronDownIcon, ClockIcon, PencilIcon, SearchIcon, TrashIcon } from '../icons'
import { CompanyAvatar } from '../molecules/CompanyAvatar'
import { Pagination } from '../molecules/Pagination'
import { StatusBadge } from '../molecules/StatusBadge'
import { Button } from '../atoms/Button'
import { Card } from '../atoms/Card'
import { Input } from '../atoms/Input'
import { formatRelativeTime } from '../../../lib/relativeTime'
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

// ─── constants ───────────────────────────────────────────────────────────────

const STATUS_TABS: Array<{ label: string; value: ApplicationStatus | undefined }> = [
  { label: 'All', value: undefined },
  { label: 'Saved', value: 'SAVED' },
  { label: 'Applied', value: 'APPLIED' },
  { label: 'Interviewing', value: 'INTERVIEWING' },
  { label: 'Offer', value: 'OFFER' },
  { label: 'Rejected', value: 'REJECTED' },
]

const TH_CLASS =
  'px-4 py-2.5 text-left text-[11.5px] font-semibold uppercase tracking-[0.06em] text-app-text-3'

const ACTION_BTN =
  'inline-flex size-7 items-center justify-center rounded-lg text-app-text-3 transition-colors hover:bg-app-subtle hover:text-app-text disabled:pointer-events-none disabled:opacity-50'

const ACTION_BTN_DANGER =
  'inline-flex size-7 items-center justify-center rounded-lg text-app-text-3 transition-colors hover:bg-app-rose-soft hover:text-app-rose disabled:pointer-events-none disabled:opacity-50'

// ─── sub-components ──────────────────────────────────────────────────────────

function SkeletonRow() {
  const cell = 'px-4 py-3'
  return (
    <tr className="border-b border-app-border last:border-b-0">
      <td className={cell}>
        <div className="size-9 animate-pulse rounded-lg bg-app-subtle" />
      </td>
      <td className={cell}>
        <div className="flex flex-col gap-1.5">
          <div className="h-3 w-32 animate-pulse rounded bg-app-subtle" />
          <div className="h-2.5 w-20 animate-pulse rounded bg-app-subtle" />
        </div>
      </td>
      <td className={cell}>
        <div className="h-5 w-20 animate-pulse rounded-full bg-app-subtle" />
      </td>
      <td className={cell}>
        <div className="h-3 w-24 animate-pulse rounded bg-app-subtle" />
      </td>
      <td className={cell}>
        <div className="h-3 w-20 animate-pulse rounded bg-app-subtle" />
      </td>
      <td className={cell}>
        <div className="h-3 w-20 animate-pulse rounded bg-app-subtle" />
      </td>
      <td className={cell}>
        <div className="ml-auto flex w-fit gap-1.5">
          <div className="size-7 animate-pulse rounded-lg bg-app-subtle" />
          <div className="size-7 animate-pulse rounded-lg bg-app-subtle" />
        </div>
      </td>
    </tr>
  )
}

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3 border-b border-app-border px-4 py-4 last:border-b-0">
      <div className="flex items-start gap-3">
        <div className="size-[38px] shrink-0 animate-pulse rounded-lg bg-app-subtle" />
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 h-3.5 w-36 animate-pulse rounded bg-app-subtle" />
          <div className="h-3 w-24 animate-pulse rounded bg-app-subtle" />
        </div>
        <div className="h-5 w-20 animate-pulse rounded-full bg-app-subtle" />
      </div>
      <div className="flex items-center justify-between">
        <div className="h-3 w-32 animate-pulse rounded bg-app-subtle" />
        <div className="flex gap-1">
          <div className="size-7 animate-pulse rounded-lg bg-app-subtle" />
          <div className="size-7 animate-pulse rounded-lg bg-app-subtle" />
        </div>
      </div>
    </div>
  )
}

function ApplicationCard({ app, onEdit, onDelete, isDeleting }: RowProps) {
  const locationPart = app.location ? ` · ${app.location}` : ''
  return (
    <div className="flex flex-col gap-3 border-b border-app-border px-4 py-4 last:border-b-0">
      <div className="flex items-start gap-3">
        <CompanyAvatar company={app.company} size={38} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-semibold text-app-text">{app.role}</p>
          <p className="truncate text-[12.5px] text-app-text-3">
            {app.company}{locationPart}
          </p>
        </div>
        <span className="shrink-0">
          <StatusBadge status={app.status} />
        </span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-3 text-[12px] text-app-text-3">
          {app.status !== 'SAVED' && (
            <span className="shrink-0">Applied {formatDate(app.createdAt)}</span>
          )}
          <span className="inline-flex shrink-0 items-center gap-1">
            <ClockIcon size={12} />
            {formatRelativeTime(app.updatedAt)}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(app.id)}
            aria-label={`Edit ${app.company} – ${app.role}`}
            className={ACTION_BTN}
          >
            <PencilIcon size={14} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(app.id)}
            disabled={isDeleting}
            aria-label={`Delete ${app.company} – ${app.role}`}
            className={ACTION_BTN_DANGER}
          >
            <TrashIcon size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

type RowProps = {
  app: Application
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  isDeleting: boolean
}

function ApplicationRow({ app, onEdit, onDelete, isDeleting }: RowProps) {
  return (
    <tr className="border-b border-app-border last:border-b-0 transition-colors duration-100 hover:bg-app-subtle/40">
      <td className="px-4 py-3">
        <CompanyAvatar company={app.company} size={36} />
      </td>

      <td className="px-4 py-3">
        <p className="truncate text-[13.5px] font-semibold text-app-text">{app.role}</p>
        <p className="truncate text-[12px] text-app-text-3">{app.company}</p>
      </td>

      <td className="px-4 py-3">
        <StatusBadge status={app.status} />
      </td>

      <td className="px-4 py-3 text-[13px] text-app-text-2">
        {app.location || <span className="text-app-text-4">—</span>}
      </td>

      <td className="px-4 py-3 text-[13px] text-app-text-3">
        {app.status === 'SAVED' ? '—' : formatDate(app.createdAt)}
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5 text-[13px] text-app-text-3">
          <ClockIcon size={13} />
          <span>{formatRelativeTime(app.updatedAt)}</span>
        </div>
      </td>

      <td className="px-4 py-3 text-right">
        <div className="ml-auto flex w-fit items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(app.id)}
            aria-label={`Edit ${app.company} – ${app.role}`}
            className={ACTION_BTN}
          >
            <PencilIcon size={14} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(app.id)}
            disabled={isDeleting}
            aria-label={`Delete ${app.company} – ${app.role}`}
            className={ACTION_BTN_DANGER}
          >
            <TrashIcon size={14} />
          </button>
        </div>
      </td>
    </tr>
  )
}

// ─── main organism ────────────────────────────────────────────────────────────

type ApplicationsTableProps = {
  data: ListApplicationsResponse | undefined
  isLoading: boolean
  params: ListApplicationsParams
  searchInput: string
  onSearchInput: (value: string) => void
  onTabChange: (status: ApplicationStatus | undefined) => void
  onSortChange: (sort: 'newest' | 'oldest' | 'company') => void
  onPageChange: (page: number) => void
  onClearFilters: () => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  isDeleting: boolean
}

export function ApplicationsTable({
  data,
  isLoading,
  params,
  searchInput,
  onSearchInput,
  onTabChange,
  onSortChange,
  onPageChange,
  onClearFilters,
  onEdit,
  onDelete,
  isDeleting,
}: ApplicationsTableProps) {
  const applications = data?.applications ?? []
  const pagination = data?.pagination
  const total = pagination?.total ?? 0
  const showingFrom = pagination && total > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0
  const showingTo = pagination ? Math.min(pagination.page * pagination.limit, total) : 0
  const hasFilters = Boolean(params.status) || Boolean(params.search)

  return (
    <Card className="overflow-hidden">
      {/* ── Toolbar: tabs + search + sort ───────────────────────────────── */}
      <div className="flex flex-col gap-3 border-b border-app-border px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 overflow-x-auto">
          {STATUS_TABS.map((tab) => {
            const active = params.status === tab.value
            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => onTabChange(tab.value)}
                className={[
                  'shrink-0 rounded-[8px] px-3 py-1.5 text-[12.5px] font-medium transition-colors duration-100',
                  active
                    ? 'bg-app-primary-soft text-app-primary'
                    : 'text-app-text-3 hover:bg-app-subtle hover:text-app-text',
                ].join(' ')}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="w-full sm:w-[260px]">
            <Input
              type="search"
              value={searchInput}
              onChange={(e) => onSearchInput(e.target.value)}
              placeholder="Search role, company…"
              className="h-9 text-[13px]"
              leftIcon={<SearchIcon size={15} />}
            />
          </div>
          <div className="relative">
            <select
              value={params.sort ?? 'newest'}
              onChange={(e) => onSortChange(e.target.value as 'newest' | 'oldest' | 'company')}
              className="h-9 cursor-pointer appearance-none rounded-[10px] border border-app-border bg-app-card pl-3 pr-8 text-[13px] font-medium text-app-text focus:outline-none focus:ring-2 focus:ring-app-primary/20"
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
      </div>

      {/* ── Mobile card list (< sm) ───────────────────────────────────── */}
      <div className="sm:hidden">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
        ) : applications.length === 0 ? (
          <div className="px-4 py-16">
            {hasFilters ? (
              <FilteredEmpty onClearFilters={onClearFilters} />
            ) : (
              <UnfilteredEmpty />
            )}
          </div>
        ) : (
          applications.map((app) => (
            <ApplicationCard
              key={app.id}
              app={app}
              onEdit={onEdit}
              onDelete={onDelete}
              isDeleting={isDeleting}
            />
          ))
        )}
      </div>

      {/* ── Desktop table (≥ sm) ──────────────────────────────────────── */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-app-border bg-app-subtle/40">
              <th className={`${TH_CLASS} w-14`} aria-label="" />
              <th className={TH_CLASS}>Role · Company</th>
              <th className={TH_CLASS}>Status</th>
              <th className={TH_CLASS}>Location</th>
              <th className={TH_CLASS}>Applied</th>
              <th className={TH_CLASS}>Last update</th>
              <th className={`${TH_CLASS} w-20`} aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            ) : applications.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-16">
                  {hasFilters ? (
                    <FilteredEmpty onClearFilters={onClearFilters} />
                  ) : (
                    <UnfilteredEmpty />
                  )}
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <ApplicationRow
                  key={app.id}
                  app={app}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isDeleting={isDeleting}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ────────────────────────────────────────────────── */}
      {isLoading ? (
        <div className="flex items-center justify-between border-t border-app-border px-4 py-3">
          <div className="h-3 w-40 animate-pulse rounded bg-app-subtle" />
          <div className="flex items-center gap-1">
            <div className="h-8 w-8 animate-pulse rounded-[8px] bg-app-subtle" />
            <div className="h-8 w-8 animate-pulse rounded-[8px] bg-app-subtle" />
            <div className="h-8 w-8 animate-pulse rounded-[8px] bg-app-subtle" />
            <div className="h-8 w-8 animate-pulse rounded-[8px] bg-app-subtle" />
          </div>
        </div>
      ) : pagination && total > 0 ? (
        <div className="flex flex-col gap-3 border-t border-app-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] text-app-text-3">
            Showing{' '}
            <span className="font-medium text-app-text">
              {showingFrom}–{showingTo}
            </span>{' '}
            of <span className="font-medium text-app-text">{total}</span>
          </p>
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            onChange={onPageChange}
          />
        </div>
      ) : null}
    </Card>
  )
}

// ─── empty-state sub-components ──────────────────────────────────────────────

function UnfilteredEmpty() {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-app-subtle text-app-text-3">
        <SearchIcon size={22} />
      </div>
      <p className="text-[15px] font-semibold text-app-text">No applications yet</p>
      <p className="text-[13px] text-app-text-3">Add your first one to start tracking.</p>
    </div>
  )
}

function FilteredEmpty({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-app-subtle text-app-text-3">
        <SearchIcon size={22} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[15px] font-semibold text-app-text">
          No applications match your filters
        </p>
        <p className="text-[13px] text-app-text-3">
          Try removing some filters or search a different role.
        </p>
      </div>
      <Button variant="ghost" size="sm" onClick={onClearFilters}>
        Clear filters
      </Button>
    </div>
  )
}
