"use client"

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { WalletButtonPremium } from '@/components/wallet/WalletButtonPremium'

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: 'transparent' }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/logo.png"
                alt="SolPay Express Logo"
                width={180}
                height={50}
                priority
                className="hover:drop-shadow-[0_0_20px_rgba(153,69,255,0.6)] transition-all duration-300"
              />
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="text-gray-300 hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
          </div>

          {/* Premium Wallet Button */}
          <WalletButtonPremium variant="gradient" />
        </div>
      </div>
    </motion.nav>
  )
}
