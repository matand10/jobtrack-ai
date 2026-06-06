import { Button } from '../atoms/Button'
import { Container } from '../atoms/Container'
import { Section } from '../atoms/Section'
import { ArrowRightIcon } from '../icons'

export function CTASection() {
  return (
    <Section className="border-b-0" id="pricing" tone="gradient">
      <Container className="max-w-[880px] text-center text-white">
        <h2 className="text-3xl font-bold tracking-[-0.025em] sm:text-[38px]">Organize your job search today.</h2>
        <p className="mt-3.5 mb-7 text-base text-white/85 sm:text-[17px]">Free to start. No credit card required.</p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button className="w-full sm:w-auto" href="/register" size="lg" variant="white">
            Get Started <ArrowRightIcon size={16} />
          </Button>
          <Button className="w-full sm:w-auto" href="/login" size="lg" variant="glass">
            View Demo
          </Button>
        </div>
      </Container>
    </Section>
  )
}
