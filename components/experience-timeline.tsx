"use client"

import { useRef } from "react"
import { motion, useScroll } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, Building, MapPin, ChevronRight } from "lucide-react"

const experiences = [
  {
    title: "Associate Product Owner - Regulated Data Domain",
    company: "Cuscal Limited",
    location: "Sydney, New South Wales, Australia",
    period: "November 2024 - Present",
    description: "Currently working as an Associate Product Owner in the Regulated Data Domain at Cuscal Limited.",
    skills: ["Product Management", "Agile", "Financial Services", "Open Banking"],
    color: "#3b82f6", // blue
  },
  {
    title: "Product Owner",
    company: "Basiq",
    location: "Manly, New South Wales, Australia",
    period: "June 2023 - November 2024",
    description:
      "Led product development focusing on enhancing developer experience, creating product roadmaps, aligning product with technology, automating documentation processes, and monitoring open banking and consent issues.",
    skills: ["Developer Experience", "Product Roadmaps", "JIRA Administration", "Documentation Automation"],
    color: "#8b5cf6", // purple
  },
  {
    title: "Product Specialist",
    company: "Basiq",
    location: "Manly, New South Wales, Australia",
    period: "February 2023 - June 2023",
    description:
      "Focused on enhancing developer experience, developing product roadmaps, aligning product with technology, and automating documentation processes.",
    skills: ["API Development", "Technical Documentation", "Developer Tools"],
    color: "#ec4899", // pink
  },
  {
    title: "Technical Support Engineer",
    company: "Basiq",
    location: "Manly, New South Wales, Australia",
    period: "December 2021 - February 2023",
    description:
      "Resolved Open Banking issues, implemented CI/CD pipelines, managed cross-functional issues, developed internal tools, and enhanced documentation with OpenAPI specifications.",
    skills: ["Open Banking", "CI/CD", "Technical Support", "OpenAPI"],
    color: "#10b981", // green
  },
  {
    title: "Technical Project Coordinator",
    company: "Thinkun",
    location: "Sydney, Australia",
    period: "December 2019 - December 2021",
    description:
      "Collaborated with Project Managers, integrated new features, assessed system requirements, implemented front-end code using React JS, and developed server-side backend functionality.",
    skills: ["React JS", "NodeJS", "MySQL", "Project Coordination"],
    color: "#f59e0b", // amber
  },
]

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  return (
    <div ref={containerRef} className="relative">
      {/* Timeline line */}
      <motion.div
        className="absolute left-[50%] top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-purple-500 to-blue-600 transform -translate-x-1/2 hidden md:block"
        style={{
          scaleY: scrollYProgress,
        }}
      />

      <div className="space-y-20">
        {experiences.map((exp, index) => {
          const isEven = index % 2 === 0

          return (
            <div
              key={index}
              className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-0`}
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full"
                style={{
                  backgroundColor: exp.color,
                  top: `calc(${index * 20}rem + 2rem)`,
                  boxShadow: `0 0 20px ${exp.color}`,
                }}
              />

              {/* Content */}
              <div className="md:w-1/2 md:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 50, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ background: `linear-gradient(45deg, ${exp.color}, transparent)` }}
                  />

                  <div className="flex items-center gap-2 text-xl font-bold mb-2" style={{ color: exp.color }}>
                    <Briefcase className="h-5 w-5" />
                    <span>{exp.title}</span>
                  </div>

                  <div className="flex items-center gap-2 text-foreground/70 mb-2">
                    <Building className="h-4 w-4" />
                    <span>{exp.company}</span>
                  </div>

                  <div className="flex items-center gap-2 text-foreground/70 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{exp.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-foreground/70 mb-4">
                    <Calendar className="h-4 w-4" />
                    <span>{exp.period}</span>
                  </div>

                  <p className="mb-4 text-foreground/80">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="flex items-center gap-1 hover:bg-primary/10 transition-colors"
                      >
                        <ChevronRight className="h-3 w-3" />
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Empty space for timeline layout */}
              <div className="md:w-1/2"></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

