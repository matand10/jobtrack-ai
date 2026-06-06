import { Button } from '../ui/atoms/Button'
import { Card } from '../ui/atoms/Card'
import { BriefcaseIcon, PlusIcon } from '../ui/icons'

export function EmptyState() {
  return (
    <Card className="flex flex-col items-center gap-5 px-6 py-16 text-center sm:px-8 sm:py-20">
      <div className="inline-flex size-20 items-center justify-center rounded-[20px] bg-app-primary-soft text-app-primary" aria-hidden="true">
        <BriefcaseIcon size={36} />
      </div>
      <div>
        <h2 className="mb-2 text-[22px] font-bold tracking-[-0.015em] text-app-text">No applications yet</h2>
        <p className="mx-auto max-w-[420px] text-[13px] text-app-text-3">
          Add your first role to start tracking status, interviews, and AI tailoring suggestions in one place.
        </p>
      </div>
      <Button href="/applications/new" size="lg">
        <PlusIcon size={16} /> Add your first Application
      </Button>
    </Card>
  )
}
