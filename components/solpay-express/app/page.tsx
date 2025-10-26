"use client"

import { Hero } from "@/components/landing/hero"
import { Navigation } from "@/components/landing/navigation"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0F0F23] to-[#1A1A2E]">
      <Navigation />
      <Hero />
    </main>
  )
}
