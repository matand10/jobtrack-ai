import { AppShell } from '../components/layout/AppShell'
import { Card } from '../components/ui/atoms/Card'

type PlaceholderPageProps = {
  title: string
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <AppShell title={title}>
      <Card className="p-8 text-center">
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-app-text">{title}</h1>
        <p className="mt-2 text-sm text-app-text-3">This page is ready for the next implementation step.</p>
      </Card>
    </AppShell>
  )
}
