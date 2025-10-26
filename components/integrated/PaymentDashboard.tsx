"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Download, History, Copy, QrCode, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useBalance } from "@/hooks/useBalance"
import { useTransactions } from "@/hooks/useTransactions"
import { useSendTransaction } from "@/hooks/useSendTransaction"
import { formatWalletAddress, formatRelativeTime, formatNumber } from "@/lib/utils"
import { getExplorerUrl, isValidPublicKey } from "@/lib/solana"
import { QRCodeSVG } from "qrcode.react"
import { copyToClipboard } from "@/lib/utils"
import toast from "react-hot-toast"
import { TransactionConfirmModal } from "./TransactionConfirmModal"
import { BlinkGenerator } from "@/components/BlinkGenerator"

export function PaymentDashboard() {
  const { publicKey, connected } = useWallet()
  const { balance, loading: balanceLoading } = useBalance()
  const { transactions, loading: txLoading } = useTransactions(10)
  const { send, loading: sending } = useSendTransaction()
  
  const [activeTab, setActiveTab] = useState("send")
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")
  const [currency, setCurrency] = useState<"SOL" | "USDC">("SOL")
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [errors, setErrors] = useState<{ recipient?: string; amount?: string }>({})

  const walletAddress = publicKey?.toBase58() || ""

  const handleMaxClick = () => {
    const maxBalance = currency === "SOL" ? balance.sol : balance.usdc
    const maxAmount = currency === "SOL" ? Math.max(0, maxBalance - 0.001) : maxBalance
    setAmount(maxAmount.toString())
  }

  const validateForm = (): boolean => {
    const newErrors: { recipient?: string; amount?: string } = {}

    if (!recipient) {
      newErrors.recipient = "Recipient address is required"
    } else if (!isValidPublicKey(recipient)) {
      newErrors.recipient = "Invalid Solana address"
    }

    const amountNum = parseFloat(amount)
    if (!amount || isNaN(amountNum)) {
      newErrors.amount = "Amount is required"
    } else if (amountNum <= 0) {
      newErrors.amount = "Amount must be greater than 0"
    } else {
      const maxBalance = currency === "SOL" ? balance.sol : balance.usdc
      if (amountNum > maxBalance) {
        newErrors.amount = `Insufficient balance`
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleReviewTransaction = () => {
    if (validateForm()) {
      setShowConfirmModal(true)
    }
  }

  const handleConfirmTransaction = async () => {
    try {
      const signature = await send({
        recipient,
        amount: parseFloat(amount),
        token: currency,
      })

      toast.success(
        <div className="flex flex-col gap-1">
          <div className="font-semibold">Transaction Successful!</div>
          <a
            href={getExplorerUrl(signature, 'tx')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-solana-green hover:underline"
          >
            View on Explorer →
          </a>
        </div>,
        { duration: 6000 }
      )

      setRecipient("")
      setAmount("")
      setShowConfirmModal(false)
    } catch (error: any) {
      console.error('Transaction error:', error)
      toast.error(error?.message || 'Transaction failed')
    }
  }

  const handleCopyAddress = async () => {
    const success = await copyToClipboard(walletAddress)
    if (success) {
      toast.success('Address copied to clipboard')
    }
  }

  if (!connected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F0F23] to-[#1A1A2E] flex items-center justify-center p-4">
        <Card className="glass p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h2>
          <p className="text-gray-400 mb-6">Please connect your Solana wallet to access the payment dashboard</p>
        </Card>
      </div>
    )
  }

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
                  onChange={(e) => {
                    setRecipient(e.target.value)
                    setErrors({ ...errors, recipient: undefined })
                  }}
                  className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 ${
                    errors.recipient ? 'border-red-500' : ''
                  }`}
                />
                {errors.recipient && (
                  <p className="text-xs text-red-400 mt-1">{errors.recipient}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Amount</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="0.00"
                    type="number"
                    step="any"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value)
                      setErrors({ ...errors, amount: undefined })
                    }}
                    className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 ${
                      errors.amount ? 'border-red-500' : ''
                    }`}
                  />
                  <Button 
                    variant="outline" 
                    onClick={handleMaxClick}
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    Max
                  </Button>
                </div>
                {errors.amount && (
                  <p className="text-xs text-red-400 mt-1">{errors.amount}</p>
                )}
              </div>

              <div className="flex gap-2">
                <Badge 
                  variant="outline" 
                  onClick={() => setCurrency("SOL")}
                  className={`cursor-pointer ${
                    currency === "SOL" 
                      ? "border-purple-500/50 bg-purple-500/10 text-purple-300" 
                      : "border-white/20 text-gray-400"
                  }`}
                >
                  SOL
                </Badge>
                <Badge 
                  variant="outline" 
                  onClick={() => setCurrency("USDC")}
                  className={`cursor-pointer ${
                    currency === "USDC" 
                      ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-300" 
                      : "border-white/20 text-gray-400"
                  }`}
                >
                  USDC
                </Badge>
              </div>

              <div className="text-sm text-gray-400">
                <p>Balance: {formatNumber(currency === "SOL" ? balance.sol : balance.usdc, 4)} {currency}</p>
                <p>Network Fee: ~0.00025 SOL</p>
              </div>

              <Button 
                onClick={handleReviewTransaction}
                disabled={sending}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0"
              >
                {sending ? 'Processing...' : 'Review Transaction'}
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
              <div className="bg-white rounded-lg p-4 flex items-center justify-center">
                <QRCodeSVG
                  value={`solana:${walletAddress}`}
                  size={160}
                  level="H"
                  includeMargin={true}
                  fgColor="#0F0F23"
                  bgColor="#FFFFFF"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Your Address</label>
                <div className="flex gap-2">
                  <Input
                    value={formatWalletAddress(walletAddress, 8)}
                    readOnly
                    className="bg-white/5 border-white/10 text-gray-400 text-sm"
                  />
                  <Button
                    variant="outline"
                    onClick={handleCopyAddress}
                    className="border-white/20 text-white hover:bg-white/10 px-3 bg-transparent"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-400 mb-1">Current Balance</p>
                <p className="text-2xl font-bold text-white">{formatNumber(balance.sol, 4)} SOL</p>
                {balance.usdc > 0 && (
                  <p className="text-sm text-gray-400 mt-1">{formatNumber(balance.usdc, 2)} USDC</p>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 my-4" />

              {/* Blink Generator */}
              <BlinkGenerator />
            </div>
          </Card>

          {/* Transaction History */}
          <Card className="glass p-6 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <History className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {txLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-white/5 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : transactions.length === 0 ? (
                <div className="text-center py-8">
                  <History className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">No transactions yet</p>
                </div>
              ) : (
                transactions.slice(0, 5).map((tx, idx) => (
                  <div
                    key={idx}
                    onClick={() => window.open(getExplorerUrl(tx.signature, 'tx'), '_blank')}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition cursor-pointer"
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
                        <p className="text-sm font-semibold text-white capitalize">{tx.type}</p>
                        <p className="text-xs text-gray-400">{formatRelativeTime(tx.timestamp)}</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-white">
                      {formatNumber(tx.amount, 4)} {tx.token}
                    </p>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Transaction Confirmation Modal */}
      <TransactionConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        recipient={recipient}
        amount={parseFloat(amount) || 0}
        token={currency}
        onConfirm={handleConfirmTransaction}
      />
    </div>
  )
}
