"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
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
  Sparkles,
  Plus,
  Wallet
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
import { useCustomWalletModal } from "@/hooks/useCustomWalletModal"

type TabType = 'dashboard' | 'invoices' | 'clients' | 'requests'

export function InvoiceDashboardFinal() {
  const { publicKey, connected } = useWallet()
  const { balance } = useBalance()
  const { setVisible } = useCustomWalletModal()
  
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')
  const [showCreateInvoice, setShowCreateInvoice] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null)
  const [viewingInvoice, setViewingInvoice] = useState<Invoice | null>(null)
  const [stats, setStats] = useState(getInvoiceStats())

  useEffect(() => {
    if (connected && publicKey) {
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
    setShowCreateInvoice(true)
  }

  const handleDownloadInvoice = (invoice: Invoice) => {
    generateInvoicePDF(invoice)
  }

  if (!connected) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        position: 'relative', 
        zIndex: 10, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '1rem' 
      }}>
        <div
          className="p-8 text-center w-full"
          style={{ 
            position: 'relative', 
            zIndex: 20,
            maxWidth: '28rem',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px 0 rgba(153, 69, 255, 0.5)',
            borderRadius: '1rem'
          }}
        >
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(to bottom right, rgb(168, 85, 247), rgb(236, 72, 153))',
              boxShadow: '0 10px 15px -3px rgba(168, 85, 247, 0.5)'
            }}
          >
            <Wallet className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold gradient-text-purple mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-gray-300 mb-6 text-lg">
            Please connect your Solana wallet to access your invoice dashboard
          </p>
          <button
            onClick={() => setVisible(true)}
            className="btn-gradient px-8 py-4 rounded-xl text-lg font-semibold w-full"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 10 }}>
      {/* Glassmorphism Header */}
      <header 
        className="sticky top-0 z-50 border-b border-white/10"
        style={{ 
          position: 'sticky', 
          top: 0, 
          zIndex: 50,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <h1 className="text-2xl font-bold gradient-text-purple">
                SolPay Express
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 glass-card px-4 py-2 rounded-lg">
                <Wallet className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-300">
                  {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8" style={{ position: 'relative', zIndex: 10 }}>
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-2" style={{
            background: 'linear-gradient(to right, #9945FF, #ec4899, #14F195, #00D4FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Freelancer Dashboard
          </h2>
          <p className="text-gray-300 text-lg">
            Manage invoices, clients, and payments in one place
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'invoices', label: 'Invoices', icon: FileText },
            { id: 'clients', label: 'Clients', icon: Users },
            { id: 'requests', label: 'Payment Requests', icon: Send }
          ].map((tab, index) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`glass-card-hover px-6 py-3 rounded-xl flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 shadow-lg shadow-purple-500/20'
                    : 'border-white/10'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : 'text-gray-400'}`} />
                <span className={`font-semibold ${isActive ? 'text-white' : 'text-gray-300'}`}>
                  {tab.label}
                </span>
              </button>
            )
          })}
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
          <div className="space-y-6">
            {/* Solana Actions Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="glass-card glass-card-hover p-6 border-l-4 border-purple-500">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/50">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                      <Link2 className="w-5 h-5 text-cyan-400" />
                      New: Share Payment Links Directly on Social Media!
                    </h4>
                    <p className="text-gray-300 mb-3">
                      Your invoices now support <strong className="gradient-text-purple">Solana Actions (Blinks)</strong>. 
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
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { 
                  icon: FileText, 
                  label: 'Total Invoices', 
                  value: stats.totalInvoices,
                  gradient: 'from-purple-500 to-pink-500',
                  color: 'purple'
                },
                { 
                  icon: Clock, 
                  label: 'Pending', 
                  value: stats.pendingInvoices,
                  subValue: `$${formatNumber(stats.pendingAmount, 2)}`,
                  gradient: 'from-yellow-500 to-orange-500',
                  color: 'yellow'
                },
                { 
                  icon: DollarSign, 
                  label: 'Total Earned', 
                  value: `$${formatNumber(stats.paidAmount, 2)}`,
                  gradient: 'from-green-500 to-cyan-500',
                  color: 'green'
                },
                { 
                  icon: TrendingUp, 
                  label: 'This Month', 
                  value: `$${formatNumber(stats.paidThisMonth, 2)}`,
                  gradient: 'from-cyan-500 to-blue-500',
                  color: 'cyan'
                }
              ].map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="glass-card glass-card-hover p-6 h-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <TrendingUp className="w-5 h-5 text-green-400" />
                      </div>
                      <p className="text-sm text-gray-400 mb-1 uppercase tracking-wider font-semibold">{stat.label}</p>
                      <p className="text-3xl font-bold gradient-text-purple mb-1">{stat.value}</p>
                      {stat.subValue && (
                        <p className="text-xs text-gray-500">{stat.subValue}</p>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="glass-card p-6">
                <h3 className="text-2xl font-bold gradient-text-purple mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      icon: FileText,
                      title: 'Create Invoice',
                      description: 'Generate a professional invoice for your client',
                      gradient: 'from-purple-600 to-pink-500',
                      onClick: handleCreateInvoice
                    },
                    {
                      icon: Send,
                      title: 'Payment Request',
                      description: 'Quick payment link without full invoice',
                      gradient: 'from-cyan-600 to-blue-500',
                      onClick: () => setActiveTab('requests')
                    },
                    {
                      icon: Users,
                      title: 'Manage Clients',
                      description: 'View and organize your client list',
                      gradient: 'from-green-600 to-cyan-500',
                      onClick: () => setActiveTab('clients')
                    }
                  ].map((action, index) => {
                    const Icon = action.icon
                    return (
                      <motion.button
                        key={index}
                        onClick={action.onClick}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                        className="glass-card glass-card-hover p-6 text-left group"
                      >
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">{action.title}</h4>
                        <p className="text-sm text-gray-300">
                          {action.description}
                        </p>
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            </motion.div>

            {/* Wallet Balance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="glass-card p-6">
                <h3 className="text-2xl font-bold gradient-text-purple mb-6">Wallet Balance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="glass-card p-6 rounded-xl border-l-4 border-purple-500"
                  >
                    <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider font-semibold">SOL Balance</p>
                    <p className="text-4xl font-bold gradient-text-purple mb-1">
                      {formatNumber(balance.sol, 4)} SOL
                    </p>
                    <p className="text-xs text-gray-500">Available for transactions</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="glass-card p-6 rounded-xl border-l-4 border-cyan-500"
                  >
                    <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider font-semibold">USDC Balance</p>
                    <p className="text-4xl font-bold gradient-text-green mb-1">
                      {formatNumber(balance.usdc, 2)} USDC
                    </p>
                    <p className="text-xs text-gray-500">Stablecoin balance</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Pakistani Freelancer Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="glass-card p-6 border-l-4 border-cyan-500">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/50">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold gradient-text-green mb-3">
                      💰 Save 5-10% on International Payments!
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-gray-400 mb-2 font-semibold">Traditional Methods:</p>
                        <ul className="text-red-400 space-y-2">
                          <li className="flex items-center gap-2">
                            <span className="text-red-500">✗</span> PayPal: 4.4% + $0.30 fee
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-red-500">✗</span> Wise: 3-5% + 3-5 days wait
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-red-500">✗</span> Bank: $25-50 fee + 5-7 days
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-2 font-semibold">SolPay Express:</p>
                        <ul className="text-green-400 space-y-2">
                          <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span> Fee: &lt; $0.01 per transaction
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span> Speed: &lt; 2 seconds ⚡
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span> No international fees 🌍
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
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
      </main>
    </div>
  )
}
