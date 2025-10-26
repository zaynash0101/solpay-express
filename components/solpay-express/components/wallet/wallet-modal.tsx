"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { X, Check } from "lucide-react"
import { PhantomIcon, SolflareIcon, BackpackIcon, WalletConnectIcon } from "@/components/icons/wallet-icons"

interface Wallet {
  name: string
  icon: React.ComponentType<{ className?: string }>
  isDetected: boolean
}

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (wallet: string) => void
}

export function WalletModal({ isOpen, onClose, onConnect }: WalletModalProps) {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  const wallets: Wallet[] = [
    { name: "Phantom", icon: PhantomIcon, isDetected: true },
    { name: "Solflare", icon: SolflareIcon, isDetected: true },
    { name: "Backpack", icon: BackpackIcon, isDetected: false },
    { name: "WalletConnect", icon: WalletConnectIcon, isDetected: false },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <Card className="relative glass max-w-md w-full p-8 border-2 border-transparent bg-gradient-to-br from-purple-500/20 to-cyan-500/20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Connect Your Wallet</h2>
            <p className="text-gray-400 text-sm mt-1">Choose your preferred Solana wallet</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Wallet Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {wallets.map((wallet) => {
            const Icon = wallet.icon
            return (
              <button
                key={wallet.name}
                onClick={() => {
                  setSelectedWallet(wallet.name)
                  onConnect(wallet.name)
                }}
                className={`relative p-4 rounded-xl transition-all duration-300 ${
                  selectedWallet === wallet.name
                    ? "bg-purple-500/30 border-2 border-purple-500 scale-105"
                    : "bg-white/5 border-2 border-white/10 hover:bg-white/10 hover:border-purple-500/50"
                }`}
              >
                <div className="w-12 h-12 mb-2 text-purple-400">
                  <Icon />
                </div>
                <p className="text-sm font-semibold text-white">{wallet.name}</p>
                {wallet.isDetected && (
                  <div className="absolute top-2 right-2 bg-green-500/20 border border-green-500 rounded-full p-1">
                    <Check className="w-3 h-3 text-green-400" />
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-white/10">
          <a href="#" className="hover:text-white transition">
            New to Solana? →
          </a>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">
              Terms
            </a>
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
          </div>
        </div>
      </Card>
    </div>
  )
}
