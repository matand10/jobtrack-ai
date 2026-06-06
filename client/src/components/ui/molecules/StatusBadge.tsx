import { Badge } from '../atoms/Badge'
import type { ApplicationStatus } from '@jobtrack/shared'

export type { ApplicationStatus }

const statusLabels: Record<ApplicationStatus, string> = {
  SAVED: 'Saved',
  APPLIED: 'Applied',
  INTERVIEWING: 'Interviewing',
  OFFER: 'Offer',
  REJECTED: 'Rejected',
}

const statusVariants: Record<ApplicationStatus, 'neutral' | 'success' | 'sky' | 'amber' | 'rose'> = {
  SAVED: 'neutral',
  APPLIED: 'sky',
  INTERVIEWING: 'amber',
  OFFER: 'success',
  REJECTED: 'rose',
}

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <Badge dot variant={statusVariants[status]}>
      {statusLabels[status]}
    </Badge>
  )
}
