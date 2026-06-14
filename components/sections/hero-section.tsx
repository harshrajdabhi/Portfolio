"use client"

import { motion } from "framer-motion"
import { Zap, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"
import { Particles } from "@/components/ui/particles"
import { RetroGrid } from "@/components/ui/retro-grid"
import { Meteors } from "@/components/ui/meteors"
import { HyperText } from "@/components/ui/hyper-text"
import { WordRotate } from "@/components/ui/word-rotate"
import { Marquee } from "@/components/ui/marquee"
import { PulsatingButton } from "@/components/ui/pulsating-button"
import { Parallax } from "@/components/scroll-reveal"
import { AuroraBackground } from "@/components/effects/aurora-background"
import portfolioData from "@/data/portfolio.json"

type Neuron = { x: number; y: number; radius: number; connections: number[]; pulseDelay: number }

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const neuronsRef = useRef<Neuron[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const setup = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const { width, height } = parent.getBoundingClientRect()
      canvas.width = width
      canvas.height = height

      const count = Math.floor((width * height) / 18000)
      const neurons: Neuron[] = []
      for (let i = 0; i < count; i++) {
        const n: Neuron = { x: Math.random() * width, y: Math.random() * height, radius: Math.random() * 2 + 1, connections: [], pulseDelay: Math.random() * 5 }
        for (let j = 0; j < neurons.length; j++) {
          const d = Math.hypot(n.x - neurons[j].x, n.y - neurons[j].y)
          if (d < width / 6) { n.connections.push(j); neurons[j].connections.push(i) }
        }
        neurons.push(n)
      }
      neuronsRef.current = neurons
    }

    setup()
    window.addEventListener("resize", setup)

    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let t = 0
    const animate = () => {
      t += 0.008
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const neurons = neuronsRef.current
      neurons.forEach((n, i) => {
        n.connections.forEach(j => {
          if (j < i) return
          const o = neurons[j]
          const pulse = (t + n.pulseDelay) % 1
          const grad = ctx.createLinearGradient(n.x, n.y, o.x, o.y)
          grad.addColorStop(0, "rgba(0,229,255,0.05)")
          grad.addColorStop(pulse, "rgba(0,229,255,0.45)")
          grad.addColorStop(1, "rgba(124,58,237,0.05)")
          ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(o.x, o.y)
          ctx.strokeStyle = grad; ctx.lineWidth = 0.5; ctx.stroke()
        })
      })
      neurons.forEach(n => {
        const pulse = Math.sin(t + n.pulseDelay) * 0.5 + 0.5
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 5)
        glow.addColorStop(0, `rgba(0,229,255,${0.35 * pulse})`)
        glow.addColorStop(0.5, `rgba(124,58,237,${0.15 * pulse})`)
        glow.addColorStop(1, "rgba(0,0,0,0)")
        ctx.beginPath(); ctx.arc(n.x, n.y, n.radius * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = glow; ctx.fill()
        ctx.beginPath(); ctx.arc(n.x, n.y, n.radius * (0.8 + pulse * 0.4), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,229,255,${0.5 + pulse * 0.5})`; ctx.fill()
      })
      animationRef.current = requestAnimationFrame(animate)
    }
    animate()
    return () => { cancelAnimationFrame(animationRef.current); window.removeEventListener("resize", setup) }
  }, [])

  const allSkills = [
    ...portfolioData.skills["AI/LLM"],
    ...portfolioData.skills["Backend"],
    ...portfolioData.skills["Infrastructure"],
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Layered backgrounds */}
      <Parallax className="absolute inset-0 z-0" offset={60}>
        <RetroGrid className="opacity-20" />
      </Parallax>
      <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>
      <Particles className="absolute inset-0 z-0" quantity={60} color="#00E5FF" ease={80} size={0.4} />
      <Meteors number={8} className="absolute inset-0 z-0" />
      <AuroraBackground className="z-0 opacity-50" />
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/60 to-background/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      <div className="container relative z-10 px-6 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Holographic profile */}
          <div className="flex justify-center mb-8">
            <div className="relative h-36 w-36 sm:h-40 sm:w-40">
              {/* Pulsing aura */}
              <motion.div
                className="absolute -inset-6 rounded-full blur-2xl"
                animate={{
                  background: [
                    "radial-gradient(circle, rgba(0,229,255,0.45) 0%, transparent 70%)",
                    "radial-gradient(circle, rgba(124,58,237,0.45) 0%, transparent 70%)",
                    "radial-gradient(circle, rgba(0,255,163,0.4) 0%, transparent 70%)",
                    "radial-gradient(circle, rgba(0,229,255,0.45) 0%, transparent 70%)",
                  ],
                }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              {/* Rotating holographic conic ring */}
              <motion.div
                className="absolute inset-0 rounded-full p-[2px]"
                style={{
                  background:
                    "conic-gradient(from 0deg, #00E5FF, #7C3AED, #00FFA3, #00E5FF)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div className="h-full w-full rounded-full bg-background" />
              </motion.div>
              {/* Counter-rotating dashed ring */}
              <motion.div
                className="absolute -inset-2 rounded-full border border-dashed border-neural/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              />
              {/* Profile image */}
              <motion.div
                className="absolute inset-[6px] rounded-full overflow-hidden glow-cyan"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src={portfolioData.profile.image}
                  alt={portfolioData.profile.name}
                  className="h-full w-full object-cover"
                />
                {/* Scan sheen */}
                <motion.div
                  className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-neural/30 to-transparent mix-blend-screen"
                  animate={{ y: ["-120%", "320%"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
          </div>

          {/* Name */}
          <div className="mb-4">
            <HyperText
              className="text-3xl sm:text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neural via-neural-purple to-neural break-words"
              duration={1200}
            >
              {portfolioData.profile.name}
            </HyperText>
          </div>

          {/* Subtitle roles */}
          <div className="mb-3 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <Zap className="h-4 w-4 text-neural animate-node-pulse shrink-0" />
            <WordRotate
              className="text-base sm:text-xl md:text-2xl font-semibold text-neural/90 terminal-text text-center"
              words={["AI Engineer", "Full-Stack Developer", "Forward-Deployed Engineer", "RAG Architect", "LLM Pipeline Builder"]}
              duration={2500}
            />
            <Zap className="h-4 w-4 text-neural animate-node-pulse shrink-0" />
          </div>

          {/* Tagline */}
          <motion.p
            className="mb-6 text-sm sm:text-base md:text-lg font-medium tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-neural via-neural-purple to-neural-green"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Building Intelligent Systems with Code
          </motion.p>

          {/* Bio */}
          <motion.p
            className="text-sm sm:text-base md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {portfolioData.profile.bio}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <PulsatingButton
              className="bg-gradient-to-r from-neural to-neural-purple text-background font-semibold px-8 py-3 rounded-full terminal-text text-sm"
              pulseColor="#00E5FF"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore Projects
            </PulsatingButton>
            <Button
              variant="outline"
              size="lg"
              className="border-neural-green/40 hover:border-neural-green hover:bg-neural-green/10 hover:text-neural-green transition-all duration-300 rounded-full terminal-text text-sm glow-accent"
              onClick={() => {
                const a = document.createElement("a")
                a.href = portfolioData.profile.resumePath
                a.download = "Harsh_Dabhi_CV.pdf"
                a.click()
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-neural/40 hover:border-neural hover:bg-neural/10 hover:text-neural transition-all duration-300 rounded-full terminal-text text-sm glow-cyan"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Contact Me
            </Button>
          </motion.div>

          {/* Skill marquee */}
          <div className="mt-16 relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
            <Marquee className="py-2 [--duration:30s]" pauseOnHover>
              {allSkills.map((skill, i) => (
                <span
                  key={i}
                  className="mx-4 text-sm terminal-text text-neural/60 hover:text-neural transition-colors duration-200 border border-neural/10 rounded-full px-3 py-1"
                >
                  {skill.name}
                </span>
              ))}
            </Marquee>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
