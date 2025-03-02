"use client"

import { motion, useInView } from "framer-motion"
import { Card } from "@/components/ui/card"
import { useRef, useEffect, useState } from "react"
import portfolioData from "@/data/portfolio.json"

function CountUpAnimation({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref)
  
  useEffect(() => {
    if (inView) {
      let start = 0
      const increment = end / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start > end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
      return () => clearInterval(timer)
    }
  }, [end, duration, inView])

  return <span ref={ref}>{count}</span>
}

export function AboutSection() {
  const containerRef = useRef(null)

  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
            style={{ top: `${(i + 1) * 33}%` }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.5, 0],
              x: ["-100%", "0%", "100%"]
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>

      <div className="container px-6 mx-auto relative" ref={containerRef}>
        <motion.h2 
          className="text-3xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              {portfolioData.profile.bio}
            </p>
            <div className="relative">
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-lg blur"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <Card className="relative p-8 bg-card/50 backdrop-blur-sm border-blue-500/20 card-hover">
                <ul className="space-y-6">
                  {portfolioData.profile.education.map((edu, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="relative pl-8"
                    >
                      <motion.span
                        className="absolute left-0 top-2 h-3 w-3 rounded-full bg-blue-500"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <h3 className="font-semibold text-lg">{edu.degree}</h3>
                      <p className="text-muted-foreground mt-1">{edu.school}</p>
                      <p className="text-sm text-muted-foreground mt-1">{edu.year}</p>
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-colors duration-300 card-hover">
              <div className="grid grid-cols-2 gap-6">
                {portfolioData.stats.map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    className="text-center p-6 relative group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-blue-500/5 rounded-lg -z-10"
                      initial={false}
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <h3 className="text-4xl font-bold text-primary mb-3">
                      <CountUpAnimation 
                        end={parseInt(stat.value) || 0} 
                        duration={2000}
                      />
                      {stat.value.includes('+') ? '+' : ''}
                    </h3>
                    <p className="text-muted-foreground">{stat.label}</p>
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