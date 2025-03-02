"use client"

import { motion } from "framer-motion"
import { Github, GitFork, Star, GitBranch, GitCommit } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRef, useEffect } from "react"
import portfolioData from "@/data/portfolio.json"

export function GithubSection() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  
  // Draw contribution chart
  useEffect(() => {
    if (!chartRef.current) return;
  
  const canvas = chartRef.current;
  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  // Set canvas dimensions
  const parent = canvas.parentElement;
  if (!parent) return;
  
  const width = parent.clientWidth;
  const height = 200;
  canvas.width = width;
  canvas.height = height;
    
    // Get contribution data
    const contributionData = portfolioData.githubContributions.contributionsByMonth
    const maxContribution = Math.max(...contributionData.map(d => d.count))
    
    // Draw chart
    const barWidth = (width - 60) / contributionData.length
    const barSpacing = 8
    const actualBarWidth = barWidth - barSpacing
    
    // Draw axes
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)'
    ctx.lineWidth = 1
    
    // X-axis
    ctx.beginPath()
    ctx.moveTo(30, height - 30)
    ctx.lineTo(width - 10, height - 30)
    ctx.stroke()
    
    // Y-axis
    ctx.beginPath()
    ctx.moveTo(30, 10)
    ctx.lineTo(30, height - 30)
    ctx.stroke()
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)'
    ctx.lineWidth = 1
    
    const gridLines = 5
    for (let i = 1; i <= gridLines; i++) {
      const y = height - 30 - ((height - 40) / gridLines) * i
      
      ctx.beginPath()
      ctx.moveTo(30, y)
      ctx.lineTo(width - 10, y)
      ctx.stroke()
      
      // Draw y-axis labels
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
      ctx.font = '10px sans-serif'
      ctx.textAlign = 'right'
      ctx.textBaseline = 'middle'
      ctx.fillText(Math.round((maxContribution / gridLines) * i).toString(), 25, y)
    }
    
    // Draw bars with animation
    const drawBars = (progress: number) => {
      contributionData.forEach((data, i) => {
        const x = 30 + i * barWidth + barSpacing / 2
        const barHeight = ((data.count / maxContribution) * (height - 40)) * progress
        const y = height - 30 - barHeight
        
        // Create gradient for bar
        const gradient = ctx.createLinearGradient(x, y, x, height - 30)
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)')
        gradient.addColorStop(1, 'rgba(34, 211, 238, 0.4)')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.roundRect(x, y, actualBarWidth, barHeight, 4)
        ctx.fill()
        
        // Draw x-axis labels
        if (progress > 0.7) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
          ctx.font = '10px sans-serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'top'
          ctx.fillText(data.month, x + actualBarWidth / 2, height - 25)
        }
      })
    }
    
    // Animate chart
    let progress = 0
    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      
      // Redraw axes and grid
      // X-axis
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(30, height - 30)
      ctx.lineTo(width - 10, height - 30)
      ctx.stroke()
      
      // Y-axis
      ctx.beginPath()
      ctx.moveTo(30, 10)
      ctx.lineTo(30, height - 30)
      ctx.stroke()
      
      // Grid lines
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)'
      for (let i = 1; i <= gridLines; i++) {
        const y = height - 30 - ((height - 40) / gridLines) * i
        
        ctx.beginPath()
        ctx.moveTo(30, y)
        ctx.lineTo(width - 10, y)
        ctx.stroke()
        
        // Draw y-axis labels
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.font = '10px sans-serif'
        ctx.textAlign = 'right'
        ctx.textBaseline = 'middle'
        ctx.fillText(Math.round((maxContribution / gridLines) * i).toString(), 25, y)
      }
      
      // Draw bars
      drawBars(progress)
      
      progress += 0.02
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    animate()
  }, [])
  
  return (
    <section className="py-20 bg-card/50 backdrop-blur-sm">
      <div className="container px-4 mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          GitHub Contributions
        </motion.h2>
        
        {/* GitHub Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <GitCommit className="mr-2 text-blue-500" />
                  Total Contributions
                </h3>
                <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30">
                  Lifetime
                </Badge>
              </div>
              <div className="flex items-center justify-center py-6">
                <motion.div
                  className="text-4xl font-bold text-blue-500"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  {portfolioData.githubContributions.totalContributions.toLocaleString()}
                </motion.div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Star className="mr-2 text-blue-500" />
                  Stars Earned
                </h3>
                <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30">
                  All Repositories
                </Badge>
              </div>
              <div className="flex items-center justify-center py-6">
                <motion.div
                  className="text-4xl font-bold text-blue-500"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
                >
                  {portfolioData.githubContributions.starsEarned.toLocaleString()}
                </motion.div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <GitBranch className="mr-2 text-blue-500" />
                  Active Repositories
                </h3>
                <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30">
                  Public
                </Badge>
              </div>
              <div className="flex items-center justify-center py-6">
                <motion.div
                  className="text-4xl font-bold text-blue-500"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                >
                  {portfolioData.githubContributions.topRepositories.length}+
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
        
        {/* Contribution Chart */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Github className="mr-2 text-blue-500" />
              Yearly Contribution Activity
            </h3>
            <div className="relative h-[200px]">
              <canvas ref={chartRef} className="w-full h-full" />
            </div>
          </Card>
        </motion.div>
        
        {/* Top Repositories */}
        <div>
          <motion.h3 
            className="text-xl font-semibold mb-6 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Github className="mr-2 text-blue-500" />
            Top Repositories
          </motion.h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {portfolioData.githubContributions.topRepositories.map((repo, index) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 h-full flex flex-col">
                  <div className="flex-grow">
                    <h4 className="font-semibold mb-2">{repo.name}</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      {repo.description}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm">{repo.stars}</span>
                      </div>
                      <div className="flex items-center">
                        <GitFork className="h-4 w-4 text-blue-500 mr-1" />
                        <span className="text-sm">{repo.forks}</span>
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-blue-500 hover:text-blue-600 p-0 h-auto"
                      onClick={() => window.open(repo.url, '_blank')}
                    >
                      View
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}