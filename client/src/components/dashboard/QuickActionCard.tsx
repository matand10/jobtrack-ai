import { Button } from '../ui/atoms/Button'
import { Card } from '../ui/atoms/Card'
import { ArrowRightIcon, PlusIcon, SparklesIcon } from '../ui/icons'

export function QuickActionCard() {
  return (
    <Card className="bg-[linear-gradient(160deg,#FAFBFF_0%,#FFFFFF_100%)] p-[22px]">
      <h3 className="mb-1 text-base font-semibold text-app-text">Quick actions</h3>
      <p className="mb-4 text-[13px] text-app-text-3">Jump back in.</p>
      <div className="flex flex-col gap-2.5">
        <Button className="w-full justify-between" href="/applications/new">
          <span className="inline-flex items-center gap-2">
            <PlusIcon size={15} /> Add Application
          </span>
          <ArrowRightIcon size={14} />
        </Button>
        <Button className="w-full justify-between border-app-ai-soft-2 text-app-ai-600 hover:bg-app-ai-soft" href="/tailor" variant="ghost">
          <span className="inline-flex items-center gap-2">
            <SparklesIcon size={15} /> Tailor Resume
          </span>
          <ArrowRightIcon size={14} />
        </Button>
      </div>
      <div className="mt-4 flex items-center gap-1.5 rounded-[10px] bg-app-ai-soft px-3 py-2.5 text-xs font-medium text-app-ai-600">
        <SparklesIcon size={12} /> 25 of 25 AI runs left this month
      </div>
    </Card>
  )
}
