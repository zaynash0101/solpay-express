'use client';

import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Send, ArrowLeftRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSendTransaction } from '@/hooks/useSendTransaction';
import { useBalance } from '@/hooks/useBalance';
import { isValidPublicKey, getExplorerUrl } from '@/lib/solana';
import { formatNumber } from '@/lib/utils';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface SendPaymentProps {
  onSuccess?: (signature: string) => void;
}

export function SendPayment({ onSuccess }: SendPaymentProps) {
  const { publicKey, connected } = useWallet();
  const { send, loading: sending } = useSendTransaction();
  const { balance } = useBalance();

  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<'SOL' | 'USDC'>('SOL');
  const [memo, setMemo] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState<{ recipient?: string; amount?: string }>({});

  // Validation
  const validateForm = (): boolean => {
    const newErrors: { recipient?: string; amount?: string } = {};

    if (!recipientAddress) {
      newErrors.recipient = 'Recipient address is required';
    } else if (!isValidPublicKey(recipientAddress)) {
      newErrors.recipient = 'Invalid Solana address';
    }

    const amountNum = parseFloat(amount);
    if (!amount || isNaN(amountNum)) {
      newErrors.amount = 'Amount is required';
    } else if (amountNum <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    } else {
      const maxBalance = currency === 'SOL' ? balance.sol : balance.usdc;
      if (amountNum > maxBalance) {
        newErrors.amount = `Insufficient balance. You have ${formatNumber(maxBalance, 4)} ${currency}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowConfirmation(true);
    }
  };

  const handleConfirm = async () => {
    try {
      const signature = await send({
        recipient: recipientAddress,
        amount: parseFloat(amount),
        token: currency,
        memo: memo || undefined,
      });

      toast.success(
        <div className="flex flex-col gap-1">
          <div className="font-semibold">Transaction Successful!</div>
          <a
            href={getExplorerUrl(signature, 'tx')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-solana-green hover:underline"
          >
            View on Explorer →
          </a>
        </div>,
        { duration: 6000 }
      );

      // Reset form
      setRecipientAddress('');
      setAmount('');
      setMemo('');
      setShowConfirmation(false);
      
      onSuccess?.(signature);
    } catch (error: any) {
      console.error('Transaction error:', error);
      toast.error(error?.message || 'Transaction failed');
      setShowConfirmation(false);
    }
  };

  const handleMaxClick = () => {
    const maxBalance = currency === 'SOL' ? balance.sol : balance.usdc;
    // Reserve 0.001 SOL for transaction fees
    const maxAmount = currency === 'SOL' ? Math.max(0, maxBalance - 0.001) : maxBalance;
    setAmount(maxAmount.toString());
  };

  const usdValue = parseFloat(amount) * (currency === 'SOL' ? 100 : 1); // Fake conversion rate

  if (!connected) {
    return (
      <Card className="glass">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Connect your wallet to send payments</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            Send Payment
          </CardTitle>
          <CardDescription>Transfer SOL or USDC instantly</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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

            {/* Recipient Address */}
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Address</Label>
              <Input
                id="recipient"
                placeholder="Enter Solana wallet address"
                value={recipientAddress}
                onChange={(e) => {
                  setRecipientAddress(e.target.value);
                  setErrors({ ...errors, recipient: undefined });
                }}
                className={errors.recipient ? 'border-destructive' : ''}
              />
              {errors.recipient && (
                <p className="text-xs text-destructive">{errors.recipient}</p>
              )}
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="amount">Amount</Label>
                <button
                  type="button"
                  onClick={handleMaxClick}
                  className="text-xs text-solana-purple hover:text-solana-green transition-colors font-semibold"
                >
                  MAX
                </button>
              </div>
              <div className="relative">
                <Input
                  id="amount"
                  type="number"
                  step="any"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setErrors({ ...errors, amount: undefined });
                  }}
                  className={`pr-16 ${errors.amount ? 'border-destructive' : ''}`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                  {currency}
                </div>
              </div>
              {errors.amount && (
                <p className="text-xs text-destructive">{errors.amount}</p>
              )}
              {amount && !errors.amount && (
                <p className="text-xs text-muted-foreground">
                  ≈ ${formatNumber(usdValue, 2)} USD
                </p>
              )}
            </div>

            {/* Balance Display */}
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Available Balance</span>
                <span className="font-semibold">
                  {formatNumber(currency === 'SOL' ? balance.sol : balance.usdc, 4)} {currency}
                </span>
              </div>
            </div>

            {/* Memo (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="memo">Memo (Optional)</Label>
              <Input
                id="memo"
                placeholder="Add a note"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                maxLength={100}
              />
            </div>

            {/* Network Fee */}
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Network Fee</span>
                <span className="font-semibold text-solana-green">~$0.00025</span>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="gradient"
              className="w-full"
              disabled={sending}
            >
              {sending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Review Transaction
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !sending && setShowConfirmation(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <Card className="glass border-2">
                <CardHeader>
                  <CardTitle>Confirm Transaction</CardTitle>
                  <CardDescription>Please review the details before sending</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Amount</span>
                      <span className="font-semibold text-lg">
                        {amount} {currency}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">USD Value</span>
                      <span className="font-semibold">${formatNumber(usdValue, 2)}</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex justify-between items-start">
                      <span className="text-muted-foreground">To</span>
                      <span className="font-mono text-sm text-right break-all max-w-[200px]">
                        {recipientAddress}
                      </span>
                    </div>
                    {memo && (
                      <div className="flex justify-between items-start">
                        <span className="text-muted-foreground">Memo</span>
                        <span className="text-sm text-right max-w-[200px]">{memo}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowConfirmation(false)}
                      disabled={sending}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="gradient"
                      className="flex-1"
                      onClick={handleConfirm}
                      disabled={sending}
                    >
                      {sending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Confirm & Send
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
