/**
 * @author Anish 
 * @date 13-11-2025
 * @description root page design
 * @returns a tsx page
 */

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { DemoSection } from "@/components/demo-section"
import { UploadSection } from "@/components/upload-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <DemoSection />
        <UploadSection />
      </main>
      <Footer />
    </div>
  )
}
