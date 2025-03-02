"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail, Twitter, MapPin, Calendar, Download, Menu, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { cn } from "@/lib/utils"
import portfolioData from "@/data/portfolio.json"

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const socialLinks = [
    { icon: Github, href: portfolioData.profile.social.github, label: "GitHub" },
    { icon: Linkedin, href: portfolioData.profile.social.linkedin, label: "LinkedIn" },
    { icon: Twitter, href: portfolioData.profile.social.twitter, label: "Twitter" },
    { icon: Mail, href: portfolioData.profile.social.email, label: "Email" }
  ]

  return (
    <motion.div 
      className={cn(
        "fixed left-0 top-0 h-screen bg-card/50 backdrop-blur-lg border-r border-blue-500/20 transition-all duration-500 z-50",
        isCollapsed ? "w-20" : "w-64"
      )}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", damping: 20 }}
    >
      {/* AI Circuit Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px] circuit-pattern" />
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full"
            style={{ top: `${(i + 1) * 25}%` }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scaleX: [0, 1, 0],
              x: ["-100%", "0%", "100%"]
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="h-full w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          </motion.div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-4 bg-card border border-blue-500/20 hover:bg-blue-500/10 transition-colors duration-300"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <Menu className="h-4 w-4" />
      </Button>

      <div className="h-full overflow-y-auto scrollbar-hide">
        <div className="p-6 space-y-8">
          <div className="space-y-4 text-center">
            <motion.div 
              className={cn(
                "relative mx-auto overflow-hidden border-2 border-blue-500/50 rounded-full",
                isCollapsed ? "w-12 h-12" : "w-24 h-24"
              )}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-full h-full relative">
                <img
                  src={portfolioData.profile.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-400/20"
                  animate={{
                    opacity: [0, 0.5, 0],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
            </motion.div>

            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3 overflow-hidden"
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-2"
                  >
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
                      {portfolioData.profile.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {portfolioData.profile.title}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {portfolioData.profile.location}
                    </div>
                    <Badge variant="outline" className="border-green-500/30 text-green-500 mb-3">
                      {portfolioData.profile.availability}
                    </Badge>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full border-blue-500/30 hover:border-blue-500/60 transition-colors duration-300 mt-2"
                      onClick={() => window.open(portfolioData.profile.resumePath, '_blank')}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download CV
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Connect</h3>
                  {socialLinks.map((link) => (
                    <Button
                      key={link.label}
                      variant="ghost"
                      className="w-full justify-start gap-2 hover:bg-blue-500/10 transition-colors duration-300"
                      asChild
                    >
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        <link.icon className="h-4 w-4" />
                        {link.label}
                      </a>
                    </Button>
                  ))}
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Education</h3>
                  {portfolioData.profile.education.map((edu, index) => (
                    <motion.div 
                      key={index} 
                      className="text-sm space-y-1"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="font-medium">{edu.degree}</p>
                      <p className="text-muted-foreground">{edu.school}</p>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {edu.year}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isCollapsed && (
            <div className="space-y-6">
              {socialLinks.map((link) => (
                <motion.div
                  key={link.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-full hover:bg-blue-500/10 transition-colors duration-300"
                    asChild
                  >
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      <link.icon className="h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}