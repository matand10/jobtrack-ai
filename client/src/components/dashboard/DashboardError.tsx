import { Button } from '../ui/atoms/Button'
import { Card } from '../ui/atoms/Card'

type DashboardErrorProps = {
  isUnauthenticated?: boolean
  onRefresh: () => void
}

export function DashboardError({ isUnauthenticated = false, onRefresh }: DashboardErrorProps) {
  return (
    <Card className="px-6 py-12 text-center sm:px-8">
      <h2 className="mb-2 text-xl font-bold tracking-[-0.015em] text-app-text">
        {isUnauthenticated ? 'Please sign in to view your dashboard' : "Couldn't load your dashboard"}
      </h2>
      <p className="mx-auto mb-6 max-w-md text-sm text-app-text-3">
        {isUnauthenticated
          ? 'Your session may have expired. Sign in again to continue tracking your job search.'
          : 'Refresh to try again. If this keeps happening, contact support.'}
      </p>
      {isUnauthenticated ? (
        <Button href="/login">Sign In</Button>
      ) : (
        <Button onClick={onRefresh} variant="ghost">Refresh</Button>
      )}
    </Card>
  )
}
