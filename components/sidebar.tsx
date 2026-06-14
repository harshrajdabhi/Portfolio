"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, MapPin, Calendar, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "@/components/ui/border-beam";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import portfolioData from "@/data/portfolio.json";

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  const socialLinks = [
    { icon: Github, href: portfolioData.profile.social.github, label: "GitHub", color: "text-white" },
    { icon: Linkedin, href: portfolioData.profile.social.linkedin, label: "LinkedIn", color: "text-blue-400" },
    { icon: Twitter, href: portfolioData.profile.social.twitter, label: "Twitter", color: "text-sky-400" },
    { icon: Mail, href: portfolioData.profile.social.email, label: "Email", color: "text-neural" },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={cn(
          "fixed left-0 top-0 h-screen w-64 glass-card border-r border-neural/10 z-50 overflow-hidden",
          "transition-transform duration-300",
          // drawer slide on mobile, always visible on desktop
          open ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
        initial={false}
      >
        <BorderBeam size={200} duration={12} colorFrom="#00E5FF" colorTo="#7C3AED" />

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

        {/* Mobile close (X) */}
        <button
          aria-label="Close sidebar"
          onClick={() => onOpenChange(false)}
          className="absolute right-3 top-3 z-20 md:hidden text-muted-foreground hover:text-neural transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="h-full overflow-y-auto scrollbar-hide">
          <div className="p-6 space-y-8">
            {/* Profile */}
            <div className="space-y-4 text-center">
              <motion.div
                className="relative mx-auto overflow-hidden rounded-full border-2 border-neural/40 glow-cyan w-24 h-24"
                whileHover={{ scale: 1.05 }}
              >
                <img src={portfolioData.profile.image} alt="Profile" className="w-full h-full object-cover" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-neural/20 to-neural-purple/20"
                  animate={{ opacity: [0, 0.6, 0], rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-neural to-neural-purple">
                    {portfolioData.profile.name}
                  </h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">{portfolioData.profile.title}</p>
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
                </div>
              </div>
            </div>

            {/* Social + Education */}
            <div className="space-y-8">
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
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
