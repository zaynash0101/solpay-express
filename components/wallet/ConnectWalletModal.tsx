'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { X, ChevronRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WalletOption {
  name: string;
  adapter: string;
  iconUrl: string;
  badge: string;
  downloadUrl: string;
}

const SUPPORTED_WALLETS: WalletOption[] = [
  {
    name: 'Phantom',
    adapter: 'Phantom',
    iconUrl: 'https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/icons/phantom.svg',
    badge: 'Most Popular',
    downloadUrl: 'https://phantom.app/'
  },
  {
    name: 'Solflare',
    adapter: 'Solflare',
    iconUrl: 'https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/icons/solflare.svg',
    badge: 'Secure',
    downloadUrl: 'https://solflare.com/'
  },
  {
    name: 'Backpack',
    adapter: 'Backpack',
    iconUrl: 'https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/icons/backpack.svg',
    badge: 'Multi-chain',
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
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(8px)'
            }}
          />

          {/* Modal Content - Centered */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            maxWidth: '420px'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                width: '100%',
                backgroundColor: '#1A1B23',
                borderRadius: '28px',
                border: '1px solid #2D2E3A',
                padding: '40px 32px',
                boxShadow: '0 25px 80px rgba(0, 0, 0, 0.5), 0 10px 40px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 150ms ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  const icon = e.currentTarget.querySelector('svg') as SVGElement;
                  if (icon) icon.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                  const icon = e.currentTarget.querySelector('svg') as SVGElement;
                  if (icon) icon.style.color = '#8B92A6';
                }}
              >
                <X style={{ width: '18px', height: '18px', color: '#8B92A6', transition: 'color 150ms ease' }} />
              </button>

              {/* Header */}
              <h2 style={{
                fontSize: '32px',
                fontWeight: 800,
                color: '#FFFFFF',
                marginBottom: '12px',
                lineHeight: 1.2,
                textAlign: 'center'
              }}>
                Connect Wallet
              </h2>

              <p style={{
                fontSize: '15px',
                color: '#8B92A6',
                marginBottom: '32px',
                lineHeight: 1.5,
                textAlign: 'center'
              }}>
                Choose your preferred Solana wallet
              </p>

              {/* Wallet Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                {SUPPORTED_WALLETS.map((wallet) => {
                  const installed = isWalletInstalled(wallet.adapter);
                  const isConnecting = connecting && selectedWallet === wallet.adapter;

                  return (
                    <motion.button
                      key={wallet.name}
                      onClick={() => installed && !isConnecting && handleWalletSelect(wallet.adapter)}
                      disabled={!installed || isConnecting}
                      whileHover={installed ? { scale: 1.015 } : {}}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      style={{
                        width: '100%',
                        minHeight: '76px',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '20px',
                        gap: '16px',
                        backgroundColor: '#23242E',
                        border: '1px solid #2D2E3A',
                        borderRadius: '16px',
                        cursor: installed ? 'pointer' : 'not-allowed',
                        transition: 'all 200ms ease',
                        opacity: installed ? 1 : 0.5
                      }}
                      onMouseEnter={(e) => {
                        if (installed && !isConnecting) {
                          e.currentTarget.style.backgroundColor = '#2A2B35';
                          e.currentTarget.style.borderColor = '#3D3E4A';
                          const arrow = e.currentTarget.querySelector('.arrow-icon') as HTMLElement;
                          if (arrow) {
                            arrow.style.color = '#FFFFFF';
                            arrow.style.transform = 'translateX(4px)';
                          }
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isConnecting) {
                          e.currentTarget.style.backgroundColor = '#23242E';
                          e.currentTarget.style.borderColor = '#2D2E3A';
                          const arrow = e.currentTarget.querySelector('.arrow-icon') as HTMLElement;
                          if (arrow) {
                            arrow.style.color = '#9CA3AF';
                            arrow.style.transform = 'translateX(0)';
                          }
                        }
                      }}
                    >
                      {/* Real Wallet Logo */}
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        flexShrink: 0,
                        overflow: 'hidden',
                        backgroundColor: '#2D2E3A',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <img
                          src={wallet.iconUrl}
                          alt={`${wallet.name} Wallet`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                          }}
                          onError={(e) => {
                            // Fallback to letter if image fails to load
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `<span style="color: #9945FF; font-size: 20px; font-weight: 600;">${wallet.name[0]}</span>`;
                            }
                          }}
                        />
                      </div>

                      {/* Wallet Info */}
                      <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '4px'
                      }}>
                        <span style={{
                          fontSize: '18px',
                          fontWeight: 600,
                          color: '#FFFFFF',
                          lineHeight: 1
                        }}>
                          {wallet.name}
                        </span>

                        {/* Badge */}
                        <span style={{
                          fontSize: '14px',
                          color: '#9CA3AF',
                          lineHeight: 1
                        }}>
                          {installed ? wallet.badge : 'Not Installed'}
                        </span>
                      </div>

                      {/* Right Arrow */}
                      {installed && (
                        isConnecting ? (
                          <div style={{
                            width: '20px',
                            height: '20px',
                            border: '2px solid rgba(153, 69, 255, 0.3)',
                            borderTopColor: '#9945FF',
                            borderRadius: '50%',
                            animation: 'spin 0.8s linear infinite',
                            flexShrink: 0
                          }} />
                        ) : (
                          <ChevronRight 
                            className="arrow-icon"
                            style={{ 
                              width: '20px', 
                              height: '20px', 
                              color: '#9CA3AF',
                              transition: 'all 180ms ease',
                              flexShrink: 0
                            }} 
                          />
                        )
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer */}
              <div style={{
                paddingTop: '24px',
                borderTop: '1px solid #2D2E3A',
                fontSize: '14px',
                color: '#9CA3AF',
                lineHeight: 1.5,
                textAlign: 'center'
              }}>
                New to Solana wallets?{' '}
                <a
                  href="https://solana.com/learn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 font-medium hover:underline"
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
        </div>
      )}
    </AnimatePresence>
  );
}
