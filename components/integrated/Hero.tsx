"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowDown, TrendingUp, Users, Zap, DollarSign } from "lucide-react"
import { useState, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useRouter } from "next/navigation"
import { WalletButton } from "@/components/wallet/WalletButton"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const { connected } = useWallet()
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleLaunchApp = () => {
    if (connected) {
      router.push('/dashboard')
    }
    // If not connected, WalletButton will handle the connection
  }

  const stats = [
    { label: "< $0.01 Fee", icon: DollarSign },
    { label: "< 2s Speed", icon: Zap },
    { label: "No Int'l Fees", icon: TrendingUp },
    { label: "Instant Settlement", icon: Users },
  ]

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Wallet Button - Top Right */}
      <div className="absolute top-8 right-8 z-20">
        <WalletButton />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Main headline */}
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text leading-tight">
            Invoice & Get Paid Instantly on Solana
          </h1>
        </div>

        {/* Subheadline */}
        <div
          className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Professional invoicing for Pakistani freelancers. Create invoices, share payment links, receive USDC instantly. No international fees. No delays.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className={`transition-all duration-1000 delay-300 flex flex-col sm:flex-row gap-4 justify-center mb-16 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Button 
            onClick={handleLaunchApp}
            className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0 px-8 py-6 text-lg rounded-full"
          >
            {connected ? 'Go to Dashboard' : 'Launch App'}
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
