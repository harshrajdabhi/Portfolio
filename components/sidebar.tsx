"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, MapPin, Calendar, Download, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShineBorder } from "@/components/ui/shine-border";
import { useState } from "react";
import { cn } from "@/lib/utils";
import portfolioData from "@/data/portfolio.json";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const socialLinks = [
    { icon: Github, href: portfolioData.profile.social.github, label: "GitHub", color: "text-white" },
    { icon: Linkedin, href: portfolioData.profile.social.linkedin, label: "LinkedIn", color: "text-blue-400" },
    { icon: Twitter, href: portfolioData.profile.social.twitter, label: "Twitter", color: "text-sky-400" },
    { icon: Mail, href: portfolioData.profile.social.email, label: "Email", color: "text-neural" },
  ];

  return (
    <motion.div
      className={cn(
        "fixed left-0 top-0 h-screen glass-card border-r border-neural/10 transition-all duration-500 z-50 overflow-hidden",
        isCollapsed ? "w-20" : "w-64"
      )}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", damping: 20 }}
    >
      <BorderBeam size={200} duration={12} colorFrom="#00d4ff" colorTo="#9b59ff" />

      {/* Neural grid background */}
      <div className="absolute inset-0 neural-grid opacity-30 pointer-events-none" />

      {/* Animated data flow lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full"
            style={{ top: `${(i + 1) * 25}%` }}
            animate={{ opacity: [0.1, 0.4, 0.1], x: ["-100%", "100%"] }}
            transition={{ duration: 4, delay: i * 1.2, repeat: Infinity, ease: "linear" }}
          >
            <div className="h-full w-full bg-gradient-to-r from-transparent via-neural/40 to-transparent" />
          </motion.div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-4 bg-card border border-neural/20 hover:bg-neural/10 hover:border-neural/40 transition-all duration-300 z-10"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <Menu className="h-4 w-4 text-neural" />
      </Button>

      <div className="h-full overflow-y-auto scrollbar-hide">
        <div className="p-6 space-y-8">

          {/* Profile */}
          <div className="space-y-4 text-center">
            <motion.div
              className={cn(
                "relative mx-auto overflow-hidden rounded-full border-2 border-neural/40 glow-cyan",
                isCollapsed ? "w-12 h-12" : "w-24 h-24"
              )}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={portfolioData.profile.image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-neural/20 to-neural-purple/20"
                animate={{ opacity: [0, 0.6, 0], rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
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
                    <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-neural to-neural-purple">
                      {portfolioData.profile.name}
                    </h2>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {portfolioData.profile.title}
                    </p>
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 text-neural" />
                      {portfolioData.profile.location}
                    </div>
                    <Badge variant="outline" className="border-neural-green/40 text-neural-green text-xs">
                      {portfolioData.profile.availability}
                    </Badge>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-neural/30 hover:border-neural/60 hover:bg-neural/10 hover:text-neural transition-all duration-300 mt-2 terminal-text text-xs"
                      onClick={() => {
                        const a = document.createElement("a");
                        a.href = portfolioData.profile.resumePath;
                        a.download = "Harsh_Dabhi_CV.pdf";
                        a.click();
                      }}
                    >
                      <Download className="mr-2 h-3 w-3" />
                      Download CV
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Social + Education */}
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-neural terminal-text tracking-widest uppercase">// Connect</h3>
                  {socialLinks.map((link, i) => (
                    <motion.div key={link.label} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2 hover:bg-neural/10 hover:text-neural transition-all duration-300 text-xs"
                        asChild
                      >
                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                          <link.icon className={cn("h-3.5 w-3.5", link.color)} />
                          {link.label}
                        </a>
                      </Button>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-neural terminal-text tracking-widest uppercase">// Education</h3>
                  {portfolioData.profile.education.map((edu, index) => (
                    <motion.div
                      key={index}
                      className="text-xs space-y-1 p-3 rounded-lg neon-border-cyan bg-neural/5"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="font-medium text-foreground leading-tight">{edu.degree}</p>
                      <p className="text-muted-foreground">{edu.school}</p>
                      <p className="text-muted-foreground/70">{edu.focus}</p>
                      <div className="flex items-center text-neural/70">
                        <Calendar className="h-3 w-3 mr-1" />
                        {edu.year}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsed icons */}
          {isCollapsed && (
            <div className="space-y-4">
              {socialLinks.map((link) => (
                <motion.div key={link.label} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-full hover:bg-neural/10 hover:text-neural transition-all duration-300"
                    asChild
                  >
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      <link.icon className={cn("h-4 w-4", link.color)} />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
