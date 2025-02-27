"use client"

import { motion } from "framer-motion"
import { Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"
import portfolioData from "@/data/portfolio.json"

// Neural Network Node type
type Neuron = {
  x: number
  y: number
  radius: number
  connections: number[]
  pulseDelay: number
}

export function HeroSection() {
  const [neurons, setNeurons] = useState<Neuron[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  
  // Generate neural network
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const parent = canvas.parentElement
        if (parent) {
          const { width, height } = parent.getBoundingClientRect()
          setDimensions({ width, height })
          canvas.width = width
          canvas.height = height
          
          // Generate neurons
          const neuronCount = Math.floor((width * height) / 20000) // Adjust density
          const newNeurons: Neuron[] = []
          
          for (let i = 0; i < neuronCount; i++) {
            const neuron: Neuron = {
              x: Math.random() * width,
              y: Math.random() * height,
              radius: Math.random() * 2 + 1,
              connections: [],
              pulseDelay: Math.random() * 5
            }
            
            // Connect to nearby neurons
            for (let j = 0; j < newNeurons.length; j++) {
              const other = newNeurons[j]
              const distance = Math.sqrt(
                Math.pow(neuron.x - other.x, 2) + Math.pow(neuron.y - other.y, 2)
              )
              
              if (distance < width / 6) { // Connection distance threshold
                neuron.connections.push(j)
                other.connections.push(newNeurons.length)
              }
            }
            
            newNeurons.push(neuron)
          }
          
          setNeurons(newNeurons)
        }
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // Animate neural network
  useEffect(() => {
    if (!canvasRef.current || neurons.length === 0) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    let time = 0
    
    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw connections
      neurons.forEach((neuron, i) => {
        neuron.connections.forEach(j => {
          if (j < i) return // Avoid drawing connections twice
          
          const other = neurons[j]
          const distance = Math.sqrt(
            Math.pow(neuron.x - other.x, 2) + Math.pow(neuron.y - other.y, 2)
          )
          
          // Pulse effect along connections
          const pulse = Math.sin(time + neuron.pulseDelay) * 0.5 + 0.5
          const pulsePos = (time + neuron.pulseDelay) % 1
          
          ctx.beginPath()
          ctx.moveTo(neuron.x, neuron.y)
          ctx.lineTo(other.x, other.y)
          
          // Create gradient for connection
          const gradient = ctx.createLinearGradient(neuron.x, neuron.y, other.x, other.y)
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)')
          gradient.addColorStop(pulsePos, 'rgba(59, 130, 246, 0.5)')
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)')
          
          ctx.strokeStyle = gradient
          ctx.lineWidth = 0.5
          ctx.stroke()
        })
      })
      
      // Draw neurons
      neurons.forEach((neuron) => {
        const pulse = Math.sin(time + neuron.pulseDelay) * 0.5 + 0.5
        
        // Glow effect
        const glow = ctx.createRadialGradient(
          neuron.x, neuron.y, 0,
          neuron.x, neuron.y, neuron.radius * 4
        )
        glow.addColorStop(0, `rgba(59, 130, 246, ${0.3 * pulse})`)
        glow.addColorStop(1, 'rgba(59, 130, 246, 0)')
        
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, neuron.radius * 2, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()
        
        // Neuron core
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, neuron.radius * (0.8 + pulse * 0.4), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${0.5 + pulse * 0.5})`
        ctx.fill()
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    return () => cancelAnimationFrame(animationRef.current)
  }, [neurons])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Neural Network Canvas */}
      <div className="absolute inset-0 z-0">
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0"
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
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
            {/* Glowing Brain Icon */}
            <div className="relative">
              <motion.div
                className="absolute -inset-4 rounded-full blur-lg"
                animate={{
                  background: [
                    'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)',
                    'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0) 70%)',
                    'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <Brain className="h-24 w-24 text-primary relative z-10" />
            </div>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 animate-gradient">
            {portfolioData.profile.name}
          </h1>
          
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 animate-gradient"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Building Intelligent Systems with Code
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {portfolioData.profile.title} specializing in Machine Learning, Deep Learning, and AI innovations
          </motion.p>
          
          <motion.div 
            className="flex gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Button 
              variant="default" 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 relative group"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <motion.span
                className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 bg-blue-500/20 blur-lg"
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="relative z-10">View Projects</span>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-blue-500/50 hover:border-blue-500 transition-all duration-300 relative group"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <motion.span
                className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 bg-blue-500/10 blur-lg"
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="relative z-10">Contact Me</span>
            </Button>
          </motion.div>
          
          {/* Floating Tech Keywords */}
          <div className="mt-16 relative h-16 overflow-hidden">
            <motion.div
              className="absolute whitespace-nowrap"
              animate={{
                x: [0, -1000]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[...Array(2)].map((_, i) => (
                <span key={i} className="inline-block">
                  {portfolioData.skills["AI/ML"].concat(portfolioData.skills["Languages"]).map((skill, index) => (
                    <motion.span
                      key={index}
                      className="inline-block mx-4 text-blue-500/70"
                      animate={{
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.2,
                        ease: "easeInOut"
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}