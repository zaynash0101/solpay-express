import { NextRequest, NextResponse } from 'next/server'
import { 
  Connection, 
  PublicKey, 
  Transaction, 
  SystemProgram,
  LAMPORTS_PER_SOL,
  clusterApiUrl
} from '@solana/web3.js'
import { 
  getAssociatedTokenAddress, 
  createTransferInstruction,
  TOKEN_PROGRAM_ID 
} from '@solana/spl-token'

// USDC Mint Address on Devnet
const USDC_MINT_DEVNET = new PublicKey('Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr')
// USDC Mint Address on Mainnet
const USDC_MINT_MAINNET = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')

const NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet'
const USDC_MINT = NETWORK === 'mainnet-beta' ? USDC_MINT_MAINNET : USDC_MINT_DEVNET

// CORS headers for Solana Actions
const ACTIONS_CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Encoding, Accept-Encoding',
  'Content-Type': 'application/json',
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: ACTIONS_CORS_HEADERS,
  })
}

// GET endpoint - Returns Solana Actions metadata
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const to = searchParams.get('to')
    const amount = searchParams.get('amount')
    const token = searchParams.get('token') || 'SOL'

    // Validate parameters
    if (!to) {
      return NextResponse.json(
        { error: 'Missing recipient address (to parameter)' },
        { status: 400, headers: ACTIONS_CORS_HEADERS }
      )
    }

    // Validate wallet address
    try {
      new PublicKey(to)
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid recipient wallet address' },
        { status: 400, headers: ACTIONS_CORS_HEADERS }
      )
    }

    const displayAmount = amount || '{amount}'
    const displayToken = token.toUpperCase()
    const shortAddress = `${to.slice(0, 4)}...${to.slice(-4)}`

    // Return Solana Actions metadata
    const metadata = {
      title: `Send ${displayAmount} ${displayToken} via SolPay Express`,
      icon: `${process.env.NEXT_PUBLIC_APP_URL || 'https://solpay-express.vercel.app'}/logo.png`,
      description: `Pay ${displayAmount} ${displayToken} to ${shortAddress} using SolPay Express - Lightning fast Solana payments`,
      label: 'Send Payment',
      links: {
        actions: [
          {
            label: `Send ${displayAmount} ${displayToken}`,
            href: `/api/actions/pay?to=${to}&amount=${displayAmount}&token=${token}`,
            parameters: amount ? undefined : [
              {
                name: 'amount',
                label: 'Enter amount',
                required: true,
              },
            ],
          },
        ],
      },
    }

    return NextResponse.json(metadata, {
      status: 200,
      headers: ACTIONS_CORS_HEADERS,
    })
  } catch (error) {
    console.error('GET /api/actions/pay error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: ACTIONS_CORS_HEADERS }
    )
  }
}

// POST endpoint - Creates and returns transaction
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const body = await request.json()

    // Extract parameters
    const to = searchParams.get('to')
    const amountParam = searchParams.get('amount')
    const token = searchParams.get('token') || 'SOL'
    const account = body.account

    // Validate required parameters
    if (!to) {
      return NextResponse.json(
        { error: 'Missing recipient address' },
        { status: 400, headers: ACTIONS_CORS_HEADERS }
      )
    }

    if (!amountParam) {
      return NextResponse.json(
        { error: 'Missing amount' },
        { status: 400, headers: ACTIONS_CORS_HEADERS }
      )
    }

    if (!account) {
      return NextResponse.json(
        { error: 'Missing sender account' },
        { status: 400, headers: ACTIONS_CORS_HEADERS }
      )
    }

    // Parse and validate amount
    const amount = parseFloat(amountParam)
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400, headers: ACTIONS_CORS_HEADERS }
      )
    }

    // Validate addresses
    let fromPubkey: PublicKey
    let toPubkey: PublicKey

    try {
      fromPubkey = new PublicKey(account)
      toPubkey = new PublicKey(to)
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid wallet address' },
        { status: 400, headers: ACTIONS_CORS_HEADERS }
      )
    }

    // Create connection
    const connection = new Connection(
      process.env.NEXT_PUBLIC_HELIUS_RPC_URL || clusterApiUrl(NETWORK as any),
      'confirmed'
    )

    // Create transaction
    const transaction = new Transaction()

    if (token.toUpperCase() === 'SOL') {
      // SOL transfer
      const lamports = Math.floor(amount * LAMPORTS_PER_SOL)
      
      transaction.add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports,
        })
      )
    } else if (token.toUpperCase() === 'USDC') {
      // USDC transfer
      const decimals = 6 // USDC has 6 decimals
      const transferAmount = Math.floor(amount * Math.pow(10, decimals))

      // Get associated token addresses
      const fromTokenAccount = await getAssociatedTokenAddress(
        USDC_MINT,
        fromPubkey
      )

      const toTokenAccount = await getAssociatedTokenAddress(
        USDC_MINT,
        toPubkey
      )

      // Create transfer instruction
      transaction.add(
        createTransferInstruction(
          fromTokenAccount,
          toTokenAccount,
          fromPubkey,
          transferAmount,
          [],
          TOKEN_PROGRAM_ID
        )
      )
    } else {
      return NextResponse.json(
        { error: 'Unsupported token. Use SOL or USDC' },
        { status: 400, headers: ACTIONS_CORS_HEADERS }
      )
    }

    // Set recent blockhash and fee payer
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
    transaction.recentBlockhash = blockhash
    transaction.feePayer = fromPubkey
    transaction.lastValidBlockHeight = lastValidBlockHeight

    // Serialize transaction
    const serializedTransaction = transaction.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    })

    const base64Transaction = serializedTransaction.toString('base64')

    // Return transaction following Solana Actions spec
    return NextResponse.json(
      {
        transaction: base64Transaction,
        message: `Sending ${amount} ${token.toUpperCase()} to ${to.slice(0, 4)}...${to.slice(-4)}`,
      },
      {
        status: 200,
        headers: ACTIONS_CORS_HEADERS,
      }
    )
  } catch (error: any) {
    console.error('POST /api/actions/pay error:', error)
    
    return NextResponse.json(
      { 
        error: error?.message || 'Failed to create transaction',
        details: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      },
      { 
        status: 500, 
        headers: ACTIONS_CORS_HEADERS 
      }
    )
  }
}
