"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, Star, GitFork, ChevronLeft, ChevronRight } from "lucide-react"

const projects = [
  {
    title: "Account Verification",
    description:
      "BASIQ - Account Verification V3.0 Starter Kit. A comprehensive solution for verifying bank accounts using the Basiq API.",
    tech: "JavaScript",
    stars: 3,
    forks: 7,
    repoUrl: "https://github.com/basiqio-oss/account-verification-v3",
    demoUrl: "#",
    image: "/placeholder.svg?height=400&width=600",
    features: [
      "Secure account verification",
      "Real-time balance checking",
      "Transaction history analysis",
      "User-friendly interface",
    ],
  },
  {
    title: "Basiq Connectors Slack Integration",
    description:
      "Basiq Connectors Status outage slack integration, monitoring degraded performance. Automatically notifies teams when API connectors experience issues.",
    tech: "JavaScript",
    stars: 0,
    forks: 0,
    repoUrl: "https://github.com/Basiq-Connectors-Slack-Integration",
    demoUrl: "#",
    image: "/placeholder.svg?height=400&width=600",
    features: ["Real-time monitoring", "Automated alerts", "Performance tracking", "Customizable notifications"],
  },
  {
    title: "Basiq.io Documentation",
    description:
      "Documentation for Basiq.io. Comprehensive guides, API references, and examples for developers integrating with the Basiq platform.",
    tech: "JavaScript",
    stars: 3,
    forks: 1,
    repoUrl: "https://github.com/basiqio-oss/Basiq-docs",
    demoUrl: "#",
    image: "/placeholder.svg?height=400&width=600",
    features: [
      "Interactive API explorer",
      "Code samples in multiple languages",
      "Step-by-step tutorials",
      "Searchable content",
    ],
  },
  {
    title: "Basiq API Reference",
    description:
      "https://api.basiq.io/ - The official API reference for the Basiq platform, providing detailed information about endpoints, parameters, and responses.",
    tech: "JavaScript",
    stars: 6,
    forks: 3,
    repoUrl: "https://github.com/basiqio/api-ref",
    demoUrl: "https://api.basiq.io/",
    image: "/placeholder.svg?height=400&width=600",
    features: [
      "OpenAPI specification",
      "Request/response examples",
      "Authentication guides",
      "Error handling documentation",
    ],
  },
]

export default function ProjectsShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const constraintsRef = useRef(null)

  const nextProject = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }

  const prevProject = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
  }

  const currentProject = projects[currentIndex]

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div className="relative">
      <div className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          onClick={prevProject}
          className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary/20"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          onClick={nextProject}
          className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary/20"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div ref={constraintsRef} className="overflow-hidden rounded-lg">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full"
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100) {
                prevProject()
              } else if (info.offset.x < -100) {
                nextProject()
              }
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="relative h-64 bg-primary/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={currentProject.image || "/placeholder.svg"}
                      alt={currentProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge>{currentProject.tech}</Badge>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-foreground/70">
                        <Star className="h-4 w-4" />
                        <span>{currentProject.stars}</span>
                      </div>
                      <div className="flex items-center gap-1 text-foreground/70">
                        <GitFork className="h-4 w-4" />
                        <span>{currentProject.forks}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{currentProject.title}</h3>
                  <p className="text-foreground/70 mb-6">{currentProject.description}</p>

                  <div className="flex gap-4">
                    <Button variant="outline" size="sm" className="gap-2" asChild>
                      <a href={currentProject.repoUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        Repository
                      </a>
                    </Button>
                    <Button size="sm" className="gap-2" asChild>
                      <a href={currentProject.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                  Key Features
                </h3>

                <div className="space-y-4">
                  {currentProject.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="bg-primary/10 p-2 rounded-full mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-primary"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium">{feature}</h4>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDirection(index > currentIndex ? 1 : -1)
                        setCurrentIndex(index)
                      }}
                      className={`w-3 h-3 mx-1 rounded-full transition-colors ${
                        index === currentIndex ? "bg-primary" : "bg-primary/30"
                      }`}
                      aria-label={`Go to project ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6 text-center">Other Projects</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects
            .filter((_, index) => index !== currentIndex)
            .slice(0, 3)
            .map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-md transition-all duration-300 group">
                  <CardContent className="p-4">
                    <Badge className="mb-2">{project.tech}</Badge>
                    <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-foreground/70 text-sm line-clamp-2">{project.description}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-foreground/70" />
                      <span className="text-sm text-foreground/70">{project.stars}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 hover:bg-primary/10"
                      onClick={() => {
                        setDirection(projects.findIndex((p) => p.title === project.title) > currentIndex ? 1 : -1)
                        setCurrentIndex(projects.findIndex((p) => p.title === project.title))
                      }}
                    >
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  )
}

