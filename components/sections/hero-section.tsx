"use client"

import { motion } from "framer-motion"
import { Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMemo } from "react"

export function HeroSection() {
  // Generate fixed particle positions using a seeded random function
  const particles = useMemo(() => {
    const positions = []
    for (let i = 0; i < 20; i++) {
      // Use fixed values based on index instead of random
      positions.push({
        x: (i * 5) % 100, // Distribute evenly across width
        y: ((i * 7) % 100), // Distribute evenly across height
        duration: 2 + (i % 3) // Alternate between 2-4 seconds
      })
    }
    return positions
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
        <div className="absolute inset-0">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 bg-primary/50 rounded-full"
              initial={{ x: `${particle.x}%`, y: `${particle.y}%` }}
              style={{
                left: 0,
                top: 0,
                transform: `translate(${particle.x}%, ${particle.y}%)`
              }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container relative z-10 px-4 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="flex justify-center mb-8"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Brain className="h-24 w-24 text-primary" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 animate-gradient">
            Building Intelligent Systems with Code
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Python & AI Engineer specializing in Machine Learning, Deep Learning, and AI innovations
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              variant="default" 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 transition-all duration-300"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-blue-500/50 hover:border-blue-500 transition-all duration-300"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Me
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}