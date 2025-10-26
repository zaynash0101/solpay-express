'use client';

import { useState } from 'react';
import { X, Twitter, MessageCircle, Send, Mail, Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Invoice } from '@/types';
import {
  shareOnTwitter,
  shareOnWhatsApp,
  shareOnTelegram,
  shareViaEmail,
  getDiscordMessage,
  copyToClipboard,
  getInvoiceUrl,
} from '@/lib/socialSharing';
import toast from 'react-hot-toast';

interface BlinkPreviewProps {
  invoice: Invoice;
  onClose: () => void;
}

export function BlinkPreview({ invoice, onClose }: BlinkPreviewProps) {
  const [copied, setCopied] = useState(false);
  const [copiedDiscord, setCopiedDiscord] = useState(false);

  const invoiceUrl = getInvoiceUrl(invoice.id);
  const twitterUrl = shareOnTwitter(invoiceUrl, invoice.invoiceNumber, invoice.total, invoice.currency);
  const whatsappUrl = shareOnWhatsApp(invoiceUrl, invoice.invoiceNumber, invoice.total, invoice.currency, invoice.clientName);
  const telegramUrl = shareOnTelegram(invoiceUrl, invoice.invoiceNumber, invoice.total, invoice.currency);
  const emailUrl = shareViaEmail(
    invoiceUrl,
    invoice.invoiceNumber,
    invoice.total,
    invoice.currency,
    invoice.freelancerName,
    invoice.clientEmail,
    invoice.clientName,
    invoice.items.map(item => item.description).join(', ')
  );
  const discordMessage = getDiscordMessage(
    invoiceUrl,
    invoice.invoiceNumber,
    invoice.total,
    invoice.currency,
    invoice.items.map(item => item.description).join(', ')
  );

  const handleCopyLink = async () => {
    const success = await copyToClipboard(invoiceUrl);
    if (success) {
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Failed to copy link');
    }
  };

  const handleCopyDiscord = async () => {
    const success = await copyToClipboard(discordMessage);
    if (success) {
      setCopiedDiscord(true);
      toast.success('Discord message copied!');
      setTimeout(() => setCopiedDiscord(false), 2000);
    } else {
      toast.error('Failed to copy message');
    }
  };

  const handleShare = (url: string, platform: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    toast.success(`Opening ${platform}...`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card border-purple-500/20">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold gradient-text">Payment Link Preview</h2>
              <p className="text-sm text-gray-400 mt-1">
                Share this invoice via social media or messaging apps
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Twitter Preview */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
              <Twitter className="w-4 h-4" />
              Twitter / X Preview
            </h3>
            <div className="glass-card border border-purple-500/20 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                  {invoice.freelancerName.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white">{invoice.freelancerName}</div>
                  <div className="text-sm text-gray-400 mb-2">@freelancer · now</div>
                  <div className="text-white mb-3">
                    💰 Invoice {invoice.invoiceNumber}: ${invoice.total} {invoice.currency}
                    <br />
                    🚀 Pay instantly via Solana - No fees, 2-second settlement!
                  </div>
                  {/* Blink Card Preview */}
                  <div className="border border-purple-500/30 rounded-xl overflow-hidden bg-black/40">
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                          <span className="text-lg">🧾</span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">
                            Invoice {invoice.invoiceNumber}
                          </div>
                          <div className="text-xs text-gray-400">SolPay Express</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-300 mb-3">
                        Amount: ${invoice.total} {invoice.currency}
                        <br />
                        From: {invoice.freelancerName}
                      </div>
                      <Button
                        className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                        size="sm"
                      >
                        💳 Pay with Solana Wallet
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Preview */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              WhatsApp Preview
            </h3>
            <div className="glass-card border border-purple-500/20 p-4 rounded-lg">
              <div className="bg-[#075E54] text-white p-3 rounded-lg rounded-tl-none max-w-[85%]">
                <div className="text-sm">
                  Hi {invoice.clientName}!
                  <br /><br />
                  📄 Invoice {invoice.invoiceNumber}
                  <br />
                  💵 Amount: ${invoice.total} {invoice.currency}
                  <br /><br />
                  <a href={invoiceUrl} className="text-blue-300 underline break-all">
                    {invoiceUrl}
                  </a>
                  <br /><br />
                  ✨ Click the link to pay instantly via your Solana wallet...
                </div>
                <div className="text-xs text-gray-300 mt-2">12:34 PM</div>
              </div>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Share on:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                onClick={() => handleShare(twitterUrl, 'Twitter')}
                className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white"
              >
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
              <Button
                onClick={() => handleShare(whatsappUrl, 'WhatsApp')}
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button
                onClick={() => handleShare(telegramUrl, 'Telegram')}
                className="bg-[#0088cc] hover:bg-[#0077b3] text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Telegram
              </Button>
              <Button
                onClick={() => handleShare(emailUrl, 'Email')}
                className="bg-gray-600 hover:bg-gray-700 text-white"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
            </div>
          </div>

          {/* Discord Message */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Discord Message:</h3>
            <div className="glass-card border border-purple-500/20 p-3 rounded-lg">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans">
                {discordMessage}
              </pre>
            </div>
            <Button
              onClick={handleCopyDiscord}
              className="w-full mt-2 bg-[#5865F2] hover:bg-[#4752C4] text-white"
            >
              {copiedDiscord ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Discord Message
                </>
              )}
            </Button>
          </div>

          {/* Direct Link */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Or copy direct link:</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={invoiceUrl}
                readOnly
                className="flex-1 px-4 py-2 bg-black/40 border border-purple-500/20 rounded-lg text-white text-sm"
              />
              <Button onClick={handleCopyLink} className="gradient-button">
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Info Banner */}
          <div className="glass-card border border-cyan-500/30 p-4 rounded-lg bg-cyan-500/5">
            <div className="flex items-start gap-3">
              <ExternalLink className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-300">
                <strong className="text-cyan-400">Solana Actions Enabled!</strong>
                <br />
                When shared on Twitter, this link will display an interactive payment button.
                Recipients can pay directly from their timeline without visiting the app!
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
