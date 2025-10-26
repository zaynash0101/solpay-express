# ⚡ Quick Test Guide - 5 Minutes

## 🚀 Fast Track Testing

### Step 1: Start Server (30 seconds)
```bash
npm run dev
```
Wait for: `Ready in X.Xs` → Open http://localhost:3000

---

### Step 2: Connect & Navigate (30 seconds)
1. Click **"Launch App"**
2. Connect wallet (Phantom/Solflare)
3. You're in dashboard → See Solana Actions banner at top ✨

---

### Step 3: Test Blink Preview (1 minute)
1. Click **"Invoices"** tab
2. Find pending invoice (INV-004 or INV-005)
3. Click **"Share"** button (purple, with share icon)
4. **BOOM!** 🎉 Beautiful modal appears

**Check:**
- ✅ Twitter preview with payment card
- ✅ WhatsApp message preview
- ✅ Share buttons (Twitter, WhatsApp, Telegram, Email)
- ✅ Discord message format
- ✅ Copy link button

---

### Step 4: Test API (1 minute)
Open new tab:
```
http://localhost:3000/api/actions/invoice?invoiceId=inv-4
```

**Should see JSON:**
```json
{
  "title": "Invoice INV-004 - $400 USDC",
  "description": "Pay invoice from...",
  "label": "Pay $400 USDC",
  ...
}
```

✅ **API Works!**

---

### Step 5: Test Payment Page (1 minute)
1. Copy link from Blink Preview: `http://localhost:3000/invoice/inv-4`
2. Open in **incognito window**
3. See professional invoice layout
4. Click **"Pay Now"**
5. Wallet opens with transaction

✅ **Payment Flow Works!**

---

### Step 6: Test Social Sharing (1 minute)
Back in Blink Preview modal:

1. Click **"Twitter"** → Opens Twitter with pre-filled tweet ✅
2. Click **"WhatsApp"** → Opens WhatsApp with message ✅
3. Click **"Copy Discord Message"** → Copies formatted message ✅
4. Click **"Copy"** link → Copies invoice URL ✅

---

### Step 7: Test on dial.to (1 minute)

**Option A: Use ngrok**
```bash
ngrok http 3000
```
Copy the https URL

**Option B: Skip for now** (test locally first)

Go to: https://dial.to
Enter:
```
solana-action:https://YOUR-NGROK-URL.ngrok.io/api/actions/invoice?invoiceId=inv-4
```

Should show interactive payment button! ✅

---

## ✅ Quick Checklist

- [ ] Server running
- [ ] Wallet connected
- [ ] Dashboard loads
- [ ] Share button works
- [ ] Blink preview opens
- [ ] Twitter preview looks good
- [ ] WhatsApp preview looks good
- [ ] API returns JSON
- [ ] Payment page loads
- [ ] Social share buttons work

---

## 🎉 All Working?

**Congratulations!** Your Solana Actions (Blinks) implementation is working perfectly! 🚀

---

## 🎬 Demo Time!

Now you're ready to:
1. **Create new invoice** (your own test)
2. **Share on Twitter** (test account)
3. **Show the magic** (interactive payment card)
4. **Execute payment** (< 2 seconds)
5. **Win hackathon** 🏆

---

## 📱 Mobile Test (Optional)

Get your local IP:
```bash
ipconfig  # Windows
# Look for IPv4: 192.168.1.XXX
```

On phone: `http://192.168.1.XXX:3000`

Test:
- [ ] Responsive layout
- [ ] Share button works
- [ ] Modal fits screen
- [ ] Payment works

---

## 🐛 Quick Fixes

**Server won't start?**
```bash
npx kill-port 3000
npm run dev
```

**Wallet won't connect?**
- Clear cache
- Try different browser
- Check extension installed

**API returns 404?**
- Restart server
- Check file exists: `app/api/actions/invoice/route.ts`

**Share buttons don't work?**
- Disable pop-up blocker
- Try different browser

---

## 📚 Full Testing Guide

For comprehensive testing, see:
- `TESTING_CHECKLIST.md` - Complete step-by-step
- `TESTING_BLINKS.md` - Detailed testing guide
- `SOLANA_ACTIONS_GUIDE.md` - Implementation details

---

**Total Time: 5-7 minutes** ⏱️

**Result: Fully tested, demo-ready app!** 🎉

---

## 🎯 Next Steps

1. ✅ **Tested locally** → You're here!
2. **Test on dial.to** → Verify Solana Actions spec
3. **Test on mobile** → Ensure responsive
4. **Share on Twitter** → See it live!
5. **Practice demo** → 2-3 run-throughs
6. **Win hackathon** → 🏆

---

**You've got this! Go win! 🚀**
