"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowDown, CheckCircle, AlertCircle, Loader } from "lucide-react"

type TransactionState = "pending" | "processing" | "success" | "error"

interface TransactionConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  recipient: string
  amount: number
  token: "SOL" | "USDC"
  onConfirm: () => void
}

export function TransactionConfirmModal({
  isOpen,
  onClose,
  recipient,
  amount,
  token,
  onConfirm,
}: TransactionConfirmModalProps) {
  const [state, setState] = useState<TransactionState>("pending")
  const [txSignature, setTxSignature] = useState("")

  if (!isOpen) return null

  const handleConfirm = async () => {
    setState("processing")
    // Simulate transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setTxSignature("5Tz...abc123")
    setState("success")
    onConfirm()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <Card className="relative glass max-w-md w-full p-8 border-2 border-purple-500/30">
        {state === "pending" && (
          <>
            <h2 className="text-2xl font-bold text-white mb-6">Confirm Transaction</h2>

            <div className="space-y-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="text-center flex-1">
                  <p className="text-sm text-gray-400">From</p>
                  <p className="text-white font-semibold">Your Wallet</p>
                </div>
                <ArrowDown className="w-5 h-5 text-purple-400 mx-4" />
                <div className="text-center flex-1">
                  <p className="text-sm text-gray-400">To</p>
                  <p className="text-white font-semibold text-sm">{recipient.slice(0, 8)}...</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 text-center">
                <p className="text-4xl font-bold gradient-text">{amount}</p>
                <p className="text-gray-400 text-sm mt-2">{token}</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Network Fee</span>
                  <span>~0.00025 SOL</span>
                </div>
                <div className="flex justify-between text-white font-semibold border-t border-white/10 pt-2">
                  <span>Total</span>
                  <span>
                    {amount + 0.00025} {token}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0"
              >
                Confirm & Send
              </Button>
            </div>
          </>
        )}

        {state === "processing" && (
          <div className="text-center py-8">
            <Loader className="w-12 h-12 text-purple-400 mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold text-white mb-2">Processing Transaction</h2>
            <p className="text-gray-400">Please wait while we confirm your transaction...</p>
          </div>
        )}

        {state === "success" && (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Transaction Sent!</h2>
            <p className="text-gray-400 text-sm mb-6">Your payment has been successfully processed.</p>
            <a
              href={`https://solscan.io/tx/${txSignature}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 text-sm font-semibold"
            >
              View on Solscan →
            </a>
            <Button
              onClick={onClose}
              className="w-full mt-4 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0"
            >
              Done
            </Button>
          </div>
        )}

        {state === "error" && (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Transaction Failed</h2>
            <p className="text-gray-400 text-sm mb-6">Something went wrong. Please try again.</p>
            <Button
              onClick={() => setState("pending")}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0"
            >
              Try Again
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
