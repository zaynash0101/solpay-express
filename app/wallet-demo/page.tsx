'use client';

import { WalletButtonPremium } from '@/components/wallet/WalletButtonPremium';
import { Logo, LogoCompact, LogoIcon } from '@/components/brand/Logo';
import { useState } from 'react';

export default function WalletDemoPage() {
  const [showBalance, setShowBalance] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F23] to-[#1a1a3e] text-white p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
            Premium Wallet Components
          </h1>
          <p className="text-xl text-gray-400">
            Inspired by Aerodrome, OpenSea, and Uniswap
          </p>
        </div>

        {/* Logo Showcase */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Logo Variants</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Logo */}
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="text-lg font-semibold mb-4 text-gray-300">Full Logo (Animated)</h3>
              <div className="flex items-center justify-center p-8 bg-black/20 rounded-xl">
                <Logo size="lg" variant="full" animated />
              </div>
            </div>

            {/* Icon Only */}
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="text-lg font-semibold mb-4 text-gray-300">Icon Only</h3>
              <div className="flex items-center justify-center p-8 bg-black/20 rounded-xl">
                <Logo size="xl" variant="icon" animated />
              </div>
            </div>

            {/* Text Only */}
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="text-lg font-semibold mb-4 text-gray-300">Text Only</h3>
              <div className="flex items-center justify-center p-8 bg-black/20 rounded-xl">
                <Logo size="xl" variant="text" animated />
              </div>
            </div>

            {/* Compact */}
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="text-lg font-semibold mb-4 text-gray-300">Compact Logo</h3>
              <div className="flex items-center justify-center p-8 bg-black/20 rounded-xl">
                <LogoCompact />
              </div>
            </div>
          </div>

          {/* Size Variations */}
          <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-gray-300">Size Variations</h3>
            <div className="flex items-center justify-around flex-wrap gap-8 p-8 bg-black/20 rounded-xl">
              <Logo size="sm" variant="full" animated={false} />
              <Logo size="md" variant="full" animated={false} />
              <Logo size="lg" variant="full" animated={false} />
              <Logo size="xl" variant="full" animated={false} />
            </div>
          </div>

          {/* App Icons */}
          <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-gray-300">App Icons / Favicons</h3>
            <div className="flex items-center justify-around flex-wrap gap-8 p-8 bg-black/20 rounded-xl">
              <LogoIcon size={32} />
              <LogoIcon size={48} />
              <LogoIcon size={64} />
              <LogoIcon size={96} />
            </div>
          </div>
        </section>

        {/* Wallet Button Showcase */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Wallet Button Variants</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Gradient */}
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 space-y-4">
              <h3 className="text-lg font-semibold text-gray-300">Gradient (Default)</h3>
              <div className="flex items-center justify-center p-8 bg-black/20 rounded-xl">
                <WalletButtonPremium variant="gradient" />
              </div>
              <p className="text-sm text-gray-400">Best for primary CTAs</p>
            </div>

            {/* Outline */}
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 space-y-4">
              <h3 className="text-lg font-semibold text-gray-300">Outline</h3>
              <div className="flex items-center justify-center p-8 bg-black/20 rounded-xl">
                <WalletButtonPremium variant="outline" />
              </div>
              <p className="text-sm text-gray-400">Best for secondary actions</p>
            </div>

            {/* Glass */}
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 space-y-4">
              <h3 className="text-lg font-semibold text-gray-300">Glass</h3>
              <div className="flex items-center justify-center p-8 bg-black/20 rounded-xl">
                <WalletButtonPremium variant="glass" />
              </div>
              <p className="text-sm text-gray-400">Best for overlays</p>
            </div>
          </div>

          {/* With Balance */}
          <div className="p-8 bg-white/5 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-300">With Balance Display</h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showBalance}
                  onChange={(e) => setShowBalance(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-400">Toggle Balance</span>
              </label>
            </div>
            <div className="flex items-center justify-center p-8 bg-black/20 rounded-xl">
              <WalletButtonPremium 
                variant="gradient"
                showBalance={showBalance}
                solBalance={2.5432}
                usdcBalance={150.25}
              />
            </div>
            <p className="text-sm text-gray-400">
              Shows SOL and USDC balances when connected
            </p>
          </div>
        </section>

        {/* Example Navbar */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Example Navigation Bar</h2>
          
          <div className="p-8 bg-white/5 rounded-2xl border border-white/10">
            <div className="bg-black/40 rounded-xl p-4">
              <nav className="flex items-center justify-between">
                <Logo size="md" variant="full" animated />
                <div className="flex items-center gap-4">
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Dashboard
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Invoices
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    Settings
                  </a>
                  <WalletButtonPremium variant="gradient" />
                </div>
              </nav>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Glassmorphism Design',
                description: 'Modern frosted glass effect with backdrop blur',
                icon: '✨'
              },
              {
                title: 'Framer Motion',
                description: 'Smooth animations and transitions',
                icon: '🎬'
              },
              {
                title: 'Wallet Detection',
                description: 'Auto-detect installed Solana wallets',
                icon: '🔍'
              },
              {
                title: 'Error Handling',
                description: 'User-friendly error messages',
                icon: '⚠️'
              },
              {
                title: 'Toast Notifications',
                description: 'Real-time feedback for user actions',
                icon: '🔔'
              },
              {
                title: 'Responsive Design',
                description: 'Works perfectly on all devices',
                icon: '📱'
              }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-400 text-sm py-8 border-t border-white/10">
          <p>Created with inspiration from Aerodrome Finance, OpenSea, and Uniswap</p>
          <p className="mt-2">Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion</p>
        </footer>

      </div>
    </div>
  );
}
