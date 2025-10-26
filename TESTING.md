# 🧪 Testing Guide

Comprehensive testing guide for SolPay Express.

## Prerequisites

- Phantom, Solflare, or Backpack wallet installed
- Devnet SOL (get from [faucet](https://faucet.solana.com/))
- Devnet USDC (get from [SPL Token Faucet](https://spl-token-faucet.com/))

## Manual Testing Checklist

### 1. Wallet Connection ✅

**Test Cases:**
- [ ] Connect with Phantom wallet
- [ ] Connect with Solflare wallet
- [ ] Connect with Backpack wallet
- [ ] Wallet button shows correct address
- [ ] Balance displays correctly
- [ ] Network indicator shows "Devnet"
- [ ] Disconnect wallet works
- [ ] Auto-connect on page reload

**Expected Behavior:**
- Wallet connects smoothly
- Address truncated properly (e.g., "ABC...XYZ")
- Balance updates within 5 seconds

### 2. Send SOL Transaction 💸

**Test Cases:**
- [ ] Enter valid recipient address
- [ ] Enter valid amount
- [ ] Click "Max" button
- [ ] Add optional memo
- [ ] Review transaction modal appears
- [ ] Transaction details are correct
- [ ] Confirm transaction
- [ ] Success toast appears
- [ ] Transaction link works
- [ ] Balance updates after transaction

**Test Scenarios:**
1. **Valid Transaction:**
   - Recipient: Valid Solana address
   - Amount: 0.1 SOL
   - Expected: Success

2. **Insufficient Balance:**
   - Amount: More than balance
   - Expected: Error message

3. **Invalid Address:**
   - Recipient: Invalid address
   - Expected: Validation error

### 3. Send USDC Transaction 💵

**Test Cases:**
- [ ] Switch to USDC
- [ ] Enter valid recipient
- [ ] Enter valid amount
- [ ] Transaction creates ATA if needed
- [ ] Transaction succeeds
- [ ] Balance updates

**Note:** First USDC transaction may take longer due to ATA creation.

### 4. Receive Payment 📥

**Test Cases:**
- [ ] QR code generates correctly
- [ ] Copy address button works
- [ ] Share button works (mobile)
- [ ] Download QR button works
- [ ] Optional amount includes in QR
- [ ] Current balance displays

**QR Code Formats:**
- Without amount: `solana:ADDRESS`
- With amount: `solana:ADDRESS?amount=1.5&spl-token=USDC`

### 5. Transaction History 📜

**Test Cases:**
- [ ] Transactions load correctly
- [ ] Filter by "All" works
- [ ] Filter by "Sent" works
- [ ] Filter by "Received" works
- [ ] Transaction cards show correct info
- [ ] Click transaction opens Solscan
- [ ] Copy signature works
- [ ] Copy address works
- [ ] Refresh button works
- [ ] Empty state shows when no transactions

**Transaction Card Should Show:**
- Type badge (Sent/Received)
- Amount with token symbol
- Other party address (truncated)
- Timestamp (relative)
- Transaction signature
- Status (Confirmed/Failed)

### 6. Responsive Design 📱

**Test on:**
- [ ] Mobile (< 640px)
- [ ] Tablet (640px - 1024px)
- [ ] Desktop (> 1024px)

**Mobile Specific:**
- [ ] Tab navigation works
- [ ] Touch targets are adequate (min 48px)
- [ ] Text is readable
- [ ] No horizontal scroll
- [ ] Buttons are accessible

### 7. Error Handling ⚠️

**Test Scenarios:**
1. **Wallet Not Installed:**
   - Expected: Install prompt

2. **Wrong Network:**
   - Expected: Network switch prompt

3. **Transaction Rejected:**
   - Expected: Clear error message

4. **Network Error:**
   - Expected: Retry option

5. **Insufficient Balance:**
   - Expected: Exact shortfall shown

### 8. Loading States ⏳

**Test:**
- [ ] Initial page load
- [ ] Wallet connecting
- [ ] Balance loading
- [ ] Transaction sending
- [ ] History loading
- [ ] QR code generating

**Expected:**
- Skeleton loaders
- Spinners where appropriate
- No layout shift

### 9. Animations & UX ✨

**Test:**
- [ ] Page transitions smooth
- [ ] Button hover effects work
- [ ] Modal animations smooth
- [ ] Toast notifications appear/disappear
- [ ] Copy button shows checkmark
- [ ] No janky animations

### 10. Landing Page 🏠

**Test:**
- [ ] Hero section displays
- [ ] Features cards work
- [ ] Stats display
- [ ] CTA buttons work
- [ ] Footer links work
- [ ] Smooth scroll
- [ ] Animations trigger on scroll

## Automated Testing

### Unit Tests (Future)
```bash
npm run test
```

### E2E Tests (Future)
```bash
npm run test:e2e
```

## Performance Testing

### Lighthouse Audit
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit
4. Target scores:
   - Performance: > 90
   - Accessibility: > 95
   - Best Practices: > 90
   - SEO: > 90

### Load Testing
- Test with multiple concurrent users
- Monitor RPC rate limits
- Check for memory leaks

## Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Security Testing

- [ ] No private keys in localStorage
- [ ] No sensitive data in console
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Input sanitization
- [ ] Rate limiting

## Test Data

### Valid Test Addresses (Devnet)
```
Recipient 1: 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU
Recipient 2: 9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM
```

### Test Amounts
- Small: 0.001 SOL / USDC
- Medium: 0.1 SOL / USDC
- Large: 1.0 SOL / USDC

## Reporting Issues

When reporting bugs, include:
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Screenshots/videos
5. Browser/OS info
6. Wallet used
7. Transaction signature (if applicable)

## Test Results Template

```markdown
## Test Session: [Date]

**Tester:** [Name]
**Environment:** Devnet
**Browser:** Chrome 120
**Wallet:** Phantom

### Results
- ✅ Wallet Connection: PASS
- ✅ Send SOL: PASS
- ✅ Send USDC: PASS
- ✅ Receive: PASS
- ✅ History: PASS
- ✅ Mobile: PASS
- ⚠️ Issue: [Description]

### Notes
[Any additional observations]
```

## Continuous Testing

- Test after every major change
- Test before deployment
- Test on production after deployment
- Monitor error logs
- Collect user feedback

---

**Happy Testing! 🧪**
