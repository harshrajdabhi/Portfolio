"use client"

import { Navigation } from "@/components/navigation"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ContactSection } from "@/components/sections/contact-section"
import { motion, useScroll, useSpring } from "framer-motion"

export default function Home() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 transition-all duration-300">
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 transform origin-left z-50"
          style={{ scaleX }}
        />
        <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
          {/* AI Circuit Lines */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="circuit-line"
                style={{
                  top: `${20 * (i + 1)}%`,
                  animationDelay: `${i * 0.5}s`,
                  opacity: 0.3
                }}
              />
            ))}
          </div>

          {/* Background Particles */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute h-2 w-2 rounded-full bg-blue-500/30"
                style={{
                  left: `${(i * 7) % 100}%`,
                  top: `${(i * 5) % 100}%`
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2 + (i % 3),
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10">
            <Navigation />
            <section id="home">
              <HeroSection />
            </section>
            <section id="about">
              <AboutSection />
            </section>
            <section id="experience">
              <ExperienceSection />
            </section>
            <section id="skills">
              <SkillsSection />
            </section>
            <section id="projects">
              <ProjectsSection />
            </section>
            <section id="contact">
              <ContactSection />
            </section>
            <Footer />
          </div>
        </div>
      </main>
    </div>
  )
}