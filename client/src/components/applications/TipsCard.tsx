import { Card } from '../ui/atoms/Card'

const tips = [
  'Add roles even before you apply — set status to Saved.',
  'Paste the full JD: AI suggestions get much sharper.',
  'Keep notes for each recruiter touchpoint.',
]

export function TipsCard() {
  return (
    <Card className="p-5">
      <h3 className="mb-3 text-[14px] font-semibold text-app-text">Tips for great tracking</h3>
      <ul className="flex flex-col gap-2.5">
        {tips.map((tip) => (
          <li key={tip} className="flex items-start gap-2.5 text-[13px] text-app-text-3">
            <span className="mt-[5px] size-1.5 shrink-0 rounded-full bg-app-primary" aria-hidden="true" />
            {tip}
          </li>
        ))}
      </ul>
    </Card>
  )
}
