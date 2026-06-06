import { CTASection } from '../components/ui/organisms/CTASection'
import { FeaturesSection } from '../components/ui/organisms/FeaturesSection'
import { HeroSection } from '../components/ui/organisms/HeroSection'
import { HowItWorksSection } from '../components/ui/organisms/HowItWorksSection'
import { LandingFooter } from '../components/ui/organisms/LandingFooter'

export function LandingPage() {
  return (
    <>
      <main id="top">
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <LandingFooter />
    </>
  )
}
