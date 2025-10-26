# 🧪 Testing Solana Actions (Blinks) - Quick Guide

## ⚡ Quick Start

### 1. Start Development Server
```bash
npm run dev
```

### 2. Connect Wallet
- Open http://localhost:3000
- Click "Launch App" or "Connect Wallet"
- Approve connection in Phantom/Solflare

### 3. Navigate to Dashboard
- You should see demo invoices loaded
- Look for the Solana Actions banner at top

---

## 🎯 Test Flow

### Step 1: View Existing Invoice
1. Go to **Invoices** tab
2. Find a pending invoice (INV-004 or INV-005)
3. Click **"Share"** button (purple button with Share2 icon)

### Step 2: Explore Blink Preview
The modal should show:
- ✅ Twitter/X preview with interactive card
- ✅ WhatsApp message preview
- ✅ Share buttons (Twitter, WhatsApp, Telegram, Email)
- ✅ Discord message format
- ✅ Copy link button
- ✅ Info banner about Solana Actions

### Step 3: Test Social Sharing

#### Twitter
1. Click **"Twitter"** button
2. Should open Twitter with pre-filled tweet
3. Tweet text includes invoice number and amount
4. Link is included

#### WhatsApp
1. Click **"WhatsApp"** button
2. Should open WhatsApp Web or app
3. Message is pre-formatted with invoice details

#### Copy Link
1. Click **"Copy Link"** button
2. Should show "Copied!" confirmation
3. Paste in browser to test

### Step 4: Test Payment Page
1. Copy invoice link (e.g., `http://localhost:3000/invoice/inv-4`)
2. Open in new tab or incognito window
3. Should see:
   - ✅ Professional invoice layout
   - ✅ All line items
   - ✅ Amount, tax, total
   - ✅ "Pay Now" button
   - ✅ Wallet connection prompt

### Step 5: Test Payment Flow
1. On invoice payment page, click **"Pay Now"**
2. Connect wallet if not connected
3. Wallet should open with transaction
4. Approve transaction
5. Should see success message
6. Invoice should update to "Paid" status
7. Transaction signature should be saved

---

## 🔧 Test API Endpoints

### Test GET Endpoint
```bash
# Test with curl or browser
curl http://localhost:3000/api/actions/invoice?invoiceId=inv-4
```

**Expected Response:**
```json
{
  "icon": "http://localhost:3000/logo.png",
  "title": "Invoice INV-004 - $400 USDC",
  "description": "Pay invoice from Freelancer. UI/UX Consultation",
  "label": "Pay $400 USDC",
  "links": {
    "actions": [
      {
        "label": "Pay $400 USDC",
        "href": "/api/actions/invoice?invoiceId=inv-4"
      }
    ]
  }
}
```

### Test POST Endpoint
```bash
curl -X POST http://localhost:3000/api/actions/invoice?invoiceId=inv-4 \
  -H "Content-Type: application/json" \
  -d '{"account":"YOUR_WALLET_ADDRESS"}'
```

**Expected Response:**
```json
{
  "transaction": "BASE64_ENCODED_TRANSACTION...",
  "message": "Payment of 400 USDC for invoice INV-004"
}
```

---

## 🐛 Common Issues & Solutions

### Issue: "Invoice not found"
**Solution**: Make sure you're using a valid invoice ID from demo data:
- `inv-1`, `inv-2`, `inv-3` (paid)
- `inv-4`, `inv-5` (pending)

### Issue: Share button not appearing
**Solution**: 
- Only pending/overdue invoices show Share button
- Paid/cancelled invoices don't have Share button
- Refresh the page to reload invoices

### Issue: BlinkPreview modal not opening
**Solution**:
- Check browser console for errors
- Make sure BlinkPreview component is imported
- Verify state management in InvoiceList

### Issue: Social share buttons not working
**Solution**:
- Check if pop-up blocker is enabled
- Try allowing pop-ups for localhost
- Test in different browser

### Issue: API returning 404
**Solution**:
- Restart dev server (`npm run dev`)
- Check file exists: `app/api/actions/invoice/route.ts`
- Verify Next.js API routes are working

### Issue: CORS errors
**Solution**:
- Check `next.config.js` has CORS headers
- Restart dev server after config changes
- Clear browser cache

### Issue: Transaction failing
**Solution**:
- Check wallet has sufficient balance (devnet SOL/USDC)
- Verify network is set to devnet
- Check RPC endpoint is responding
- Try with different wallet

---

## 📱 Mobile Testing

### Test on Mobile Device

1. **Get your local IP**:
   ```bash
   # Windows
   ipconfig
   # Look for IPv4 Address (e.g., 192.168.1.100)
   ```

2. **Access from mobile**:
   ```
   http://192.168.1.100:3000
   ```

3. **Test mobile wallet**:
   - Use Phantom mobile app
   - Test deep linking
   - Verify payment flow

---

## 🎨 Visual Testing Checklist

### BlinkPreview Modal
- [ ] Modal opens smoothly
- [ ] Twitter preview looks good
- [ ] WhatsApp preview is formatted correctly
- [ ] All share buttons are visible
- [ ] Discord message is properly formatted
- [ ] Copy button works
- [ ] Close button works
- [ ] Responsive on mobile

### Invoice Payment Page
- [ ] Invoice details display correctly
- [ ] Line items are formatted
- [ ] Amount calculations are correct
- [ ] Pay button is prominent
- [ ] Wallet connection works
- [ ] Success state shows properly
- [ ] Transaction link works

### Dashboard Banner
- [ ] Banner is visible on dashboard
- [ ] Platform badges display correctly
- [ ] Text is readable
- [ ] Styling matches theme

---

## 🚀 Testing on dial.to

### What is dial.to?
Official Solana Actions testing tool by Dialect.

### How to Test

1. **Get your invoice URL**:
   ```
   http://localhost:3000/invoice/inv-4
   ```

2. **Use ngrok for public URL** (if testing locally):
   ```bash
   ngrok http 3000
   ```
   Copy the https URL (e.g., `https://abc123.ngrok.io`)

3. **Test on dial.to**:
   ```
   https://dial.to/?action=solana-action:https://abc123.ngrok.io/api/actions/invoice?invoiceId=inv-4
   ```

4. **Verify**:
   - Action metadata loads
   - Pay button appears
   - Clicking opens wallet
   - Transaction can be signed

---

## 🔍 Debugging Tips

### Check Browser Console
```javascript
// Should see no errors
// Look for successful API calls
// Check for CORS issues
```

### Check Network Tab
```
GET /api/actions/invoice?invoiceId=inv-4
Status: 200 OK
Response: JSON with action metadata

POST /api/actions/invoice?invoiceId=inv-4
Status: 200 OK
Response: JSON with transaction
```

### Check Server Logs
```bash
# In terminal running npm run dev
# Should see API requests
# Look for any errors
```

### Test with Different Wallets
- [ ] Phantom
- [ ] Solflare
- [ ] Backpack
- [ ] Mobile wallets

---

## ✅ Pre-Demo Checklist

### Before Showing to Anyone

- [ ] Dev server is running
- [ ] Wallet is connected
- [ ] Demo invoices are loaded
- [ ] At least one pending invoice exists
- [ ] Share button appears on pending invoices
- [ ] BlinkPreview modal opens correctly
- [ ] All social share buttons work
- [ ] Copy link functionality works
- [ ] Invoice payment page loads
- [ ] Payment flow completes successfully
- [ ] Invoice updates to "Paid" after payment
- [ ] No console errors
- [ ] Mobile responsive (test on phone)

### For Live Demo

- [ ] Have wallet with devnet SOL/USDC
- [ ] Know which invoice to demo (INV-004 or INV-005)
- [ ] Practice the flow 2-3 times
- [ ] Have backup plan if internet fails
- [ ] Take screenshots/video as backup
- [ ] Prepare talking points
- [ ] Know the value proposition

---

## 🎬 Demo Script

### 30-Second Version
1. "I have an invoice for $400 USDC"
2. "Click Share"
3. "See how it looks on Twitter? Interactive payment button!"
4. "Client clicks, pays in 2 seconds"
5. "Invoice automatically marked as paid"

### 2-Minute Version
1. **Setup** (20s): "I'm a freelancer, just finished work for a client"
2. **Create** (20s): "Create invoice with line items, $400 total"
3. **Share** (30s): "Click Share, see beautiful preview for each platform"
4. **Twitter** (30s): "Share on Twitter, link unfurls with pay button"
5. **Payment** (20s): "Client clicks, wallet opens, approves, done in 2 seconds!"

### 5-Minute Version
- Include problem statement
- Show cost comparison
- Demonstrate full flow
- Highlight technical implementation
- Discuss future enhancements

---

## 📊 Success Metrics

### What to Measure
- Time from share to payment: **< 30 seconds**
- Payment confirmation time: **< 2 seconds**
- User steps required: **2 clicks** (Share → Pay)
- Platforms supported: **5** (Twitter, WhatsApp, Discord, Telegram, Email)
- Cost per transaction: **< $0.01**

### What to Highlight
- **99% cheaper** than PayPal
- **1000x faster** than bank transfer
- **Zero app downloads** required
- **Works everywhere** social media exists
- **Professional** invoicing included

---

## 🎯 Testing Scenarios

### Scenario 1: Happy Path
1. Create invoice → Share → Pay → Success
2. **Expected**: Everything works smoothly

### Scenario 2: Already Paid
1. Try to share a paid invoice
2. **Expected**: Share button not visible

### Scenario 3: Invalid Invoice
1. Try to access `/invoice/invalid-id`
2. **Expected**: "Invoice not found" message

### Scenario 4: Insufficient Balance
1. Try to pay with wallet that has no USDC
2. **Expected**: Transaction fails with clear error

### Scenario 5: Network Error
1. Disconnect internet, try to pay
2. **Expected**: Graceful error handling

---

## 🔥 Pro Tips

### For Best Demo Experience

1. **Pre-load everything**: Have dashboard open, wallet connected
2. **Use pending invoice**: INV-004 ($400) or INV-005 ($800)
3. **Have devnet funds**: Ensure wallet has USDC
4. **Test beforehand**: Run through flow 2-3 times
5. **Prepare for questions**: Know the tech stack
6. **Show mobile**: If possible, demo on phone too
7. **Highlight innovation**: Emphasize Solana Actions
8. **Compare alternatives**: Show PayPal/Wise fees
9. **Be confident**: You built something amazing!
10. **Have fun**: This is a killer feature! 🚀

---

## 🆘 Emergency Troubleshooting

### If Demo Breaks

**Plan A**: Use screenshots/video
**Plan B**: Show code and explain
**Plan C**: Walk through user flow verbally
**Plan D**: Show documentation

### Quick Fixes

```bash
# Restart everything
Ctrl+C (stop server)
npm run dev (restart)
Refresh browser
Reconnect wallet

# Clear cache
Ctrl+Shift+R (hard refresh)
Clear localStorage
Restart browser

# Check basics
Is server running? ✓
Is wallet connected? ✓
Is network devnet? ✓
Any console errors? ✗
```

---

## ✅ Final Check

Before going live:

```
[ ] Server running
[ ] Wallet connected
[ ] Demo data loaded
[ ] Share button works
[ ] Modal opens
[ ] Social shares work
[ ] Payment completes
[ ] Invoice updates
[ ] No errors
[ ] Looks beautiful
[ ] You're confident
[ ] Ready to WIN! 🏆
```

---

**You've got this! Go win that hackathon! 🚀**
