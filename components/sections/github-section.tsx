"use client"

import { motion } from "framer-motion"
import { Github, Star, Users, GitCommit, FolderGit2 } from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"
import { BorderBeam } from "@/components/ui/border-beam"
import { NumberTicker } from "@/components/ui/number-ticker"
import portfolioData from "@/data/portfolio.json"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const WEEKS = 53
const DAYS = 7

// Deterministic pseudo-random intensity grid (seeded) so SSR + client match.
function buildGrid() {
  const monthly = portfolioData.githubContributions.contributionsByMonth
  const grid: number[][] = []
  let seed = 1337
  const rand = () => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }
  for (let w = 0; w < WEEKS; w++) {
    const col: number[] = []
    const monthIdx = Math.min(11, Math.floor((w / WEEKS) * 12))
    const monthFactor = monthly[monthIdx].count / 300
    for (let d = 0; d < DAYS; d++) {
      const r = rand() * monthFactor
      const level = r < 0.12 ? 0 : r < 0.3 ? 1 : r < 0.55 ? 2 : r < 0.8 ? 3 : 4
      col.push(level)
    }
    grid.push(col)
  }
  return grid
}

const levelColor = ["rgba(255,255,255,0.05)", "rgba(0,229,255,0.25)", "rgba(0,229,255,0.5)", "rgba(0,229,255,0.75)", "#00E5FF"]

export function GithubSection() {
  const grid = buildGrid()
  const stats = portfolioData.githubContributions

  const statCards = [
    { icon: GitCommit, value: stats.totalContributions, suffix: "+", label: "Total Contributions", color: "#00E5FF" },
    { icon: FolderGit2, value: 120, suffix: "+", label: "Public Repositories", color: "#7C3AED" },
    { icon: Star, value: stats.starsEarned, suffix: "+", label: "Stars Earned", color: "#f59e0b" },
    { icon: Users, value: 90, suffix: "+", label: "Followers", color: "#00FFA3" },
  ]

  return (
    <section id="github" className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 neural-grid opacity-15 pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative">
        <BlurFade delay={0.1} inView>
          <p className="text-center text-neural terminal-text text-xs tracking-widest uppercase mb-2">// GitHub Activity</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Building in <span className="bg-clip-text text-transparent bg-gradient-to-r from-neural to-neural-purple">Public</span>
          </h2>
        </BlurFade>

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Heatmap */}
          <BlurFade delay={0.2} inView className="lg:col-span-2">
            <div className="relative rounded-xl overflow-hidden">
              <BorderBeam size={200} duration={12} colorFrom="#00E5FF" colorTo="#7C3AED" />
              <div className="glass-card p-5 md:p-6">
                {/* month labels */}
                <div className="flex justify-between text-[10px] text-muted-foreground terminal-text mb-2 px-1">
                  {MONTHS.map((m) => <span key={m}>{m}</span>)}
                </div>
                {/* grid */}
                <div className="flex gap-[3px] overflow-x-auto scrollbar-hide pb-1">
                  {grid.map((col, w) => (
                    <div key={w} className="flex flex-col gap-[3px]">
                      {col.map((level, d) => (
                        <motion.span
                          key={d}
                          className="h-2.5 w-2.5 rounded-[2px] shrink-0"
                          style={{ background: levelColor[level] }}
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: (w * DAYS + d) * 0.0008, duration: 0.2 }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                {/* legend */}
                <div className="flex items-center justify-between mt-4">
                  <p className="text-xs text-muted-foreground terminal-text">
                    <span className="text-neural font-semibold">{stats.totalContributions.toLocaleString()}</span> contributions in the last year
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground terminal-text">
                    Less
                    {levelColor.map((c, i) => <span key={i} className="h-2.5 w-2.5 rounded-[2px]" style={{ background: c }} />)}
                    More
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {statCards.map((s, i) => (
              <BlurFade key={s.label} delay={0.3 + i * 0.08} inView>
                <div className="glass-card rounded-xl p-4 h-full">
                  <s.icon className="h-5 w-5 mb-2" style={{ color: s.color }} />
                  <div className="flex items-baseline gap-0.5 text-xl font-bold" style={{ color: s.color }}>
                    <NumberTicker value={s.value} style={{ color: s.color }} />
                    <span>{s.suffix}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground terminal-text mt-0.5">{s.label}</p>
                </div>
              </BlurFade>
            ))}
            <BlurFade delay={0.7} inView className="col-span-2">
              <a
                href={portfolioData.profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold neon-border-cyan text-foreground hover:bg-neural/10 hover:text-neural transition-all"
              >
                <Github className="h-4 w-4" /> View GitHub Profile
              </a>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  )
}
