"use client"

import { motion } from "framer-motion"
import { Brain, Github, Linkedin, Mail, Twitter } from "lucide-react"
import portfolioData from "@/data/portfolio.json"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const socialLinks = [
    { icon: Github, href: portfolioData.profile.social.github, label: "GitHub" },
    { icon: Linkedin, href: portfolioData.profile.social.linkedin, label: "LinkedIn" },
    { icon: Twitter, href: portfolioData.profile.social.twitter, label: "Twitter" },
    { icon: Mail, href: portfolioData.profile.social.email, label: "Email" }
  ]

  return (
    <footer className="relative overflow-hidden bg-card/50 backdrop-blur-sm border-t border-blue-500/20 py-16">
      {/* AI Circuit Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
        <motion.div
          className="absolute h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent w-full top-0"
          animate={{
            scaleX: [0, 1, 0],
            x: ["-100%", "0%", "100%"]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container px-6 mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-10 items-center">
          <div className="text-center md:text-left">
            <motion.div 
              className="flex items-center justify-center md:justify-start gap-3 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Brain className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
                {portfolioData.profile.name}
              </span>
            </motion.div>
            <p className="text-sm text-muted-foreground">
              Building the future with AI and code
            </p>
          </div>

          <div className="flex justify-center gap-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>

          <div className="text-center md:text-right text-sm text-muted-foreground">
            <p>© {currentYear} All rights reserved</p>
            <p>Designed with 💙 by {portfolioData.profile.name}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}