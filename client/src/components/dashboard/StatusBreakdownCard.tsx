import { Card } from '../ui/atoms/Card'
import type { ApplicationStats } from '../../types/application.types'

type StatusBreakdownCardProps = {
  stats: ApplicationStats
}

const BREAKDOWN_CONFIG = [
  { color: '#94A3B8', label: 'Saved', key: 'saved' as const },
  { color: '#0284C7', label: 'Applied', key: 'applied' as const },
  { color: '#F59E0B', label: 'Interviewing', key: 'interviewing' as const },
  { color: '#10B981', label: 'Offer', key: 'offers' as const },
  { color: '#E11D48', label: 'Rejected', key: 'rejected' as const },
]

export function StatusBreakdownCard({ stats }: StatusBreakdownCardProps) {
  const total = stats.total

  return (
    <Card className="p-[22px]">
      <h3 className="mb-1 text-base font-semibold text-app-text">Status breakdown</h3>
      <p className="mb-[18px] text-[13px] text-app-text-3">
        Where your {total} {total === 1 ? 'application' : 'applications'} stand.
      </p>
      <div className="flex flex-col gap-3">
        {BREAKDOWN_CONFIG.map(({ color, label, key }) => {
          const value = stats[key]
          const pct = total > 0 ? (value / total) * 100 : 0

          return (
            <div key={label} aria-label={`${label}: ${value} of ${total}`}>
              <div className="mb-1 flex justify-between text-[12.5px] font-medium text-app-text-2">
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2 rounded-[2px]" style={{ backgroundColor: color }} aria-hidden="true" />
                  {label}
                </span>
                <span className="font-semibold text-app-text">{value}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-app-subtle">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
