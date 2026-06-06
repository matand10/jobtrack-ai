import type { ApplicationStatus } from '@jobtrack/shared'

type StatusSelectorProps = {
  value: ApplicationStatus
  onChange: (value: ApplicationStatus) => void
}

const statuses: { value: ApplicationStatus; label: string }[] = [
  { value: 'SAVED', label: 'Saved' },
  { value: 'APPLIED', label: 'Applied' },
  { value: 'INTERVIEWING', label: 'Interviewing' },
  { value: 'OFFER', label: 'Offer' },
  { value: 'REJECTED', label: 'Rejected' },
]

const activeClasses: Record<ApplicationStatus, string> = {
  SAVED: 'border-app-border-strong bg-app-subtle text-slate-700 shadow-sm',
  APPLIED: 'border-app-sky/40 bg-app-sky-soft text-app-sky shadow-sm',
  INTERVIEWING: 'border-amber-300/60 bg-app-amber-soft text-amber-700 shadow-sm',
  OFFER: 'border-app-ai/40 bg-app-ai-soft text-app-ai-600 shadow-sm',
  REJECTED: 'border-app-rose/40 bg-app-rose-soft text-app-rose shadow-sm',
}

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ')
}

export function StatusSelector({ value, onChange }: StatusSelectorProps) {
  return (
    <div role="group" aria-label="Application status" className="flex flex-wrap gap-2">
      {statuses.map((s) => {
        const isActive = s.value === value
        return (
          <button
            key={s.value}
            type="button"
            onClick={() => onChange(s.value)}
            aria-pressed={isActive}
            className={cx(
              'h-8 rounded-full border px-3.5 text-[13px] font-medium transition duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-app-primary/15',
              isActive
                ? activeClasses[s.value]
                : 'border-app-border bg-app-card text-app-text-3 hover:border-app-border-strong hover:bg-app-subtle hover:text-app-text',
            )}
          >
            {s.label}
          </button>
        )
      })}
    </div>
  )
}
