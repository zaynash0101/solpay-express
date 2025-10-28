# 🚀 SolPay Express

**Freelancer Invoice & Payment System on Solana**

Built for the **Superteam Pakistan Mini-Hack** - A professional invoicing platform for Pakistani freelancers to create invoices, manage clients, and receive instant USDC payments without international fees.

![Solana](https://img.shields.io/badge/Solana-Devnet-9945FF?style=for-the-badge&logo=solana)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## 🎯 Problem We Solve

Pakistani freelancers lose **5-10% on international payments**:

| Traditional Method | Cost | Time | Issues |
|-------------------|------|------|--------|
| **PayPal** | 4.4% + $0.30 per transaction | Instant | High fees, limited in Pakistan |
| **Wise** | 3-5% fee | 3-5 days | Slow, conversion fees |
| **Bank Transfer** | $25-50 fee | 5-7 days | Very slow, expensive |

### SolPay Express Solution:
- ✅ **Cost**: < $0.01 per transaction (99% cheaper)
- ✅ **Speed**: < 2 seconds (1000x faster)
- ✅ **Professional**: Built-in invoicing system
- ✅ **Global**: No international transfer restrictions

## ✨ Features

### 📄 Invoice Management
- **Create Professional Invoices**: Generate detailed invoices with line items, tax, and terms
- **Invoice Templates**: Pre-built templates for common freelance services
- **Auto-numbering**: Automatic invoice numbering (INV-001, INV-002, etc.)
- **Status Tracking**: Track pending, paid, overdue, and draft invoices
- **Payment Links**: Generate shareable payment links for each invoice
- **PDF Export**: Download invoices as professional PDFs

### 👥 Client Management
- **Client Database**: Store and manage client information
- **Quick Select**: Select existing clients when creating invoices
- **Payment History**: View all invoices and payments per client
- **Client Stats**: Track total paid and invoice count per client

### 💸 Payment Features
- **Instant Payments**: Receive USDC/SOL payments in < 2 seconds
- **Payment Requests**: Quick payment links without full invoices
- **QR Code Support**: Generate QR codes for easy mobile payments
- **Transaction History**: Complete payment history with Solscan links
- **Multi-Wallet Support**: Compatible with Phantom, Solflare, and Backpack

### 🎨 User Experience
- **Beautiful UI**: Modern glassmorphism design with Solana brand colors
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Mobile Responsive**: Fully optimized for mobile, tablet, and desktop
- **Dark Mode**: Elegant dark theme optimized for extended use
- **Toast Notifications**: Real-time feedback for all user actions

### 🔒 Security & Reliability
- **Non-custodial**: Your keys, your crypto - we never store private keys
- **Input Validation**: Comprehensive client-side validation for all inputs
- **Error Handling**: Graceful error handling with helpful error messages
- **Transaction Confirmation**: Mandatory confirmation modal for all transactions
- **Network Detection**: Automatic network detection and display

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Blockchain
- **Network**: Solana (Devnet/Mainnet)
- **Wallet Adapter**: @solana/wallet-adapter-react
- **Web3 Library**: @solana/web3.js
- **Token Standard**: SPL Token (USDC)

### State Management & Utilities
- **Notifications**: React Hot Toast
- **QR Codes**: qrcode.react
- **Utilities**: Custom hooks for balance, transactions, and sending

## 🚀 Quick Start for Judges

### Try the Live Demo

**Demo mode is enabled by default** with sample invoices and clients for easy testing.

To test real Solana transactions:

1. **Connect Wallet**: Click "Connect Wallet" and select Phantom or Solflare
2. **Switch to Devnet**: Change your wallet network to Devnet
3. **Get Test SOL**: Visit [faucet.solana.com](https://faucet.solana.com) to get free devnet SOL
4. **Create Invoice**: Go to Dashboard → Create Invoice
5. **Test Payment**: Share the payment link and complete a test transaction

### Key Features to Test

✅ **Invoice Creation** - Create professional invoices with line items
✅ **Payment Links** - Generate shareable payment URLs  
✅ **Instant Payments** - Complete transactions in < 2 seconds
✅ **Client Management** - Store and manage client information
✅ **Demo Mode** - Pre-loaded sample data for quick testing

---

## 📦 Local Development

### Prerequisites
- Node.js 18+ installed
- A Solana wallet (Phantom, Solflare, or Backpack)
- Git

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/zaynash0101/solpay-express.git
cd solpay-express
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_HELIUS_RPC_URL=https://api.devnet.solana.com
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your repository
- Add environment variables
- Deploy!

### Environment Variables for Production
```env
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_HELIUS_RPC_URL=your-mainnet-rpc-url
```

## 📖 Usage Guide

### For Freelancers

#### Creating an Invoice

1. **Connect Wallet**: Click "Connect Wallet" and select your wallet
2. **Go to Dashboard**: Navigate to the Invoices tab
3. **Create Invoice**: Click "New Invoice" button
4. **Fill Details**:
   - Client name and wallet address
   - Invoice date and due date
   - Add line items (description, quantity, rate)
   - Add optional tax, notes, and payment terms
5. **Generate**: Click "Create Invoice & Generate Link"
6. **Share**: Copy the payment link and share with your client via WhatsApp, email, or any messaging app

#### Managing Clients

1. **Go to Clients Tab**: View all your clients
2. **Add Client**: Click "Add Client" to save client details
3. **Quick Invoice**: Click "Create Invoice" on any client card to pre-fill invoice
4. **Track Payments**: View total paid and invoice count per client

#### Payment Requests

1. **Go to Payment Requests Tab**
2. **Enter Details**: Client wallet, amount, and description
3. **Generate Link**: Create instant payment link
4. **Share**: Send via WhatsApp, email, or copy link

### For Clients (Paying Invoices)

1. **Open Link**: Click the invoice link sent by freelancer
2. **Review Invoice**: See all invoice details and line items
3. **Connect Wallet**: Connect your Solana wallet
4. **Pay**: Click "Pay Now" and approve in wallet
5. **Done**: Payment completes in < 2 seconds!

### Dashboard Overview

- **Stats**: View pending invoices, total earned, and monthly revenue
- **Quick Actions**: Fast access to create invoice, payment request, or manage clients
- **Wallet Balance**: Real-time SOL and USDC balance display

## 🏗️ Project Structure

```
solpay-express/
├── app/
│   ├── layout.tsx                # Root layout with wallet provider
│   ├── page.tsx                  # Landing page
│   ├── dashboard/
│   │   └── page.tsx              # Invoice dashboard
│   ├── invoice/[id]/
│   │   └── page.tsx              # Invoice payment page
│   └── globals.css               # Global styles
├── components/
│   ├── wallet/
│   │   ├── WalletButton.tsx
│   │   └── WalletProvider.tsx
│   ├── features/
│   │   ├── CreateInvoice.tsx     # Invoice creation form
│   │   ├── InvoiceList.tsx       # Invoice management
│   │   ├── ClientList.tsx        # Client management
│   │   ├── PaymentRequest.tsx    # Quick payment requests
│   │   ├── SendPayment.tsx
│   │   ├── ReceivePayment.tsx
│   │   └── TransactionHistory.tsx
│   ├── integrated/
│   │   ├── InvoiceDashboard.tsx  # Main invoice dashboard
│   │   └── Hero.tsx              # Landing page hero
│   └── ui/                       # shadcn/ui components
├── hooks/
│   ├── useBalance.ts
│   ├── useTransactions.ts
│   └── useSendTransaction.ts
├── lib/
│   ├── solana.ts                 # Solana utilities
│   ├── invoiceStorage.ts         # Invoice data management
│   ├── generatePDF.ts            # PDF generation
│   └── utils.ts                  # Helper functions
├── types/
│   └── index.ts                  # TypeScript types (Invoice, Client, etc.)
└── public/                       # Static assets
```

## 🎨 Design System

### Colors
```css
Primary: #9945FF (Solana Purple)
Secondary: #14F195 (Solana Green)
Accent: #00D4FF (Cyan)
Background: #0F0F23 (Dark Blue)
```

### Typography
- **Font**: Inter
- **Headings**: Bold (700)
- **Body**: Regular (400)

### Components
- **Glassmorphism**: Frosted glass effect with backdrop blur
- **Gradient Buttons**: Purple to green gradient
- **Smooth Transitions**: 300ms ease-in-out

## 🧪 Testing

### Manual Testing Checklist

- [ ] Wallet connection (Phantom, Solflare, Backpack)
- [ ] Send SOL transaction
- [ ] Send USDC transaction
- [ ] QR code generation
- [ ] Transaction history loading
- [ ] Mobile responsiveness
- [ ] Error handling
- [ ] Loading states

### Test on Devnet

1. Get devnet SOL from [faucet](https://faucet.solana.com/)
2. Get devnet USDC from [SPL Token Faucet](https://spl-token-faucet.com/)
3. Test all features thoroughly

## 🐛 Troubleshooting

### Common Issues

**Wallet not connecting**
- Ensure wallet extension is installed
- Try refreshing the page
- Check if wallet is unlocked

**Transaction failing**
- Verify sufficient balance
- Check network connection
- Ensure correct network (devnet/mainnet)

**USDC not showing**
- USDC token account may not exist yet
- Send USDC to yourself first to create account

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Solana Foundation** for the amazing blockchain
- **Superteam Pakistan** for organizing the Mini-Hack
- **shadcn/ui** for beautiful components
- **Vercel** for hosting platform

## 📞 Contact

- **Twitter**: [@solpayexpress](https://twitter.com/solpayexpress)
- **Discord**: [Join our community](https://discord.gg/solpay)
- **Email**: support@solpayexpress.com

## 🎯 Roadmap

### Phase 1 (Current) ✅
- [x] Professional invoice creation
- [x] Client management system
- [x] Payment request links
- [x] Invoice status tracking
- [x] PDF export
- [x] Demo data for testing

### Phase 2 (Next)
- [ ] Email invoice delivery
- [ ] Recurring invoices
- [ ] Invoice templates library
- [ ] Multi-currency support (PKR display)
- [ ] Analytics dashboard
- [ ] Export to CSV/Excel

### Phase 3 (Future)
- [ ] Multi-language support (Urdu, English)
- [ ] Mobile app (React Native)
- [ ] Team collaboration features
- [ ] Expense tracking
- [ ] Tax calculations
- [ ] Integration with accounting software

## 💡 Use Cases

### 1. Web Developers
Create invoices for website projects, track client payments, and get paid instantly in USDC.

### 2. Graphic Designers
Invoice for logo design, branding work, and receive payments without PayPal fees.

### 3. Content Writers
Bill clients for articles, blog posts, and copywriting services with professional invoices.

### 4. Consultants
Generate invoices for hourly consulting work and track all client engagements.

### 5. Virtual Assistants
Create recurring invoices for monthly retainer clients and manage multiple clients easily.

---

**Built with ❤️ for the Solana ecosystem**

**Made for Superteam Pakistan Mini-Hack 🇵🇰**
