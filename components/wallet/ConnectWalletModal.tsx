'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { X, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WalletOption {
  name: string;
  adapter: string;
  iconGradient: string;
  badge: {
    text: string;
    bg: string;
    color: string;
  };
  hoverBorder: string;
  downloadUrl: string;
}

const SUPPORTED_WALLETS: WalletOption[] = [
  {
    name: 'Phantom',
    adapter: 'Phantom',
    iconGradient: 'linear-gradient(135deg, #AB47BC 0%, #7B1FA2 100%)',
    badge: {
      text: 'Most Popular',
      bg: 'rgba(171, 71, 188, 0.2)',
      color: '#E1BEE7'
    },
    hoverBorder: 'rgba(171, 71, 188, 0.4)',
    downloadUrl: 'https://phantom.app/'
  },
  {
    name: 'Solflare',
    adapter: 'Solflare',
    iconGradient: 'linear-gradient(135deg, #FC8E36 0%, #F7931E 100%)',
    badge: {
      text: 'Secure',
      bg: 'rgba(252, 142, 54, 0.2)',
      color: '#FFE0B2'
    },
    hoverBorder: 'rgba(252, 142, 54, 0.4)',
    downloadUrl: 'https://solflare.com/'
  },
  {
    name: 'Backpack',
    adapter: 'Backpack',
    iconGradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    badge: {
      text: 'New',
      bg: 'rgba(239, 68, 68, 0.2)',
      color: '#FFCDD2'
    },
    hoverBorder: 'rgba(239, 68, 68, 0.4)',
    downloadUrl: 'https://backpack.app/'
  }
];

export function ConnectWalletModal({ isOpen, onClose }: ConnectWalletModalProps) {
  const { select, wallets, connected, connecting } = useWallet();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (connected) {
      onClose();
    }
  }, [connected, onClose]);

  const handleWalletSelect = async (walletName: string) => {
    try {
      setError(null);
      setSelectedWallet(walletName);
      
      const wallet = wallets.find(w => w.adapter.name === walletName);
      
      if (!wallet) {
        setError(`${walletName} wallet not found. Please install it first.`);
        return;
      }

      select(wallet.adapter.name);
    } catch (err) {
      console.error('Wallet connection error:', err);
      setError('Failed to connect wallet. Please try again.');
      setSelectedWallet(null);
    }
  };

  const isWalletInstalled = (walletName: string) => {
    return wallets.some(w => w.adapter.name === walletName && w.readyState === 'Installed');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Solid dark with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(8px)',
              zIndex: 9998
            }}
          />

          {/* Modal Container */}
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '440px',
                backgroundColor: '#0A0B0D',
                borderRadius: '24px',
                border: '1px solid rgba(153, 69, 255, 0.2)',
                padding: '32px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'background-color 150ms ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
              >
                <X style={{ width: '18px', height: '18px', color: '#94A3B8' }} />
              </button>

              {/* Header */}
              <h2 style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '8px',
                lineHeight: 1.2
              }}>
                Connect Wallet
              </h2>

              <p style={{
                fontSize: '14px',
                color: '#94A3B8',
                marginBottom: '24px',
                lineHeight: 1.5
              }}>
                Choose your preferred Solana wallet
              </p>

              {/* Wallet Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {SUPPORTED_WALLETS.map((wallet) => {
                  const installed = isWalletInstalled(wallet.adapter);
                  const isConnecting = connecting && selectedWallet === wallet.adapter;

                  return (
                    <motion.button
                      key={wallet.name}
                      onClick={() => !isConnecting && handleWalletSelect(wallet.adapter)}
                      disabled={isConnecting}
                      whileHover={installed ? { scale: 1.02 } : {}}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      style={{
                        width: '100%',
                        height: '72px',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '16px 20px',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: `1px solid ${isConnecting ? wallet.hoverBorder : 'rgba(255, 255, 255, 0.08)'}`,
                        borderRadius: '16px',
                        cursor: installed ? 'pointer' : 'default',
                        transition: 'all 200ms ease',
                        opacity: installed ? 1 : 0.5
                      }}
                      onMouseEnter={(e) => {
                        if (installed && !isConnecting) {
                          e.currentTarget.style.borderColor = wallet.hoverBorder;
                          e.currentTarget.style.boxShadow = `0 0 20px ${wallet.hoverBorder.replace('0.4', '0.3')}`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isConnecting) {
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                          e.currentTarget.style.boxShadow = 'none';
                        }
                      }}
                    >
                      {/* Icon Container */}
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: wallet.iconGradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <span style={{ fontSize: '24px' }}>
                          {wallet.name === 'Phantom' && '👻'}
                          {wallet.name === 'Solflare' && '🔥'}
                          {wallet.name === 'Backpack' && '🎒'}
                        </span>
                      </div>

                      {/* Wallet Info */}
                      <div style={{
                        flex: 1,
                        marginLeft: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            fontSize: '16px',
                            fontWeight: 600,
                            color: '#FFFFFF'
                          }}>
                            {wallet.name}
                          </span>
                          {installed && (
                            <CheckCircle2 style={{ width: '16px', height: '16px', color: '#10B981' }} />
                          )}
                        </div>

                        {/* Status Badge */}
                        <div style={{
                          marginTop: '4px',
                          padding: '2px 8px',
                          backgroundColor: installed ? wallet.badge.bg : 'rgba(100, 116, 139, 0.2)',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 500,
                          color: installed ? wallet.badge.color : '#94A3B8'
                        }}>
                          {installed ? wallet.badge.text : 'Not Installed'}
                        </div>
                      </div>

                      {/* Right Action */}
                      {!installed ? (
                        <a
                          href={wallet.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: 'rgba(6, 182, 212, 0.1)',
                            border: '1px solid rgba(6, 182, 212, 0.3)',
                            borderRadius: '8px',
                            fontSize: '13px',
                            fontWeight: 500,
                            color: '#22D3EE',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'all 150ms ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.2)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(6, 182, 212, 0.1)';
                          }}
                        >
                          Install
                          <ExternalLink style={{ width: '12px', height: '12px' }} />
                        </a>
                      ) : isConnecting ? (
                        <div style={{
                          width: '20px',
                          height: '20px',
                          border: '2px solid rgba(153, 69, 255, 0.3)',
                          borderTopColor: '#9945FF',
                          borderRadius: '50%',
                          animation: 'spin 0.8s linear infinite'
                        }} />
                      ) : (
                        <ArrowRight style={{ width: '20px', height: '20px', color: '#64748B' }} />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer */}
              <div style={{
                marginTop: '20px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                fontSize: '13px',
                color: '#64748B',
                lineHeight: 1.5
              }}>
                New to Solana?{' '}
                <a
                  href="https://solana.com/learn"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#9945FF',
                    textDecoration: 'none',
                    fontWeight: 500
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                >
                  Learn more
                </a>
              </div>

              {/* Add spinner keyframes */}
              <style>{`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
