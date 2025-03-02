"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import portfolioData from "@/data/portfolio.json"

export function ContactSection() {
  const contactInfo = [
    { icon: Mail, text: portfolioData.profile.social.email, label: "Email" },
    { icon: Phone, text: portfolioData.profile.contact_number , label: "Phone" },
    { icon: MapPin, text: portfolioData.profile.location, label: "Location" }
  ]

  const socialLinks = [
    { icon: Github, href: portfolioData.profile.social.github, label: "GitHub" },
    { icon: Linkedin, href: portfolioData.profile.social.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${portfolioData.profile.social.email}`, label: "Email" }
  ]

  return (
    <section className="section-spacing">
      <div className="container px-6 mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Get in Touch
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 card-hover">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input 
                      placeholder="John Doe"
                      className="bg-background/50 border-blue-500/20 focus:border-blue-500/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input 
                      type="email"
                      placeholder="john@example.com"
                      className="bg-background/50 border-blue-500/20 focus:border-blue-500/40"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input 
                    placeholder="Project Discussion"
                    className="bg-background/50 border-blue-500/20 focus:border-blue-500/40"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea 
                    placeholder="Your message here..."
                    className="min-h-[180px] bg-background/50 border-blue-500/20 focus:border-blue-500/40"
                  />
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-blue-500/20 card-hover">
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <motion.div
                    key={info.label}
                    className="flex items-center gap-4"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-3 rounded-full bg-blue-500/10">
                      <info.icon className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{info.label}</p>
                      <p className="text-muted-foreground">{info.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            <Card className="p-8 bg-card/50 backdrop-blur-sm border-blue-500/20 card-hover">
              <h3 className="text-xl font-semibold mb-6">Connect on Social Media</h3>
              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-full bg-blue-500/10 hover:bg-blue-500/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <link.icon className="h-6 w-6 text-blue-500" />
                  </motion.a>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}