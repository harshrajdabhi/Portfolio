"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import portfolioData from "@/data/portfolio.json"// Define types for props
interface SkillCardProps {
  skill: string;
  index: number;
  category: string;
}

// Skill card component with animated metrics
function SkillCard({ skill, index, category }: SkillCardProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const [level, setLevel] = useState(0)
  
  // Animate skill level when in view
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setLevel(skill.level)
      }, index * 100)
      return () => clearTimeout(timer)
    }
  }, [inView, index, skill.level])
  
  // Determine color based on skill level
  const getColor = (level: number) => {
    if (level >= 90) return "from-blue-500 to-cyan-400"
    if (level >= 80) return "from-blue-500 to-green-400"
    if (level >= 70) return "from-blue-400 to-green-500"
    return "from-blue-400 to-cyan-500"
  }
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      <Card className="p-5 bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 overflow-hidden group card-hover">
        {/* Background circuit pattern */}
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
          <motion.div
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
            style={{ top: "30%" }}
            animate={{
              x: ["-100%", "100%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.2
            }}
          />
          <motion.div
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
            style={{ top: "70%" }}
            animate={{
              x: ["100%", "-100%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.3
            }}
          />
        </div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-primary">{skill.name}</h3>
            <div className="flex items-center">
              <motion.span 
                className="text-sm font-mono"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
              >
                {Math.round(level)}%
              </motion.span>
            </div>
          </div>
          
          <div className="h-2 bg-blue-500/10 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${getColor(skill.level)} rounded-full`}
              initial={{ width: "0%" }}
              animate={inView ? { width: `${level}%` } : { width: "0%" }}
              transition={{ duration: 1, delay: index * 0.1 }}
            />
          </div>
          
          {/* Skill metrics visualization */}
          <div className="mt-3 flex justify-between">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${i < Math.floor(skill.level / 20) ? 'bg-blue-500' : 'bg-blue-500/20'}`}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + i * 0.1 }}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{category}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

// Hexagonal grid for skill visualization
function HexGrid({ category, skills }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <motion.h3
        className="text-xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {category}
      </motion.h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {skills.map((skill, index) => (
          <SkillCard 
            key={skill.name} 
            skill={skill} 
            index={index} 
            category={category}
          />
        ))}
      </div>
    </motion.div>
  )
}

// Radar chart component for skill visualization
function RadarChart() {
  const canvasRef = useRef(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [isRendered, setIsRendered] = useState(false)
  
  // Categories to display in radar chart
  const categories = ["AI/ML", "Languages", "Cloud", "Tools"]
  const categoryColors = {
    "AI/ML": "rgba(59, 130, 246, 0.7)",
    "Languages": "rgba(34, 211, 238, 0.7)",
    "Cloud": "rgba(16, 185, 129, 0.7)",
    "Tools": "rgba(99, 102, 241, 0.7)"
  }
  
  // Calculate average skill level per category
  const getCategoryAverage = (category) => {
    const skills = portfolioData.skills[category]
    const sum = skills.reduce((acc, skill) => acc + skill.level, 0)
    return sum / skills.length
  }
  
  // Draw radar chart
  useEffect(() => {
    if (!inView || !canvasRef.current || isRendered) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions
    const size = 300
    canvas.width = size
    canvas.height = size
    const centerX = size / 2
    const centerY = size / 2
    const radius = size * 0.4
    
    // Draw background
    ctx.fillStyle = 'rgba(59, 130, 246, 0.05)'
    ctx.fillRect(0, 0, size, size)
    
    // Draw radar grid
    const levels = 5
    for (let i = 1; i <= levels; i++) {
      const levelRadius = (radius / levels) * i
      
      ctx.beginPath()
      ctx.arc(centerX, centerY, levelRadius, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)'
      ctx.stroke()
    }
    
    // Draw category axes
    const angleStep = (Math.PI * 2) / categories.length
    categories.forEach((category, i) => {
      const angle = i * angleStep - Math.PI / 2
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)'
      ctx.stroke()
      
      // Draw category label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
      ctx.font = '12px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const labelX = centerX + Math.cos(angle) * (radius + 20)
      const labelY = centerY + Math.sin(angle) * (radius + 20)
      ctx.fillText(category, labelX, labelY)
    })
    
    // Animate drawing of skill data
    const drawSkillData = (progress: number) => {
      ctx.clearRect(0, 0, size, size)
      
      // Redraw background
      ctx.fillStyle = 'rgba(59, 130, 246, 0.05)'
      ctx.fillRect(0, 0, size, size)
      
      // Redraw radar grid
      for (let i = 1; i <= levels; i++) {
        const levelRadius = (radius / levels) * i
        
        ctx.beginPath()
        ctx.arc(centerX, centerY, levelRadius, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)'
        ctx.stroke()
        
        // Draw level label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.font = '10px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(`${i * 20}%`, centerX, centerY - levelRadius)
      }
      
      // Redraw category axes
      categories.forEach((category, i) => {
        const angle = i * angleStep - Math.PI / 2
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius
        
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x, y)
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)'
        ctx.stroke()
        
        // Redraw category label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
        ctx.font = '12px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        const labelX = centerX + Math.cos(angle) * (radius + 20)
        const labelY = centerY + Math.sin(angle) * (radius + 20)
        ctx.fillText(category, labelX, labelY)
      })
      
      // Draw skill data
      ctx.beginPath()
      categories.forEach((category, i) => {
        const angle = i * angleStep - Math.PI / 2
        const value = getCategoryAverage(category) / 100
        const adjustedValue = value * progress
        const x = centerX + Math.cos(angle) * radius * adjustedValue
        const y = centerY + Math.sin(angle) * radius * adjustedValue
        
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.closePath()
      
      // Create gradient fill
      const gradient = ctx.createLinearGradient(0, 0, size, size)
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)')
      gradient.addColorStop(1, 'rgba(34, 211, 238, 0.2)')
      ctx.fillStyle = gradient
      ctx.fill()
      
      // Draw stroke
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.7)'
      ctx.lineWidth = 2
      ctx.stroke()
      
      // Draw data points
      categories.forEach((category, i) => {
        const angle = i * angleStep - Math.PI / 2
        const value = getCategoryAverage(category) / 100
        const adjustedValue = value * progress
        const x = centerX + Math.cos(angle) * radius * adjustedValue
        const y = centerY + Math.sin(angle) * radius * adjustedValue
        
        // Glow effect
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 10)
        glow.addColorStop(0, categoryColors[category])
        glow.addColorStop(1, 'rgba(59, 130, 246, 0)')
        
        ctx.beginPath()
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()
        
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
        ctx.fill()
        
        // Draw value label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
        ctx.font = 'bold 10px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        const labelX = centerX + Math.cos(angle) * (radius * adjustedValue + 15)
        const labelY = centerY + Math.sin(angle) * (radius * adjustedValue + 15)
        ctx.fillText(`${Math.round(getCategoryAverage(category) )}%`, labelX, labelY)
      })
    }
    
    // Animate radar chart
    let progress = 0
    const animateRadar = () => {
      progress += 0.02
      if (progress > 1) {
        progress = 1
        setIsRendered(true)
        return
      }
      
      drawSkillData(progress)
      requestAnimationFrame(animateRadar)
    }
    
    animateRadar()
  }, [inView, isRendered])
  
  return (
    <motion.div
      ref={ref}
      className="flex justify-center my-16"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <canvas ref={canvasRef} className="max-w-full" />
        
        {/* Animated pulse effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(59, 130, 246, 0)",
              "0 0 0 10px rgba(59, 130, 246, 0.1)",
              "0 0 0 20px rgba(59, 130, 246, 0)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  const containerRef = useRef(null)
  const inView = useInView(containerRef, { once: true, margin: "-100px" })
  
  return (
    <section className="section-spacing relative overflow-hidden" ref={containerRef}>
      {/* Futuristic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
        
        {/* Animated circuit lines */}
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
        
        {/* Animated data nodes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-blue-500/30"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 5) % 100}%`
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
              boxShadow: [
                "0 0 0 0 rgba(59, 130, 246, 0)",
                "0 0 10px 2px rgba(59, 130, 246, 0.3)",
                "0 0 0 0 rgba(59, 130, 246, 0)"
              ]
            }}
            transition={{
              duration: 2 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          />
        ))}
      </div>

      <div className="container px-6 mx-auto relative">
        <motion.h2 
          className="text-3xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Skills & Expertise
        </motion.h2>
        
        {/* Radar Chart Overview */}
        {/* <RadarChart /> */}
        
        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 gap-16 mt-16">
          {Object.entries(portfolioData.skills).map(([category, skills], index) => (
            <HexGrid 
              key={category} 
              category={category} 
              skills={skills as string[]} 
            />
          ))}
        </div>
        
        {/* Skill Matrix Legend */}
        {/* <motion.div
          className="mt-20 p-8 bg-card/50 backdrop-blur-sm border border-blue-500/20 rounded-lg card-hover"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold mb-6 text-center">Skill Proficiency Matrix</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { level: "Expert (90-100%)", color: "bg-gradient-to-r from-blue-500 to-cyan-400" },
              { level: "Advanced (80-89%)", color: "bg-gradient-to-r from-blue-500 to-green-400" },
              { level: "Intermediate (70-79%)", color: "bg-gradient-to-r from-blue-400 to-green-500" },
              { level: "Familiar (Below 70%)", color: "bg-gradient-to-r from-blue-400 to-cyan-500" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`h-3 w-16 rounded-full ${item.color}`}></div>
                <span className="text-sm text-muted-foreground">{item.level}</span>
              </div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </section>
  )
}