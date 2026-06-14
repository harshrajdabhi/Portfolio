"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { ThemeToggle } from "./theme-toggle"
import { BorderBeam } from "@/components/ui/border-beam"
import portfolioData from "@/data/portfolio.json"

const navItems = ["Home", "About", "Skills", "Experience", "Projects", "Certifications", "GitHub", "Contact"]

interface NavigationProps {
  onMenuClick?: () => void
}

export function Navigation({ onMenuClick }: NavigationProps) {
  const [activeSection, setActiveSection] = useState("Home")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.toLowerCase(),
        element: document.getElementById(item.toLowerCase()),
      }))

      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (const section of sections) {
        if (section.element) {
          const sectionTop = section.element.offsetTop
          const sectionBottom = sectionTop + section.element.offsetHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(section.id.charAt(0).toUpperCase() + section.id.slice(1))
            break
          }
        }
      }

      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
    }
  }

  return (
    <motion.nav
      className={`fixed top-4 right-4 md:top-6 md:right-6 z-50 rounded-full px-3 py-2 transition-all duration-500 overflow-hidden w-fit max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-18rem)] ${
        isScrolled
          ? "glass-card shadow-lg shadow-neural/10 md:scale-95"
          : "glass-card scale-100"
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <BorderBeam size={120} duration={8} colorFrom="#00E5FF" colorTo="#7C3AED" />
      <div className="flex items-center gap-2">
        {/* Mobile: avatar menu button opens the drawer */}
        <button
          aria-label="Open menu"
          onClick={onMenuClick}
          className="md:hidden rounded-full overflow-hidden border-2 border-neural/50 glow-cyan w-9 h-9 shrink-0 hover:scale-105 transition-transform"
        >
          <img src={portfolioData.profile.image} alt="Menu" className="w-full h-full object-cover" />
        </button>

        {/* Desktop nav list */}
        <ul className="hidden md:flex space-x-1 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 relative ${
                  activeSection === item
                    ? "text-neural glow-text-cyan"
                    : "text-muted-foreground hover:text-neural/80"
                }`}
              >
                {activeSection === item && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-neural/10 rounded-full neon-border-cyan"
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                )}
                <span className="relative z-10 terminal-text">{item}</span>
              </button>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </div>
    </motion.nav>
  )
}
