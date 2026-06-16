"use client"

import { motion } from "framer-motion"
import { Briefcase, Rocket, Award, Trophy, Github } from "lucide-react"
import { NumberTicker } from "@/components/ui/number-ticker"
import { MagicCard } from "@/components/ui/magic-card"
import portfolioData from "@/data/portfolio.json"

const stats = [
  { icon: Briefcase, value: 5, suffix: "+", label: "Years Experience", color: "#00E5FF" },
  { icon: Rocket, value: portfolioData.projects.length, suffix: "+", label: "Projects Delivered", color: "#7C3AED" },
  { icon: Award, value: portfolioData.certifications.length, suffix: "", label: "Certifications", color: "#00FFA3" },
  { icon: Trophy, value: portfolioData.achievements.length, suffix: "", label: "Awards Won", color: "#f59e0b" },
  { icon: Github, value: portfolioData.githubContributions.totalContributions, suffix: "+", label: "GitHub Contributions", color: "#ec4899" },
]

export function StatsSection() {
  return (
    <section id="stats" className="relative py-12 md:py-16">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={i === 4 ? "col-span-2 md:col-span-1" : ""}
            >
              <MagicCard className="glass-card rounded-xl p-4 md:p-5 h-full" gradientColor={s.color} gradientOpacity={0.08}>
                <div className="flex items-center gap-3">
                  <div
                    className="grid place-items-center w-10 h-10 rounded-lg shrink-0"
                    style={{ background: `${s.color}1a`, border: `1px solid ${s.color}40` }}
                  >
                    <s.icon className="h-5 w-5" style={{ color: s.color }} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-0.5 text-2xl md:text-3xl font-bold" style={{ color: s.color }}>
                      <NumberTicker value={s.value} style={{ color: s.color }} />
                      <span>{s.suffix}</span>
                    </div>
                    <p className="text-[11px] md:text-xs text-muted-foreground terminal-text truncate">{s.label}</p>
                  </div>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
