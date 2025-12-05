/**
 * @authors Anish, Bidipta, Dibyasmita 
 * @date 4-12-2025
 * @description hero section component
 * @returns a tsx page
 */

"use client"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-[#ff4da6]/10 to-black/60">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-border bg-card/70 px-4 py-2 text-sm text-muted-foreground">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-500" />
            AI-Powered Lip Reading Technology
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Transform Silent Videos Into <span className="text-primary">Meaningful Text</span>
          </h1>

          <p className="mb-8 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
            Upload any video and let our advanced AI analyze lip movements to generate accurate transcriptions. Perfect
            for accessibility, content creation, and more.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="min-w-[160px]" onClick={() => scrollToSection("upload-section")}>
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-w-[160px] bg-transparent border-border/30"
              onClick={() => scrollToSection("demo-section")}
            >
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-border pt-8">
            <div>
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">12k+</div>
              <div className="text-sm text-muted-foreground">Videos Processed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">8k+</div>
              <div className="text-sm text-muted-foreground">Happy Users</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
