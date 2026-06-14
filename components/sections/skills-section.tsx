"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { BlurFade } from "@/components/ui/blur-fade"
import { BorderBeam } from "@/components/ui/border-beam"
import portfolioData from "@/data/portfolio.json"

const categoryColors: Record<string, string> = {
  "AI/LLM": "#00E5FF",
  "Backend": "#7C3AED",
  "Infrastructure": "#00FFA3",
  "ML/Vision": "#f59e0b",
  "Data": "#ec4899",
  "Frontend": "#6366f1",
}

function SkillBar({ skill, index, color }: { skill: { name: string; level: number }; index: number; color: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      className="space-y-1.5"
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.04, duration: 0.4 }}
    >
      <div className="flex justify-between items-center">
        <span className="text-xs terminal-text text-foreground/90">{skill.name}</span>
        <span className="text-xs terminal-text" style={{ color }}>{skill.level}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden relative">
        <motion.div
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, ${color}55, ${color})`,
            boxShadow: `0 0 8px ${color}88, 0 0 16px ${color}44`,
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ delay: index * 0.04 + 0.15, duration: 0.9, ease: "easeOut" }}
        >
          {/* moving shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer bg-[length:200%_100%]" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  const categories = Object.keys(portfolioData.skills) as Array<keyof typeof portfolioData.skills>

  return (
    <section id="skills" className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 neural-grid opacity-20 pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative">
        <BlurFade delay={0.1} inView>
          <h2 className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-neural to-neural-purple terminal-text">
            // Technical Skills
          </h2>
          <p className="text-center text-muted-foreground mb-10 terminal-text text-sm">
            <span className="text-neural">{">"}</span> Full-stack AI engineering across LLMs, backend, infra &amp; ML
          </p>
        </BlurFade>

        {/* All categories as glowing panels */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {categories.map((cat, ci) => {
            const color = categoryColors[cat]
            return (
              <BlurFade key={cat} delay={0.1 + ci * 0.08} inView>
                <div className="relative h-full rounded-xl glass-card p-5 overflow-hidden">
                  <BorderBeam size={120} duration={9 + ci} colorFrom={color} colorTo="#7C3AED" />
                  {/* Category header */}
                  <div className="flex items-center gap-2 mb-5">
                    <span
                      className="h-2.5 w-2.5 rounded-full animate-node-pulse"
                      style={{ background: color, boxShadow: `0 0 10px ${color}` }}
                    />
                    <h3 className="text-sm font-semibold terminal-text tracking-wide uppercase" style={{ color }}>
                      {cat}
                    </h3>
                    <span className="ml-auto text-[10px] terminal-text text-muted-foreground/60">
                      {portfolioData.skills[cat].length} skills
                    </span>
                  </div>
                  {/* Bars */}
                  <div className="space-y-3">
                    {portfolioData.skills[cat].map((skill, i) => (
                      <SkillBar key={skill.name} skill={skill} index={i} color={color} />
                    ))}
                  </div>
                </div>
              </BlurFade>
            )
          })}
        </div>
      </div>
    </section>
  )
}
