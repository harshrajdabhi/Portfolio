"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { MagicCard } from "@/components/ui/magic-card"
import { NumberTicker } from "@/components/ui/number-ticker"
import { FlickeringGrid } from "@/components/ui/flickering-grid"
import { BlurFade } from "@/components/ui/blur-fade"
import { BorderBeam } from "@/components/ui/border-beam"
import { GraduationCap, Award } from "lucide-react"
import portfolioData from "@/data/portfolio.json"

export function AboutSection() {
  const containerRef = useRef(null)

  return (
    <section id="about" className="section-spacing relative overflow-hidden">
      {/* Flickering neural grid background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <FlickeringGrid
          className="w-full h-full"
          squareSize={4}
          gridGap={6}
          color="#00d4ff"
          maxOpacity={0.3}
          flickerChance={0.1}
        />
      </div>

      <div className="container px-6 mx-auto relative" ref={containerRef}>
        <BlurFade delay={0.1} inView>
          <h2 className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-neural to-neural-purple terminal-text">
            // About Me
          </h2>
          <p className="text-center text-muted-foreground mb-16 terminal-text text-sm">
            <span className="text-neural">{">"}</span> Senior Software Engineer · AI Systems · Forward-Deployed Engineering
          </p>
        </BlurFade>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left — bio + education */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <BlurFade delay={0.2} inView>
              <p className="text-muted-foreground leading-relaxed text-base">
                {portfolioData.profile.bio}
              </p>
            </BlurFade>

            <BlurFade delay={0.35} inView>
              <div className="relative rounded-xl overflow-hidden">
                <BorderBeam size={150} duration={10} colorFrom="#00d4ff" colorTo="#9b59ff" />
                <div className="glass-card p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <GraduationCap className="h-4 w-4 text-neural" />
                    <h3 className="text-sm font-semibold text-neural terminal-text tracking-widest uppercase">Education</h3>
                  </div>
                  {portfolioData.profile.education.map((edu, i) => (
                    <motion.div
                      key={i}
                      className="relative pl-6"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <motion.span
                        className="absolute left-0 top-2 h-3 w-3 rounded-full bg-neural"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <h4 className="font-semibold text-sm text-foreground">{edu.degree}</h4>
                      <p className="text-muted-foreground text-sm">{edu.school}</p>
                      <p className="text-xs text-neural/70 terminal-text">{edu.focus}</p>
                      <p className="text-xs text-muted-foreground/60 mt-1">{edu.year}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </BlurFade>
          </motion.div>

          {/* Right — stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {portfolioData.stats.map((stat, i) => (
                <BlurFade key={stat.label} delay={0.1 + i * 0.1} inView>
                  <MagicCard
                    className="p-6 text-center glass-card rounded-xl cursor-pointer"
                    gradientColor="#00d4ff"
                    gradientOpacity={0.08}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.04, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    >
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold text-neural">
                          <NumberTicker
                            value={parseInt(stat.value) || 0}
                            className="text-neural"
                          />
                        </span>
                        {stat.value.includes("+") && (
                          <span className="text-2xl font-bold text-neural">+</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 terminal-text">{stat.label}</p>
                    </motion.div>
                  </MagicCard>
                </BlurFade>
              ))}
            </div>

            {/* Achievements mini list */}
            <BlurFade delay={0.5} inView>
              <div className="mt-6 relative rounded-xl overflow-hidden">
                <BorderBeam size={120} duration={14} colorFrom="#9b59ff" colorTo="#00ff88" />
                <div className="glass-card p-5 space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="h-4 w-4 text-neural-purple" />
                    <h3 className="text-sm font-semibold text-neural-purple terminal-text tracking-widest uppercase">Awards</h3>
                  </div>
                  {portfolioData.achievements.map((a, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-2 text-xs"
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="text-neural mt-0.5">▹</span>
                      <div>
                        <span className="text-foreground font-medium">{a.title}</span>
                        <span className="text-muted-foreground ml-1">({a.year})</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </BlurFade>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
