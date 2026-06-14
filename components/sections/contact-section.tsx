"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, MapPin, Phone, Send, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BorderBeam } from "@/components/ui/border-beam"
import { RetroGrid } from "@/components/ui/retro-grid"
import { PulsatingButton } from "@/components/ui/pulsating-button"
import { BlurFade } from "@/components/ui/blur-fade"
import portfolioData from "@/data/portfolio.json"

export function ContactSection() {
  const contactInfo = [
    { icon: Mail, text: "harshrajdabhir@gmail.com", label: "Email", color: "#00E5FF" },
    { icon: Phone, text: portfolioData.profile.contact_number, label: "Phone", color: "#7C3AED" },
    { icon: MapPin, text: portfolioData.profile.location, label: "Location", color: "#00FFA3" },
  ]

  const socialLinks = [
    { icon: Github, href: portfolioData.profile.social.github, label: "GitHub", color: "#ffffff" },
    { icon: Linkedin, href: portfolioData.profile.social.linkedin, label: "LinkedIn", color: "#0ea5e9" },
    { icon: Twitter, href: portfolioData.profile.social.twitter, label: "Twitter", color: "#38bdf8" },
    { icon: Mail, href: portfolioData.profile.social.email, label: "Email", color: "#00E5FF" },
  ]

  return (
    <section id="contact" className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <RetroGrid />
      </div>

      <div className="container px-6 mx-auto relative">
        <BlurFade delay={0.1} inView>
          <h2 className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-neural to-neural-purple terminal-text">
            // Get in Touch
          </h2>
          <p className="text-center text-muted-foreground mb-16 terminal-text text-sm">
            <span className="text-neural">{">"}</span> Open to new opportunities and collaborations
          </p>
        </BlurFade>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <BlurFade delay={0.2} inView>
            <div className="relative rounded-xl overflow-hidden">
              <BorderBeam size={200} duration={10} colorFrom="#00E5FF" colorTo="#7C3AED" />
              <div className="glass-card p-6 space-y-5">
                <h3 className="text-sm font-semibold text-neural terminal-text tracking-widest">// Send a Message</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs terminal-text text-muted-foreground">Name</label>
                      <Input
                        placeholder="Your name"
                        className="bg-background/40 border-neural/20 focus:border-neural/60 focus:ring-neural/20 terminal-text text-sm transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs terminal-text text-muted-foreground">Email</label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        className="bg-background/40 border-neural/20 focus:border-neural/60 focus:ring-neural/20 terminal-text text-sm transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs terminal-text text-muted-foreground">Subject</label>
                    <Input
                      placeholder="Project Discussion / Collaboration"
                      className="bg-background/40 border-neural/20 focus:border-neural/60 focus:ring-neural/20 terminal-text text-sm transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs terminal-text text-muted-foreground">Message</label>
                    <Textarea
                      placeholder="Tell me about your project..."
                      className="min-h-[140px] bg-background/40 border-neural/20 focus:border-neural/60 focus:ring-neural/20 terminal-text text-sm transition-all duration-300 resize-none"
                    />
                  </div>
                  <PulsatingButton
                    className="w-full bg-gradient-to-r from-neural to-neural-purple text-background font-semibold terminal-text text-sm rounded-lg py-2.5 flex items-center justify-center gap-2"
                    pulseColor="#00E5FF"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </PulsatingButton>
                </form>
              </div>
            </div>
          </BlurFade>

          {/* Contact info + socials */}
          <div className="space-y-5">
            <BlurFade delay={0.3} inView>
              <div className="relative rounded-xl overflow-hidden">
                <BorderBeam size={120} duration={14} colorFrom="#7C3AED" colorTo="#00FFA3" />
                <div className="glass-card p-6 space-y-4">
                  <h3 className="text-sm font-semibold text-neural terminal-text tracking-widest">// Contact Info</h3>
                  {contactInfo.map((info, i) => (
                    <motion.div
                      key={info.label}
                      className="flex items-center gap-3"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `${info.color}15`, border: `1px solid ${info.color}30` }}
                      >
                        <info.icon className="h-4 w-4" style={{ color: info.color }} />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground terminal-text">{info.label}</p>
                        <p className="text-sm text-foreground">{info.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </BlurFade>

            <BlurFade delay={0.4} inView>
              <div className="relative rounded-xl overflow-hidden">
                <BorderBeam size={120} duration={16} colorFrom="#00FFA3" colorTo="#00E5FF" />
                <div className="glass-card p-6 space-y-4">
                  <h3 className="text-sm font-semibold text-neural terminal-text tracking-widest">// Connect</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map((link, i) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-lg border border-white/5 hover:border-neural/30 hover:bg-neural/5 transition-all duration-300"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <link.icon className="h-4 w-4" style={{ color: link.color }} />
                        <span className="text-xs terminal-text text-muted-foreground">{link.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  )
}
