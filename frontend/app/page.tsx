import { Navigation } from '@/components/landing/navigation'
import { HeroSection } from '@/components/landing/hero-section'
import { AboutSection } from '@/components/landing/about-section'
import { SkillsSection } from '@/components/landing/skills-section'
import { ProjectsSection } from '@/components/landing/projects-section'
import { ContactSection } from '@/components/landing/contact-section'
import { Footer } from '@/components/landing/footer'

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
