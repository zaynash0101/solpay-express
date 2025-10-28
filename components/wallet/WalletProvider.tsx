'use client';

import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { ConnectWalletModal } from './ConnectWalletModal';
import { WalletModalProvider as CustomWalletModalProvider, useCustomWalletModal } from '@/hooks/useCustomWalletModal';

interface WalletProviderProps {
  children: React.ReactNode;
}

function WalletModalWrapper() {
  const { visible, setVisible } = useCustomWalletModal();
  return <ConnectWalletModal isOpen={visible} onClose={() => setVisible(false)} />;
}

export function WalletProvider({ children }: WalletProviderProps) {
  // Get network from environment variable
  const network = (process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet') as WalletAdapterNetwork;
  
  // Get RPC endpoint
  const endpoint = useMemo(() => {
    const customRpc = process.env.NEXT_PUBLIC_HELIUS_RPC_URL;
    if (customRpc && customRpc !== 'https://devnet.helius-rpc.com/?api-key=YOUR_KEY') {
      return customRpc;
    }
    return clusterApiUrl(network);
  }, [network]);

  // Initialize wallets - only include wallets that are properly supported
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      // BackpackWalletAdapter removed due to compatibility issues
      // Users can still connect Backpack via WalletConnect
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider 
        wallets={wallets} 
        autoConnect={true}
        onError={(error) => {
          console.error('Wallet error:', error);
        }}
      >
        <CustomWalletModalProvider>
          {children}
          <WalletModalWrapper />
        </CustomWalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
}
