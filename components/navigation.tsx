"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { ThemeToggle } from "./theme-toggle"

const navItems = ["Home", "About", "Experience", "Skills", "Projects", "Contact"]

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
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 backdrop-blur-lg rounded-full border border-blue-500/20 px-4 py-2 transition-all duration-300 ${
        isScrolled ? 'bg-background/80' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-2">
        <ul className="flex space-x-2">
          {navItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 relative ${
                  activeSection === item 
                    ? "text-primary"
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