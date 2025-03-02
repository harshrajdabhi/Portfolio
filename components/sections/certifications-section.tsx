"use client"

import { motion } from "framer-motion"
import { Award, ExternalLink, Medal } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import portfolioData from "@/data/portfolio.json"

export function CertificationsSection() {
  return (
    <section className="section-spacing relative overflow-hidden">
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
      </div>

      <div className="container px-6 mx-auto relative">
        <motion.h2 
          className="text-3xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Certifications & Achievements
        </motion.h2>

        {/* Certifications */}
        <div className="mb-20">
          <motion.h3 
            className="text-xl font-semibold mb-10 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Award className="mr-3 text-blue-500" />
            Professional Certifications
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {portfolioData.certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="hover-lift"
              >
                <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-48">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30">
                        {cert.date}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="font-semibold mb-2">{cert.title}</h4>
                    <p className="text-sm text-muted-foreground mb-6">
                      Issued by {cert.issuer}
                    </p>
                    <div className="mt-auto">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full border-blue-500/30 hover:border-blue-500/60"
                        onClick={() => window.open(cert.url, '_blank')}
                      >
                        <ExternalLink className="mr-2 h-3 w-3" />
                        View Certificate
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <motion.h3 
            className="text-xl font-semibold mb-10 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Medal className="mr-3 text-blue-500" />
            Notable Achievements
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-8">
            {portfolioData.achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="hover-lift"
              >
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 h-full">
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold">{achievement.title}</h4>
                      <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30">
                        {achievement.year}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-6 flex-grow">
                      {achievement.description}
                    </p>
                    {achievement.url && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="w-fit text-blue-500 hover:text-blue-600 p-0 h-auto mt-auto"
                        onClick={() => window.open(achievement.url, '_blank')}
                      >
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Learn more
                      </Button>
                    )}
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