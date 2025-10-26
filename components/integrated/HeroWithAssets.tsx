"use client"

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowDown, TrendingUp, Users, Zap, DollarSign } from "lucide-react"
import { useState, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useRouter } from "next/navigation"
import { WalletButton } from "@/components/wallet/WalletButton"
import { AnimatedCoin } from "@/components/AnimatedCoin"
import { FeatureIcon } from "@/components/icons/FeatureIcon"

export function HeroWithAssets() {
  const [isVisible, setIsVisible] = useState(false)
  const { connected } = useWallet()
  const router = useRouter()
  const { scrollY } = useScroll()
  
  // Parallax effect for background
  const y = useTransform(scrollY, [0, 500], [0, 150])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleLaunchApp = () => {
    if (connected) {
      router.push('/dashboard')
    } else {
      document.querySelector('[data-wallet-button]')?.click()
    }
  }

  const stats = [
    { label: "127K+ Transactions", icon: TrendingUp },
    { label: "$2.4M Volume", icon: DollarSign },
    { label: "8.3K Users", icon: Users },
    { label: "1.8s Avg Speed", icon: Zap },
  ]

  const features = [
    { icon: 'speed' as const, title: 'Lightning Fast', description: 'Transactions in under 2 seconds' },
    { icon: 'security' as const, title: 'Secure', description: 'Battle-tested blockchain' },
    { icon: 'low-fee' as const, title: 'Low Fees', description: 'Less than $0.01 per transaction' },
  ]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Hero Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <Image
          src="/hero-bg.webp"
          alt="Hero Background"
          fill
          className="object-cover opacity-20"
          priority
          quality={90}
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F0F23]/60 to-[#0F0F23]" />
      </motion.div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Wallet Button - Top Right */}
      <div className="absolute top-8 right-8 z-20">
        <WalletButton />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Animated 3D Solana Coin */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-8"
        >
          <AnimatedCoin size={120} />
        </motion.div>

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

        {/* Feature Icons Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              <Card className="glass p-6 text-center hover:bg-white/15 transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <FeatureIcon icon={feature.icon} size={64} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Grid */}
        <div
          className={`transition-all duration-1000 delay-500 grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="glass p-6 text-center hover:bg-white/15 transition animate-glow">
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
