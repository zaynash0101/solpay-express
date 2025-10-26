'use client';

import React, { useState, useRef } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Copy, Share2, Wallet, AlertCircle } from 'lucide-react';
import { copyToClipboard, formatNumber } from '@/lib/utils';
import { useBalance } from '@/hooks/useBalance';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export function ReceivePayment() {
  const { publicKey, connected } = useWallet();
  const { balance } = useBalance();
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<'SOL' | 'USDC'>('SOL');
  const qrRef = useRef<HTMLDivElement>(null);

  const walletAddress = publicKey?.toBase58() || '';
  
  // Generate QR code data
  const qrData = amount && parseFloat(amount) > 0
    ? `solana:${walletAddress}?amount=${amount}&spl-token=${currency === 'USDC' ? 'USDC' : ''}`
    : `solana:${walletAddress}`;

  const handleCopyAddress = async () => {
    const success = await copyToClipboard(walletAddress);
    if (success) {
      toast.success('Address copied to clipboard');
    } else {
      toast.error('Failed to copy address');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Solana Wallet Address',
          text: `Send ${currency} to my wallet: ${walletAddress}`,
          url: `https://solscan.io/account/${walletAddress}`,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback to copy
      handleCopyAddress();
    }
  };

  const handleDownloadQR = () => {
    if (!qrRef.current) return;

    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `solpay-qr-${Date.now()}.png`;
          link.click();
          URL.revokeObjectURL(url);
          toast.success('QR code downloaded');
        }
      });
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  if (!connected) {
    return (
      <Card className="glass">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Connect your wallet to receive payments</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Receive Payment
        </CardTitle>
        <CardDescription>Share your wallet address or QR code</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Currency Toggle */}
        <div className="flex gap-2 p-1 bg-muted/50 rounded-lg">
          <button
            type="button"
            onClick={() => setCurrency('SOL')}
            className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
              currency === 'SOL'
                ? 'bg-solana-purple text-white shadow-lg'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            SOL
          </button>
          <button
            type="button"
            onClick={() => setCurrency('USDC')}
            className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
              currency === 'USDC'
                ? 'bg-solana-green text-background shadow-lg'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            USDC
          </button>
        </div>

        {/* QR Code */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center p-6 bg-white rounded-xl"
          ref={qrRef}
        >
          <QRCodeSVG
            value={qrData}
            size={220}
            level="H"
            includeMargin={true}
            fgColor="#0F0F23"
            bgColor="#FFFFFF"
          />
        </motion.div>

        {/* Amount Request (Optional) */}
        <div className="space-y-2">
          <Label htmlFor="request-amount">Request Amount (Optional)</Label>
          <div className="relative">
            <Input
              id="request-amount"
              type="number"
              step="any"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pr-16"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
              {currency}
            </div>
          </div>
          {amount && parseFloat(amount) > 0 && (
            <p className="text-xs text-muted-foreground">
              QR code includes requested amount
            </p>
          )}
        </div>

        {/* Wallet Address */}
        <div className="space-y-2">
          <Label>Your Wallet Address</Label>
          <div className="flex gap-2">
            <Input
              value={walletAddress}
              readOnly
              className="font-mono text-sm"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopyAddress}
              className="shrink-0"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Current Balance */}
        <div className="p-4 bg-gradient-to-r from-solana-purple/10 to-solana-green/10 rounded-lg border border-white/10">
          <div className="text-sm text-muted-foreground mb-2">Current Balance</div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">
                {formatNumber(currency === 'SOL' ? balance.sol : balance.usdc, 4)} {currency}
              </div>
              <div className="text-sm text-muted-foreground">
                ≈ ${formatNumber((currency === 'SOL' ? balance.sol * 100 : balance.usdc), 2)} USD
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            onClick={handleShare}
            className="w-full"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button
            variant="outline"
            onClick={handleDownloadQR}
            className="w-full"
          >
            <Download className="w-4 h-4 mr-2" />
            Download QR
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
