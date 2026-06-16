"use client"

import { motion } from "framer-motion"
import { Award, ExternalLink, Medal } from "lucide-react"
import { MagicCard } from "@/components/ui/magic-card"
import { ShineBorder } from "@/components/ui/shine-border"
import { BlurFade } from "@/components/ui/blur-fade"
import portfolioData from "@/data/portfolio.json"

const certColors = ["#00E5FF", "#7C3AED", "#00FFA3", "#f59e0b"]

export function CertificationsSection() {
  return (
    <section id="certifications" className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 neural-grid opacity-15 pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative">
        <BlurFade delay={0.1} inView>
          <p className="text-center text-neural terminal-text text-xs tracking-widest uppercase mb-2">// Credentials</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Certifications &amp; <span className="bg-clip-text text-transparent bg-gradient-to-r from-neural to-neural-purple">Awards</span>
          </h2>
        </BlurFade>

        {/* Certifications */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-neural terminal-text mb-6 flex items-center gap-2">
            <Medal className="h-4 w-4" /> Certifications
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {portfolioData.certifications.map((cert, i) => (
              <BlurFade key={cert.title} delay={0.1 + i * 0.08} inView>
                <div className="relative h-full rounded-xl glass-card p-5 flex flex-col gap-3 overflow-hidden">
                  <ShineBorder shineColor={[certColors[i % certColors.length], "#7C3AED"]} borderWidth={1} />
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `${certColors[i % certColors.length]}15`, border: `1px solid ${certColors[i % certColors.length]}30` }}
                  >
                    <Award className="h-5 w-5" style={{ color: certColors[i % certColors.length] }} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-foreground leading-tight">{cert.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
                    <p className="text-xs terminal-text mt-1" style={{ color: certColors[i % certColors.length] }}>{cert.date}</p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div>
          <h3 className="text-lg font-semibold text-neural-purple terminal-text mb-6 flex items-center gap-2">
            <Award className="h-4 w-4" /> Awards & Recognition
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {portfolioData.achievements.map((achievement, i) => (
              <BlurFade key={achievement.title} delay={0.2 + i * 0.1} inView>
                <MagicCard
                  className="p-6 glass-card rounded-xl"
                  gradientColor="#7C3AED"
                  gradientOpacity={0.08}
                >
                  <div className="space-y-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: "#7C3AED15", border: "1px solid #7C3AED30" }}
                    >
                      <Medal className="h-5 w-5 text-neural-purple" />
                    </div>
                    <h4 className="font-bold text-sm text-foreground">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{achievement.description}</p>
                    <p className="text-xs terminal-text text-neural-purple">{achievement.year}</p>
                  </div>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
