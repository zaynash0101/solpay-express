import { Connection, clusterApiUrl, Commitment, PublicKey } from '@solana/web3.js';
import type { Network } from '@/types';

// Get network from environment variable
const network = (process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet') as Network;

// Get RPC URL from environment or use default
const getRpcUrl = (): string => {
  const customRpc = process.env.NEXT_PUBLIC_HELIUS_RPC_URL;
  if (customRpc && customRpc !== 'https://devnet.helius-rpc.com/?api-key=YOUR_KEY') {
    return customRpc;
  }
  return clusterApiUrl(network);
};

// Connection configuration
const commitment: Commitment = 'confirmed';
const endpoint = getRpcUrl();

// Create connection instance
let connection: Connection | null = null;

/**
 * Get Solana connection instance (singleton pattern)
 */
export function getConnection(): Connection {
  if (!connection) {
    connection = new Connection(endpoint, commitment);
  }
  return connection;
}

/**
 * Get current network
 */
export function getNetwork(): Network {
  return network;
}

/**
 * Get Solscan explorer URL
 * @param signature - Transaction signature or address
 * @param type - Type of explorer link ('tx' or 'address')
 */
export function getExplorerUrl(signature: string, type: 'tx' | 'address' = 'tx'): string {
  const baseUrl = 'https://solscan.io';
  const cluster = network === 'mainnet-beta' ? '' : `?cluster=${network}`;
  
  if (type === 'tx') {
    return `${baseUrl}/tx/${signature}${cluster}`;
  }
  return `${baseUrl}/account/${signature}${cluster}`;
}

/**
 * USDC token mint address (devnet)
 */
export const USDC_MINT_ADDRESS = new PublicKey(
  '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU' // USDC devnet
);

/**
 * Get USDC mint address for current network
 */
export function getUSDCMintAddress(): PublicKey {
  if (network === 'mainnet-beta') {
    return new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
  }
  // Devnet USDC
  return USDC_MINT_ADDRESS;
}

/**
 * Format wallet address for display
 * @param address - Wallet address
 * @param chars - Number of characters to show on each side
 */
export function formatWalletAddress(address: string, chars: number = 4): string {
  if (!address) return '';
  if (address.length <= chars * 2) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

/**
 * Convert lamports to SOL
 * @param lamports - Amount in lamports
 */
export function lamportsToSol(lamports: number): number {
  return lamports / 1_000_000_000;
}

/**
 * Convert SOL to lamports
 * @param sol - Amount in SOL
 */
export function solToLamports(sol: number): number {
  return Math.floor(sol * 1_000_000_000);
}

/**
 * Validate if string is a valid Solana public key
 * @param address - Address to validate
 */
export function isValidPublicKey(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get network display name
 */
export function getNetworkDisplayName(): string {
  switch (network) {
    case 'mainnet-beta':
      return 'Mainnet';
    case 'devnet':
      return 'Devnet';
    case 'testnet':
      return 'Testnet';
    default:
      return 'Unknown';
  }
}

/**
 * Airdrop SOL (devnet only)
 * @param publicKey - Recipient public key
 * @param amount - Amount in SOL
 */
export async function airdropSol(publicKey: PublicKey, amount: number = 1): Promise<string> {
  if (network !== 'devnet') {
    throw new Error('Airdrop only available on devnet');
  }
  
  const connection = getConnection();
  const lamports = solToLamports(amount);
  const signature = await connection.requestAirdrop(publicKey, lamports);
  await connection.confirmTransaction(signature);
  return signature;
}
