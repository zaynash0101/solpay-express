"use client"

import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Copy, Share2, Twitter, MessageCircle, Send, ExternalLink } from 'lucide-react'
import { copyToClipboard } from '@/lib/utils'
import toast from 'react-hot-toast'
import { BlinkPreview } from './BlinkPreview'

export const BlinkGenerator = () => {
  const { publicKey } = useWallet()
  const [amount, setAmount] = useState('')
  const [token, setToken] = useState<'SOL' | 'USDC'>('USDC')
  const [showPreview, setShowPreview] = useState(false)
  const [generatedLink, setGeneratedLink] = useState('')

  const generateBlinkUrl = () => {
    if (!publicKey) {
      toast.error('Please connect your wallet first')
      return
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin
    const params = new URLSearchParams({
      to: publicKey.toBase58(),
      token: token,
    })

    if (amount && parseFloat(amount) > 0) {
      params.append('amount', amount)
    }

    const blinkUrl = `${baseUrl}/pay?${params.toString()}`
    setGeneratedLink(blinkUrl)
    toast.success('Payment link generated!')
  }

  const handleCopyLink = async () => {
    const success = await copyToClipboard(generatedLink)
    if (success) {
      toast.success('Link copied to clipboard!')
    }
  }

  const shareOnTwitter = () => {
    const text = amount 
      ? `Send me ${amount} ${token} via SolPay Express! 💸`
      : `Send me ${token} via SolPay Express! 💸`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(generatedLink)}`
    window.open(url, '_blank')
  }

  const shareOnWhatsApp = () => {
    const text = amount
      ? `Send me ${amount} ${token} via SolPay Express! ${generatedLink}`
      : `Send me ${token} via SolPay Express! ${generatedLink}`
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const shareOnTelegram = () => {
    const text = amount
      ? `Send me ${amount} ${token} via SolPay Express!`
      : `Send me ${token} via SolPay Express!`
    const url = `https://t.me/share/url?url=${encodeURIComponent(generatedLink)}&text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">Generate Payment Link (Blink)</h3>
      </div>

      <p className="text-sm text-gray-400 mb-4">
        Create a shareable payment link that works on Twitter, Discord, and more!
      </p>

      {/* Amount Input */}
      <div>
        <label className="text-sm text-gray-400 mb-2 block">
          Amount (optional)
        </label>
        <Input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Leave empty to let sender choose amount
        </p>
      </div>

      {/* Token Selection */}
      <div>
        <label className="text-sm text-gray-400 mb-2 block">Token</label>
        <div className="flex gap-2">
          <Button
            variant={token === 'SOL' ? 'default' : 'outline'}
            onClick={() => setToken('SOL')}
            className={
              token === 'SOL'
                ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white border-0'
                : 'border-white/20 text-white hover:bg-white/10 bg-transparent'
            }
          >
            SOL
          </Button>
          <Button
            variant={token === 'USDC' ? 'default' : 'outline'}
            onClick={() => setToken('USDC')}
            className={
              token === 'USDC'
                ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white border-0'
                : 'border-white/20 text-white hover:bg-white/10 bg-transparent'
            }
          >
            USDC
          </Button>
        </div>
      </div>

      {/* Generate Button */}
      <Button
        onClick={generateBlinkUrl}
        disabled={!publicKey}
        className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Generate Payment Link
      </Button>

      {/* Generated Link Display */}
      {generatedLink && (
        <Card className="glass p-4 space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Your Payment Link
            </label>
            <div className="flex gap-2">
              <Input
                value={generatedLink}
                readOnly
                className="bg-white/5 border-white/10 text-gray-300 text-sm"
              />
              <Button
                variant="outline"
                onClick={handleCopyLink}
                className="border-white/20 text-white hover:bg-white/10 px-3 bg-transparent"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Share Buttons */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Share via
            </label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                onClick={shareOnTwitter}
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
              <Button
                variant="outline"
                onClick={shareOnWhatsApp}
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                onClick={shareOnTelegram}
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <Send className="w-4 h-4 mr-2" />
                Telegram
              </Button>
            </div>
          </div>

          {/* Preview Button */}
          <Button
            variant="outline"
            onClick={() => setShowPreview(true)}
            className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Preview Blink
          </Button>
        </Card>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <BlinkPreview
          url={generatedLink}
          amount={amount}
          token={token}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  )
}
