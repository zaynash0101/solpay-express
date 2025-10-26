# 🚀 Deployment Guide

This guide covers deploying SolPay Express to production.

## Prerequisites

- GitHub account
- Vercel account (recommended) or other hosting provider
- Helius RPC endpoint (for better performance)
- Domain name (optional)

## Vercel Deployment (Recommended)

### Step 1: Prepare Repository

1. Push your code to GitHub:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next

### Step 3: Environment Variables

Add these environment variables in Vercel:

```env
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_HELIUS_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY
```

**Important**: 
- Get a Helius API key from [helius.dev](https://helius.dev)
- Use `mainnet-beta` for production
- Keep `devnet` for testing

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete (~2-3 minutes)
3. Your app is live! 🎉

### Step 5: Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate provisioning

## Alternative Hosting Options

### Netlify

1. Connect GitHub repository
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Add environment variables
4. Deploy

### Railway

1. Create new project
2. Connect GitHub repository
3. Add environment variables
4. Deploy automatically

### Self-Hosted (VPS)

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone https://github.com/yourusername/solpay-express.git
cd solpay-express

# Install dependencies
npm install

# Build
npm run build

# Start with PM2
npm install -g pm2
pm2 start npm --name "solpay" -- start
pm2 save
pm2 startup
```

## Environment Configuration

### Development
```env
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_HELIUS_RPC_URL=https://devnet.helius-rpc.com/?api-key=YOUR_KEY
```

### Production
```env
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_HELIUS_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
```

## Performance Optimization

### 1. Enable Edge Runtime
Add to `next.config.js`:
```javascript
export const runtime = 'edge';
```

### 2. Image Optimization
Use Next.js Image component for all images

### 3. Code Splitting
Already implemented via Next.js dynamic imports

### 4. Caching
Configure cache headers in `next.config.js`

## Monitoring

### Vercel Analytics
- Enable in project settings
- Track Web Vitals
- Monitor errors

### Error Tracking
Consider integrating:
- Sentry
- LogRocket
- Datadog

## Security Checklist

- [ ] Environment variables are secure
- [ ] No API keys in code
- [ ] HTTPS enabled
- [ ] CSP headers configured
- [ ] Rate limiting implemented
- [ ] Input validation on all forms

## Post-Deployment

1. **Test thoroughly**:
   - Connect wallet
   - Send test transaction
   - Check transaction history
   - Test on mobile

2. **Monitor**:
   - Check error logs
   - Monitor performance
   - Track user feedback

3. **Update**:
   - Keep dependencies updated
   - Monitor Solana network status
   - Update RPC endpoints if needed

## Troubleshooting

### Build Fails
- Check Node.js version (18+)
- Verify all dependencies installed
- Check for TypeScript errors

### Runtime Errors
- Verify environment variables
- Check RPC endpoint status
- Review browser console

### Performance Issues
- Enable caching
- Use CDN for static assets
- Optimize images

## Rollback

If deployment fails:
```bash
# Vercel
vercel rollback

# Manual
git revert HEAD
git push origin main
```

## Support

For deployment issues:
- Check [Vercel docs](https://vercel.com/docs)
- Join our [Discord](https://discord.gg/solpay)
- Open GitHub issue

---

**Happy Deploying! 🚀**
