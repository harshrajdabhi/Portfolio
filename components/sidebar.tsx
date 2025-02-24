"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Twitter, MapPin, Calendar, Download, Menu } from "lucide-react"
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
        "fixed left-0 top-0 h-screen bg-card/50 backdrop-blur-lg border-r border-blue-500/20 transition-all duration-300 z-50",
        isCollapsed ? "w-20" : "w-64"
      )}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", damping: 20 }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-4 bg-card border border-blue-500/20"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <Menu className="h-4 w-4" />
      </Button>

      <div className="h-full overflow-y-auto scrollbar-hide">
        <div className="p-6 space-y-6">
          <div className="space-y-4 text-center">
            <motion.div 
              className="relative mx-auto w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500/50"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={portfolioData.profile.image}
                alt="Profile"
                className="object-cover"
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
            </motion.div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
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
                <Badge variant="outline" className="border-green-500/30 text-green-500">
                  {portfolioData.profile.availability}
                </Badge>
              </motion.div>
            )}
          </div>

          {!isCollapsed && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Connect</h3>
                {socialLinks.map((link) => (
                  <Button
                    key={link.label}
                    variant="ghost"
                    className="w-full justify-start gap-2 hover:bg-blue-500/10"
                    asChild
                  >
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </a>
                  </Button>
                ))}
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Education</h3>
                {portfolioData.profile.education.map((edu, index) => (
                  <motion.div 
                    key={index} 
                    className="text-sm space-y-1"
                    whileHover={{ x: 5 }}
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

              <Button 
                variant="outline" 
                className="w-full border-blue-500/30 hover:border-blue-500/60"
              >
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
            </motion.div>
          )}

          {isCollapsed && (
            <div className="space-y-2">
              {socialLinks.map((link) => (
                <Button
                  key={link.label}
                  variant="ghost"
                  size="icon"
                  className="w-full hover:bg-blue-500/10"
                  asChild
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <link.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}