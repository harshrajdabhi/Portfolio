"use client"

import dynamic from "next/dynamic"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CursorGlow } from "@/components/effects/cursor-glow"
import { AuroraBackground } from "@/components/effects/aurora-background"
import { motion, useScroll, useSpring } from "framer-motion"

// Below-the-fold sections are code-split + lazy loaded for a smoother first paint.
const sectionLoader = () => (
  <div className="min-h-[40vh] flex items-center justify-center">
    <div className="h-6 w-6 rounded-full border-2 border-neural/30 border-t-neural animate-spin" />
  </div>
)

const StatsSection = dynamic(() => import("@/components/sections/stats-section").then(m => m.StatsSection), { loading: sectionLoader })
const AboutSection = dynamic(() => import("@/components/sections/about-section").then(m => m.AboutSection), { loading: sectionLoader })
const SkillsSection = dynamic(() => import("@/components/sections/skills-section").then(m => m.SkillsSection), { loading: sectionLoader })
const ExperienceSection = dynamic(() => import("@/components/sections/experience-section").then(m => m.ExperienceSection), { loading: sectionLoader })
const ProjectsSection = dynamic(() => import("@/components/sections/projects-section").then(m => m.ProjectsSection), { loading: sectionLoader })
const CertificationsSection = dynamic(() => import("@/components/sections/certifications-section").then(m => m.CertificationsSection), { loading: sectionLoader })
const GithubSection = dynamic(() => import("@/components/sections/github-section").then(m => m.GithubSection), { loading: sectionLoader })
const ContactSection = dynamic(() => import("@/components/sections/contact-section").then(m => m.ContactSection), { loading: sectionLoader })
const Footer = dynamic(() => import("@/components/footer").then(m => m.Footer))

export default function Home() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className="relative min-h-screen">
      {/* Global ambient effects */}
      <AuroraBackground className="fixed inset-0 z-0 opacity-60" />
      <CursorGlow />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-neural via-neural-purple to-neural-green transform origin-left z-[60]"
        style={{ scaleX }}
      />

      <Navigation />

      <main className="relative z-10">
        <HeroSection />

        <ScrollReveal><StatsSection /></ScrollReveal>
        <ScrollReveal><AboutSection /></ScrollReveal>
        <ScrollReveal><SkillsSection /></ScrollReveal>
        <ScrollReveal><ExperienceSection /></ScrollReveal>
        <ScrollReveal><ProjectsSection /></ScrollReveal>
        <ScrollReveal><CertificationsSection /></ScrollReveal>
        <ScrollReveal><GithubSection /></ScrollReveal>
        <ScrollReveal><ContactSection /></ScrollReveal>

        <Footer />
      </main>
    </div>
  )
}
