"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Calendar, 
  User, 
  Wallet, 
  CheckCircle,
  Download,
  ExternalLink,
  ArrowLeft
} from "lucide-react"
import { Invoice } from "@/types"
import { getInvoiceById, updateInvoiceStatus } from "@/lib/invoiceStorage"
import { formatWalletAddress, formatNumber } from "@/lib/utils"
import { getExplorerUrl } from "@/lib/solana"
import { useWallet } from "@solana/wallet-adapter-react"
import { useSendTransaction } from "@/hooks/useSendTransaction"
import { WalletButton } from "@/components/wallet/WalletButton"
import toast from "react-hot-toast"

export default function InvoicePaymentPage() {
  const params = useParams()
  const router = useRouter()
  const { publicKey, connected } = useWallet()
  const { send, loading: sending } = useSendTransaction()
  
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [loading, setLoading] = useState(true)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [transactionSignature, setTransactionSignature] = useState("")

  useEffect(() => {
    if (params.id) {
      const inv = getInvoiceById(params.id as string)
      setInvoice(inv)
      setLoading(false)
      
      if (inv?.status === 'paid') {
        setPaymentSuccess(true)
        if (inv.transactionSignature) {
          setTransactionSignature(inv.transactionSignature)
        }
      }

      // Update page metadata for Solana Actions
      if (inv && typeof window !== 'undefined') {
        const baseUrl = window.location.origin
        const actionsUrl = `${baseUrl}/api/actions/invoice?invoiceId=${inv.id}`
        
        // Add meta tags dynamically
        const metaTags = [
          { property: 'og:title', content: `Invoice ${inv.invoiceNumber} - $${inv.total} ${inv.currency}` },
          { property: 'og:description', content: `Pay invoice from ${inv.freelancerName}` },
          { property: 'og:image', content: `${baseUrl}/logo.png` },
          { name: 'solana:action', content: actionsUrl },
        ]

        metaTags.forEach(({ property, name, content }) => {
          let meta = document.querySelector(`meta[${property ? 'property' : 'name'}="${property || name}"]`)
          if (!meta) {
            meta = document.createElement('meta')
            if (property) {
              meta.setAttribute('property', property)
            } else if (name) {
              meta.setAttribute('name', name)
            }
            document.head.appendChild(meta)
          }
          meta.setAttribute('content', content)
        })
      }
    }
  }, [params.id])

  const handlePayment = async () => {
    if (!invoice || !publicKey) {
      toast.error('Please connect your wallet')
      return
    }

    try {
      const signature = await send({
        recipient: invoice.freelancerWallet,
        amount: invoice.total,
        token: invoice.currency,
        memo: `Payment for Invoice ${invoice.invoiceNumber}`,
      })

      // Update invoice status
      updateInvoiceStatus(invoice.id, 'paid', signature)
      
      setTransactionSignature(signature)
      setPaymentSuccess(true)
      
      toast.success(
        <div className="flex flex-col gap-1">
          <div className="font-semibold">Payment Successful!</div>
          <a
            href={getExplorerUrl(signature, 'tx')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-solana-green hover:underline"
          >
            View on Explorer →
          </a>
        </div>,
        { duration: 8000 }
      )
    } catch (error: any) {
      console.error('Payment error:', error)
      toast.error(error?.message || 'Payment failed')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F0F23] to-[#1A1A2E] flex items-center justify-center p-4">
        <Card className="glass p-8 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-400">Loading invoice...</p>
        </Card>
      </div>
    )
  }

  if (!invoice) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F0F23] to-[#1A1A2E] flex items-center justify-center p-4">
        <Card className="glass p-8 text-center max-w-md">
          <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Invoice Not Found</h2>
          <p className="text-gray-400 mb-6">
            The invoice you're looking for doesn't exist or has been deleted.
          </p>
          <Button
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0"
          >
            Go to Home
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F23] to-[#1A1A2E] p-4 md:p-8">
      {/* Wallet Button - Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <WalletButton />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => router.push('/')}
          className="mb-6 border-white/20 text-white hover:bg-white/10 bg-transparent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        {paymentSuccess ? (
          /* Payment Success View */
          <Card className="glass p-8 text-center border-2 border-green-500/50">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
            <p className="text-gray-400 mb-6">
              Invoice {invoice.invoiceNumber} has been paid
            </p>

            <div className="bg-white/5 rounded-lg p-6 mb-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Amount Paid</p>
                  <p className="text-2xl font-bold text-green-400">
                    {formatNumber(invoice.total, 2)} {invoice.currency}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Payment Date</p>
                  <p className="text-lg font-semibold text-white">
                    {invoice.paidDate ? new Date(invoice.paidDate).toLocaleDateString() : 'Today'}
                  </p>
                </div>
              </div>

              {transactionSignature && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-sm text-gray-400 mb-2">Transaction Signature</p>
                  <code className="text-xs text-cyan-400 break-all">
                    {transactionSignature}
                  </code>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {transactionSignature && (
                <Button
                  variant="outline"
                  onClick={() => window.open(getExplorerUrl(transactionSignature, 'tx'), '_blank')}
                  className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 bg-transparent"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Solscan
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => window.print()}
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
            </div>
          </Card>
        ) : (
          /* Invoice View */
          <Card className="glass p-8">
            {/* Header */}
            <div className="text-center mb-8 pb-6 border-b border-white/10">
              <h1 className="text-3xl font-bold gradient-text mb-2">INVOICE</h1>
              <p className="text-gray-400">SolPay Express</p>
            </div>

            {/* Invoice Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-3">Invoice Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-400" />
                    <span className="text-white font-semibold">{invoice.invoiceNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">
                      Issued: {new Date(invoice.issueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">
                      Due: {new Date(invoice.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-3">Payment Status</h3>
                <Badge
                  variant="outline"
                  className={
                    invoice.status === 'paid'
                      ? 'border-green-500/50 bg-green-500/10 text-green-300'
                      : invoice.status === 'overdue'
                      ? 'border-red-500/50 bg-red-500/10 text-red-300'
                      : 'border-yellow-500/50 bg-yellow-500/10 text-yellow-300'
                  }
                >
                  {invoice.status === 'pending' ? '⏳ PENDING PAYMENT' : invoice.status.toUpperCase()}
                </Badge>
              </div>
            </div>

            {/* From/To */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-white/10">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-3">From</h3>
                <div className="space-y-1">
                  <p className="text-white font-semibold">{invoice.freelancerName}</p>
                  <div className="flex items-center gap-2">
                    <Wallet className="w-3 h-3 text-gray-400" />
                    <code className="text-xs text-cyan-400">
                      {formatWalletAddress(invoice.freelancerWallet, 6)}
                    </code>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-3">Bill To</h3>
                <div className="space-y-1">
                  <p className="text-white font-semibold">{invoice.clientName}</p>
                  {invoice.clientEmail && (
                    <p className="text-sm text-gray-400">{invoice.clientEmail}</p>
                  )}
                  <div className="flex items-center gap-2">
                    <Wallet className="w-3 h-3 text-gray-400" />
                    <code className="text-xs text-cyan-400">
                      {formatWalletAddress(invoice.clientWallet, 6)}
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-400 mb-4">Items</h3>
              <div className="bg-white/5 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="text-left text-xs text-gray-400 font-semibold p-3">Description</th>
                      <th className="text-right text-xs text-gray-400 font-semibold p-3">Qty</th>
                      <th className="text-right text-xs text-gray-400 font-semibold p-3">Rate</th>
                      <th className="text-right text-xs text-gray-400 font-semibold p-3">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item) => (
                      <tr key={item.id} className="border-t border-white/5">
                        <td className="text-white p-3">{item.description}</td>
                        <td className="text-white text-right p-3">{item.quantity}</td>
                        <td className="text-white text-right p-3">{formatNumber(item.rate, 2)}</td>
                        <td className="text-white text-right p-3">{formatNumber(item.amount, 2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-8">
              <div className="w-full md:w-80 space-y-3">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal:</span>
                  <span className="text-white">{formatNumber(invoice.subtotal, 2)} {invoice.currency}</span>
                </div>
                {invoice.tax > 0 && (
                  <div className="flex justify-between text-gray-400">
                    <span>Tax ({invoice.tax}%):</span>
                    <span className="text-white">
                      {formatNumber(invoice.subtotal * invoice.tax / 100, 2)} {invoice.currency}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-white pt-3 border-t border-white/10">
                  <span>Total Due:</span>
                  <span className="text-cyan-400">{formatNumber(invoice.total, 2)} {invoice.currency}</span>
                </div>
              </div>
            </div>

            {/* Terms */}
            {invoice.terms && (
              <div className="mb-8 p-4 bg-white/5 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Payment Terms</h3>
                <p className="text-sm text-gray-300">{invoice.terms}</p>
              </div>
            )}

            {/* Notes */}
            {invoice.notes && (
              <div className="mb-8 p-4 bg-white/5 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Notes</h3>
                <p className="text-sm text-gray-300">{invoice.notes}</p>
              </div>
            )}

            {/* Payment Button */}
            {invoice.status !== 'paid' && invoice.status !== 'cancelled' && (
              <div className="text-center pt-6 border-t border-white/10">
                {!connected ? (
                  <div>
                    <p className="text-gray-400 mb-4">Connect your wallet to pay this invoice</p>
                    <WalletButton />
                  </div>
                ) : (
                  <Button
                    onClick={handlePayment}
                    disabled={sending}
                    className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0 px-12 py-6 text-lg"
                  >
                    {sending ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Pay {formatNumber(invoice.total, 2)} {invoice.currency} Now 💳
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-sm text-gray-400">
                Powered by <span className="gradient-text font-semibold">SolPay Express</span>
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
