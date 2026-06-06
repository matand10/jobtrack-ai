import { Card } from '../ui/atoms/Card'
import { SparklesIcon } from '../ui/icons'
import { Button } from '../ui/atoms/Button'

export function AiTailorPromoCard() {
  return (
    <Card className="p-5">
      <div className="mb-3 inline-flex size-9 items-center justify-center rounded-[10px] bg-app-primary-soft text-app-primary" aria-hidden="true">
        <SparklesIcon size={18} />
      </div>
      <h3 className="mb-1 text-[14px] font-semibold text-app-text">AI Tailor, ready when you are</h3>
      <p className="mb-4 text-[13px] leading-relaxed text-app-text-3">
        As soon as you paste a job description, we can generate bullet rewrites, keywords, and a
        cover-letter draft for this role.
      </p>
      <Button size="sm" className="w-full" disabled>
        Generate suggestions after saving
      </Button>
    </Card>
  )
}
