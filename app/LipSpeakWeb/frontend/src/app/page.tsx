/**
 * @authors Anish, Bidipta, Dibyasmita 
 * @date 4-12-2025
 * @description Main page
 * @returns a tsx page
 */


"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { Features } from "@/components/features"
import { DemoSection } from "@/components/demo-section"
import { UploadSection } from "@/components/upload-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <Features />
        <DemoSection />
        <UploadSection />
      </main>
      <Footer />
    </div>
  )
}
