"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { CertificationsSection } from "@/components/sections/certifications-section"
import { GithubSection } from "@/components/sections/github-section"
import { ContactSection } from "@/components/sections/contact-section"
import { ScrollReveal } from "@/components/scroll-reveal"
import { motion, useScroll, useSpring } from "framer-motion"

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className="flex">
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

      <main className="flex-1 ml-0 md:ml-64 transition-all duration-300 min-w-0">
        {/* Scroll progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-neural via-neural-purple to-neural-green transform origin-left z-[60]"
          style={{ scaleX }}
        />

        <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
          <div className="relative z-10">
            <Navigation onMenuClick={() => setSidebarOpen(true)} />

            <HeroSection />

            <ScrollReveal>
              <AboutSection />
            </ScrollReveal>

            <ScrollReveal>
              <SkillsSection />
            </ScrollReveal>

            <ScrollReveal>
              <ExperienceSection />
            </ScrollReveal>

            <ScrollReveal>
              <ProjectsSection />
            </ScrollReveal>

            <ScrollReveal>
              <CertificationsSection />
            </ScrollReveal>

            <ScrollReveal>
              <GithubSection />
            </ScrollReveal>

            <ScrollReveal>
              <ContactSection />
            </ScrollReveal>

            <Footer />
          </div>
        </div>
      </main>
    </div>
  )
}
