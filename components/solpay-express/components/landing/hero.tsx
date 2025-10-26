"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowDown, TrendingUp, Users, Zap, DollarSign } from "lucide-react"
import { useState, useEffect } from "react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const stats = [
    { label: "127K+ Transactions", icon: TrendingUp },
    { label: "$2.4M Volume", icon: DollarSign },
    { label: "8.3K Users", icon: Users },
    { label: "1.8s Avg Speed", icon: Zap },
  ]

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Main headline */}
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text leading-tight">
            Send Money at the Speed of Solana
          </h1>
        </div>

        {/* Subheadline */}
        <div
          className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Instant USDC payments for Pakistani freelancers. No borders. No delays.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className={`transition-all duration-1000 delay-300 flex flex-col sm:flex-row gap-4 justify-center mb-16 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0 px-8 py-6 text-lg rounded-full">
            Launch App
          </Button>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full bg-transparent"
          >
            Watch Demo
          </Button>
        </div>

        {/* Stats Grid */}
        <div
          className={`transition-all duration-1000 delay-500 grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="glass p-6 text-center hover:bg-white/15 transition">
                <Icon className="w-6 h-6 text-cyan-400 mx-auto mb-3" />
                <p className="text-sm md:text-base font-semibold text-white">{stat.label}</p>
              </Card>
            )
          })}
        </div>

        {/* Scroll indicator */}
        <div
          className={`transition-all duration-1000 delay-700 flex justify-center ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="animate-bounce">
            <ArrowDown className="w-6 h-6 text-purple-400" />
          </div>
        </div>
      </div>
    </section>
  )
}
