'use client';

import { useState, useCallback } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import {
  Transaction,
  SystemProgram,
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js';
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAccount,
} from '@solana/spl-token';
import { solToLamports, getUSDCMintAddress } from '@/lib/solana';
import type { SendTransactionParams } from '@/types';

export function useSendTransaction() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendSOL = useCallback(
    async (recipient: string, amount: number, memo?: string) => {
      if (!publicKey) {
        throw new Error('Wallet not connected');
      }

      setLoading(true);
      setError(null);

      try {
        const recipientPubkey = new PublicKey(recipient);
        const lamports = solToLamports(amount);

        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: recipientPubkey,
            lamports,
          })
        );

        // Add memo if provided
        if (memo) {
          const memoInstruction = new TransactionInstruction({
            keys: [{ pubkey: publicKey, isSigner: true, isWritable: true }],
            data: Buffer.from(memo, 'utf-8'),
            programId: new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'),
          });
          transaction.add(memoInstruction);
        }

        const signature = await sendTransaction(transaction, connection);
        
        // Wait for confirmation
        await connection.confirmTransaction(signature, 'confirmed');

        return signature;
      } catch (err: any) {
        console.error('Error sending SOL:', err);
        const errorMessage = err?.message || 'Failed to send SOL';
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [publicKey, sendTransaction, connection]
  );

  const sendUSDC = useCallback(
    async (recipient: string, amount: number, memo?: string) => {
      if (!publicKey) {
        throw new Error('Wallet not connected');
      }

      setLoading(true);
      setError(null);

      try {
        const recipientPubkey = new PublicKey(recipient);
        const usdcMint = getUSDCMintAddress();

        // Get sender's token account
        const senderTokenAccount = await getAssociatedTokenAddress(
          usdcMint,
          publicKey
        );

        // Get or create recipient's token account
        const recipientTokenAccount = await getAssociatedTokenAddress(
          usdcMint,
          recipientPubkey
        );

        const transaction = new Transaction();

        // Check if recipient token account exists
        try {
          await getAccount(connection, recipientTokenAccount);
        } catch (err) {
          // Account doesn't exist, create it
          transaction.add(
            createAssociatedTokenAccountInstruction(
              publicKey, // payer
              recipientTokenAccount, // associated token account
              recipientPubkey, // owner
              usdcMint // mint
            )
          );
        }

        // Add transfer instruction
        const usdcAmount = Math.floor(amount * 1_000_000); // USDC has 6 decimals
        transaction.add(
          createTransferInstruction(
            senderTokenAccount,
            recipientTokenAccount,
            publicKey,
            usdcAmount
          )
        );

        // Add memo if provided
        if (memo) {
          const memoInstruction = new TransactionInstruction({
            keys: [{ pubkey: publicKey, isSigner: true, isWritable: true }],
            data: Buffer.from(memo, 'utf-8'),
            programId: new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'),
          });
          transaction.add(memoInstruction);
        }

        const signature = await sendTransaction(transaction, connection);
        
        // Wait for confirmation
        await connection.confirmTransaction(signature, 'confirmed');

        return signature;
      } catch (err: any) {
        console.error('Error sending USDC:', err);
        const errorMessage = err?.message || 'Failed to send USDC';
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [publicKey, sendTransaction, connection]
  );

  const send = useCallback(
    async (params: SendTransactionParams) => {
      const { recipient, amount, token, memo } = params;

      if (token === 'SOL') {
        return sendSOL(recipient, amount, memo);
      } else {
        return sendUSDC(recipient, amount, memo);
      }
    },
    [sendSOL, sendUSDC]
  );

  return {
    send,
    sendSOL,
    sendUSDC,
    loading,
    error,
  };
}
