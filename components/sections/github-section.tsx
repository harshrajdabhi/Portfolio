"use client"

import { motion } from "framer-motion"
import { Github, GitFork, Star, GitCommit } from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"
import { MagicCard } from "@/components/ui/magic-card"
import { BorderBeam } from "@/components/ui/border-beam"
import { Ripple } from "@/components/ui/ripple"
import { Button } from "@/components/ui/button"
import { useRef, useEffect } from "react"
import portfolioData from "@/data/portfolio.json"

export function GithubSection() {
  const chartRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!chartRef.current) return
    const canvas = chartRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const parent = canvas.parentElement
    if (!parent) return
    const width = parent.clientWidth
    const height = 200
    canvas.width = width
    canvas.height = height

    const data = portfolioData.githubContributions.contributionsByMonth
    const max = Math.max(...data.map(d => d.count))
    const barW = (width - 60) / data.length
    const actualBW = barW - 8

    ctx.strokeStyle = "rgba(0,212,255,0.2)"; ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(30, height - 30); ctx.lineTo(width - 10, height - 30); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(30, 10); ctx.lineTo(30, height - 30); ctx.stroke()

    for (let i = 1; i <= 5; i++) {
      const y = height - 30 - ((height - 40) / 5) * i
      ctx.strokeStyle = "rgba(0,212,255,0.07)"; ctx.beginPath(); ctx.moveTo(30, y); ctx.lineTo(width - 10, y); ctx.stroke()
      ctx.fillStyle = "rgba(0,212,255,0.4)"; ctx.font = "10px monospace"; ctx.textAlign = "right"; ctx.textBaseline = "middle"
      ctx.fillText(Math.round((max / 5) * i).toString(), 25, y)
    }

    let progress = 0
    const animate = () => {
      progress = Math.min(progress + 0.02, 1)
      ctx.clearRect(31, 0, width - 41, height - 30)

      data.forEach((d, i) => {
        const barH = ((height - 40) * (d.count / max)) * progress
        const x = 30 + i * barW + 4
        const y = height - 30 - barH
        const grad = ctx.createLinearGradient(x, y, x, height - 30)
        grad.addColorStop(0, "rgba(0,212,255,0.9)")
        grad.addColorStop(1, "rgba(155,89,255,0.4)")
        ctx.fillStyle = grad
        ctx.fillRect(x, y, actualBW, barH)
        ctx.fillStyle = "rgba(0,212,255,0.5)"; ctx.font = "9px monospace"; ctx.textAlign = "center"; ctx.textBaseline = "top"
        ctx.fillText(d.month, x + actualBW / 2, height - 25)
      })

      if (progress < 1) requestAnimationFrame(animate)
    }
    animate()
  }, [])

  const stats = portfolioData.githubContributions

  return (
    <section id="github" className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 neural-grid opacity-15 pointer-events-none" />

      <div className="container px-6 mx-auto relative">
        <BlurFade delay={0.1} inView>
          <h2 className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-neural to-neural-purple terminal-text">
            // GitHub Activity
          </h2>
          <p className="text-center text-muted-foreground mb-16 terminal-text text-sm">
            <span className="text-neural">{">"}</span> Open source contributions and repositories
          </p>
        </BlurFade>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2">
            <BlurFade delay={0.2} inView>
              <div className="relative rounded-xl overflow-hidden">
                <BorderBeam size={200} duration={12} colorFrom="#00d4ff" colorTo="#9b59ff" />
                <div className="glass-card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <GitCommit className="h-4 w-4 text-neural" />
                    <h3 className="text-sm font-semibold text-neural terminal-text">Monthly Contributions</h3>
                    <span className="ml-auto text-xs terminal-text text-muted-foreground">{stats.totalContributions.toLocaleString()} total</span>
                  </div>
                  <div className="relative">
                    <canvas ref={chartRef} className="w-full" style={{ height: 200 }} />
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>

          {/* Stats + repos */}
          <div className="space-y-4">
            {/* Quick stats */}
            <BlurFade delay={0.3} inView>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Star, label: "Stars", value: stats.starsEarned.toLocaleString(), color: "#f59e0b" },
                  { icon: GitCommit, label: "Commits", value: stats.totalContributions.toLocaleString(), color: "#00d4ff" },
                ].map((s, i) => (
                  <MagicCard key={i} className="p-4 glass-card rounded-xl text-center" gradientColor={s.color} gradientOpacity={0.07}>
                    <s.icon className="h-5 w-5 mx-auto mb-1" style={{ color: s.color }} />
                    <div className="text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-xs text-muted-foreground terminal-text">{s.label}</div>
                  </MagicCard>
                ))}
              </div>
            </BlurFade>

            {/* Top repos */}
            {stats.topRepositories.map((repo, i) => (
              <BlurFade key={repo.name} delay={0.4 + i * 0.08} inView>
                <MagicCard className="p-4 glass-card rounded-xl" gradientColor="#9b59ff" gradientOpacity={0.06}>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-neural terminal-text">{repo.name}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{repo.description}</p>
                    <div className="flex gap-3 text-xs text-muted-foreground terminal-text">
                      <span className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-400" />{repo.stars}</span>
                      <span className="flex items-center gap-1"><GitFork className="h-3 w-3 text-neural-purple" />{repo.forks}</span>
                    </div>
                  </div>
                </MagicCard>
              </BlurFade>
            ))}

            <BlurFade delay={0.6} inView>
              <Button variant="outline" className="w-full border-neural/30 hover:border-neural hover:bg-neural/10 hover:text-neural terminal-text text-xs transition-all duration-300" asChild>
                <a href={portfolioData.profile.social.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" /> View GitHub Profile
                </a>
              </Button>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  )
}
