"use client"

import { motion } from "framer-motion"
import { BlurFade } from "@/components/ui/blur-fade"
import { BorderBeam } from "@/components/ui/border-beam"
import { Building2 } from "lucide-react"
import portfolioData from "@/data/portfolio.json"

const companyColors = ["#00E5FF", "#7C3AED", "#00FFA3"]

// oldest → newest (left to right)
const timeline = [...portfolioData.experience].reverse()

function startYear(period: string) {
  const m = period.match(/\d{4}/)
  const isPresent = /present/i.test(period)
  return isPresent ? `${m?.[0]} – Present` : m?.[0] ?? ""
}

export function ExperienceSection() {
  return (
    <section id="experience" className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 neural-grid opacity-15 pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative">
        <BlurFade delay={0.1} inView>
          <p className="text-center text-neural terminal-text text-xs tracking-widest uppercase mb-2">// Experience</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            My <span className="bg-clip-text text-transparent bg-gradient-to-r from-neural to-neural-purple">Professional Journey</span>
          </h2>
        </BlurFade>

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block relative">
          {/* line */}
          <div className="absolute top-3 left-0 right-0 h-px overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-neural/50 via-neural-purple/40 to-neural-green/30" />
            <motion.div
              className="absolute top-0 h-full w-32 bg-gradient-to-r from-transparent via-neural to-transparent"
              animate={{ x: ["-10%", "110%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="grid" style={{ gridTemplateColumns: `repeat(${timeline.length}, minmax(0, 1fr))` }}>
            {timeline.map((exp, i) => {
              const color = companyColors[i % companyColors.length]
              return (
                <div key={i} className="px-3">
                  {/* node + year */}
                  <div className="flex flex-col items-center mb-6">
                    <motion.span
                      className="h-6 w-6 rounded-full ring-4 ring-background relative z-10"
                      style={{ background: color, boxShadow: `0 0 16px ${color}` }}
                      animate={{ scale: [1, 1.25, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                    />
                    <span className="mt-3 text-sm font-bold terminal-text" style={{ color }}>{startYear(exp.period)}</span>
                  </div>

                  {/* card */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    className="relative rounded-xl overflow-hidden h-full"
                  >
                    <BorderBeam size={120} duration={10 + i * 2} colorFrom={color} colorTo="#7C3AED" />
                    <div className="glass-card p-5 h-full">
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 className="h-4 w-4 shrink-0" style={{ color }} />
                        <h3 className="font-bold text-sm" style={{ color }}>{exp.title}</h3>
                      </div>
                      <p className="text-xs font-semibold text-foreground mb-1">{exp.company}</p>
                      <p className="text-[11px] text-muted-foreground/70 terminal-text mb-3">{exp.period}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{exp.description}</p>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden relative max-w-xl mx-auto">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-neural/50 via-neural-purple/40 to-neural-green/20" />
          {timeline.map((exp, i) => {
            const color = companyColors[i % companyColors.length]
            return (
              <motion.div
                key={i}
                className="relative pl-12 mb-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span
                  className="absolute left-0 top-2 h-6 w-6 rounded-full ring-4 ring-background"
                  style={{ background: color, boxShadow: `0 0 14px ${color}` }}
                />
                <div className="relative rounded-xl overflow-hidden glass-card p-5">
                  <BorderBeam size={120} duration={10 + i * 2} colorFrom={color} colorTo="#7C3AED" />
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="h-4 w-4 shrink-0" style={{ color }} />
                    <h3 className="font-bold text-sm" style={{ color }}>{exp.title}</h3>
                  </div>
                  <p className="text-xs font-semibold text-foreground mb-1">{exp.company}</p>
                  <p className="text-[11px] text-muted-foreground/70 terminal-text mb-3">{exp.period}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{exp.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
