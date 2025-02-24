"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"
import portfolioData from "@/data/portfolio.json"

export function ExperienceSection() {
  return (
    <section className="py-20 bg-card/50 backdrop-blur-sm">
      <div className="container px-4 mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Professional Experience
        </motion.h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-500/20" />
          
          {portfolioData.experience.map((exp, index) => (
            <motion.div
              key={index}
              className={`relative mb-12 ${
                index % 2 === 0 ? 'md:pr-12 md:ml-auto md:w-1/2' : 'md:pl-12 md:w-1/2'
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full" />
              
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
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
                  
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 text-blue-500">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}