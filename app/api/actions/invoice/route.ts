import { NextRequest, NextResponse } from 'next/server';
import {
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { getConnection, getUSDCMintAddress } from '@/lib/solana';

// Solana Actions types
interface ActionGetResponse {
  icon: string;
  title: string;
  description: string;
  label: string;
  links?: {
    actions: ActionLink[];
  };
}

interface ActionLink {
  label: string;
  href: string;
  parameters?: ActionParameter[];
}

interface ActionParameter {
  name: string;
  label: string;
  required?: boolean;
}

interface ActionPostRequest {
  account: string;
}

interface ActionPostResponse {
  transaction: string;
  message?: string;
}

interface ActionError {
  message: string;
}

// Mock invoice data structure (since we can't access localStorage on server)
// In production, you'd fetch this from a database
interface InvoiceData {
  id: string;
  invoiceNumber: string;
  clientName: string;
  freelancerName: string;
  freelancerWallet: string;
  total: number;
  currency: 'SOL' | 'USDC';
  status: string;
  items: Array<{
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }>;
}

// Helper function to get invoice data
// NOTE: In production, this should fetch from a database
// For now, we'll return mock data based on invoice ID
function getInvoiceData(invoiceId: string): InvoiceData | null {
  // This is a placeholder - in production, fetch from database
  // For demo purposes, we'll return mock data
  const mockInvoices: Record<string, InvoiceData> = {
    'inv-1': {
      id: 'inv-1',
      invoiceNumber: 'INV-001',
      clientName: 'Acme Corp',
      freelancerName: 'Freelancer',
      freelancerWallet: '9mNPqRsTuVwXyZ1aBcDeFgHiJkLmNoPqRsTuVwXyZ1aB',
      total: 500,
      currency: 'USDC',
      status: 'pending',
      items: [{ description: 'Web Design', quantity: 1, rate: 500, amount: 500 }],
    },
    'inv-4': {
      id: 'inv-4',
      invoiceNumber: 'INV-004',
      clientName: 'Design Agency',
      freelancerName: 'Freelancer',
      freelancerWallet: '3lNoPqRsTuVwXyZ1aBcDeFgHiJkLmNoPqRsTuVwXyZ1a',
      total: 400,
      currency: 'USDC',
      status: 'pending',
      items: [{ description: 'UI/UX Consultation', quantity: 4, rate: 100, amount: 400 }],
    },
    'inv-5': {
      id: 'inv-5',
      invoiceNumber: 'INV-005',
      clientName: 'Acme Corp',
      freelancerName: 'Freelancer',
      freelancerWallet: '9mNPqRsTuVwXyZ1aBcDeFgHiJkLmNoPqRsTuVwXyZ1aB',
      total: 800,
      currency: 'USDC',
      status: 'pending',
      items: [{ description: 'Mobile App Design', quantity: 1, rate: 800, amount: 800 }],
    },
  };

  return mockInvoices[invoiceId] || null;
}

// GET handler - Returns action metadata
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const invoiceId = searchParams.get('invoiceId');

    if (!invoiceId) {
      return NextResponse.json(
        { message: 'Invoice ID is required' } as ActionError,
        { status: 400 }
      );
    }

    // Get invoice data
    const invoice = getInvoiceData(invoiceId);

    if (!invoice) {
      return NextResponse.json(
        { message: 'Invoice not found' } as ActionError,
        { status: 404 }
      );
    }

    if (invoice.status === 'paid') {
      return NextResponse.json(
        { message: 'Invoice already paid' } as ActionError,
        { status: 400 }
      );
    }

    // Get base URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Return Solana Actions metadata
    const response: ActionGetResponse = {
      icon: `${baseUrl}/logo.png`,
      title: `Invoice ${invoice.invoiceNumber} - $${invoice.total} ${invoice.currency}`,
      description: `Pay invoice from ${invoice.freelancerName}. ${invoice.items.map(item => item.description).join(', ')}`,
      label: `Pay $${invoice.total} ${invoice.currency}`,
      links: {
        actions: [
          {
            label: `Pay $${invoice.total} ${invoice.currency}`,
            href: `/api/actions/invoice?invoiceId=${invoiceId}`,
          },
        ],
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in GET /api/actions/invoice:', error);
    return NextResponse.json(
      { message: 'Internal server error' } as ActionError,
      { status: 500 }
    );
  }
}

// POST handler - Creates and returns transaction
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const invoiceId = searchParams.get('invoiceId');

    if (!invoiceId) {
      return NextResponse.json(
        { message: 'Invoice ID is required' } as ActionError,
        { status: 400 }
      );
    }

    // Parse request body
    const body: ActionPostRequest = await request.json();
    const { account } = body;

    if (!account) {
      return NextResponse.json(
        { message: 'Account is required' } as ActionError,
        { status: 400 }
      );
    }

    // Get invoice data
    const invoice = getInvoiceData(invoiceId);

    if (!invoice) {
      return NextResponse.json(
        { message: 'Invoice not found' } as ActionError,
        { status: 404 }
      );
    }

    if (invoice.status === 'paid') {
      return NextResponse.json(
        { message: 'Invoice already paid' } as ActionError,
        { status: 400 }
      );
    }

    // Validate public keys
    let fromPubkey: PublicKey;
    let toPubkey: PublicKey;

    try {
      fromPubkey = new PublicKey(account);
      toPubkey = new PublicKey(invoice.freelancerWallet);
    } catch (error) {
      return NextResponse.json(
        { message: 'Invalid wallet address' } as ActionError,
        { status: 400 }
      );
    }

    // Create transaction
    const connection = getConnection();
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    const transaction = new Transaction({
      feePayer: fromPubkey,
      blockhash,
      lastValidBlockHeight,
    });

    // Add transfer instruction based on currency
    if (invoice.currency === 'SOL') {
      // SOL transfer
      const lamports = invoice.total * LAMPORTS_PER_SOL;
      transaction.add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports,
        })
      );
    } else {
      // USDC transfer
      const usdcMint = getUSDCMintAddress();
      const amount = invoice.total * 1_000_000; // USDC has 6 decimals

      // Get associated token accounts
      const fromTokenAccount = await getAssociatedTokenAddress(
        usdcMint,
        fromPubkey
      );

      const toTokenAccount = await getAssociatedTokenAddress(
        usdcMint,
        toPubkey
      );

      // Add transfer instruction
      transaction.add(
        createTransferInstruction(
          fromTokenAccount,
          toTokenAccount,
          fromPubkey,
          amount,
          [],
          TOKEN_PROGRAM_ID
        )
      );
    }

    // Serialize transaction
    const serializedTransaction = transaction.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    });

    const base64Transaction = serializedTransaction.toString('base64');

    // Return transaction
    const response: ActionPostResponse = {
      transaction: base64Transaction,
      message: `Payment of ${invoice.total} ${invoice.currency} for invoice ${invoice.invoiceNumber}`,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in POST /api/actions/invoice:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Internal server error' } as ActionError,
      { status: 500 }
    );
  }
}

// OPTIONS handler for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept-Encoding, Accept',
    },
  });
}
