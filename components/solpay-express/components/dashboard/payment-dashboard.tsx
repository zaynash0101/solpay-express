"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Download, History, Copy, QrCode, ArrowUpRight, ArrowDownLeft } from "lucide-react"

export function PaymentDashboard() {
  const [activeTab, setActiveTab] = useState("send")
  const [balance] = useState(2.5)
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")

  const transactions = [
    { type: "sent", amount: 0.5, address: "wallet...abc123", time: "2 hours ago", token: "SOL" },
    { type: "received", amount: 1.2, address: "wallet...def456", time: "5 hours ago", token: "USDC" },
    { type: "sent", amount: 0.3, address: "wallet...ghi789", time: "1 day ago", token: "SOL" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F23] to-[#1A1A2E] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Payment Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Send Payment */}
          <Card className="glass p-6 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Send className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold text-white">Send Payment</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Recipient Address</label>
                <Input
                  placeholder="Enter Solana address"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Amount</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                    Max
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Badge variant="outline" className="border-purple-500/50 bg-purple-500/10 text-purple-300">
                  SOL
                </Badge>
                <Badge variant="outline" className="border-white/20 text-gray-400">
                  USDC
                </Badge>
              </div>

              <div className="text-sm text-gray-400">
                <p>Balance: {balance} SOL</p>
                <p>Network Fee: ~0.00025 SOL</p>
              </div>

              <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0">
                Review Transaction
              </Button>
            </div>
          </Card>

          {/* Receive Payment */}
          <Card className="glass p-6 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Download className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Receive Payment</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 flex items-center justify-center">
                <QrCode className="w-32 h-32 text-gray-600" />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Your Address</label>
                <div className="flex gap-2">
                  <Input
                    value="wallet...abc123def456"
                    readOnly
                    className="bg-white/5 border-white/10 text-gray-400 text-sm"
                  />
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 px-3 bg-transparent"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent">
                Share Payment Link
              </Button>
            </div>
          </Card>

          {/* Transaction History */}
          <Card className="glass p-6 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <History className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {transactions.map((tx, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${tx.type === "sent" ? "bg-red-500/20" : "bg-green-500/20"}`}>
                      {tx.type === "sent" ? (
                        <ArrowUpRight className="w-4 h-4 text-red-400" />
                      ) : (
                        <ArrowDownLeft className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{tx.type === "sent" ? "Sent" : "Received"}</p>
                      <p className="text-xs text-gray-400">{tx.time}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    {tx.amount} {tx.token}
                  </p>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full mt-4 border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              Load More
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
