"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Share2, Twitter, CheckCircle, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function DemoPage() {
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState('10')
  const [generatedLink, setGeneratedLink] = useState('')

  const handleGenerateLink = () => {
    const demoWallet = '7xKXyZ9mN3pQrS4tUvWxYzBcDeF8gHiJkLmNoPqRsTuV'
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin
    const link = `${baseUrl}/pay?to=${demoWallet}&amount=${amount}&token=USDC`
    setGeneratedLink(link)
    setStep(2)
  }

  const handleShareTwitter = () => {
    setStep(3)
  }

  const handlePayment = () => {
    setStep(4)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F23] to-[#1A1A2E]">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Solana Actions (Blinks) Demo
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See how payment links work on social media with one-click payments
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= num
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white'
                      : 'bg-white/10 text-gray-500'
                  }`}
                >
                  {step > num ? <CheckCircle className="w-6 h-6" /> : num}
                </div>
                {num < 4 && (
                  <div
                    className={`w-24 h-1 mx-2 ${
                      step > num ? 'bg-gradient-to-r from-purple-600 to-cyan-500' : 'bg-white/10'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-400">
            <span>Generate</span>
            <span>Share</span>
            <span>Preview</span>
            <span>Pay</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-2xl mx-auto">
          {/* Step 1: Generate Link */}
          {step === 1 && (
            <Card className="glass p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Step 1: Generate Payment Link
              </h2>
              <p className="text-gray-400 mb-6">
                Create a shareable payment link (blink) that works on Twitter, Discord, and more.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Amount (USDC)</label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <Button
                  onClick={handleGenerateLink}
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Generate Payment Link
                </Button>
              </div>
            </Card>
          )}

          {/* Step 2: Share Link */}
          {step === 2 && (
            <Card className="glass p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Step 2: Share on Social Media
              </h2>
              <p className="text-gray-400 mb-6">
                Your payment link is ready! Share it on Twitter to see the magic.
              </p>

              <div className="bg-white/5 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-400 mb-2">Your Payment Link</p>
                <p className="text-xs text-gray-300 font-mono break-all">{generatedLink}</p>
              </div>

              <Button
                onClick={handleShareTwitter}
                className="w-full bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white border-0 mb-3"
              >
                <Twitter className="w-4 h-4 mr-2" />
                Share on Twitter
              </Button>

              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Card>
          )}

          {/* Step 3: Twitter Preview */}
          {step === 3 && (
            <Card className="glass p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Step 3: Twitter Card Preview
              </h2>
              <p className="text-gray-400 mb-6">
                This is how your payment link appears on Twitter with an interactive card.
              </p>

              {/* Twitter Card Mockup */}
              <Card className="bg-[#16181C] border-[#2F3336] p-4 mb-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-semibold">Demo User</span>
                      <span className="text-gray-500">@demouser · now</span>
                    </div>
                    <p className="text-white mb-3">
                      Send me {amount} USDC via SolPay Express! 💸
                    </p>
                  </div>
                </div>

                {/* Interactive Card */}
                <div className="border border-[#2F3336] rounded-2xl overflow-hidden">
                  <div className="relative h-48 bg-gradient-to-br from-purple-900/50 to-cyan-900/50">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-2">💸</div>
                        <div className="text-2xl font-bold text-white">{amount} USDC</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-[#16181C]">
                    <div className="text-gray-400 text-sm mb-1">solpay-express.vercel.app</div>
                    <div className="text-white font-semibold mb-2">
                      Send {amount} USDC via SolPay Express
                    </div>
                    <Button
                      onClick={handlePayment}
                      className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0"
                    >
                      Pay with Solana Wallet
                    </Button>
                  </div>
                </div>
              </Card>

              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4 mb-6">
                <p className="text-cyan-300 text-sm">
                  ✨ <strong>Notice:</strong> Users can pay directly from Twitter without leaving the platform!
                </p>
              </div>

              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Card>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <Card className="glass p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">
                Payment Successful! 🎉
              </h2>
              <p className="text-gray-400 mb-6">
                The transaction would be executed on Solana blockchain instantly.
                No page redirects, no complex flows - just one click!
              </p>

              <div className="bg-white/5 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Why Solana Actions (Blinks) are Revolutionary:
                </h3>
                <ul className="text-left text-gray-400 space-y-2">
                  <li>✅ Pay directly from social media</li>
                  <li>✅ No app installation required</li>
                  <li>✅ One-click transactions</li>
                  <li>✅ Works on Twitter, Discord, Telegram</li>
                  <li>✅ Instant settlement on Solana</li>
                  <li>✅ Minimal fees (&lt;$0.001)</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  Try Again
                </Button>
                <Link href="/dashboard" className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0">
                    Go to Dashboard
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>
          )}
        </div>

        {/* Info Section */}
        <div className="max-w-4xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
          <Card className="glass p-6 text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-lg font-bold text-white mb-2">Lightning Fast</h3>
            <p className="text-sm text-gray-400">
              Transactions confirm in under 2 seconds on Solana
            </p>
          </Card>

          <Card className="glass p-6 text-center">
            <div className="text-4xl mb-3">🔗</div>
            <h3 className="text-lg font-bold text-white mb-2">Universal Links</h3>
            <p className="text-sm text-gray-400">
              Works on Twitter, Discord, WhatsApp, and more
            </p>
          </Card>

          <Card className="glass p-6 text-center">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="text-lg font-bold text-white mb-2">Low Fees</h3>
            <p className="text-sm text-gray-400">
              Pay less than $0.001 per transaction
            </p>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
