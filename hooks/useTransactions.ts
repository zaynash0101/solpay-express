'use client';

import { useState, useEffect, useCallback } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { lamportsToSol } from '@/lib/solana';
import type { Transaction } from '@/types';

export function useTransactions(limit: number = 20) {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    if (!publicKey) {
      setTransactions([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch transaction signatures
      const signatures = await connection.getSignaturesForAddress(
        publicKey,
        { limit }
      );

      // Fetch transaction details
      const txPromises = signatures.map(async (sig) => {
        try {
          const tx = await connection.getParsedTransaction(sig.signature, {
            maxSupportedTransactionVersion: 0,
          });

          if (!tx || !tx.meta) return null;

          // Determine transaction type and amount
          const preBalance = tx.meta.preBalances[0];
          const postBalance = tx.meta.postBalances[0];
          const balanceChange = postBalance - preBalance;
          
          const type: 'sent' | 'received' = balanceChange < 0 ? 'sent' : 'received';
          const amount = Math.abs(lamportsToSol(balanceChange));

          // Get the other party (recipient or sender)
          let otherParty = 'Unknown';
          if (tx.transaction.message.accountKeys.length > 1) {
            const otherKey = tx.transaction.message.accountKeys[1].pubkey;
            otherParty = otherKey.toBase58();
          }

          return {
            signature: sig.signature,
            type,
            amount,
            token: 'SOL' as const,
            otherParty,
            timestamp: sig.blockTime || Date.now() / 1000,
            status: tx.meta.err ? 'failed' as const : 'confirmed' as const,
          };
        } catch (err) {
          console.error('Error parsing transaction:', err);
          return null;
        }
      });

      const parsedTransactions = (await Promise.all(txPromises))
        .filter((tx) => tx !== null) as Transaction[];

      setTransactions(parsedTransactions);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  }, [publicKey, connection, limit]);

  // Fetch transactions on mount and when wallet changes
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Filter transactions by type
  const filterByType = useCallback((type: 'sent' | 'received' | 'all') => {
    if (type === 'all') return transactions;
    return transactions.filter(tx => tx.type === type);
  }, [transactions]);

  return {
    transactions,
    loading,
    error,
    refetch: fetchTransactions,
    filterByType,
  };
}
