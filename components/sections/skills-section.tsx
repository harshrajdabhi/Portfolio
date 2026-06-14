"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { MagicCard } from "@/components/ui/magic-card"
import { Marquee } from "@/components/ui/marquee"
import { BlurFade } from "@/components/ui/blur-fade"
import { BorderBeam } from "@/components/ui/border-beam"
import portfolioData from "@/data/portfolio.json"

const categoryColors: Record<string, string> = {
  "AI/LLM": "#00d4ff",
  "Backend": "#9b59ff",
  "Infrastructure": "#00ff88",
  "ML/Vision": "#f59e0b",
  "Data": "#ec4899",
  "Frontend": "#6366f1",
}

function SkillBar({ skill, index, color }: { skill: { name: string; level: number }; index: number; color: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      className="space-y-1"
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <div className="flex justify-between items-center">
        <span className="text-xs terminal-text text-foreground/90">{skill.name}</span>
        <span className="text-xs terminal-text" style={{ color }}>{skill.level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}aa, ${color})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ delay: index * 0.05 + 0.2, duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  const categories = Object.keys(portfolioData.skills) as Array<keyof typeof portfolioData.skills>
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const allSkills = categories.flatMap(cat => portfolioData.skills[cat])

  return (
    <section id="skills" className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 neural-grid opacity-20 pointer-events-none" />

      <div className="container px-6 mx-auto relative">
        <BlurFade delay={0.1} inView>
          <h2 className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-neural to-neural-purple terminal-text">
            // Technical Skills
          </h2>
          <p className="text-center text-muted-foreground mb-8 terminal-text text-sm">
            <span className="text-neural">{">"}</span> Full-stack AI engineering across LLMs, backend, infra & ML
          </p>
        </BlurFade>

        {/* Skill tag marquee */}
        <div className="relative mb-12">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />
          <Marquee className="[--duration:25s]" pauseOnHover>
            {allSkills.map((s, i) => (
              <span key={i} className="mx-3 text-xs terminal-text text-muted-foreground border border-neural/10 rounded-full px-3 py-1 hover:border-neural/40 hover:text-neural transition-all duration-200">
                {s.name}
              </span>
            ))}
          </Marquee>
          <Marquee className="[--duration:35s] mt-2" reverse pauseOnHover>
            {allSkills.map((s, i) => (
              <span key={i} className="mx-3 text-xs terminal-text text-muted-foreground border border-neural-purple/10 rounded-full px-3 py-1 hover:border-neural-purple/40 hover:text-neural-purple transition-all duration-200">
                {s.name}
              </span>
            ))}
          </Marquee>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs terminal-text font-medium transition-all duration-300 relative overflow-hidden ${
                activeCategory === cat
                  ? "text-background"
                  : "text-muted-foreground hover:text-foreground border border-white/10"
              }`}
              style={activeCategory === cat ? { background: categoryColors[cat] } : {}}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Skills grid */}
        <motion.div
          key={activeCategory}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {portfolioData.skills[activeCategory].map((skill, i) => (
            <BlurFade key={skill.name} delay={i * 0.04} inView>
              <MagicCard
                className="p-5 glass-card rounded-xl"
                gradientColor={categoryColors[activeCategory]}
                gradientOpacity={0.06}
              >
                <SkillBar
                  skill={skill}
                  index={i}
                  color={categoryColors[activeCategory]}
                />
              </MagicCard>
            </BlurFade>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
