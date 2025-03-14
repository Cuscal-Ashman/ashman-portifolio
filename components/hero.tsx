"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import ErrorBoundary from "@/components/error-boundary"

// Fallback component when 3D fails
function HeroFallback() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Hi, I'm <span className="animated-gradient-text">Ashman Malik</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl font-medium text-foreground/80 mb-6"
          >
            Product Owner & Developer Experience Specialist
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-foreground/70 mb-8 max-w-xl mx-auto lg:mx-0"
          >
            With 5+ years of experience in product development and technical roles, I specialize in enhancing developer
            experiences and building innovative solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <Button size="lg" className="gap-2">
              <Mail className="h-4 w-4" />
              Contact Me
            </Button>
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <a href="https://github.com/Cuscal-Ashman" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <a href="https://www.linkedin.com/in/ashman-malik" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </Button>
          </motion.div>
        </div>

        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="w-full h-[400px] bg-gradient-to-br from-primary/20 via-purple-500/10 to-blue-600/20 rounded-lg flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary to-purple-500 animate-pulse flex items-center justify-center">
                  <div className="w-56 h-56 rounded-full bg-background flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-2">Product Owner</h3>
                      <p className="text-foreground/70">Developer Experience Specialist</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating skill bubbles */}
              <motion.div
                className="absolute top-1/4 left-1/4 bg-blue-500/80 text-white px-3 py-1 rounded-full text-sm"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              >
                React
              </motion.div>

              <motion.div
                className="absolute bottom-1/4 right-1/4 bg-green-500/80 text-white px-3 py-1 rounded-full text-sm"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              >
                Node.js
              </motion.div>

              <motion.div
                className="absolute top-1/3 right-1/3 bg-purple-500/80 text-white px-3 py-1 rounded-full text-sm"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              >
                API Design
              </motion.div>

              <motion.div
                className="absolute bottom-1/3 left-1/3 bg-amber-500/80 text-white px-3 py-1 rounded-full text-sm"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              >
                Agile
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="flex flex-col items-center"
        >
          <div className="w-8 h-14 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
          </div>
          <p className="mt-2 text-foreground/70">Scroll to explore</p>
        </motion.div>
      </div>
    </div>
  )
}

// Enhanced 3D Hero component with proper error handling
export default function Hero() {
  return (
    <ErrorBoundary fallback={<HeroFallback />}>
      <HeroFallback />
    </ErrorBoundary>
  )
}

