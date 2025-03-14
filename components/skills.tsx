"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Code2, Database, Layers, Workflow, Lightbulb, Cpu, Wrench, Award } from "lucide-react"
import ErrorBoundary from "@/components/error-boundary"

const skillCategories = [
  {
    name: "Frontend Development",
    icon: <Code2 className="h-6 w-6 text-primary" />,
    skills: ["React", "JavaScript", "HTML/CSS", "Tailwind CSS", "React Native"],
    color: "#3b82f6", // blue
  },
  {
    name: "Backend Development",
    icon: <Database className="h-6 w-6 text-primary" />,
    skills: ["Node.js", "Express", "MySQL", "NoSQL", "RESTful APIs", "OpenAPI"],
    color: "#10b981", // green
  },
  {
    name: "Product Management",
    icon: <Layers className="h-6 w-6 text-primary" />,
    skills: ["Product Roadmaps", "User Stories", "Feature Prioritization", "Stakeholder Management"],
    color: "#8b5cf6", // purple
  },
  {
    name: "Agile Methodologies",
    icon: <Workflow className="h-6 w-6 text-primary" />,
    skills: ["Scrum", "Kanban", "Sprint Planning", "Backlog Refinement", "Retrospectives"],
    color: "#f59e0b", // amber
  },
  {
    name: "Developer Experience",
    icon: <Lightbulb className="h-6 w-6 text-primary" />,
    skills: ["API Design", "Documentation", "Developer Tools", "SDK Development"],
    color: "#ec4899", // pink
  },
  {
    name: "Technical Skills",
    icon: <Cpu className="h-6 w-6 text-primary" />,
    skills: ["CI/CD", "Git", "JIRA Administration", "Unity3D", "AR/VR Development"],
    color: "#6366f1", // indigo
  },
  {
    name: "Tools & Platforms",
    icon: <Wrench className="h-6 w-6 text-primary" />,
    skills: ["AWS", "GitHub", "JIRA", "Confluence", "Figma", "Postman"],
    color: "#0ea5e9", // sky
  },
  {
    name: "Certifications",
    icon: <Award className="h-6 w-6 text-primary" />,
    skills: ["AWS Getting Started with Storage", "Agile Product Owner Role", "SQL", "Waterfall Project Management"],
    color: "#14b8a6", // teal
  },
]

// Animated 3D-like skills visualization without React Three Fiber
function AnimatedSkillsVisualization() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = [
    { id: "frontend", name: "Frontend", color: "#3b82f6" },
    { id: "backend", name: "Backend", color: "#10b981" },
    { id: "product", name: "Product", color: "#8b5cf6" },
    { id: "agile", name: "Agile", color: "#f59e0b" },
    { id: "devex", name: "DevEx", color: "#ec4899" },
    { id: "technical", name: "Technical", color: "#6366f1" },
  ]

  const skills = [
    { name: "React", category: "frontend", level: 0.9 },
    { name: "JavaScript", category: "frontend", level: 0.9 },
    { name: "Node.js", category: "backend", level: 0.85 },
    { name: "Product Roadmaps", category: "product", level: 0.9 },
    { name: "Scrum", category: "agile", level: 0.9 },
    { name: "API Design", category: "devex", level: 0.9 },
    { name: "CI/CD", category: "technical", level: 0.8 },
    { name: "HTML/CSS", category: "frontend", level: 0.85 },
    { name: "Express", category: "backend", level: 0.8 },
    { name: "User Stories", category: "product", level: 0.85 },
    { name: "Kanban", category: "agile", level: 0.85 },
    { name: "Documentation", category: "devex", level: 0.85 },
    { name: "Git", category: "technical", level: 0.9 },
  ]

  const filteredSkills = activeCategory ? skills.filter((skill) => skill.category === activeCategory) : skills

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
            className={`px-4 py-2 rounded-full transition-colors ${
              activeCategory === category.id ? "text-white" : "bg-secondary hover:bg-primary/20"
            }`}
            style={{ backgroundColor: activeCategory === category.id ? category.color : "" }}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="w-full h-[400px] bg-gradient-to-b from-background to-background/50 rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 rounded-full bg-primary/10 animate-pulse"></div>
        </div>

        {filteredSkills.map((skill, index) => {
          // Calculate position in a circular pattern
          const angle = (index / filteredSkills.length) * Math.PI * 2
          const radius = 150
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          const categoryColor = categories.find((c) => c.id === skill.category)?.color || "#3b82f6"

          return (
            <motion.div
              key={skill.name}
              className="absolute rounded-full text-white px-3 py-1 text-sm flex items-center justify-center"
              style={{
                backgroundColor: categoryColor,
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
                opacity: 0.9,
                zIndex: 10,
              }}
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                y: [0, Math.random() * 10 - 5, 0],
              }}
              transition={{
                scale: { duration: 0.5, delay: index * 0.05 },
                y: { duration: 3 + Math.random() * 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
              }}
            >
              {skill.name}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <Badge variant="outline" className="mb-4 px-4 py-1 text-sm">
          My Expertise
        </Badge>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-600">
          Skills & Certifications
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto"></div>
      </motion.div>

      <ErrorBoundary
        fallback={
          <div className="text-center p-8 bg-primary/10 rounded-lg">
            <p className="text-lg">Skill visualization could not be loaded.</p>
          </div>
        }
      >
        <AnimatedSkillsVisualization />
      </ErrorBoundary>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
      >
        {skillCategories.map((category, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="h-full hover:shadow-md transition-all duration-300 overflow-hidden group">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="p-3 rounded-full transform group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-16 p-6 border border-border rounded-lg bg-card/50 backdrop-blur-sm"
      >
        <h3 className="text-xl font-semibold mb-4 text-center">Languages</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <div className="w-full h-4 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
            <p className="mt-2 text-foreground/80">English (Native)</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full h-4 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </div>
            <p className="mt-2 text-foreground/80">Urdu (Native)</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full h-4 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: "40%" }}
                transition={{ duration: 1, delay: 0.6 }}
              />
            </div>
            <p className="mt-2 text-foreground/80">German (Limited Working)</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

