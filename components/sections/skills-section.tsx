"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const skills = {
  "AI/ML": ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "LLMs", "NLP"],
  "Languages": ["Python", "JavaScript", "SQL", "R"],
  "Cloud": ["AWS", "GCP", "Azure", "Docker", "Kubernetes"],
  "Tools": ["Git", "REST APIs", "GraphQL", "Jupyter", "VS Code"]
}

export function SkillsSection() {
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Skills & Expertise
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue="AI/ML" className="max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 bg-card/50 backdrop-blur-sm border border-blue-500/20">
              {Object.keys(skills).map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-primary transition-all duration-300"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(skills).map(([category, items]) => (
              <TabsContent key={category} value={category} className="mt-8">
                <div className="flex flex-wrap gap-3">
                  {items.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Badge 
                        variant="secondary" 
                        className="text-lg py-2 px-4 bg-blue-500/10 hover:bg-blue-500/20 transition-colors duration-300"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}