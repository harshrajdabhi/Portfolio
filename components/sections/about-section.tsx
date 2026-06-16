"use client"

import { motion } from "framer-motion"
import { BlurFade } from "@/components/ui/blur-fade"
import { Parallax } from "@/components/scroll-reveal"
import { FlickeringGrid } from "@/components/ui/flickering-grid"
import { User, MapPin, Mail, BadgeCheck, ArrowRight } from "lucide-react"
import portfolioData from "@/data/portfolio.json"

export function AboutSection() {
  const info = [
    { icon: User, label: "Name", value: portfolioData.profile.name },
    { icon: MapPin, label: "Location", value: portfolioData.profile.location },
    { icon: Mail, label: "Email", value: portfolioData.profile.social.email.replace("mailto:", "") },
    { icon: BadgeCheck, label: "Availability", value: portfolioData.profile.availability },
  ]

  return (
    <section id="about" className="section-spacing relative overflow-hidden">
      <Parallax className="absolute -inset-y-24 inset-x-0 opacity-20 pointer-events-none" offset={50}>
        <FlickeringGrid className="w-full h-full" squareSize={4} gridGap={6} color="#00E5FF" maxOpacity={0.3} flickerChance={0.1} />
      </Parallax>

      <div className="container px-4 md:px-6 mx-auto relative">
        <BlurFade delay={0.1} inView>
          <p className="text-center text-neural terminal-text text-xs tracking-widest uppercase mb-2">// About Me</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Turning Ideas into{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neural to-neural-purple">Intelligent Solutions</span>
          </h2>
        </BlurFade>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — bio + CTA */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              {portfolioData.profile.bio}
            </p>

            {/* Info grid */}
            <div className="grid sm:grid-cols-2 gap-3">
              {info.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-3 glass-card rounded-lg p-3"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="grid place-items-center w-9 h-9 rounded-lg neon-border-cyan bg-neural/5 shrink-0">
                    <item.icon className="h-4 w-4 text-neural" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground terminal-text uppercase tracking-wide">{item.label}</p>
                    <p className="text-xs text-foreground truncate">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold neon-border-cyan text-foreground hover:bg-neural/10 hover:text-neural transition-all"
            >
              More About Me
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Right — 3D holographic cube */}
          <motion.div
            className="relative flex items-center justify-center h-[320px] [perspective:1000px]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute bottom-10 h-10 w-48 rounded-full bg-neural/30 blur-3xl" />
            <HoloCube />
            <motion.div
              className="absolute bottom-6 h-40 w-40 rounded-full border border-neural/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function HoloCube() {
  const size = 130
  const half = size / 2
  const faces = [
    `rotateY(0deg) translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(270deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ]
  return (
    <motion.div
      className="relative [transform-style:preserve-3d]"
      style={{ width: size, height: size }}
      animate={{ rotateX: 15, rotateY: 360 }}
      transition={{ rotateY: { duration: 14, repeat: Infinity, ease: "linear" } }}
    >
      {faces.map((t, i) => (
        <div
          key={i}
          className="absolute inset-0 border border-neural/60 bg-neural/5 backdrop-blur-sm"
          style={{ transform: t, boxShadow: "inset 0 0 30px rgba(0,229,255,0.35), 0 0 20px rgba(124,58,237,0.25)" }}
        >
          <div className="absolute inset-0 grid place-items-center">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-neural to-neural-purple opacity-60 blur-[2px]" />
          </div>
        </div>
      ))}
      <div
        className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neural"
        style={{ boxShadow: "0 0 30px 10px rgba(0,229,255,0.6)" }}
      />
    </motion.div>
  )
}
