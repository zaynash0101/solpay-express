"use client"

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, Twitter, MessageSquare } from 'lucide-react'
import Image from 'next/image'

interface BlinkPreviewProps {
  url: string
  amount?: string
  token: string
  onClose: () => void
}

export const BlinkPreview = ({ url, amount, token, onClose }: BlinkPreviewProps) => {
  const displayAmount = amount || 'custom amount'
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://solpay-express.vercel.app'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <Card className="glass max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Blink Preview</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <p className="text-gray-400 mb-6">
            This is how your payment link will appear when shared on social media:
          </p>

          {/* Twitter Preview */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Twitter className="w-5 h-5 text-[#1DA1F2]" />
              <h3 className="text-lg font-semibold text-white">Twitter / X</h3>
            </div>
            
            <Card className="bg-[#16181C] border-[#2F3336] p-4">
              {/* Tweet Content */}
              <div className="mb-3">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-semibold">Your Name</span>
                      <span className="text-gray-500">@yourhandle · now</span>
                    </div>
                    <p className="text-white">
                      Send me {displayAmount} {token} via SolPay Express! 💸
                    </p>
                  </div>
                </div>
              </div>

              {/* Twitter Card */}
              <div className="border border-[#2F3336] rounded-2xl overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-purple-900/50 to-cyan-900/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-2">💸</div>
                      <div className="text-2xl font-bold text-white">
                        {displayAmount} {token}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-[#16181C]">
                  <div className="text-gray-400 text-sm mb-1">solpay-express.vercel.app</div>
                  <div className="text-white font-semibold mb-1">
                    Send {displayAmount} {token} via SolPay Express
                  </div>
                  <div className="text-gray-400 text-sm">
                    Lightning fast Solana payments - Pay directly from Twitter
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Discord Preview */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-5 h-5 text-[#5865F2]" />
              <h3 className="text-lg font-semibold text-white">Discord</h3>
            </div>
            
            <Card className="bg-[#2B2D31] border-[#1E1F22] p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-semibold">Your Name</span>
                    <span className="text-gray-500 text-sm">Today at 12:00 PM</span>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Send me {displayAmount} {token} via SolPay Express! 💸
                  </p>
                  
                  {/* Discord Embed */}
                  <div className="border-l-4 border-purple-500 bg-[#2B2D31] rounded">
                    <div className="p-3">
                      <div className="flex items-start gap-3">
                        <Image
                          src="/logo.png"
                          alt="SolPay"
                          width={60}
                          height={60}
                          className="rounded"
                        />
                        <div className="flex-1">
                          <div className="text-[#00B0F4] text-sm mb-1 hover:underline cursor-pointer">
                            SolPay Express
                          </div>
                          <div className="text-white font-semibold mb-1">
                            Send {displayAmount} {token}
                          </div>
                          <div className="text-gray-400 text-sm">
                            Lightning fast Solana payments
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Action Preview */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              Interactive Payment (Blink)
            </h3>
            <Card className="glass p-6 text-center">
              <div className="text-4xl mb-4">💰</div>
              <h4 className="text-xl font-bold text-white mb-2">
                Send {displayAmount} {token}
              </h4>
              <p className="text-gray-400 text-sm mb-4">
                via SolPay Express
              </p>
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0">
                Pay with Solana Wallet
              </Button>
              <p className="text-xs text-gray-500 mt-3">
                Powered by Solana Actions
              </p>
            </Card>
          </div>

          {/* Info */}
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">✨ How it works</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Share this link on Twitter, Discord, or WhatsApp</li>
              <li>• Recipients see an interactive payment card</li>
              <li>• They can pay directly without leaving the platform</li>
              <li>• Transaction executes instantly on Solana</li>
            </ul>
          </div>

          {/* Close Button */}
          <Button
            onClick={onClose}
            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0"
          >
            Got it!
          </Button>
        </div>
      </Card>
    </div>
  )
}
