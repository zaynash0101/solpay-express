'use client';

import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { History, ExternalLink, Copy, ArrowUpRight, ArrowDownLeft, RefreshCw, AlertCircle } from 'lucide-react';
import { useTransactions } from '@/hooks/useTransactions';
import { formatWalletAddress, formatRelativeTime, formatNumber } from '@/lib/utils';
import { getExplorerUrl } from '@/lib/solana';
import { copyToClipboard } from '@/lib/utils';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

type FilterType = 'all' | 'sent' | 'received';

export function TransactionHistory() {
  const { connected } = useWallet();
  const { transactions, loading, refetch } = useTransactions(20);
  const [filter, setFilter] = useState<FilterType>('all');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setTimeout(() => setRefreshing(false), 500);
    toast.success('Transactions refreshed');
  };

  const handleCopySignature = async (signature: string) => {
    const success = await copyToClipboard(signature);
    if (success) {
      toast.success('Signature copied');
    }
  };

  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(tx => tx.type === filter);

  if (!connected) {
    return (
      <Card className="glass">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Connect your wallet to view transaction history</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5" />
              Transaction History
            </CardTitle>
            <CardDescription>Your recent transactions</CardDescription>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={refreshing}
            className="shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filter Buttons */}
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
            className="flex-1"
          >
            All
          </Button>
          <Button
            variant={filter === 'sent' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('sent')}
            className="flex-1"
          >
            Sent
          </Button>
          <Button
            variant={filter === 'received' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('received')}
            className="flex-1"
          >
            Received
          </Button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-muted/30 rounded-lg animate-pulse shimmer" />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredTransactions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <History className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
            <p className="text-muted-foreground font-medium mb-1">No transactions yet</p>
            <p className="text-sm text-muted-foreground">
              {filter === 'all' 
                ? 'Your transactions will appear here'
                : `No ${filter} transactions found`}
            </p>
          </div>
        )}

        {/* Transaction List */}
        {!loading && filteredTransactions.length > 0 && (
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
            <AnimatePresence>
              {filteredTransactions.map((tx, index) => (
                <motion.div
                  key={tx.signature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="group glass-hover p-4 rounded-lg cursor-pointer"
                  onClick={() => window.open(getExplorerUrl(tx.signature, 'tx'), '_blank')}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className={`
                      p-2 rounded-lg shrink-0
                      ${tx.type === 'sent' 
                        ? 'bg-destructive/20 text-destructive' 
                        : 'bg-solana-green/20 text-solana-green'}
                    `}>
                      {tx.type === 'sent' ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownLeft className="w-4 h-4" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <div className="font-semibold capitalize">
                            {tx.type}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatRelativeTime(tx.timestamp)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold ${
                            tx.type === 'sent' ? 'text-destructive' : 'text-solana-green'
                          }`}>
                            {tx.type === 'sent' ? '-' : '+'}{formatNumber(tx.amount, 4)} {tx.token}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {tx.status === 'confirmed' ? '✓ Confirmed' : '✗ Failed'}
                          </div>
                        </div>
                      </div>

                      {/* Other Party */}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <span>{tx.type === 'sent' ? 'To:' : 'From:'}</span>
                        <span className="font-mono">{formatWalletAddress(tx.otherParty, 6)}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(tx.otherParty);
                            toast.success('Address copied');
                          }}
                          className="hover:text-foreground transition-colors"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Signature */}
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">Signature:</span>
                        <span className="font-mono text-muted-foreground">
                          {formatWalletAddress(tx.signature, 4)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopySignature(tx.signature);
                          }}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-solana-purple transition-colors ml-auto" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Load More (Future Enhancement) */}
        {!loading && filteredTransactions.length >= 20 && (
          <div className="text-center pt-2">
            <p className="text-xs text-muted-foreground">
              Showing last 20 transactions
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
