"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { ThemeToggle } from "./theme-toggle"

const navItems = ["Home", "About", "Skills", "Experience", "Projects", "Certifications", "GitHub", "Contact"]

export function Navigation() {
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
      const offset = 80 // Height of the fixed navbar
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  return (
    <motion.nav
      className={`fixed top-6 right-6 z-50 backdrop-blur-lg rounded-full border border-blue-500/20 px-4 py-2 transition-all duration-500 ${
        isScrolled ? 'bg-background/80 scale-95 shadow-lg' : 'bg-background/50 scale-100'
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15, duration: 0.5 }}
    >
      <div className="flex items-center space-x-3">
        <ul className="flex space-x-1 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 relative ${
                  activeSection === item 
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {activeSection === item && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-blue-500/20 rounded-full"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{item}</span>
              </button>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </div>
    </motion.nav>
  )
}