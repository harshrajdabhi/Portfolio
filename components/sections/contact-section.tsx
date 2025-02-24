"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactSection() {
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto text-center">
        <motion.h2 
          className="text-3xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Get in Touch
        </motion.h2>
        <motion.div 
          className="flex justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { icon: Mail, text: "Email" },
            { icon: Linkedin, text: "LinkedIn" },
            { icon: Github, text: "GitHub" }
          ].map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button 
                variant="outline" 
                size="lg"
                className="border-blue-500/30 hover:border-blue-500/60 hover:bg-blue-500/10 transition-all duration-300"
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.text}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}