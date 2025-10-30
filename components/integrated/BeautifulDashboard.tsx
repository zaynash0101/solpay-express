'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useBalance } from '@/hooks/useBalance';
import { useCustomWalletModal } from "@/hooks/useCustomWalletModal";
import { Wallet, FileText, Users, Send, Plus, TrendingUp, Clock, CheckCircle, DollarSign } from 'lucide-react';
import { getInvoiceStats, initializeDemoData } from '@/lib/invoiceStorage';

export function BeautifulDashboard() {
  const { publicKey, connected } = useWallet();
  const { balance } = useBalance();
  const { setVisible } = useCustomWalletModal();
  
  // Initialize with safe default values
  const [stats, setStats] = useState(() => {
    try {
      const invoiceStats = getInvoiceStats();
      return {
        total: invoiceStats?.total || 0,
        pending: invoiceStats?.pending || 0,
        paid: invoiceStats?.paid || 0,
        totalAmount: invoiceStats?.totalAmount || 0
      };
    } catch (error) {
      return { total: 0, pending: 0, paid: 0, totalAmount: 0 };
    }
  });

  useEffect(() => {
    if (connected && publicKey) {
      try {
        initializeDemoData(publicKey.toBase58());
        const invoiceStats = getInvoiceStats();
        setStats({
          total: invoiceStats?.total || 0,
          pending: invoiceStats?.pending || 0,
          paid: invoiceStats?.paid || 0,
          totalAmount: invoiceStats?.totalAmount || 0
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    }
  }, [connected, publicKey]);

  // Connect Wallet Screen
  if (!connected) {
    return (
      <div style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '2rem',
        zIndex: 10
      }}>
        <div style={{ 
          position: 'relative', 
          zIndex: 20,
          maxWidth: '420px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(153, 69, 255, 0.5)',
          borderRadius: '1.25rem',
          padding: '2rem 1.75rem'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 1.25rem',
            borderRadius: '50%',
            background: 'linear-gradient(to bottom right, rgb(153, 69, 255), rgb(236, 72, 153))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 12px -2px rgba(153, 69, 255, 0.5)'
          }}>
            <Wallet style={{ width: '32px', height: '32px', color: 'white' }} />
          </div>
          
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '0.75rem',
            color: 'white'
          }}>
            Connect Your Wallet
          </h2>
          
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            textAlign: 'center',
            marginBottom: '1.5rem',
            fontSize: '0.95rem',
            lineHeight: '1.5'
          }}>
            Please connect your Solana wallet to access your invoice dashboard
          </p>
          
          <button
            onClick={() => setVisible(true)}
            style={{
              width: '100%',
              padding: '0.875rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              color: 'white',
              background: 'linear-gradient(to right, #9945FF, #ec4899)',
              border: 'none',
              borderRadius: '0.625rem',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 6px -1px rgba(153, 69, 255, 0.5)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(153, 69, 255, 0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(153, 69, 255, 0.5)';
            }}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'auto',
      zIndex: 10
    }}>
      {/* Glassmorphism Header */}
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
              <Wallet style={{ width: '16px', height: '16px', color: '#a78bfa' }} />
              <span style={{ fontSize: '0.875rem', color: '#d1d5db' }}>
                {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Page Title */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: '800',
            marginBottom: '0.5rem',
            color: 'white',
            letterSpacing: '-0.02em'
          }}>
            Freelancer Dashboard
          </h2>
          <p style={{ color: 'white', fontSize: '1.125rem', opacity: 0.8 }}>
            Manage invoices, clients, and payments in one place
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
            { label: 'Total Invoices', value: stats.total, icon: FileText, color: '#9945FF' },
            { label: 'Pending', value: stats.pending, icon: Clock, color: '#f59e0b' },
            { label: 'Paid', value: stats.paid, icon: CheckCircle, color: '#14F195' },
            { label: 'Total Revenue', value: `$${stats.totalAmount.toFixed(2)}`, icon: DollarSign, color: '#00D4FF' }
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

        {/* Wallet Balance */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '1rem',
          padding: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: 'white'
          }}>
            Wallet Balance
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderLeft: '4px solid #9945FF',
              borderRadius: '0.75rem',
              padding: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <img 
                  src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png"
                  alt="SOL"
                  style={{ width: '24px', height: '24px', borderRadius: '50%' }}
                />
                <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>SOL Balance</p>
              </div>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '0.25rem' }}>
                {(balance?.sol || 0).toFixed(4)} SOL
              </p>
              <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>Available for transactions</p>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderLeft: '4px solid #00D4FF',
              borderRadius: '0.75rem',
              padding: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <img 
                  src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
                  alt="USDC"
                  style={{ width: '24px', height: '24px', borderRadius: '50%' }}
                />
                <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>USDC Balance</p>
              </div>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '0.25rem' }}>
                {(balance?.usdc || 0).toFixed(2)} USDC
              </p>
              <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>Stablecoin balance</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
