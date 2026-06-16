"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef, useState } from "react"
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

function SkillRow({ skill, index, color }: { skill: { name: string; level: number }; index: number; color: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-3 glass-card rounded-lg p-3"
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.04, duration: 0.4 }}
    >
      {/* Monogram icon */}
      <div
        className="grid place-items-center w-9 h-9 rounded-lg shrink-0 text-xs font-bold terminal-text"
        style={{ background: `${color}1a`, border: `1px solid ${color}40`, color }}
      >
        {skill.name.slice(0, 2).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-foreground/90 truncate">{skill.name}</span>
          <span className="text-xs terminal-text" style={{ color }}>{skill.level}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${color}66, ${color})`, boxShadow: `0 0 8px ${color}88` }}
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ delay: index * 0.04 + 0.15, duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  const categories = Object.keys(portfolioData.skills) as Array<keyof typeof portfolioData.skills>
  const [active, setActive] = useState(categories[0])
  const color = categoryColors[active]

  return (
    <section id="skills" className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 neural-grid opacity-20 pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative">
        <BlurFade delay={0.1} inView>
          <p className="text-center text-neural terminal-text text-xs tracking-widest uppercase mb-2">// Skills &amp; Technologies</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            My <span className="bg-clip-text text-transparent bg-gradient-to-r from-neural to-neural-purple">Tech Arsenal</span>
          </h2>
        </BlurFade>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="relative px-4 py-2 rounded-lg text-xs terminal-text font-medium transition-colors duration-300"
              style={active === cat ? { color: "#030712" } : { color: "rgba(255,255,255,0.6)" }}
            >
              {active === cat && (
                <motion.span
                  layoutId="skill-tab"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: categoryColors[cat], boxShadow: `0 0 16px ${categoryColors[cat]}66` }}
                  transition={{ type: "spring", duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Skills panel */}
        <div className="relative rounded-2xl glass-card p-5 md:p-8 overflow-hidden">
          <BorderBeam size={200} duration={12} colorFrom={color} colorTo="#7C3AED" />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {portfolioData.skills[active].map((skill, i) => (
                <SkillRow key={skill.name} skill={skill} index={i} color={color} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
