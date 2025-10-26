# ✅ Solana Actions Testing Checklist

## 🎯 Complete Testing Guide - Follow Step by Step

---

## ✅ STEP 1: Start Development Server

```bash
npm run dev
```

**Expected Output:**
```
> solpay-express@1.0.0 dev
> next dev

  ▲ Next.js 14.1.0
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

**✓ Checkpoint**: Server running at http://localhost:3000

---

## ✅ STEP 2: Connect Wallet & Access Dashboard

### 2.1 Open Browser
1. Open http://localhost:3000
2. You should see the landing page with "Invoice & Get Paid Instantly on Solana"

### 2.2 Connect Wallet
1. Click **"Launch App"** or **"Connect Wallet"** button
2. Select your wallet (Phantom, Solflare, or Backpack)
3. Approve connection
4. You should be redirected to `/dashboard`

### 2.3 Verify Dashboard Loads
**Check for:**
- ✅ "Freelancer Dashboard" heading
- ✅ Solana Actions banner at top (purple/cyan gradient)
- ✅ Stats cards (Total Invoices, Pending, Paid, Total Earned)
- ✅ Navigation tabs (Dashboard, Invoices, Clients, Payment Requests)
- ✅ Demo data loaded (5 invoices should exist)

**✓ Checkpoint**: Dashboard loaded with demo data

---

## ✅ STEP 3: Create Test Invoice

### 3.1 Navigate to Invoices
1. Click **"Invoices"** tab
2. You should see list of existing invoices
3. Look for **"New Invoice"** button (top right, purple gradient)

### 3.2 Create New Invoice
1. Click **"New Invoice"**
2. Fill in the form:

```
Client Information:
- Client Name: Test Client
- Client Wallet: [Your test wallet address or use demo address]
- Client Email: test@example.com

Invoice Details:
- Currency: USDC
- Tax Rate: 0%

Line Items:
- Description: Solana Actions Testing
- Quantity: 1
- Rate: 100
- Amount: 100 (auto-calculated)

Payment Terms:
- Due Date: [Select tomorrow's date]
- Terms: Payment due upon receipt
- Notes: Test invoice for Solana Actions

```

3. Click **"Create Invoice & Generate Link"**

### 3.3 Verify Invoice Created
**Check for:**
- ✅ Success toast notification
- ✅ Redirected to Invoices list
- ✅ New invoice appears (INV-006 or similar)
- ✅ Status badge shows "PENDING" (yellow)
- ✅ Amount shows "100 USDC"

**✓ Checkpoint**: Test invoice created successfully

---

## ✅ STEP 4: Generate & Test Blink

### 4.1 Open Blink Preview
1. Find your test invoice in the list
2. Look for the **"Share"** button (purple button with share icon)
3. Click **"Share"**

### 4.2 Verify Blink Preview Modal
**The modal should show:**

✅ **Header**: "Payment Link Preview"
✅ **Twitter Preview Section**:
   - Profile avatar
   - Tweet text with invoice details
   - Interactive payment card with:
     - Invoice number
     - Amount
     - "Pay with Solana Wallet" button

✅ **WhatsApp Preview Section**:
   - Green message bubble
   - Formatted message with invoice details
   - Link preview

✅ **Share Buttons**:
   - Twitter (blue)
   - WhatsApp (green)
   - Telegram (blue)
   - Email (gray)

✅ **Discord Message Section**:
   - Pre-formatted message
   - "Copy Discord Message" button

✅ **Direct Link Section**:
   - Full invoice URL
   - "Copy" button

✅ **Info Banner**:
   - Explanation of Solana Actions
   - Mentions Twitter interactive button

### 4.3 Test Copy Link
1. Click **"Copy"** button in Direct Link section
2. Should see "Copied!" confirmation
3. Paste in notepad - should be: `http://localhost:3000/invoice/inv-006`

**✓ Checkpoint**: Blink preview modal works correctly

---

## ✅ STEP 5: Test Invoice Payment Page

### 5.1 Open Invoice Link
1. Copy the invoice URL from Blink Preview
2. Open in **new incognito/private window** (to simulate client view)
3. Navigate to the URL

### 5.2 Verify Payment Page
**Should display:**
- ✅ Professional invoice layout
- ✅ Invoice number (INV-006)
- ✅ Client and freelancer information
- ✅ Line items table
- ✅ Subtotal, tax, total
- ✅ Payment terms and notes
- ✅ Status badge (PENDING)
- ✅ **"Pay Now"** button (prominent, gradient)

### 5.3 Check Meta Tags (Optional)
1. Right-click → View Page Source
2. Look for meta tags in `<head>`:
```html
<meta property="og:title" content="Invoice INV-006 - $100 USDC" />
<meta property="og:description" content="Pay invoice from..." />
<meta name="solana:action" content="http://localhost:3000/api/actions/invoice?invoiceId=inv-006" />
```

**✓ Checkpoint**: Invoice payment page displays correctly

---

## ✅ STEP 6: Test Actions API Endpoints

### 6.1 Test GET Endpoint
Open new browser tab and navigate to:
```
http://localhost:3000/api/actions/invoice?invoiceId=inv-006
```

**Expected Response** (JSON):
```json
{
  "icon": "http://localhost:3000/logo.png",
  "title": "Invoice INV-006 - $100 USDC",
  "description": "Pay invoice from [Your Name]. Solana Actions Testing",
  "label": "Pay $100 USDC",
  "links": {
    "actions": [
      {
        "label": "Pay $100 USDC",
        "href": "/api/actions/invoice?invoiceId=inv-006"
      }
    ]
  }
}
```

**✓ Checkpoint**: GET endpoint returns correct metadata

### 6.2 Test with Invalid Invoice ID
Navigate to:
```
http://localhost:3000/api/actions/invoice?invoiceId=invalid-id
```

**Expected Response**:
```json
{
  "message": "Invoice not found"
}
```
Status: 404

**✓ Checkpoint**: Error handling works

---

## ✅ STEP 7: Test on dial.to (Solana Actions Tester)

### 7.1 Setup ngrok (For Public URL)

Since dial.to needs a public URL, we need to expose localhost:

```bash
# Install ngrok if you haven't
# Download from: https://ngrok.com/download

# Run ngrok
ngrok http 3000
```

**Expected Output:**
```
Forwarding    https://abc123.ngrok.io -> http://localhost:3000
```

Copy the `https://abc123.ngrok.io` URL

### 7.2 Test on dial.to

1. Go to: https://dial.to
2. In the URL field, enter:
```
solana-action:https://abc123.ngrok.io/api/actions/invoice?invoiceId=inv-006
```
   (Replace `abc123.ngrok.io` with your ngrok URL)

3. Click **"Preview"** or press Enter

### 7.3 Verify dial.to Display
**Should show:**
- ✅ Invoice title and description
- ✅ Amount ($100 USDC)
- ✅ "Pay $100 USDC" button
- ✅ Clean, professional layout

### 7.4 Test Payment on dial.to
1. Click **"Pay $100 USDC"** button
2. Wallet should open (Phantom/Solflare)
3. Transaction details should show:
   - Recipient: Your wallet address
   - Amount: 100 USDC
   - Memo: Invoice INV-006

**⚠️ Note**: Don't actually send on devnet unless you have test USDC

**✓ Checkpoint**: dial.to integration works

---

## ✅ STEP 8: Test Social Sharing

### 8.1 Test Twitter Sharing
1. Go back to your dashboard
2. Click "Share" on test invoice
3. Click **"Twitter"** button

**Should:**
- ✅ Open Twitter in new tab
- ✅ Pre-filled tweet with:
  - Invoice number
  - Amount
  - "Pay instantly via Solana" text
  - Your invoice link

**Optional**: Post tweet from test account to see card unfurl

### 8.2 Test WhatsApp Sharing
1. Click **"WhatsApp"** button

**Should:**
- ✅ Open WhatsApp Web or app
- ✅ Pre-filled message with:
  - Greeting
  - Invoice details
  - Link
  - Professional formatting

### 8.3 Test Discord Copy
1. Click **"Copy Discord Message"** button
2. Should see "Copied!" confirmation
3. Paste in Discord (or notepad to verify)

**Should contain:**
```
📄 **Invoice INV-006**
💵 Amount: **$100 USDC**
📝 Solana Actions Testing

🔗 http://localhost:3000/invoice/inv-006

✨ Pay instantly via Solana wallet...
```

### 8.4 Test Email
1. Click **"Email"** button

**Should:**
- ✅ Open default email client
- ✅ Pre-filled subject: "Invoice INV-006 - $100 USDC"
- ✅ Pre-filled body with professional template
- ✅ Invoice link included

**✓ Checkpoint**: All social sharing methods work

---

## ✅ STEP 9: Test Payment Flow (End-to-End)

### 9.1 Setup
1. Make sure you have devnet USDC in your wallet
   - Get devnet SOL: https://faucet.solana.com
   - Get devnet USDC: https://spl-token-faucet.com

2. Open invoice payment page in incognito window

### 9.2 Execute Payment
1. Click **"Pay Now"** button
2. Click **"Connect Wallet"** if not connected
3. Select your wallet
4. Approve connection
5. Click **"Pay Now"** again
6. Wallet opens with transaction
7. Review transaction details:
   - ✅ Recipient address correct
   - ✅ Amount: 100 USDC
   - ✅ Memo: Invoice INV-006
8. Click **"Approve"** in wallet

### 9.3 Verify Success
**Should see:**
- ✅ Success toast notification
- ✅ "Payment Successful!" message
- ✅ Transaction signature displayed
- ✅ "View on Explorer" link
- ✅ Invoice status updates to "PAID" (green badge)
- ✅ Paid date shown
- ✅ Transaction signature saved

### 9.4 Verify in Dashboard
1. Go back to dashboard (original window)
2. Refresh page or navigate to Invoices tab
3. Find your test invoice

**Should show:**
- ✅ Status: PAID (green)
- ✅ Paid date
- ✅ Transaction signature
- ✅ "View TX" link to Solscan

**✓ Checkpoint**: Complete payment flow works!

---

## ✅ STEP 10: Test on Mobile

### 10.1 Get Mobile Access

**Option A: Same WiFi Network**
1. Find your computer's local IP:
   ```bash
   # Windows
   ipconfig
   # Look for IPv4 Address (e.g., 192.168.1.100)
   ```

2. On mobile, open browser and go to:
   ```
   http://192.168.1.100:3000
   ```

**Option B: Use ngrok**
```
Open: https://abc123.ngrok.io
```

### 10.2 Test Mobile Experience
1. **Landing Page**:
   - ✅ Responsive layout
   - ✅ Readable text
   - ✅ Buttons are touch-friendly

2. **Connect Wallet**:
   - ✅ Wallet opens (Phantom mobile app)
   - ✅ Connection works
   - ✅ Redirects to dashboard

3. **Dashboard**:
   - ✅ Stats cards stack vertically
   - ✅ Navigation tabs scrollable
   - ✅ All content readable

4. **Invoice List**:
   - ✅ Cards stack properly
   - ✅ Buttons accessible
   - ✅ Share button works

5. **Blink Preview Modal**:
   - ✅ Modal fits screen
   - ✅ Scrollable content
   - ✅ Share buttons work
   - ✅ Opens native apps (WhatsApp, Twitter)

6. **Payment Page**:
   - ✅ Invoice displays correctly
   - ✅ Pay button prominent
   - ✅ Wallet deep linking works
   - ✅ Payment completes

**✓ Checkpoint**: Mobile experience is excellent

---

## ✅ STEP 11: Test Edge Cases

### 11.1 Test Paid Invoice
1. Try to share an already paid invoice
2. **Expected**: Share button should still work (for receipt sharing)

### 11.2 Test Invalid Invoice
1. Navigate to: `http://localhost:3000/invoice/invalid-id`
2. **Expected**: "Invoice Not Found" message

### 11.3 Test API Errors
1. Test GET with no invoiceId:
   ```
   http://localhost:3000/api/actions/invoice
   ```
   **Expected**: 400 error "Invoice ID is required"

2. Test POST with invalid wallet:
   ```bash
   curl -X POST http://localhost:3000/api/actions/invoice?invoiceId=inv-006 \
     -H "Content-Type: application/json" \
     -d '{"account":"invalid-wallet"}'
   ```
   **Expected**: 400 error "Invalid wallet address"

### 11.4 Test CORS
1. Open browser console on any external site
2. Try to fetch:
   ```javascript
   fetch('http://localhost:3000/api/actions/invoice?invoiceId=inv-006')
     .then(r => r.json())
     .then(console.log)
   ```
   **Expected**: Should work (CORS headers allow it)

**✓ Checkpoint**: Error handling works correctly

---

## ✅ STEP 12: Performance & UX Testing

### 12.1 Speed Test
- ✅ Dashboard loads in < 2 seconds
- ✅ Invoice list renders instantly
- ✅ Blink preview opens smoothly
- ✅ Payment page loads quickly
- ✅ Transaction confirms in < 2 seconds

### 12.2 UX Test
- ✅ All buttons have hover states
- ✅ Loading states show during actions
- ✅ Success/error toasts appear
- ✅ Animations are smooth
- ✅ No layout shifts
- ✅ Icons load properly

### 12.3 Accessibility
- ✅ Keyboard navigation works
- ✅ Focus states visible
- ✅ Text is readable (contrast)
- ✅ Buttons are properly sized

**✓ Checkpoint**: Performance and UX are excellent

---

## 📊 Final Testing Summary

### ✅ Core Features
- [x] Invoice creation
- [x] Invoice listing
- [x] Share button
- [x] Blink preview modal
- [x] Social sharing (Twitter, WhatsApp, Discord, Telegram, Email)
- [x] Copy link functionality
- [x] Invoice payment page
- [x] Wallet connection
- [x] Payment execution
- [x] Status updates

### ✅ API Endpoints
- [x] GET /api/actions/invoice (metadata)
- [x] POST /api/actions/invoice (transaction)
- [x] CORS headers
- [x] Error handling
- [x] Input validation

### ✅ Integrations
- [x] Solana Actions spec compliance
- [x] dial.to compatibility
- [x] Social media sharing
- [x] Wallet adapters
- [x] Transaction building

### ✅ User Experience
- [x] Beautiful UI
- [x] Responsive design
- [x] Mobile-friendly
- [x] Fast performance
- [x] Clear feedback
- [x] Error messages

### ✅ Documentation
- [x] README
- [x] Implementation guide
- [x] Testing guide
- [x] API documentation

---

## 🎉 Testing Complete!

If all checkpoints passed, your Solana Actions (Blinks) implementation is **PRODUCTION READY**! 🚀

---

## 🐛 Troubleshooting

### Issue: Server won't start
```bash
# Kill any process on port 3000
npx kill-port 3000
# Restart
npm run dev
```

### Issue: Wallet won't connect
- Clear browser cache
- Try different browser
- Check wallet extension is installed
- Try different wallet

### Issue: API returns 404
- Restart dev server
- Check file exists: `app/api/actions/invoice/route.ts`
- Clear Next.js cache: `rm -rf .next`

### Issue: Payment fails
- Check wallet has devnet USDC
- Verify network is devnet
- Check RPC endpoint
- Try with different wallet

### Issue: Share buttons don't work
- Check pop-up blocker
- Allow pop-ups for localhost
- Try different browser

---

## 📞 Need Help?

Check documentation:
- `SOLANA_ACTIONS_GUIDE.md`
- `BLINKS_IMPLEMENTATION_COMPLETE.md`
- `TESTING_BLINKS.md`

---

**Happy Testing! 🧪✨**
