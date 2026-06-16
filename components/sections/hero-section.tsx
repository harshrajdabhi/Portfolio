"use client"

import { motion } from "framer-motion"
import { Sparkles, Download, ArrowRight, Mail, MousePointerClick, Cpu, Braces, Activity } from "lucide-react"
import { useEffect, useRef } from "react"
import { Particles } from "@/components/ui/particles"
import { RetroGrid } from "@/components/ui/retro-grid"
import { Meteors } from "@/components/ui/meteors"
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

      const count = Math.floor((width * height) / 22000)
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
          grad.addColorStop(pulse, "rgba(0,229,255,0.4)")
          grad.addColorStop(1, "rgba(124,58,237,0.05)")
          ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(o.x, o.y)
          ctx.strokeStyle = grad; ctx.lineWidth = 0.5; ctx.stroke()
        })
      })
      neurons.forEach(n => {
        const pulse = Math.sin(t + n.pulseDelay) * 0.5 + 0.5
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 5)
        glow.addColorStop(0, `rgba(0,229,255,${0.3 * pulse})`)
        glow.addColorStop(0.5, `rgba(124,58,237,${0.12 * pulse})`)
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

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  const downloadCV = () => {
    const a = document.createElement("a")
    a.href = portfolioData.profile.resumePath
    a.download = "Harsh_Dabhi_CV.pdf"
    a.click()
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      {/* Layered backgrounds */}
      <Parallax className="absolute inset-0 z-0" offset={60}>
        <RetroGrid className="opacity-20" />
      </Parallax>
      <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>
      <Particles className="absolute inset-0 z-0" quantity={50} color="#00E5FF" ease={80} size={0.4} />
      <Meteors number={6} className="absolute inset-0 z-0" />
      <AuroraBackground className="z-0 opacity-50" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT — copy */}
          <motion.div
            className="text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 rounded-full neon-border-cyan bg-neural/5 px-4 py-1.5 mb-6 text-xs terminal-text text-neural"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              AI Engineer &amp; Full-Stack Developer
            </motion.div>

            {/* Name */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold leading-[1.05] mb-4">
              <span className="text-foreground">{portfolioData.profile.name.split(" ")[0]}</span>{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-neural via-neural-purple to-neural glow-text-cyan">
                {portfolioData.profile.name.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-2xl font-semibold text-neural mb-5">
              Building Intelligent Systems with Code
            </p>

            {/* Bio */}
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
              {portfolioData.profile.bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <button
                onClick={() => scrollTo("projects")}
                className="group flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-background bg-gradient-to-r from-neural to-neural-purple hover:opacity-90 transition-all glow-cyan"
              >
                Explore Projects
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={downloadCV}
                className="flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold neon-border-cyan text-foreground hover:bg-neural/10 hover:text-neural transition-all"
              >
                <Download className="h-4 w-4" />
                View Resume
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold neon-border-purple text-foreground hover:bg-neural-purple/10 hover:text-neural-purple transition-all"
              >
                <Mail className="h-4 w-4" />
                Contact Me
              </button>
            </div>

            {/* Scroll-down indicator */}
            <motion.button
              onClick={() => scrollTo("stats")}
              className="hidden lg:flex items-center gap-2 mt-12 text-xs terminal-text text-muted-foreground hover:text-neural transition-colors"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MousePointerClick className="h-4 w-4" />
              Scroll Down
            </motion.button>
          </motion.div>

          {/* RIGHT — holographic profile + HUD cards */}
          <motion.div
            className="relative flex justify-center items-center order-1 lg:order-2 h-[340px] sm:h-[440px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Outer rotating rings */}
            <motion.div
              className="absolute h-[300px] w-[300px] sm:h-[380px] sm:w-[380px] rounded-full border border-neural/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-neural glow-cyan" />
            </motion.div>
            <motion.div
              className="absolute h-[240px] w-[240px] sm:h-[310px] sm:w-[310px] rounded-full border border-dashed border-neural-purple/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            >
              <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-neural-purple glow-purple" />
            </motion.div>

            {/* Conic glow ring + photo */}
            <div className="relative h-52 w-52 sm:h-64 sm:w-64">
              <motion.div
                className="absolute -inset-4 rounded-full blur-2xl"
                animate={{
                  background: [
                    "radial-gradient(circle, rgba(0,229,255,0.5) 0%, transparent 70%)",
                    "radial-gradient(circle, rgba(124,58,237,0.5) 0%, transparent 70%)",
                    "radial-gradient(circle, rgba(0,255,163,0.4) 0%, transparent 70%)",
                    "radial-gradient(circle, rgba(0,229,255,0.5) 0%, transparent 70%)",
                  ],
                }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full p-[3px]"
                style={{ background: "conic-gradient(from 0deg, #00E5FF, #7C3AED, #00FFA3, #00E5FF)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <div className="h-full w-full rounded-full bg-background" />
              </motion.div>
              <motion.div
                className="absolute inset-[8px] rounded-full overflow-hidden glow-cyan"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <img src={portfolioData.profile.image} alt={portfolioData.profile.name} className="h-full w-full object-cover" />
                <motion.div
                  className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-neural/30 to-transparent mix-blend-screen"
                  animate={{ y: ["-120%", "320%"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>

            {/* Floating HUD cards */}
            <FloatingCard className="top-2 left-0 sm:left-2" delay={0}>
              <Cpu className="h-3.5 w-3.5 text-neural" />
              <span>RAG Pipelines</span>
            </FloatingCard>
            <FloatingCard className="top-14 right-0 sm:right-2" delay={0.6}>
              <Braces className="h-3.5 w-3.5 text-neural-purple" />
              <span>Multi-Agent</span>
            </FloatingCard>
            <FloatingCard className="bottom-20 left-0" delay={1.2}>
              <Activity className="h-3.5 w-3.5 text-neural-green" />
              <span>Production AI</span>
            </FloatingCard>

            {/* Available for work badge */}
            <motion.div
              className="absolute bottom-2 right-0 sm:right-4 glass-card rounded-xl px-4 py-2.5 flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-neural-green opacity-75 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-neural-green" />
              </span>
              <div className="text-left">
                <p className="text-xs font-semibold text-foreground leading-tight">Available for Work</p>
                <p className="text-[10px] text-muted-foreground leading-tight">{portfolioData.profile.availability}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function FloatingCard({ children, className, delay }: { children: React.ReactNode; className: string; delay: number }) {
  return (
    <motion.div
      className={`absolute glass-card rounded-lg px-3 py-2 flex items-center gap-2 text-xs terminal-text text-foreground/90 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
      transition={{
        opacity: { delay: delay + 0.8, duration: 0.4 },
        scale: { delay: delay + 0.8, duration: 0.4 },
        y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      {children}
    </motion.div>
  )
}
