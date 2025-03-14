"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ChevronLeft, ChevronRight, Code, ArrowRight } from "lucide-react"

// Reduced to 3 projects with Account Verification as the main one
const projects = [
  {
    id: "account-verification",
    title: "Account Verification BoilerPlate",
    description:
      "A comprehensive solution for verifying bank accounts using the Basiq API. This starter kit provides secure account verification, real-time balance checking, and transaction history analysis.",
    tech: ["JavaScript", "React", "Node.js", "OpenAPI"],
    repoUrl: "https://github.com/basiqio-oss/account-verification-v3",
    demoUrl: "https://av-demo.basiq.io/",
    image: "https://files.readme.io/2dcf482-DevHub_StarterKit_1080x800.png?height=600&width=800",
    color: "#3b82f6", // blue
    features: [
      "Secure account verification with multi-factor authentication",
      "Real-time balance checking and account monitoring",
      "Transaction history analysis with data visualization",
      "User-friendly interface with responsive design",
    ],
  },
  {
    id: "income-expense-verification-starterkit",
    title: "Income/Expense Verification BoilerPlate",
    description: "The Income/Expense Verification StarterKit automates the process of verifying a user's income and expenses. By securely connecting their bank account, it generates a comprehensive verification report through our Reports API.",
    tech: ["JavaScript", "Node.js", "REST API", "AWS Lambda"],
    repoUrl: "https://github.com/Basiq-Income-Expense-Verification-StarterKit",
    demoUrl: "https://iv-demo.basiq.io/",
    image: "https://files.readme.io/88fc8ac887132e1a095a02367f990af654547c3ace1f0bfed07badcc4c6329a8-ssvve.png?height=600&width=800",
    color: "#10B981",
    features: [
      "Secure bank account connection for income and expense data",
      "Automated report generation using our Reports API",
      "Detailed user-level analysis with metrics like average monthly income and stability",
      "Customizable filters for tailored report generation"
    ]
  },
  {
    id: "api-reference",
    title: "Basiq Developer Hub",
    description:
      "The official API reference for the Basiq platform, providing comprehensive documentation on endpoints, parameters, and responses for developers integrating with the platform.",
    tech: ["JavaScript", "OpenAPI", "Swagger", "HTML/CSS"],
    repoUrl: "https://github.com/basiqio-oss/basiq-docs",
    demoUrl: "https://api.basiq.io/",
    image: "/api-ref.png?height=600&width=800",
    color: "#10b981", // green
    features: [
      "Interactive API explorer with request/response examples",
      "Comprehensive OpenAPI specification",
      "Authentication guides and security documentation",
      "Error handling and troubleshooting resources",
    ],
  },
]

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Handle autoplay functionality
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
      }, 5000)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay])

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  const nextProject = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
    setAutoplay(false)
    setTimeout(() => setAutoplay(true), 5000)
  }

  const prevProject = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
    setAutoplay(false)
    setTimeout(() => setAutoplay(true), 5000)
  }

  const goToProject = (index: number) => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    setCurrentIndex(index)
    setAutoplay(false)
    setTimeout(() => setAutoplay(true), 5000)
  }

  const currentProject = projects[currentIndex]

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
          My Work
        </Badge>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-600">
          Featured Projects
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto"></div>
      </motion.div>

      <div className="relative mb-20" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={sliderRef}>
        {/* Project Slider Navigation */}
        <div className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevProject}
            className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary/20 shadow-lg"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>

        <div className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2">
          <Button
            variant="outline"
            size="icon"
            onClick={nextProject}
            className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary/20 shadow-lg"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Progress Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToProject(index)}
              className="group"
              aria-label={`Go to project ${index + 1}`}
            >
              <div className="w-12 h-1 rounded-full transition-all duration-300 overflow-hidden bg-white/30 group-hover:bg-white/50">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: index === currentIndex ? "0%" : "100%" }}
                  animate={{
                    width: index === currentIndex ? "100%" : "0%",
                  }}
                  transition={{
                    duration: index === currentIndex ? 5 : 0.3,
                    ease: "linear",
                  }}
                />
              </div>
            </button>
          ))}
        </div>

        {/* Project Slider */}
        <div className="overflow-hidden rounded-xl shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Project Background */}
              <div
                className="h-[600px] relative overflow-hidden"
                style={{
                  background: `linear-gradient(to right, ${currentProject.color}20, ${currentProject.color}40)`,
                }}
              >
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full opacity-20"
                      style={{
                        background: currentProject.color,
                        width: `${Math.random() * 100 + 50}px`,
                        height: `${Math.random() * 100 + 50}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        x: [0, Math.random() * 100 - 50],
                        y: [0, Math.random() * 100 - 50],
                      }}
                      transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    />
                  ))}
                </div>

                {/* Project Content */}
                <div className="absolute inset-0 flex flex-col md:flex-row items-center">
                  {/* Project Image/Preview */}
                  <motion.div
                    className="w-full md:w-1/2 p-8 flex items-center justify-center"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="relative w-full max-w-md aspect-video rounded-xl overflow-hidden shadow-2xl group">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                        <div className="flex gap-4">
                          <Button size="sm" variant="outline" className="bg-background/80 backdrop-blur-sm" asChild>
                            <a href={currentProject.repoUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 mr-2" />
                              Code
                            </a>
                          </Button>
                          <Button size="sm" className="bg-primary/90 backdrop-blur-sm" asChild>
                            <a href={currentProject.demoUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Demo
                            </a>
                          </Button>
                        </div>
                      </div>
                      <img
                        src={currentProject.image || "/placeholder.svg"}
                        alt={currentProject.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </motion.div>

                  {/* Project Details */}
                  <motion.div
                    className="w-full md:w-1/2 p-8"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="flex flex-wrap gap-2 mb-4">
                      {currentProject.tech.map((tech, index) => (
                        <Badge
                          key={index}
                          style={{ backgroundColor: `${currentProject.color}30`, color: currentProject.color }}
                          className="font-medium"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <h3 className="text-3xl font-bold mb-4" style={{ color: currentProject.color }}>
                      {currentProject.title}
                    </h3>

                    <p className="text-foreground/80 mb-6 text-lg">{currentProject.description}</p>

                    <div className="space-y-4 mb-8">
                      <h4 className="text-xl font-semibold mb-2">Key Features</h4>
                      <ul className="space-y-3">
                        {currentProject.features.map((feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                            className="flex items-start gap-2"
                          >
                            <div
                              className="p-1 rounded-full mt-1"
                              style={{ backgroundColor: `${currentProject.color}30` }}
                            >
                              <Code className="h-4 w-4" style={{ color: currentProject.color }} />
                            </div>
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-4">
                      <Button asChild>
                        <a href={currentProject.demoUrl} target="_blank" rel="noopener noreferrer">
                          View Project
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" asChild>
                        <a href={currentProject.repoUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          Source Code
                        </a>
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Project Cards */}
      <div className="mt-20">
        <h3 className="text-2xl font-bold mb-8 text-center">All Projects</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Card
                className="h-full overflow-hidden group border-2 transition-all duration-300 hover:shadow-xl"
                style={{ borderColor: index === currentIndex ? project.color : "transparent" }}
              >
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)`,
                      backgroundSize: "200% 200%",
                      animation: "gradient 5s ease infinite",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${project.color}30` }}
                    >
                      <Code className="h-8 w-8" style={{ color: project.color }} />
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.slice(0, 2).map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs" style={{ color: project.color }}>
                        {tech}
                      </Badge>
                    ))}
                    {project.tech.length > 2 && (
                      <Badge variant="outline" className="text-xs" style={{ color: project.color }}>
                        +{project.tech.length - 2}
                      </Badge>
                    )}
                  </div>

                  <h4
                    className="text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-primary"
                    style={{ color: index === currentIndex ? project.color : undefined }}
                  >
                    {project.title}
                  </h4>

                  <p className="text-foreground/70 text-sm mb-4 line-clamp-3">{project.description}</p>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-center gap-2 mt-2 group-hover:bg-primary/10"
                    onClick={() => goToProject(index)}
                    style={{ color: project.color }}
                  >
                    View Details
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

