# ⚡ Quick Start Guide

Get SolPay Express running in 5 minutes!

## 🎯 What You Need

1. **Node.js 18+** - [Download here](https://nodejs.org/)
2. **A Solana Wallet** - [Phantom](https://phantom.app/) (recommended)
3. **Git** - [Download here](https://git-scm.com/)

## 🚀 Installation (3 Steps)

### Step 1: Clone & Install
```bash
# Clone the repository
git clone https://github.com/yourusername/solpay-express.git
cd solpay-express

# Install dependencies (takes ~2 minutes)
npm install
```

### Step 2: Configure
```bash
# Copy environment file
cp .env.example .env.local
```

That's it! The default configuration works out of the box.

### Step 3: Run
```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 🎮 First Transaction

### Get Test Funds
1. Go to [Solana Faucet](https://faucet.solana.com/)
2. Enter your wallet address
3. Click "Confirm Airdrop"
4. Wait ~10 seconds

### Send Your First Payment
1. Click "Connect Wallet" on the homepage
2. Approve connection in Phantom
3. Go to Dashboard
4. Enter a recipient address (or use your own)
5. Enter amount (try 0.01 SOL)
6. Click "Review Transaction"
7. Click "Confirm & Send"
8. Approve in wallet
9. Done! Transaction completes in ~2 seconds ⚡

## 📱 Test on Mobile

1. Make sure your computer and phone are on the same network
2. Find your local IP:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```
3. On your phone, go to: `http://YOUR_IP:3000`
4. Connect wallet and test!

## 🎨 Customize

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  'solana-purple': '#9945FF',  // Change this
  'solana-green': '#14F195',   // And this
  'solana-blue': '#00D4FF',    // And this
}
```

### Change Network
Edit `.env.local`:
```env
# For mainnet (real money!)
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta

# For devnet (test money)
NEXT_PUBLIC_SOLANA_NETWORK=devnet
```

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### Wallet Won't Connect
1. Refresh the page
2. Make sure wallet extension is unlocked
3. Try a different browser
4. Clear browser cache

### Transaction Fails
1. Check you have enough SOL
2. Make sure you're on devnet
3. Try a smaller amount
4. Check Solana network status

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

## 📚 Next Steps

- Read the full [README.md](README.md)
- Check [TESTING.md](TESTING.md) for testing guide
- See [DEPLOYMENT.md](DEPLOYMENT.md) to deploy
- Join our [Discord](https://discord.gg/solpay)

## 🎯 Common Tasks

### Build for Production
```bash
npm run build
npm start
```

### Check for Errors
```bash
npm run lint
```

### Format Code
```bash
npm run format
```

## 💡 Pro Tips

1. **Use Devnet First**: Always test on devnet before mainnet
2. **Keep Backups**: Save your wallet seed phrase safely
3. **Monitor Transactions**: Use Solscan to track transactions
4. **Stay Updated**: Watch the repo for updates
5. **Ask Questions**: Join Discord if you need help

## 🎉 You're Ready!

You now have a fully functional Solana payment dApp running locally!

**What's Next?**
- Customize the UI
- Add new features
- Deploy to production
- Share with friends

---

**Need Help?** Join our [Discord](https://discord.gg/solpay) or open an [issue](https://github.com/yourusername/solpay-express/issues)

**Happy Building! 🚀**
