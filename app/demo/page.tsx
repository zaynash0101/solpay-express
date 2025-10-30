'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'
import { DEMO_INVOICES, DEMO_CLIENTS, DEMO_STATS } from '@/lib/demoData'
import { FileText, Users, DollarSign, Clock, CheckCircle, Plus, Send, TrendingUp } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'invoices' | 'clients'>('dashboard')

  return (
    <>
      <Toaster position="top-center" />
      <AnimatedBackground />
      
      <div style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'auto',
        zIndex: 10
      }}>
        {/* Demo Banner */}
        <DemoBanner />
        
        {/* Header */}
        <DemoHeader />
        
        {/* Main Content */}
        <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
          {/* Tabs */}
          <DemoTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {/* Content */}
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'invoices' && <InvoicesView />}
          {activeTab === 'clients' && <ClientsView />}
        </main>
      </div>
    </>
  )
}

// Placeholder components - we'll implement these next
function DemoBanner() {
  return (
    <div style={{
      background: 'linear-gradient(to right, rgba(153, 69, 255, 0.2), rgba(236, 72, 153, 0.2))',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '1rem 0'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ fontWeight: '600', color: 'white', marginBottom: '0.25rem' }}>Demo Mode - Explore with sample data</p>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)' }}>No wallet required - see how SolPay works!</p>
          </div>
          <Link href="/dashboard">
            <button style={{
              padding: '0.75rem 1.5rem',
              fontSize: '0.95rem',
              fontWeight: '600',
              color: 'white',
              background: 'linear-gradient(to right, #9945FF, #ec4899)',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0 4px 6px -1px rgba(153, 69, 255, 0.5)'
            }}>
              Get Started For Real →
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

function DemoHeader() {
  return (
    <header style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 50,
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img 
              src="/logo.png" 
              alt="SolPay Logo" 
              style={{
                width: '48px',
                height: '48px',
                objectFit: 'contain'
              }}
            />
            <h1 style={{
              fontSize: '1.75rem',
              fontWeight: '800',
              color: 'white',
              letterSpacing: '-0.02em'
            }}>
              SolPay Express
            </h1>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <span style={{ fontSize: '0.875rem', color: '#d1d5db' }}>
              Demo...4fG
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

function DemoTabs({ activeTab, setActiveTab }: any) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'clients', label: 'Clients' }
  ]

  return (
    <div className="flex gap-3 mb-8 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === tab.id
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
              : 'glass-card text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

function DashboardView() {
  return (
    <div>
      {/* Page Title */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{
          fontSize: '3rem',
          fontWeight: '800',
          marginBottom: '0.5rem',
          color: 'white',
          letterSpacing: '-0.02em'
        }}>
          Demo Dashboard
        </h2>
        <p style={{ color: 'white', fontSize: '1.125rem', opacity: 0.8 }}>
          Explore SolPay Express with sample data
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {[
          { label: 'Total Invoices', value: DEMO_STATS.totalInvoices, icon: FileText, color: '#9945FF' },
          { label: 'Pending', value: DEMO_STATS.pendingInvoices, icon: Clock, color: '#f59e0b' },
          { label: 'Paid', value: DEMO_STATS.paidInvoices, icon: CheckCircle, color: '#14F195' },
          { label: 'Total Revenue', value: `$${DEMO_STATS.totalEarned.toLocaleString()}`, icon: DollarSign, color: '#00D4FF' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '1rem',
                padding: '1.5rem',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 10px 25px -5px ${stat.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '0.75rem',
                  background: `${stat.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon style={{ width: '24px', height: '24px', color: stat.color }} />
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '0.5rem' }}>{stat.label}</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '1rem',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: 'white'
        }}>
          Quick Actions
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {[
            { label: 'Create Invoice', icon: Plus, color: '#9945FF' },
            { label: 'View Invoices', icon: FileText, color: '#ec4899' },
            { label: 'Manage Clients', icon: Users, color: '#14F195' },
            { label: 'Payment Requests', icon: Send, color: '#00D4FF' }
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => toast('Demo Mode - Connect wallet to use this feature')}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = action.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <Icon style={{ width: '24px', height: '24px', color: action.color, marginBottom: '0.75rem' }} />
                <p style={{ fontSize: '1rem', fontWeight: '600', color: 'white' }}>{action.label}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  )
}

function InvoicesView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">All Invoices</h2>
        <button 
          onClick={() => toast('🎭 Demo Mode - Connect wallet to create invoices!')}
          className="btn-gradient px-6 py-3 rounded-lg font-semibold"
        >
          + Create Invoice
        </button>
      </div>

      <div className="grid gap-4">
        {DEMO_INVOICES.map((invoice) => (
          <div key={invoice.id} className="glass-card glass-card-hover p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{invoice.invoiceNumber}</h3>
                <p className="text-gray-400">{invoice.clientName}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Due: {invoice.dueDate.toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold gradient-text-green">
                  ${invoice.total.toLocaleString()}
                </p>
                <span className={`inline-block mt-2 text-xs px-3 py-1 rounded-full font-semibold ${
                  invoice.status === 'paid' ? 'bg-green-500/20 text-green-400 border border-green-500/50' :
                  invoice.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' :
                  'bg-red-500/20 text-red-400 border border-red-500/50'
                }`}>
                  {invoice.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 mt-4">
              <p className="text-sm text-gray-400 mb-2">Items:</p>
              <div className="space-y-1">
                {invoice.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-300">{item.description}</span>
                    <span className="text-white font-semibold">${item.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button 
                onClick={() => toast('🎭 Demo Mode - View invoice details in real dashboard!')}
                className="flex-1 glass-card hover:bg-white/10 py-2 rounded-lg text-sm font-semibold text-white transition-all"
              >
                View Details
              </button>
              {invoice.status === 'pending' && (
                <button 
                  onClick={() => toast('🎭 Demo Mode - Send payment reminders in real dashboard!')}
                  className="flex-1 glass-card hover:bg-white/10 py-2 rounded-lg text-sm font-semibold text-white transition-all"
                >
                  Send Reminder
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ClientsView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Clients</h2>
        <button 
          onClick={() => toast('🎭 Demo Mode - Connect wallet to add clients!')}
          className="btn-gradient px-6 py-3 rounded-lg font-semibold"
        >
          + Add Client
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEMO_CLIENTS.map((client) => (
          <div key={client.id} className="glass-card glass-card-hover p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white">
                {client.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white text-lg">{client.name}</h3>
                <p className="text-sm text-gray-400">{client.company}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">Email:</span>
                <span className="text-white">{client.email}</span>
              </div>
              {client.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">Phone:</span>
                  <span className="text-white">{client.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">Wallet:</span>
                <span className="text-purple-400 font-mono text-xs">
                  {client.walletAddress.slice(0, 8)}...{client.walletAddress.slice(-6)}
                </span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Total Paid</p>
                <p className="text-lg font-bold gradient-text-green">
                  ${client.totalPaid.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Invoices</p>
                <p className="text-lg font-bold text-white">{client.invoiceCount}</p>
              </div>
            </div>

            <button 
              onClick={() => toast('🎭 Demo Mode - View client details in real dashboard!')}
              className="w-full mt-4 glass-card hover:bg-white/10 py-2 rounded-lg text-sm font-semibold text-white transition-all"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
