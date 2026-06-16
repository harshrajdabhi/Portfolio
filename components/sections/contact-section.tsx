"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BorderBeam } from "@/components/ui/border-beam"
import { PulsatingButton } from "@/components/ui/pulsating-button"
import { BlurFade } from "@/components/ui/blur-fade"
import portfolioData from "@/data/portfolio.json"

export function ContactSection() {
  const contactInfo = [
    { icon: Mail, label: "Email", value: portfolioData.profile.social.email.replace("mailto:", ""), href: portfolioData.profile.social.email, color: "#00E5FF" },
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/harshrajdabhi", href: portfolioData.profile.social.linkedin, color: "#7C3AED" },
    { icon: Github, label: "GitHub", value: "github.com/harshrajdabhi", href: portfolioData.profile.social.github, color: "#00FFA3" },
    { icon: MapPin, label: "Location", value: portfolioData.profile.location, href: "#", color: "#f59e0b" },
  ]

  return (
    <section id="contact" className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 neural-grid opacity-15 pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative">
        <BlurFade delay={0.1} inView>
          <p className="text-center text-neural terminal-text text-xs tracking-widest uppercase mb-2">// Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Let&apos;s Build Something{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neural to-neural-purple">Amazing!</span>
          </h2>
        </BlurFade>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left — info + globe */}
          <BlurFade delay={0.2} inView>
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                I&apos;m always open to discussing new opportunities, innovative projects, or just having a chat about AI and engineering.
              </p>

              <div className="space-y-3">
                {contactInfo.map((info, i) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    target={info.href.startsWith("http") || info.href.startsWith("mailto") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="grid place-items-center w-10 h-10 rounded-lg shrink-0" style={{ background: `${info.color}15`, border: `1px solid ${info.color}35` }}>
                      <info.icon className="h-4 w-4" style={{ color: info.color }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-muted-foreground terminal-text uppercase tracking-wide">{info.label}</p>
                      <p className="text-sm text-foreground group-hover:text-neural transition-colors truncate">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Holographic globe */}
              <div className="hidden md:flex justify-center pt-6">
                <HoloGlobe />
              </div>
            </div>
          </BlurFade>

          {/* Right — form */}
          <BlurFade delay={0.3} inView>
            <div className="relative rounded-2xl overflow-hidden">
              <BorderBeam size={220} duration={10} colorFrom="#00E5FF" colorTo="#7C3AED" />
              <form className="glass-card p-6 md:p-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1.5">
                  <label className="text-xs terminal-text text-muted-foreground">Your Name</label>
                  <Input placeholder="Enter your name" className="bg-background/40 border-neural/20 focus:border-neural/60 focus:ring-neural/20 text-sm transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs terminal-text text-muted-foreground">Your Email</label>
                  <Input type="email" placeholder="Enter your email" className="bg-background/40 border-neural/20 focus:border-neural/60 focus:ring-neural/20 text-sm transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs terminal-text text-muted-foreground">Message</label>
                  <Textarea placeholder="Write your message..." className="min-h-[150px] bg-background/40 border-neural/20 focus:border-neural/60 focus:ring-neural/20 text-sm transition-all resize-none" />
                </div>
                <PulsatingButton
                  className="w-full bg-gradient-to-r from-neural to-neural-purple text-background font-semibold text-sm rounded-lg py-2.5 flex items-center justify-center gap-2"
                  pulseColor="#00E5FF"
                >
                  Send Message <Send className="h-4 w-4" />
                </PulsatingButton>
              </form>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}

function HoloGlobe() {
  return (
    <div className="relative h-44 w-44 [perspective:600px]">
      <div className="absolute inset-0 rounded-full bg-neural/20 blur-3xl" />
      {/* sphere */}
      <motion.div
        className="absolute inset-0 rounded-full border border-neural/40 overflow-hidden [transform-style:preserve-3d]"
        style={{ background: "radial-gradient(circle at 35% 30%, rgba(0,229,255,0.35), rgba(124,58,237,0.15) 60%, transparent 75%)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {/* latitude lines */}
        {[20, 40, 60, 80].map((p) => (
          <div key={p} className="absolute left-0 right-0 border-t border-neural/20" style={{ top: `${p}%` }} />
        ))}
        {/* longitude ellipses */}
        {[0, 30, 60, 90, 120, 150].map((deg) => (
          <div
            key={deg}
            className="absolute inset-0 rounded-full border-x border-neural/20"
            style={{ transform: `rotateY(${deg}deg)` }}
          />
        ))}
      </motion.div>
      {/* orbiting dot */}
      <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-neural-green glow-accent" />
      </motion.div>
    </div>
  )
}
