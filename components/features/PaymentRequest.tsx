"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Link2, Copy, Mail, MessageCircle, ExternalLink } from "lucide-react"
import { PaymentRequest as PaymentRequestType } from "@/types"
import { savePaymentRequest } from "@/lib/invoiceStorage"
import { isValidPublicKey } from "@/lib/solana"
import { copyToClipboard } from "@/lib/utils"
import toast from "react-hot-toast"

export function PaymentRequest() {
  const [clientWallet, setClientWallet] = useState("")
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState<'SOL' | 'USDC'>('USDC')
  const [description, setDescription] = useState("")
  const [generatedLink, setGeneratedLink] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!clientWallet.trim()) {
      newErrors.clientWallet = 'Client wallet address is required'
    } else if (!isValidPublicKey(clientWallet)) {
      newErrors.clientWallet = 'Invalid Solana address'
    }

    const amountNum = parseFloat(amount)
    if (!amount || isNaN(amountNum)) {
      newErrors.amount = 'Amount is required'
    } else if (amountNum <= 0) {
      newErrors.amount = 'Amount must be greater than 0'
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleGenerateLink = () => {
    if (!validateForm()) {
      toast.error('Please fix the errors')
      return
    }

    const request: PaymentRequestType = {
      id: `req-${Date.now()}`,
      clientWallet: clientWallet.trim(),
      amount: parseFloat(amount),
      currency,
      description: description.trim(),
      status: 'pending',
      createdAt: Date.now(),
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
    }

    savePaymentRequest(request)

    // Generate link (using Solana Actions format)
    const link = `${window.location.origin}/pay?amount=${request.amount}&currency=${request.currency}&recipient=${clientWallet}&memo=${encodeURIComponent(description)}`
    setGeneratedLink(link)
    toast.success('Payment link generated!')
  }

  const handleCopyLink = async () => {
    const success = await copyToClipboard(generatedLink)
    if (success) {
      toast.success('Link copied to clipboard!')
    }
  }

  const handleShareWhatsApp = () => {
    const message = `Payment Request: ${description}\nAmount: ${amount} ${currency}\n\nPay here: ${generatedLink}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleShareEmail = () => {
    const subject = `Payment Request: ${description}`
    const body = `Hello,\n\nYou have a payment request:\n\nDescription: ${description}\nAmount: ${amount} ${currency}\n\nPlease click the link below to pay:\n${generatedLink}\n\nThank you!`
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoUrl)
  }

  const handleReset = () => {
    setClientWallet("")
    setAmount("")
    setDescription("")
    setGeneratedLink("")
    setErrors({})
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Quick Payment Request</h2>
        <p className="text-gray-400 text-sm">
          Generate a payment link without creating a full invoice
        </p>
      </div>

      <Card className="glass p-6">
        <div className="space-y-4">
          <div>
            <Label className="text-gray-400">Client Wallet Address *</Label>
            <Input
              value={clientWallet}
              onChange={(e) => {
                setClientWallet(e.target.value)
                setErrors({ ...errors, clientWallet: undefined })
              }}
              placeholder="Enter Solana address"
              className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 ${
                errors.clientWallet ? 'border-red-500' : ''
              }`}
            />
            {errors.clientWallet && (
              <p className="text-xs text-red-400 mt-1">{errors.clientWallet}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-400">Amount *</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value)
                  setErrors({ ...errors, amount: undefined })
                }}
                placeholder="0.00"
                className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 ${
                  errors.amount ? 'border-red-500' : ''
                }`}
              />
              {errors.amount && (
                <p className="text-xs text-red-400 mt-1">{errors.amount}</p>
              )}
            </div>

            <div>
              <Label className="text-gray-400">Currency</Label>
              <div className="flex gap-2 mt-2">
                <Badge
                  variant="outline"
                  onClick={() => setCurrency('SOL')}
                  className={`cursor-pointer flex-1 justify-center py-2 ${
                    currency === 'SOL'
                      ? 'border-purple-500/50 bg-purple-500/10 text-purple-300'
                      : 'border-white/20 text-gray-400'
                  }`}
                >
                  SOL
                </Badge>
                <Badge
                  variant="outline"
                  onClick={() => setCurrency('USDC')}
                  className={`cursor-pointer flex-1 justify-center py-2 ${
                    currency === 'USDC'
                      ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300'
                      : 'border-white/20 text-gray-400'
                  }`}
                >
                  USDC
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <Label className="text-gray-400">Description *</Label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
                setErrors({ ...errors, description: undefined })
              }}
              placeholder="Payment for services rendered..."
              rows={3}
              className={`w-full bg-white/5 border rounded-md p-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.description ? 'border-red-500' : 'border-white/10'
              }`}
            />
            {errors.description && (
              <p className="text-xs text-red-400 mt-1">{errors.description}</p>
            )}
          </div>

          <Button
            onClick={handleGenerateLink}
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0"
          >
            <Link2 className="w-4 h-4 mr-2" />
            Generate Payment Link
          </Button>
        </div>
      </Card>

      {generatedLink && (
        <Card className="glass p-6 border-2 border-cyan-500/50">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <h3 className="text-lg font-semibold text-white">Payment Link Generated!</h3>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <Label className="text-gray-400 text-xs mb-2 block">Payment Link</Label>
              <div className="flex gap-2">
                <Input
                  value={generatedLink}
                  readOnly
                  className="bg-white/10 border-white/20 text-cyan-400 text-sm font-mono"
                />
                <Button
                  variant="outline"
                  onClick={handleCopyLink}
                  className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 bg-transparent"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-gray-400 text-sm mb-3 block">Share via:</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  onClick={handleShareWhatsApp}
                  className="border-green-500/50 text-green-400 hover:bg-green-500/10 bg-transparent"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  onClick={handleShareEmail}
                  className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 bg-transparent"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCopyLink}
                  className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 bg-transparent"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-purple-300 mb-2">Payment Details</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount:</span>
                  <span className="text-white font-semibold">{amount} {currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Description:</span>
                  <span className="text-white">{description}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Recipient:</span>
                  <span className="text-cyan-400 text-xs font-mono">
                    {clientWallet.slice(0, 8)}...{clientWallet.slice(-8)}
                  </span>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={handleReset}
              className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              Create Another Request
            </Button>
          </div>
        </Card>
      )}

      {/* Info Banner */}
      <Card className="glass p-4 border-l-4 border-cyan-500">
        <div className="flex gap-3">
          <ExternalLink className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-white mb-1">
              How Payment Requests Work
            </h4>
            <p className="text-xs text-gray-400">
              Share the generated link with your client via WhatsApp, email, or any messaging app. 
              When they click the link, they'll be taken to a payment page where they can pay you 
              instantly using their Solana wallet. No signup required for your client!
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
