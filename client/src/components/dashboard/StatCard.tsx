import type { ComponentType } from 'react'
import { Card } from '../ui/atoms/Card'

type IconProps = { size?: number }

type StatCardProps = {
  icon: ComponentType<IconProps>
  label: string
  sub?: string
  subClassName?: string
  tileClassName: string
  value: number
}

export function StatCard({
  icon: Icon,
  label,
  sub,
  subClassName = 'text-app-ai-600',
  tileClassName,
  value,
}: StatCardProps) {
  return (
    <Card className="flex flex-col gap-3 p-4" aria-label={`${label}: ${value}${sub ? ` ${sub}` : ''}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[12.5px] font-medium text-app-text-3">{label}</p>
        <span className={`inline-flex size-7 items-center justify-center rounded-lg ${tileClassName}`} aria-hidden="true">
          <Icon size={14} />
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-[26px] leading-none font-bold tracking-[-0.02em] text-app-text">{value}</p>
        {sub ? <p className={`text-xs font-medium ${subClassName}`}>{sub}</p> : null}
      </div>
    </Card>
  )
}
