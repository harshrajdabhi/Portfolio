"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "50+", label: "Projects Completed" },
  { value: "20+", label: "Open Source Contributions" },
  { value: "10+", label: "Research Papers" }
]

export function AboutSection() {
  return (
    <section className="py-20 bg-card/50 backdrop-blur-sm">
      <div className="container px-4 mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-muted-foreground">
              I'm a passionate AI Engineer with extensive experience in developing intelligent systems
              that solve real-world problems. My expertise spans across Machine Learning, Deep Learning,
              and Natural Language Processing.
            </p>
            <p className="text-lg text-muted-foreground">
              With a strong foundation in Python and modern AI frameworks, I've successfully delivered
              projects ranging from computer vision applications to large-scale NLP systems.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-colors duration-300">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    className="text-center p-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h3 className="text-3xl font-bold text-primary mb-2">{stat.value}</h3>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}