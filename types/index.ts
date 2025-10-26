import { PublicKey } from '@solana/web3.js';

export interface Transaction {
  signature: string;
  type: 'sent' | 'received';
  amount: number;
  token: 'SOL' | 'USDC';
  otherParty: string;
  timestamp: number;
  status: 'confirmed' | 'failed';
}

export interface Balance {
  sol: number;
  usdc: number;
}

export interface SendTransactionParams {
  recipient: string;
  amount: number;
  token: 'SOL' | 'USDC';
  memo?: string;
}

export interface WalletContextState {
  connected: boolean;
  publicKey: PublicKey | null;
  connecting: boolean;
  disconnect: () => Promise<void>;
}

export type Network = 'devnet' | 'mainnet-beta' | 'testnet';

// Invoice Types
export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId?: string;
  clientName: string;
  clientWallet: string;
  clientEmail?: string;
  freelancerName: string;
  freelancerWallet: string;
  items: InvoiceLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: 'SOL' | 'USDC';
  notes?: string;
  terms?: string;
  status: 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled';
  issueDate: number;
  dueDate: number;
  paidDate?: number;
  transactionSignature?: string;
  createdAt: number;
  updatedAt: number;
}

export interface Client {
  id: string;
  name: string;
  wallet: string;
  email?: string;
  notes?: string;
  tags?: string[];
  totalPaid: number;
  invoiceCount: number;
  createdAt: number;
  updatedAt: number;
}

export interface PaymentRequest {
  id: string;
  clientWallet: string;
  amount: number;
  currency: 'SOL' | 'USDC';
  description: string;
  status: 'pending' | 'paid' | 'expired';
  createdAt: number;
  expiresAt?: number;
  paidAt?: number;
  transactionSignature?: string;
}

export interface FreelancerSettings {
  name: string;
  wallet: string;
  email?: string;
  defaultTerms: string;
  defaultTax: number;
  invoicePrefix: string;
  nextInvoiceNumber: number;
}
