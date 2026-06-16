"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Code2, Download, Menu, X } from "lucide-react"
import portfolioData from "@/data/portfolio.json"

const navItems = ["Home", "About", "Skills", "Experience", "Projects", "GitHub", "Contact"]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("Home")
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3
      for (const item of navItems) {
        const el = document.getElementById(item.toLowerCase())
        if (el) {
          const top = el.offsetTop
          const bottom = top + el.offsetHeight
          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(item)
            break
          }
        }
      }
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setMobileOpen(false)
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  const downloadCV = () => {
    const a = document.createElement("a")
    a.href = portfolioData.profile.resumePath
    a.download = "Harsh_Dabhi_CV.pdf"
    a.click()
  }

  return (
    <motion.header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass-card border-b border-neural/10 shadow-lg shadow-neural/5" : "bg-transparent"
      }`}
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 90, damping: 16 }}
    >
      <nav className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <button onClick={() => scrollToSection("home")} className="flex items-center gap-2 shrink-0 group">
          <span className="grid place-items-center w-8 h-8 rounded-lg neon-border-cyan bg-neural/5 group-hover:bg-neural/10 transition-colors">
            <Code2 className="h-4 w-4 text-neural" />
          </span>
          <span className="font-bold text-sm sm:text-base text-foreground">
            {portfolioData.profile.name.split(" ")[0]}{" "}
            <span className="text-neural">{portfolioData.profile.name.split(" ")[1]}</span>
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`relative px-3 py-1.5 text-xs font-medium transition-colors duration-300 ${
                  activeSection === item ? "text-neural" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item}
                {activeSection === item && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-3 right-3 -bottom-0.5 h-px bg-neural shadow-[0_0_8px_#00E5FF]"
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={downloadCV}
            className="hidden sm:flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold text-background bg-gradient-to-r from-neural to-neural-purple hover:opacity-90 transition-opacity glow-cyan"
          >
            Download CV
            <Download className="h-3.5 w-3.5" />
          </button>
          <button
            aria-label="Menu"
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden grid place-items-center w-9 h-9 rounded-lg neon-border-cyan text-neural"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden glass-card border-t border-neural/10 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeSection === item ? "text-neural bg-neural/10" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={downloadCV}
                  className="w-full flex items-center justify-center gap-2 rounded-lg px-3 py-2 mt-2 text-sm font-semibold text-background bg-gradient-to-r from-neural to-neural-purple"
                >
                  Download CV <Download className="h-3.5 w-3.5" />
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
