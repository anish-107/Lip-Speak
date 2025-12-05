/**
 * @authors Anish, Bidipta, Dibyasmita
 * @date 4-12-2025
 * @description header component
 */

"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-gradient-to-r from-black/30 to-black/60 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-primary-foreground"
            >
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
          </div>
          <span className="text-xl font-bold text-foreground">Lipspeak</span>
        </Link>

        {/* Navigation Buttons */}
        <nav className="flex items-center gap-3">

          {/* SAME STYLE + PINK HOVER */}
          <Button
            variant="secondary"
            asChild
            className="px-4 py-2 bg-secondary/60 text-foreground border border-border 
                       hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Link href="/about">About</Link>
          </Button>

          <Button
            variant="secondary"
            asChild
            className="px-4 py-2 bg-secondary/60 text-foreground border border-border 
                       hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Link href="/login">Login</Link>
          </Button>

          <Button
            variant="secondary"
            asChild
            className="px-4 py-2 bg-secondary/60 text-foreground border border-border 
                       hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Link href="/signup">Sign up</Link>
          </Button>

        </nav>
      </div>
    </header>
  )
}
