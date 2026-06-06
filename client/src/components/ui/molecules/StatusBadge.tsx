import { Badge } from '../atoms/Badge'

type ApplicationStatus = 'Saved' | 'Applied' | 'Interviewing' | 'Offer' | 'Rejected'

const statusVariants: Record<ApplicationStatus, 'neutral' | 'success' | 'sky' | 'amber' | 'rose'> = {
  Applied: 'sky',
  Interviewing: 'amber',
  Offer: 'success',
  Rejected: 'rose',
  Saved: 'neutral',
}

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <Badge dot variant={statusVariants[status]}>
      {status}
    </Badge>
  )
}
