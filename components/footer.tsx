"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-background border-t border-border py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="text-primary">{"<"}</span>
              <span>Ashman Malik</span>
              <span className="text-primary">{"/>"}</span>
            </h3>
            <p className="text-foreground/70 mt-2">Product Owner & Developer Experience Specialist</p>
          </div>

          <div className="flex gap-4 mb-6 md:mb-0">
            <Button variant="outline" size="icon" asChild>
              <a href="mailto:ashman.malik@outlook.com" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="https://github.com/Cuscal-Ashman" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a
                href="https://www.linkedin.com/in/ashman-malik"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToTop}
            className="bg-primary/10 hover:bg-primary/20"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5 text-primary" />
          </Button>
        </div>

        <div className="border-t border-border mt-6 pt-6 text-center">
          <p className="text-foreground/70 text-sm">© {new Date().getFullYear()} Ashman Malik. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

