"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Users, 
  Send, 
  LayoutDashboard,
  TrendingUp,
  DollarSign,
  Clock,
  Link2,
  Sparkles
} from "lucide-react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useBalance } from "@/hooks/useBalance"
import { CreateInvoice } from "@/components/features/CreateInvoice"
import { InvoiceList } from "@/components/features/InvoiceList"
import { ClientList } from "@/components/features/ClientList"
import { PaymentRequest } from "@/components/features/PaymentRequest"
import { Invoice, Client } from "@/types"
import { getInvoiceStats, initializeDemoData } from "@/lib/invoiceStorage"
import { formatNumber } from "@/lib/utils"
import { generateInvoicePDF } from "@/lib/generatePDF"

type TabType = 'dashboard' | 'invoices' | 'clients' | 'requests'

export function InvoiceDashboard() {
  const { publicKey, connected } = useWallet()
  const { balance } = useBalance()
  
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')
  const [showCreateInvoice, setShowCreateInvoice] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null)
  const [viewingInvoice, setViewingInvoice] = useState<Invoice | null>(null)
  const [stats, setStats] = useState(getInvoiceStats())

  useEffect(() => {
    if (connected && publicKey) {
      // Initialize demo data on first connection
      initializeDemoData(publicKey.toBase58())
      refreshStats()
    }
  }, [connected, publicKey])

  const refreshStats = () => {
    setStats(getInvoiceStats())
  }

  const handleCreateInvoice = () => {
    setShowCreateInvoice(true)
    setEditingInvoice(null)
  }

  const handleEditInvoice = (invoice: Invoice) => {
    setEditingInvoice(invoice)
    setShowCreateInvoice(true)
  }

  const handleInvoiceSuccess = (invoice: Invoice) => {
    setShowCreateInvoice(false)
    setEditingInvoice(null)
    refreshStats()
    setActiveTab('invoices')
  }

  const handleViewInvoice = (invoice: Invoice) => {
    setViewingInvoice(invoice)
  }

  const handleClientCreateInvoice = (client: Client) => {
    // TODO: Pre-fill invoice with client data
    setShowCreateInvoice(true)
  }

  const handleDownloadInvoice = (invoice: Invoice) => {
    generateInvoicePDF(invoice)
  }

  if (!connected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F0F23] to-[#1A1A2E] flex items-center justify-center p-4">
        <Card className="glass p-8 text-center max-w-md">
          <FileText className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h2>
          <p className="text-gray-400 mb-6">
            Please connect your Solana wallet to access your invoice dashboard
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F23] to-[#1A1A2E] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Freelancer Dashboard
          </h1>
          <p className="text-gray-400">
            Manage invoices, clients, and payments in one place
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <Badge
            variant="outline"
            onClick={() => setActiveTab('dashboard')}
            className={`cursor-pointer px-6 py-3 text-sm ${
              activeTab === 'dashboard'
                ? 'border-purple-500/50 bg-purple-500/10 text-purple-300'
                : 'border-white/20 text-gray-400 hover:bg-white/10'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Dashboard
          </Badge>
          <Badge
            variant="outline"
            onClick={() => setActiveTab('invoices')}
            className={`cursor-pointer px-6 py-3 text-sm ${
              activeTab === 'invoices'
                ? 'border-purple-500/50 bg-purple-500/10 text-purple-300'
                : 'border-white/20 text-gray-400 hover:bg-white/10'
            }`}
          >
            <FileText className="w-4 h-4 mr-2" />
            Invoices
          </Badge>
          <Badge
            variant="outline"
            onClick={() => setActiveTab('clients')}
            className={`cursor-pointer px-6 py-3 text-sm ${
              activeTab === 'clients'
                ? 'border-purple-500/50 bg-purple-500/10 text-purple-300'
                : 'border-white/20 text-gray-400 hover:bg-white/10'
            }`}
          >
            <Users className="w-4 h-4 mr-2" />
            Clients
          </Badge>
          <Badge
            variant="outline"
            onClick={() => setActiveTab('requests')}
            className={`cursor-pointer px-6 py-3 text-sm ${
              activeTab === 'requests'
                ? 'border-purple-500/50 bg-purple-500/10 text-purple-300'
                : 'border-white/20 text-gray-400 hover:bg-white/10'
            }`}
          >
            <Send className="w-4 h-4 mr-2" />
            Payment Requests
          </Badge>
        </div>

        {/* Content */}
        {showCreateInvoice ? (
          <CreateInvoice
            onBack={() => {
              setShowCreateInvoice(false)
              setEditingInvoice(null)
            }}
            onSuccess={handleInvoiceSuccess}
            editInvoice={editingInvoice}
          />
        ) : activeTab === 'dashboard' ? (
          /* Dashboard Overview */
          <div className="space-y-6">
            {/* Solana Actions Banner */}
            <Card className="glass p-6 border-l-4 border-purple-500 bg-gradient-to-r from-purple-500/10 to-cyan-500/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    <Link2 className="w-5 h-5 text-cyan-400" />
                    New: Share Payment Links Directly on Social Media!
                  </h4>
                  <p className="text-gray-300 mb-3">
                    Your invoices now support <strong className="text-purple-400">Solana Actions (Blinks)</strong>. 
                    Share payment links on Twitter, WhatsApp & Discord - recipients can pay directly without visiting the app!
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <Badge className="bg-[#1DA1F2]/20 text-[#1DA1F2] border-[#1DA1F2]/30">
                      Twitter/X
                    </Badge>
                    <Badge className="bg-[#25D366]/20 text-[#25D366] border-[#25D366]/30">
                      WhatsApp
                    </Badge>
                    <Badge className="bg-[#5865F2]/20 text-[#5865F2] border-[#5865F2]/30">
                      Discord
                    </Badge>
                    <Badge className="bg-[#0088cc]/20 text-[#0088cc] border-[#0088cc]/30">
                      Telegram
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 mt-3">
                    💡 Click "Share" on any invoice to see the magic!
                  </p>
                </div>
              </div>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="glass p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-400" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-sm text-gray-400 mb-1">Total Invoices</p>
                <p className="text-3xl font-bold text-white">{stats.totalInvoices}</p>
              </Card>

              <Card className="glass p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-1">Pending</p>
                <p className="text-3xl font-bold text-yellow-400">{stats.pendingInvoices}</p>
                <p className="text-xs text-gray-500 mt-1">
                  ${formatNumber(stats.pendingAmount, 2)}
                </p>
              </Card>

              <Card className="glass p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-400" />
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-1">Total Earned</p>
                <p className="text-3xl font-bold text-green-400">
                  ${formatNumber(stats.paidAmount, 2)}
                </p>
              </Card>

              <Card className="glass p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-1">This Month</p>
                <p className="text-3xl font-bold text-cyan-400">
                  ${formatNumber(stats.paidThisMonth, 2)}
                </p>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="glass p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={handleCreateInvoice}
                  className="p-6 bg-gradient-to-br from-purple-600/20 to-cyan-500/20 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition text-left group"
                >
                  <FileText className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition" />
                  <h4 className="text-lg font-semibold text-white mb-1">Create Invoice</h4>
                  <p className="text-sm text-gray-400">
                    Generate a professional invoice for your client
                  </p>
                </button>

                <button
                  onClick={() => setActiveTab('requests')}
                  className="p-6 bg-gradient-to-br from-cyan-600/20 to-purple-500/20 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/30 transition text-left group"
                >
                  <Send className="w-8 h-8 text-cyan-400 mb-3 group-hover:scale-110 transition" />
                  <h4 className="text-lg font-semibold text-white mb-1">Payment Request</h4>
                  <p className="text-sm text-gray-400">
                    Quick payment link without full invoice
                  </p>
                </button>

                <button
                  onClick={() => setActiveTab('clients')}
                  className="p-6 bg-gradient-to-br from-green-600/20 to-cyan-500/20 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition text-left group"
                >
                  <Users className="w-8 h-8 text-green-400 mb-3 group-hover:scale-110 transition" />
                  <h4 className="text-lg font-semibold text-white mb-1">Manage Clients</h4>
                  <p className="text-sm text-gray-400">
                    View and organize your client list
                  </p>
                </button>
              </div>
            </Card>

            {/* Wallet Balance */}
            <Card className="glass p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Wallet Balance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-purple-600/10 to-purple-500/5 border border-purple-500/20 rounded-lg p-6">
                  <p className="text-sm text-gray-400 mb-2">SOL Balance</p>
                  <p className="text-3xl font-bold text-white mb-1">
                    {formatNumber(balance.sol, 4)} SOL
                  </p>
                  <p className="text-xs text-gray-500">Available for transactions</p>
                </div>
                <div className="bg-gradient-to-br from-cyan-600/10 to-cyan-500/5 border border-cyan-500/20 rounded-lg p-6">
                  <p className="text-sm text-gray-400 mb-2">USDC Balance</p>
                  <p className="text-3xl font-bold text-white mb-1">
                    {formatNumber(balance.usdc, 2)} USDC
                  </p>
                  <p className="text-xs text-gray-500">Stablecoin balance</p>
                </div>
              </div>
            </Card>

            {/* Pakistani Freelancer Banner */}
            <Card className="glass p-6 border-l-4 border-cyan-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    💰 Save 5-10% on International Payments!
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400 mb-1">Traditional Methods:</p>
                      <ul className="text-red-400 space-y-1">
                        <li>• PayPal: 4.4% + $0.30 fee</li>
                        <li>• Wise: 3-5% + 3-5 days wait</li>
                        <li>• Bank: $25-50 fee + 5-7 days</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">SolPay Express:</p>
                      <ul className="text-green-400 space-y-1">
                        <li>• Fee: &lt; $0.01 per transaction</li>
                        <li>• Speed: &lt; 2 seconds ⚡</li>
                        <li>• No international fees 🌍</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : activeTab === 'invoices' ? (
          <InvoiceList
            onCreateNew={handleCreateInvoice}
            onViewInvoice={handleViewInvoice}
            onEditInvoice={handleEditInvoice}
          />
        ) : activeTab === 'clients' ? (
          <ClientList onCreateInvoice={handleClientCreateInvoice} />
        ) : (
          <PaymentRequest />
        )}
      </div>
    </div>
  )
}
