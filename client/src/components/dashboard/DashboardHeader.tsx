import { Button } from '../ui/atoms/Button'
import { PlusIcon, SparklesIcon } from '../ui/icons'

type DashboardHeaderProps = {
  subtitle: string
}

export function DashboardHeader({ subtitle }: DashboardHeaderProps) {
  return (
    <div className="mb-[22px] flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-[28px] font-bold tracking-[-0.02em] text-app-text">Dashboard</h1>
        <p className="mt-1 text-[13px] text-app-text-3">{subtitle}</p>
      </div>
      <div className="flex flex-col gap-2.5 min-[420px]:flex-row">
        <Button className="w-full min-[420px]:w-auto" href="/tailor" variant="ghost">
          <SparklesIcon size={15} /> Tailor Resume
        </Button>
        <Button className="w-full min-[420px]:w-auto" href="/applications/new">
          <PlusIcon size={15} /> Add Application
        </Button>
      </div>
    </div>
  )
}
