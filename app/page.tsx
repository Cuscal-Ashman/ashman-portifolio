"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import ScrollProgress from "@/components/scroll-progress"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)

    // Simulate loading completion
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null

  return (
    <main className="relative">
      <ScrollProgress />

      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          >
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-8">
                <motion.div
                  className="absolute inset-0 rounded-full border-t-4 border-primary"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full border-t-4 border-primary/70"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-4 rounded-full border-t-4 border-primary/40"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              </div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold mb-2"
              >
                Ashman Malik
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-foreground/70"
              >
                Loading Portfolio Experience...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Header />

      <section id="hero" className="min-h-screen pt-20">
        <Hero />
      </section>

      <section id="about" className="py-20 bg-secondary/30">
        <About />
      </section>

      <section id="experience" className="py-20">
        <Experience />
      </section>

      <section id="skills" className="py-20 bg-secondary/30">
        <Skills />
      </section>

      <section id="projects" className="py-20">
        <Projects />
      </section>

      <section id="contact" className="py-20 bg-secondary/30">
        <Contact />
      </section>

      <Footer />
    </main>
  )
}

