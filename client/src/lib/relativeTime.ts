/**
 * Format an ISO timestamp into a short relative-time label.
 *
 * Examples:
 *   - just now            (< 1 minute)
 *   - 5m ago              (< 1 hour)
 *   - 2h ago              (same day, ≥ 1 hour)
 *   - Today               (same calendar day, but > 12h ago is rare)
 *   - Yesterday           (1 calendar day ago)
 *   - 3d ago              (2–6 days ago)
 *   - MMM d               (7+ days ago, same year)
 *   - MMM d, yyyy         (different year)
 */
export function formatRelativeTime(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''

  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diffMs / 60_000)
  const diffHours = Math.floor(diffMs / 3_600_000)

  if (diffMinutes < 1) return 'just now'
  if (diffMinutes < 60) return `${diffMinutes}m ago`

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const diffDays = Math.floor((startOfToday.getTime() - startOfDate.getTime()) / 86_400_000)

  if (diffDays <= 0) {
    return diffHours < 6 ? `${diffHours}h ago` : 'Today'
  }
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`

  const sameYear = date.getFullYear() === now.getFullYear()
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    ...(sameYear ? {} : { year: 'numeric' }),
  }).format(date)
}

/** Returns true if `iso` is within the last `days` days. */
export function isWithinDays(iso: string, days: number): boolean {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return false
  return Date.now() - date.getTime() <= days * 86_400_000
}
