"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, QrCode } from "lucide-react"
import { UserAvatarIcon, AliAvatar, SaraAvatar, AhmedAvatar, FatimaAvatar } from "@/components/icons/contact-avatars"

interface MobilePaymentProps {
  onBack?: () => void
}

export function MobilePayment({ onBack }: MobilePaymentProps) {
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")
  const [balance] = useState(2.5)

  const recentContacts = [
    { name: "Ali", avatar: AliAvatar },
    { name: "Sara", avatar: SaraAvatar },
    { name: "Ahmed", avatar: AhmedAvatar },
    { name: "Fatima", avatar: FatimaAvatar },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F23] to-[#1A1A2E] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <button onClick={onBack} className="text-white hover:text-gray-300">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-white">Send Payment</h1>
        <div className="w-6" />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Recipient Section */}
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 mx-auto mb-4 flex items-center justify-center text-white">
            <UserAvatarIcon />
          </div>
          <Input
            placeholder="Enter recipient name or address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 text-center"
          />
          <button className="mt-4 text-purple-400 hover:text-purple-300 flex items-center justify-center gap-2 mx-auto">
            <QrCode className="w-5 h-5" />
            <span className="text-sm">Scan QR</span>
          </button>
        </div>

        {/* Amount Section */}
        <div className="text-center">
          <input
            type="text"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-6xl font-bold text-white bg-transparent text-center w-full outline-none placeholder:text-gray-600"
          />
          <p className="text-gray-400 text-sm mt-2">≈ ${(Number.parseFloat(amount) * 150).toFixed(2)} USD</p>
        </div>

        {/* Token Toggle */}
        <div className="flex gap-2 justify-center">
          <button className="px-6 py-2 rounded-full bg-purple-500/30 border border-purple-500 text-white text-sm font-semibold">
            SOL
          </button>
          <button className="px-6 py-2 rounded-full bg-white/5 border border-white/20 text-gray-400 text-sm font-semibold hover:bg-white/10">
            USDC
          </button>
        </div>

        {/* Balance Section */}
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm">Available Balance</p>
          <p className="text-2xl font-bold text-white">{balance} SOL</p>
          <Button variant="outline" className="mt-3 border-white/20 text-white hover:bg-white/10 w-full bg-transparent">
            Max
          </Button>
        </div>

        {/* Recent Contacts */}
        <div>
          <p className="text-gray-400 text-sm mb-3">Recent Contacts</p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {recentContacts.map((contact) => {
              const AvatarComponent = contact.avatar
              return (
                <button
                  key={contact.name}
                  className="flex flex-col items-center gap-2 flex-shrink-0 hover:opacity-80 transition"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 border border-white/20 flex items-center justify-center text-white">
                    <AvatarComponent />
                  </div>
                  <p className="text-xs text-gray-400">{contact.name}</p>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="p-4 border-t border-white/10 bg-gradient-to-t from-[#0F0F23] to-transparent">
        <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0 py-6 text-lg rounded-full">
          Continue
        </Button>
      </div>
    </div>
  )
}
