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

export function InvoiceDashboardRedesigned() {
  const { publicKey, connected } = useWallet()
  const { balance } = useBalance()
  
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
      <div className="min-h-screen relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #0F0F23 0%, #1a1a3e 100%)'
      }}>
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 text-center max-w-md" style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
            }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
                Connect Your Wallet
              </h2>
              <p className="text-gray-300 mb-6">
                Please connect your Solana wallet to access your invoice dashboard
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0F0F23 0%, #1a1a3e 100%)',
      backgroundImage: `
        linear-gradient(135deg, #0F0F23 0%, #1a1a3e 100%),
        url(/patterns/grid-bg.jpg)
      `,
      backgroundBlendMode: 'overlay',
      backgroundSize: 'cover, 512px 512px',
      backgroundPosition: 'center, center',
      backgroundAttachment: 'fixed, fixed'
    }}>
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 mb-2">
              Freelancer Dashboard
            </h1>
            <p className="text-gray-300 text-lg">
              Manage invoices, clients, and payments in one place
            </p>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div 
            className="flex gap-2 mb-8 overflow-x-auto pb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'invoices', label: 'Invoices', icon: FileText },
              { id: 'clients', label: 'Clients', icon: Users },
              { id: 'requests', label: 'Payment Requests', icon: Send }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <motion.div
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant="outline"
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`cursor-pointer px-6 py-3 text-sm transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'border-purple-500/50 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 shadow-lg shadow-purple-500/20'
                        : 'border-white/20 text-gray-300 hover:bg-white/10 hover:border-purple-500/30'
                    }`}
                    style={{
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </Badge>
                </motion.div>
              )
            })}
          </motion.div>

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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="p-6 border-l-4 border-purple-500" style={{
                  background: 'linear-gradient(to right, rgba(153, 69, 255, 0.1), rgba(0, 212, 255, 0.1))',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(153, 69, 255, 0.3)',
                  borderLeft: '4px solid #9945FF',
                  boxShadow: '0 8px 32px 0 rgba(153, 69, 255, 0.2)'
                }}>
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
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { 
                    icon: FileText, 
                    label: 'Total Invoices', 
                    value: stats.totalInvoices,
                    color: 'purple',
                    gradient: 'from-purple-500 to-pink-500'
                  },
                  { 
                    icon: Clock, 
                    label: 'Pending', 
                    value: stats.pendingInvoices,
                    subValue: `$${formatNumber(stats.pendingAmount, 2)}`,
                    color: 'yellow',
                    gradient: 'from-yellow-500 to-orange-500'
                  },
                  { 
                    icon: DollarSign, 
                    label: 'Total Earned', 
                    value: `$${formatNumber(stats.paidAmount, 2)}`,
                    color: 'green',
                    gradient: 'from-green-500 to-cyan-500'
                  },
                  { 
                    icon: TrendingUp, 
                    label: 'This Month', 
                    value: `$${formatNumber(stats.paidThisMonth, 2)}`,
                    color: 'cyan',
                    gradient: 'from-cyan-500 to-blue-500'
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
                      <Card className="p-6 h-full" style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                        transition: 'all 0.3s ease'
                      }}>
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <TrendingUp className="w-5 h-5 text-green-400" />
                        </div>
                        <p className="text-sm text-gray-400 mb-1 uppercase tracking-wider">{stat.label}</p>
                        <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                        {stat.subValue && (
                          <p className="text-xs text-gray-500">{stat.subValue}</p>
                        )}
                      </Card>
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
                <Card className="p-6" style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                }}>
                  <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
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
                          className="p-6 rounded-lg text-left group transition-all duration-300"
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                          }}
                        >
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="text-lg font-semibold text-white mb-1">{action.title}</h4>
                          <p className="text-sm text-gray-300">
                            {action.description}
                          </p>
                        </motion.button>
                      )
                    })}
                  </div>
                </Card>
              </motion.div>

              {/* Wallet Balance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Card className="p-6" style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                }}>
                  <h3 className="text-xl font-semibold text-white mb-4">Wallet Balance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div 
                      className="p-6 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      style={{
                        background: 'linear-gradient(135deg, rgba(153, 69, 255, 0.1), rgba(153, 69, 255, 0.05))',
                        border: '1px solid rgba(153, 69, 255, 0.2)',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider">SOL Balance</p>
                      <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-1">
                        {formatNumber(balance.sol, 4)} SOL
                      </p>
                      <p className="text-xs text-gray-500">Available for transactions</p>
                    </motion.div>
                    <motion.div 
                      className="p-6 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      style={{
                        background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 212, 255, 0.05))',
                        border: '1px solid rgba(0, 212, 255, 0.2)',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider">USDC Balance</p>
                      <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-1">
                        {formatNumber(balance.usdc, 2)} USDC
                      </p>
                      <p className="text-xs text-gray-500">Stablecoin balance</p>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>

              {/* Pakistani Freelancer Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <Card className="p-6 border-l-4 border-cyan-500" style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  borderLeft: '4px solid #00D4FF',
                  boxShadow: '0 8px 32px 0 rgba(0, 212, 255, 0.2)'
                }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/50">
                      <DollarSign className="w-6 h-6 text-white" />
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
        </div>
      </div>
    </div>
  )
}
