'use client';

import { useState, useEffect, useCallback } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { getAssociatedTokenAddress, getAccount } from '@solana/spl-token';
import { lamportsToSol, getUSDCMintAddress } from '@/lib/solana';
import type { Balance } from '@/types';

export function useBalance() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<Balance>({ sol: 0, usdc: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = useCallback(async () => {
    if (!publicKey) {
      setBalance({ sol: 0, usdc: 0 });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch SOL balance
      const solBalance = await connection.getBalance(publicKey);
      const solAmount = lamportsToSol(solBalance);

      // Fetch USDC balance
      let usdcAmount = 0;
      try {
        const usdcMint = getUSDCMintAddress();
        const associatedTokenAddress = await getAssociatedTokenAddress(
          usdcMint,
          publicKey
        );
        
        const tokenAccount = await getAccount(connection, associatedTokenAddress);
        usdcAmount = Number(tokenAccount.amount) / 1_000_000; // USDC has 6 decimals
      } catch (err) {
        // Token account doesn't exist yet, balance is 0
        console.log('USDC token account not found, balance is 0');
      }

      setBalance({ sol: solAmount, usdc: usdcAmount });
    } catch (err) {
      console.error('Error fetching balance:', err);
      setError('Failed to fetch balance');
    } finally {
      setLoading(false);
    }
  }, [publicKey, connection]);

  // Fetch balance on mount and when wallet changes
  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  // Auto-refresh balance every 5 seconds
  useEffect(() => {
    if (!publicKey) return;

    const interval = setInterval(() => {
      fetchBalance();
    }, 5000);

    return () => clearInterval(interval);
  }, [publicKey, fetchBalance]);

  return {
    balance,
    loading,
    error,
    refetch: fetchBalance,
  };
}
