"use client"

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useWallet } from '@solana/wallet-adapter-react'
import { Connection, Transaction, PublicKey, clusterApiUrl } from '@solana/web3.js'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ExternalLink, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { formatWalletAddress } from '@/lib/utils'
import { getExplorerUrl } from '@/lib/solana'
import toast from 'react-hot-toast'

function PaymentPageContent() {
  const searchParams = useSearchParams()
  const { publicKey, signTransaction } = useWallet()
  
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [signature, setSignature] = useState<string>('')
  const [error, setError] = useState<string>('')

  const to = searchParams.get('to')
  const amount = searchParams.get('amount')
  const token = searchParams.get('token') || 'SOL'

  useEffect(() => {
    // Validate parameters on mount
    if (!to) {
      setError('Missing recipient address')
      setStatus('error')
    } else {
      try {
        new PublicKey(to)
      } catch {
        setError('Invalid recipient address')
        setStatus('error')
      }
    }

    if (amount && (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0)) {
      setError('Invalid amount')
      setStatus('error')
    }
  }, [to, amount])

  const handlePayment = async () => {
    if (!publicKey || !signTransaction) {
      toast.error('Please connect your wallet first')
      return
    }

    if (!to || !amount) {
      toast.error('Missing payment details')
      return
    }

    setLoading(true)
    setStatus('processing')
    setError('')

    try {
      // Call the Solana Actions API
      const apiUrl = `${window.location.origin}/api/actions/pay?to=${to}&amount=${amount}&token=${token}`
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account: publicKey.toBase58(),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create transaction')
      }

      const { transaction: base64Transaction } = await response.json()

      // Deserialize transaction
      const transactionBuffer = Buffer.from(base64Transaction, 'base64')
      const transaction = Transaction.from(transactionBuffer)

      // Sign transaction
      const signedTransaction = await signTransaction(transaction)

      // Send transaction
      const connection = new Connection(
        process.env.NEXT_PUBLIC_HELIUS_RPC_URL || clusterApiUrl('devnet'),
        'confirmed'
      )

      const txSignature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      )

      // Confirm transaction
      await connection.confirmTransaction(txSignature, 'confirmed')

      setSignature(txSignature)
      setStatus('success')
      toast.success('Payment sent successfully!')
    } catch (err: any) {
      console.error('Payment error:', err)
      setError(err.message || 'Payment failed')
      setStatus('error')
      toast.error(err.message || 'Payment failed')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'error' && error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F0F23] to-[#1A1A2E] flex items-center justify-center p-4">
        <Card className="glass max-w-md w-full p-8 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Invalid Payment Link</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go to Home
            </Button>
          </Link>
        </Card>
      </div>
    )
  }

  if (status === 'success' && signature) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F0F23] to-[#1A1A2E] flex items-center justify-center p-4">
        <Card className="glass max-w-md w-full p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
          <p className="text-gray-400 mb-6">
            Your payment of {amount} {token} has been sent successfully.
          </p>
          
          <div className="bg-white/5 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-400 mb-2">Transaction Signature</p>
            <p className="text-xs text-gray-300 font-mono break-all">
              {signature}
            </p>
          </div>

          <div className="flex gap-3">
            <Link href="/" className="flex-1">
              <Button 
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <a
              href={getExplorerUrl(signature, 'tx')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0">
                View on Explorer
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F23] to-[#1A1A2E] flex items-center justify-center p-4">
      <Card className="glass max-w-md w-full p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Image
            src="/logo.png"
            alt="SolPay Express"
            width={160}
            height={45}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white mb-2">Payment Request</h1>
          <p className="text-gray-400 text-sm">Powered by Solana Actions</p>
        </div>

        {/* Payment Details */}
        <div className="space-y-4 mb-8">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">You're about to send</p>
            <p className="text-3xl font-bold text-white">
              {amount || '___'} {token}
            </p>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">To</p>
            <p className="text-lg font-mono text-white">
              {to ? formatWalletAddress(to) : '___'}
            </p>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Network Fee</span>
              <span className="text-sm text-white">~$0.0001</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {!publicKey ? (
          <div className="space-y-3">
            <p className="text-center text-gray-400 text-sm mb-4">
              Connect your Solana wallet to continue
            </p>
            <Link href="/">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0">
                Connect Wallet
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            <Button
              onClick={handlePayment}
              disabled={loading || status === 'processing'}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0"
            >
              {loading || status === 'processing' ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Pay with Solana Wallet
                </>
              )}
            </Button>
            <Link href="/">
              <Button
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </Link>
          </div>
        )}

        {/* Info */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-xs text-gray-500 text-center">
            This payment link was created with SolPay Express.
            <br />
            Transactions are secured by the Solana blockchain.
          </p>
        </div>
      </Card>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-[#0F0F23] to-[#1A1A2E] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    }>
      <PaymentPageContent />
    </Suspense>
  )
}
