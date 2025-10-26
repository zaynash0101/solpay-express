"use client"

import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-purple-500" />
          <span className="text-xl font-bold gradient-text">SolPay</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-300 hover:text-white transition">
            Features
          </a>
          <a href="#how-it-works" className="text-gray-300 hover:text-white transition">
            How It Works
          </a>
          <a href="#about" className="text-gray-300 hover:text-white transition">
            About
          </a>
        </div>

        <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0">
          Launch App
        </Button>
      </div>
    </nav>
  )
}
