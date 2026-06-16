"use client"

import { motion } from "framer-motion"
import { Code2, Github, Linkedin, Mail, Twitter, ArrowUp } from "lucide-react"
import portfolioData from "@/data/portfolio.json"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const socialLinks = [
    { icon: Github, href: portfolioData.profile.social.github, label: "GitHub" },
    { icon: Linkedin, href: portfolioData.profile.social.linkedin, label: "LinkedIn" },
    { icon: Twitter, href: portfolioData.profile.social.twitter, label: "Twitter" },
    { icon: Mail, href: portfolioData.profile.social.email, label: "Email" },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-neural/10 py-10">
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute h-px bg-gradient-to-r from-transparent via-neural/50 to-transparent w-full top-0"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="grid place-items-center w-8 h-8 rounded-lg neon-border-cyan bg-neural/5">
              <Code2 className="h-4 w-4 text-neural" />
            </span>
            <span className="font-bold text-sm text-foreground">
              {portfolioData.profile.name.split(" ")[0]} <span className="text-neural">{portfolioData.profile.name.split(" ")[1]}</span>
            </span>
          </div>

          {/* Socials */}
          <div className="flex gap-3">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="grid place-items-center w-9 h-9 rounded-full border border-neural/20 text-muted-foreground hover:text-neural hover:border-neural/50 hover:bg-neural/10 transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>

          {/* Copyright + back to top */}
          <div className="flex items-center gap-4">
            <p className="text-xs text-muted-foreground text-center terminal-text">
              © {currentYear} {portfolioData.profile.name}. Crafted with{" "}
              <span className="text-red-400">♥</span> &amp; <span className="text-neural">{"</>"}</span>
            </p>
            <motion.button
              aria-label="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="grid place-items-center w-9 h-9 rounded-full bg-gradient-to-r from-neural to-neural-purple text-background"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}
