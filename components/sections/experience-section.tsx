"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"
import { useRef } from "react"
import portfolioData from "@/data/portfolio.json"

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])

  return (
    <section className="section-spacing relative overflow-hidden" ref={containerRef}>
      {/* Futuristic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background"
          style={{ opacity }}
        />
        
        {/* Animated Circuit Lines */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full"
            style={{
              top: `${(i + 1) * 20}%`,
              background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent)",
              transform: "translateX(-100%)"
            }}
            animate={{
              x: ["0%", "200%"]
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container px-6 mx-auto relative">
        <motion.h2 
          className="text-3xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Professional Experience
        </motion.h2>
        
        <div className="relative">
          {/* Timeline line with glowing effect */}
          <motion.div 
            className="absolute left-0 md:left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-500/20"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.2), transparent)"
            }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
          {portfolioData.experience.map((exp, index) => (
            <motion.div
              key={index}
              className={`relative mb-16 ${
                index % 2 === 0 ? 'md:pr-16 md:ml-auto md:w-1/2' : 'md:pl-16 md:w-1/2'
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* Timeline dot with pulse effect */}
              <motion.div 
                className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-5 h-5 bg-blue-500 rounded-full z-10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0.4)",
                    "0 0 0 10px rgba(59, 130, 246, 0)",
                    "0 0 0 0 rgba(59, 130, 246, 0.4)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group card-hover">
                <motion.div 
                  className="flex flex-col space-y-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <Badge variant="outline" className="border-blue-500/30">
                      <Calendar className="mr-1 h-3 w-3" />
                      {exp.period}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <h4 className="font-semibold">{exp.company}</h4>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3" />
                      {exp.location}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground">{exp.description}</p>
                  
                  <ul className="space-y-3 mt-2">
                    {exp.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <motion.span 
                          className="mr-2 text-blue-500 mt-1"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.2
                          }}
                        >
                          •
                        </motion.span>
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}