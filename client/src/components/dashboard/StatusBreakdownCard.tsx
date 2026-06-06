import { Card } from '../ui/atoms/Card'

const breakdown = [
  { color: '#94A3B8', label: 'Saved', value: 0 },
  { color: '#0284C7', label: 'Applied', value: 0 },
  { color: '#F59E0B', label: 'Interviewing', value: 0 },
  { color: '#10B981', label: 'Offer', value: 0 },
  { color: '#E11D48', label: 'Rejected', value: 0 },
]

export function StatusBreakdownCard() {
  return (
    <Card className="p-[22px]">
      <h3 className="mb-1 text-base font-semibold text-app-text">Status breakdown</h3>
      <p className="mb-[18px] text-[13px] text-app-text-3">Where your 0 applications stand.</p>
      <div className="flex flex-col gap-3">
        {breakdown.map((item) => (
          <div key={item.label} aria-label={`${item.label}: ${item.value} of 0`}>
            <div className="mb-1 flex justify-between text-[12.5px] font-medium text-app-text-2">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2 rounded-[2px]" style={{ backgroundColor: item.color }} aria-hidden="true" />
                {item.label}
              </span>
              <span className="font-semibold text-app-text">{item.value}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-app-subtle">
              <div className="h-full rounded-full" style={{ width: '0%', backgroundColor: item.color }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
