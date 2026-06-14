"use client"

import { motion } from "framer-motion"
import { MagicCard } from "@/components/ui/magic-card"
import { BorderBeam } from "@/components/ui/border-beam"
import { BlurFade } from "@/components/ui/blur-fade"
import { Button } from "@/components/ui/button"
import { TiltCard } from "@/components/effects/tilt-card"
import { Github, ExternalLink } from "lucide-react"
import portfolioData from "@/data/portfolio.json"

export function ProjectsSection() {
  return (
    <section id="projects" className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 neural-grid opacity-15 pointer-events-none" />

      <div className="container px-6 mx-auto relative">
        <BlurFade delay={0.1} inView>
          <h2 className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-neural to-neural-purple terminal-text">
            // Projects
          </h2>
          <p className="text-center text-muted-foreground mb-16 terminal-text text-sm">
            <span className="text-neural">{">"}</span> Production AI systems shipped for enterprise clients
          </p>
        </BlurFade>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolioData.projects.map((project, i) => (
            <BlurFade key={project.title} delay={0.1 + i * 0.07} inView>
              <TiltCard className="h-full transition-shadow duration-300 rounded-xl hover:[box-shadow:0_0_30px_rgba(0,229,255,0.25),0_0_60px_rgba(124,58,237,0.15)]">
              <MagicCard
                className="h-full glass-card rounded-xl overflow-hidden flex flex-col group cursor-pointer hover:border-neural/40 transition-colors duration-300"
                gradientColor="#00E5FF"
                gradientOpacity={0.06}
              >
                <BorderBeam size={100} duration={8 + i} colorFrom="#00E5FF" colorTo="#7C3AED" />

                {/* Image with scanline overlay */}
                <div className="relative h-40 overflow-hidden scanline-overlay">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                    {project.highlights.map((h, hi) => (
                      <span key={hi} className="text-xs terminal-text text-neural/90 bg-neural/10 border border-neural/20 rounded px-2 py-0.5">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5 space-y-3">
                  <h3 className="font-bold text-sm text-foreground leading-tight">{project.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 5).map((tag, ti) => (
                      <span key={ti} className="text-xs terminal-text px-2 py-0.5 rounded border border-neural/15 text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 5 && (
                      <span className="text-xs terminal-text text-muted-foreground/50">+{project.tags.length - 5}</span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-2 pt-1">
                    {project.github && project.github !== "#" && (
                      <Button variant="ghost" size="sm" className="h-7 px-3 text-xs hover:text-neural hover:bg-neural/10 terminal-text" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-3 w-3 mr-1" /> Code
                        </a>
                      </Button>
                    )}
                    {project.demo && project.demo !== "#" && (
                      <Button variant="ghost" size="sm" className="h-7 px-3 text-xs hover:text-neural-purple hover:bg-neural-purple/10 terminal-text" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" /> Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </MagicCard>
              </TiltCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}
