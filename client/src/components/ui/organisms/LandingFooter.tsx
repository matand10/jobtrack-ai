import { Container } from '../atoms/Container'
import { Logo } from '../molecules/Logo'

export function LandingFooter() {
  return (
    <footer className="bg-white py-7">
      <Container className="flex flex-col gap-4 text-[13px] text-app-text-3 sm:flex-row sm:items-center sm:justify-between">
        <Logo size={22} />
        <p>© 2026 JobTrack AI · Privacy · Terms</p>
      </Container>
    </footer>
  )
}
