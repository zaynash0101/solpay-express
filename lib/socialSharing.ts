/**
 * Social Sharing Utilities for Invoice Payment Links
 * Generates shareable links for Twitter, WhatsApp, Telegram, and Discord
 */

/**
 * Generate Twitter share link for invoice
 * @param invoiceUrl - Full URL to the invoice payment page
 * @param invoiceNumber - Invoice number (e.g., INV-001)
 * @param amount - Invoice amount
 * @param currency - Currency (SOL or USDC)
 */
export function shareOnTwitter(
  invoiceUrl: string,
  invoiceNumber: string,
  amount: number,
  currency: string
): string {
  const text = `💰 Invoice ${invoiceNumber}: $${amount} ${currency}\n\n🚀 Pay instantly via Solana - No fees, 2-second settlement!\n\n`;
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(invoiceUrl)}`;
}

/**
 * Generate WhatsApp share link for invoice
 * @param invoiceUrl - Full URL to the invoice payment page
 * @param invoiceNumber - Invoice number (e.g., INV-001)
 * @param amount - Invoice amount
 * @param currency - Currency (SOL or USDC)
 * @param clientName - Optional client name
 */
export function shareOnWhatsApp(
  invoiceUrl: string,
  invoiceNumber: string,
  amount: number,
  currency: string,
  clientName?: string
): string {
  const greeting = clientName ? `Hi ${clientName}!` : 'Hi!';
  const text = `${greeting}\n\n📄 Invoice ${invoiceNumber}\n💵 Amount: $${amount} ${currency}\n\n${invoiceUrl}\n\n✨ Click the link to pay instantly via your Solana wallet. Payment settles in under 2 seconds with minimal fees!\n\nThank you! 🙏`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

/**
 * Generate Telegram share link for invoice
 * @param invoiceUrl - Full URL to the invoice payment page
 * @param invoiceNumber - Invoice number (e.g., INV-001)
 * @param amount - Invoice amount
 * @param currency - Currency (SOL or USDC)
 */
export function shareOnTelegram(
  invoiceUrl: string,
  invoiceNumber: string,
  amount: number,
  currency: string
): string {
  const text = `📄 Invoice ${invoiceNumber}\n💵 Amount: $${amount} ${currency}\n\n🚀 Pay instantly via Solana`;
  return `https://t.me/share/url?url=${encodeURIComponent(invoiceUrl)}&text=${encodeURIComponent(text)}`;
}

/**
 * Generate Discord-friendly message for invoice
 * Discord doesn't have a direct share API, so we return formatted text to copy
 * @param invoiceUrl - Full URL to the invoice payment page
 * @param invoiceNumber - Invoice number (e.g., INV-001)
 * @param amount - Invoice amount
 * @param currency - Currency (SOL or USDC)
 * @param description - Optional invoice description
 */
export function getDiscordMessage(
  invoiceUrl: string,
  invoiceNumber: string,
  amount: number,
  currency: string,
  description?: string
): string {
  return `📄 **Invoice ${invoiceNumber}**\n💵 Amount: **$${amount} ${currency}**${description ? `\n📝 ${description}` : ''}\n\n🔗 ${invoiceUrl}\n\n✨ Pay instantly via Solana wallet - No fees, 2-second settlement!`;
}

/**
 * Generate email subject and body for invoice
 * @param invoiceUrl - Full URL to the invoice payment page
 * @param invoiceNumber - Invoice number (e.g., INV-001)
 * @param amount - Invoice amount
 * @param currency - Currency (SOL or USDC)
 * @param freelancerName - Freelancer name
 * @param clientName - Optional client name
 * @param description - Optional invoice description
 */
export function getEmailContent(
  invoiceUrl: string,
  invoiceNumber: string,
  amount: number,
  currency: string,
  freelancerName: string,
  clientName?: string,
  description?: string
): { subject: string; body: string } {
  const greeting = clientName ? `Dear ${clientName}` : 'Hello';
  
  const subject = `Invoice ${invoiceNumber} - $${amount} ${currency}`;
  
  const body = `${greeting},

I hope this email finds you well.

Please find your invoice details below:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Invoice Number: ${invoiceNumber}
Amount Due: $${amount} ${currency}${description ? `\nDescription: ${description}` : ''}
From: ${freelancerName}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

To view and pay your invoice, please click the link below:

${invoiceUrl}

✨ Payment via Solana is instant and secure:
• No international transfer fees
• Payment settles in under 2 seconds
• Pay with any Solana wallet (Phantom, Solflare, etc.)

If you have any questions, please don't hesitate to reach out.

Thank you for your business!

Best regards,
${freelancerName}`;

  return { subject, body };
}

/**
 * Generate mailto link for email sharing
 * @param invoiceUrl - Full URL to the invoice payment page
 * @param invoiceNumber - Invoice number (e.g., INV-001)
 * @param amount - Invoice amount
 * @param currency - Currency (SOL or USDC)
 * @param freelancerName - Freelancer name
 * @param clientEmail - Optional client email
 * @param clientName - Optional client name
 * @param description - Optional invoice description
 */
export function shareViaEmail(
  invoiceUrl: string,
  invoiceNumber: string,
  amount: number,
  currency: string,
  freelancerName: string,
  clientEmail?: string,
  clientName?: string,
  description?: string
): string {
  const { subject, body } = getEmailContent(
    invoiceUrl,
    invoiceNumber,
    amount,
    currency,
    freelancerName,
    clientName,
    description
  );

  const mailto = `mailto:${clientEmail || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return mailto;
}

/**
 * Copy text to clipboard
 * @param text - Text to copy
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      textArea.remove();
      return success;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Get the full invoice URL
 * @param invoiceId - Invoice ID
 */
export function getInvoiceUrl(invoiceId: string): string {
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  return `${baseUrl}/invoice/${invoiceId}`;
}

/**
 * Get Solana Actions blink URL
 * @param invoiceId - Invoice ID
 */
export function getBlinkUrl(invoiceId: string): string {
  return getInvoiceUrl(invoiceId);
}
