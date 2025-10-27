'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Copy, ExternalLink, LogOut, Wallet, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConnectWalletModal } from './ConnectWalletModal';
import toast from 'react-hot-toast';

interface WalletButtonPremiumProps {
  className?: string;
  variant?: 'gradient' | 'outline' | 'glass';
  showBalance?: boolean;
  solBalance?: number;
  usdcBalance?: number;
}

export function WalletButtonPremium({ 
  className = '', 
  variant = 'gradient',
  showBalance = false,
  solBalance = 0,
  usdcBalance = 0,
}: WalletButtonPremiumProps) {
  const { publicKey, disconnect, connecting, connected } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    setIsModalOpen(true);
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
      try {
        await navigator.clipboard.writeText(publicKey.toBase58());
        toast.success('Address copied!');
      } catch (error) {
        toast.error('Failed to copy address');
      }
    }
  };

  const handleViewExplorer = () => {
    if (publicKey) {
      window.open(`https://explorer.solana.com/address/${publicKey.toBase58()}`, '_blank');
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (!mounted) {
    return (
      <div className={`h-10 w-40 bg-white/5 animate-pulse rounded-lg ${className}`} />
    );
  }

  // Connect Button Styles
  const buttonStyles = {
    gradient: 'bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:shadow-lg hover:shadow-purple-500/50',
    outline: 'border-2 border-purple-500/50 hover:border-purple-500 hover:bg-purple-500/10',
    glass: 'bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10'
  };

  if (!connected) {
    return (
      <>
        <motion.button
          onClick={handleConnect}
          disabled={connecting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm
            transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
            ${buttonStyles[variant]}
            ${className}
          `}
        >
          <Wallet className="w-5 h-5" />
          {connecting ? 'Connecting...' : 'Connect Wallet'}
        </motion.button>

        <ConnectWalletModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  return (
    <div className={`relative wallet-dropdown ${className}`}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
      >
        {/* Connection Indicator */}
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
        
        {/* Address */}
        <span className="font-mono font-medium text-white">
          {formatAddress(publicKey!.toBase58())}
        </span>
        
        {/* Balance (Optional) */}
        {showBalance && (
          <div className="flex items-center gap-2 text-sm border-l border-white/10 pl-3">
            <div className="text-right">
              <div className="font-semibold text-white">{solBalance.toFixed(4)} SOL</div>
              {usdcBalance > 0 && (
                <div className="text-xs text-gray-400">{usdcBalance.toFixed(2)} USDC</div>
              )}
            </div>
          </div>
        )}
        
        {/* Dropdown Icon */}
        <ChevronDown 
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isDropdownOpen ? 'rotate-180' : ''
          }`} 
        />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-72 bg-[#0F0F23] backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-gradient-to-br from-purple-500/10 to-green-500/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-400">Connected Wallet</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs font-semibold text-green-400">Active</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono text-white">
                  {formatAddress(publicKey!.toBase58())}
                </span>
                <button
                  onClick={handleCopyAddress}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Copy className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Balance Section (if enabled) */}
            {showBalance && (
              <div className="p-4 border-b border-white/10 bg-white/[0.02]">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">SOL Balance</span>
                    <span className="text-sm font-semibold text-white">{solBalance.toFixed(4)} SOL</span>
                  </div>
                  {usdcBalance > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">USDC Balance</span>
                      <span className="text-sm font-semibold text-white">{usdcBalance.toFixed(2)} USDC</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="p-2">
              <button
                onClick={handleCopyAddress}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-left group"
              >
                <Copy className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                <span className="text-sm text-white">Copy Address</span>
              </button>
              
              <button
                onClick={handleViewExplorer}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-left group"
              >
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                <span className="text-sm text-white">View on Explorer</span>
              </button>
              
              <div className="h-px bg-white/10 my-2" />
              
              <button
                onClick={handleDisconnect}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors text-left group"
              >
                <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Disconnect</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
