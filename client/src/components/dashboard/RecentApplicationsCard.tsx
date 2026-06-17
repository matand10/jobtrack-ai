import { Link } from 'react-router-dom'
import { Card } from '../ui/atoms/Card'
import { CompanyAvatar } from '../ui/molecules/CompanyAvatar'
import { StatusBadge } from '../ui/molecules/StatusBadge'
import { ArrowRightIcon, ClockIcon } from '../ui/icons'
import { formatRelativeTime } from '../../lib/relativeTime'
import type { Application } from '../../types/application.types'

type RecentApplicationsCardProps = {
  applications: Application[]
  isLoading: boolean
}

const MAX_ROWS = 5

export function RecentApplicationsCard({ applications, isLoading }: RecentApplicationsCardProps) {
  const rows = applications.slice(0, MAX_ROWS)

  return (
    <Card className="p-[22px]">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="mb-1 text-base font-semibold text-app-text">Recent applications</h3>
          <p className="text-[13px] text-app-text-3">Your 5 most recently added roles.</p>
        </div>
        <Link
          to="/applications"
          className="inline-flex shrink-0 items-center gap-1 text-[13px] font-medium text-app-primary hover:text-app-primary-600"
        >
          View all <ArrowRightIcon size={13} />
        </Link>
      </div>

      <div className="flex flex-col">
        {isLoading
          ? Array.from({ length: MAX_ROWS }).map((_, i) => <SkeletonRow key={i} />)
          : rows.map((app) => <RecentRow key={app.id} app={app} />)}
      </div>
    </Card>
  )
}

function RecentRow({ app }: { app: Application }) {
  const subParts = [app.company, app.location].filter(Boolean) as string[]
  const sub = subParts.join(' · ')

  return (
    <Link
      to="/applications"
      className="group -mx-2 flex items-center gap-3 rounded-[10px] border-b border-app-border px-2 py-3 transition-colors last:border-b-0 hover:bg-app-subtle/50"
    >
      <CompanyAvatar company={app.company} size={36} />

      <div className="min-w-0 flex-1">
        <p className="truncate text-[13.5px] font-semibold text-app-text">{app.role}</p>
        <p className="truncate text-[12px] text-app-text-3">{sub}</p>
      </div>

      <span className="shrink-0">
        <StatusBadge status={app.status} />
      </span>

      <span className="hidden shrink-0 items-center gap-1 text-[12px] text-app-text-3 min-[400px]:inline-flex">
        <ClockIcon size={12} /> {formatRelativeTime(app.updatedAt)}
      </span>

      <span
        aria-hidden="true"
        className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg text-app-text-3 transition-colors group-hover:bg-app-card group-hover:text-app-text"
      >
        <ArrowRightIcon size={14} />
      </span>
    </Link>
  )
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 border-b border-app-border px-2 py-3 last:border-b-0">
      <div className="size-9 animate-pulse rounded-lg bg-app-subtle" />
      <div className="min-w-0 flex-1">
        <div className="mb-1.5 h-3 w-40 animate-pulse rounded bg-app-subtle" />
        <div className="h-2.5 w-24 animate-pulse rounded bg-app-subtle" />
      </div>
      <div className="h-5 w-20 animate-pulse rounded-full bg-app-subtle" />
      <div className="h-3 w-14 animate-pulse rounded bg-app-subtle" />
      <div className="size-7 animate-pulse rounded-lg bg-app-subtle" />
    </div>
  )
}
