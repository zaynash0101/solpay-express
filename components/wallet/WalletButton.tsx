'use client';

import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Copy, ExternalLink, LogOut, Wallet, ChevronDown } from 'lucide-react';
import { formatWalletAddress, getNetworkDisplayName, getExplorerUrl } from '@/lib/solana';
import { copyToClipboard } from '@/lib/utils';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface WalletButtonProps {
  className?: string;
  variant?: 'default' | 'compact';
  showBalance?: boolean;
  solBalance?: number;
  usdcBalance?: number;
}

export function WalletButton({ 
  className = '', 
  variant = 'default',
  showBalance = false,
  solBalance = 0,
  usdcBalance = 0,
}: WalletButtonProps) {
  const { publicKey, disconnect, connecting, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.wallet-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleConnect = () => {
    setVisible(true);
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setIsDropdownOpen(false);
      toast.success('Wallet disconnected');
    } catch (error) {
      console.error('Error disconnecting:', error);
      toast.error('Failed to disconnect wallet');
    }
  };

  const handleCopyAddress = async () => {
    if (publicKey) {
      const success = await copyToClipboard(publicKey.toBase58());
      if (success) {
        toast.success('Address copied to clipboard');
      } else {
        toast.error('Failed to copy address');
      }
    }
  };

  const handleViewExplorer = () => {
    if (publicKey) {
      window.open(getExplorerUrl(publicKey.toBase58(), 'address'), '_blank');
    }
  };

  if (!mounted) {
    return (
      <div className={`h-10 w-40 bg-muted/50 animate-pulse rounded-lg ${className}`} />
    );
  }

  if (!connected) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleConnect}
        disabled={connecting}
        className={`
          flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold
          bg-gradient-solana text-white shadow-lg
          hover:brightness-110 transition-all duration-300
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
      >
        <Wallet className="w-5 h-5" />
        {connecting ? 'Connecting...' : 'Connect Wallet'}
      </motion.button>
    );
  }

  return (
    <div className={`relative wallet-dropdown ${className}`}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`
          flex items-center gap-3 px-4 py-2.5 rounded-lg
          glass-hover transition-all duration-300
          ${variant === 'compact' ? 'gap-2 px-3 py-2' : ''}
        `}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-solana-green rounded-full animate-pulse" />
          <span className="font-mono font-medium">
            {formatWalletAddress(publicKey!.toBase58())}
          </span>
        </div>
        
        {showBalance && variant === 'default' && (
          <div className="flex items-center gap-2 text-sm border-l border-white/10 pl-3">
            <div className="text-right">
              <div className="font-semibold">{solBalance.toFixed(4)} SOL</div>
              {usdcBalance > 0 && (
                <div className="text-xs text-muted-foreground">{usdcBalance.toFixed(2)} USDC</div>
              )}
            </div>
          </div>
        )}
        
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${
            isDropdownOpen ? 'rotate-180' : ''
          }`} 
        />
      </motion.button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 glass rounded-xl overflow-hidden shadow-2xl z-50"
          >
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Network</span>
                <span className="text-sm font-semibold text-solana-green">
                  {getNetworkDisplayName()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Address</span>
                <button
                  onClick={handleCopyAddress}
                  className="text-sm font-mono hover:text-solana-purple transition-colors"
                >
                  {formatWalletAddress(publicKey!.toBase58(), 6)}
                </button>
              </div>
            </div>

            <div className="p-2">
              <button
                onClick={handleCopyAddress}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-left"
              >
                <Copy className="w-4 h-4" />
                <span className="text-sm">Copy Address</span>
              </button>
              
              <button
                onClick={handleViewExplorer}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-left"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">View on Explorer</span>
              </button>
              
              <div className="h-px bg-white/10 my-2" />
              
              <button
                onClick={handleDisconnect}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-destructive/20 text-destructive transition-colors text-left"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Disconnect</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
