"use client"

import { useRef } from "react"
import { MagicCard } from "@/components/ui/magic-card"
import { BorderBeam } from "@/components/ui/border-beam"
import { BlurFade } from "@/components/ui/blur-fade"
import { TiltCard } from "@/components/effects/tilt-card"
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import portfolioData from "@/data/portfolio.json"

const categoryStyles: Record<string, string> = {
  LLM: "#00E5FF",
  "ML/Vision": "#f59e0b",
  Data: "#ec4899",
  Backend: "#7C3AED",
  Automation: "#00FFA3",
}

function categoryOf(tags: string[]): string {
  const t = tags.join(" ").toLowerCase()
  if (/(resnet|ocr|opencv|tensorflow|keras|vision)/.test(t)) return "ML/Vision"
  if (/(snowflake|bigquery|etl|sql|pandas)/.test(t)) return "Data"
  if (/(rag|llm|langchain|langgraph|openai|claude|gemini|rlhf)/.test(t)) return "LLM"
  if (/(automation|celery|sqs|selenium)/.test(t)) return "Automation"
  return "Backend"
}

export function ProjectsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" })
  }

  return (
    <section id="projects" className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 neural-grid opacity-15 pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative">
        <BlurFade delay={0.1} inView>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-neural terminal-text text-xs tracking-widest uppercase mb-2">// Featured Projects</p>
              <h2 className="text-3xl md:text-4xl font-bold">
                Projects I&apos;m <span className="bg-clip-text text-transparent bg-gradient-to-r from-neural to-neural-purple">Proud Of</span>
              </h2>
            </div>
            <div className="flex gap-2">
              <button onClick={() => scrollBy(-1)} aria-label="Previous" className="grid place-items-center w-10 h-10 rounded-lg neon-border-cyan text-neural hover:bg-neural/10 transition-colors">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={() => scrollBy(1)} aria-label="Next" className="grid place-items-center w-10 h-10 rounded-lg neon-border-cyan text-neural hover:bg-neural/10 transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </BlurFade>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-1 px-1"
        >
          {portfolioData.projects.map((project, i) => {
            const cat = categoryOf(project.tags)
            const color = categoryStyles[cat]
            return (
              <div key={project.title} className="snap-start shrink-0 w-[300px] sm:w-[340px]">
                <TiltCard className="h-full rounded-xl transition-shadow duration-300 hover:[box-shadow:0_0_30px_rgba(0,229,255,0.22),0_0_60px_rgba(124,58,237,0.14)]">
                  <MagicCard className="h-full glass-card rounded-xl overflow-hidden flex flex-col group" gradientColor="#00E5FF" gradientOpacity={0.06}>
                    <BorderBeam size={100} duration={8 + i} colorFrom={color} colorTo="#7C3AED" />

                    {/* Image */}
                    <div className="relative h-44 overflow-hidden scanline-overlay">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                      {/* Category badge */}
                      <span
                        className="absolute top-3 left-3 text-[10px] terminal-text font-semibold rounded-full px-2.5 py-1"
                        style={{ background: `${color}22`, border: `1px solid ${color}55`, color }}
                      >
                        {cat}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-5 space-y-3">
                      <h3 className="font-bold text-sm text-foreground leading-tight">{project.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-4">{project.description}</p>

                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 4).map((tag, ti) => (
                          <span key={ti} className="text-[10px] terminal-text px-2 py-0.5 rounded border border-neural/15 text-muted-foreground">{tag}</span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex items-center justify-between pt-1 border-t border-white/5 mt-1">
                        <div className="flex gap-2">
                          {project.github && project.github !== "#" && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="grid place-items-center w-8 h-8 rounded-lg border border-white/10 text-muted-foreground hover:text-neural hover:border-neural/40 transition-colors">
                              <Github className="h-3.5 w-3.5" />
                            </a>
                          )}
                          <a href={project.demo && project.demo !== "#" ? project.demo : "#"} target="_blank" rel="noopener noreferrer" className="grid place-items-center w-8 h-8 rounded-lg border border-white/10 text-muted-foreground hover:text-neural-purple hover:border-neural-purple/40 transition-colors">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </div>
                        {project.demo && project.demo !== "#" && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs terminal-text font-semibold" style={{ color }}>
                            Live Demo <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </MagicCard>
                </TiltCard>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
