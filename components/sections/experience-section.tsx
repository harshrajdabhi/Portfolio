"use client"

import { motion } from "framer-motion"
import { BorderBeam } from "@/components/ui/border-beam"
import { BlurFade } from "@/components/ui/blur-fade"
import { Calendar, MapPin, Building2, ChevronRight } from "lucide-react"
import { useState } from "react"
import portfolioData from "@/data/portfolio.json"

const companyColors = ["#00E5FF", "#7C3AED", "#00FFA3"]

export function ExperienceSection() {
  const [expanded, setExpanded] = useState<number | null>(0)

  return (
    <section id="experience" className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 neural-grid opacity-15 pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative">
        <BlurFade delay={0.1} inView>
          <h2 className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-neural to-neural-purple terminal-text">
            // Work Experience
          </h2>
          <p className="text-center text-muted-foreground mb-16 terminal-text text-sm">
            <span className="text-neural">{">"}</span> 5+ years shipping production AI systems across enterprise clients
          </p>
        </BlurFade>

        <div className="relative max-w-5xl mx-auto">
          {/* Center timeline line (desktop) / left line (mobile) */}
          <div className="absolute top-0 bottom-0 left-6 md:left-1/2 md:-translate-x-1/2 w-px overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-neural/50 via-neural-purple/40 to-neural-green/20" />
            {/* animated traveling pulse */}
            <motion.div
              className="absolute left-0 w-full h-24 bg-gradient-to-b from-transparent via-neural to-transparent"
              animate={{ y: ["-100%", "600%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {portfolioData.experience.map((exp, index) => {
            const color = companyColors[index % companyColors.length]
            const isOpen = expanded === index
            const isLeft = index % 2 === 0

            return (
              <div
                key={index}
                className={`relative mb-12 md:w-1/2 pl-16 md:pl-0 ${
                  isLeft ? "md:pr-12 md:mr-auto md:text-right" : "md:pl-12 md:ml-auto"
                }`}
              >
                {/* Timeline node */}
                <div
                  className={`absolute top-6 left-3 md:left-auto z-10 ${
                    isLeft ? "md:-right-[10px]" : "md:-left-[10px]"
                  }`}
                >
                  <motion.div
                    className="w-5 h-5 rounded-full"
                    style={{ background: color, boxShadow: `0 0 14px ${color}aa` }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    className="relative rounded-xl overflow-hidden cursor-pointer text-left"
                    onClick={() => setExpanded(isOpen ? null : index)}
                  >
                    <BorderBeam size={120} duration={10 + index * 2} colorFrom={color} colorTo="#7C3AED" />
                    <div className="glass-card p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" style={{ color }} />
                            <h3 className="font-bold text-base" style={{ color }}>{exp.company}</h3>
                          </div>
                          <p className="font-semibold text-foreground text-sm terminal-text">{exp.title}</p>
                          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {exp.period}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {exp.location}
                            </span>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: isOpen ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="h-5 w-5 text-muted-foreground mt-1" />
                        </motion.div>
                      </div>

                      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{exp.description}</p>

                      {/* Expandable achievements */}
                      <motion.div
                        initial={false}
                        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-4 space-y-2 border-t border-white/5 pt-4">
                          {exp.achievements.map((achievement, ai) => (
                            <motion.li
                              key={ai}
                              className="flex gap-2 text-xs text-muted-foreground leading-relaxed text-left"
                              initial={{ opacity: 0, x: -10 }}
                              animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                              transition={{ delay: ai * 0.04, duration: 0.3 }}
                            >
                              <span className="mt-0.5 shrink-0 terminal-text" style={{ color }}>▹</span>
                              {achievement}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
