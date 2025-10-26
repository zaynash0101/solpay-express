import { Invoice } from '@/types';

/**
 * Generate a PDF invoice (browser-based)
 * This is a simple implementation that uses the browser's print functionality
 * For production, consider using libraries like jsPDF or pdfmake
 */
export function generateInvoicePDF(invoice: Invoice): void {
  // Create a new window with the invoice content
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    alert('Please allow popups to download the invoice');
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Invoice ${invoice.invoiceNumber}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 40px;
          color: #1a1a2e;
          background: white;
        }
        
        .invoice-container {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .header {
          text-align: center;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 3px solid #9333ea;
        }
        
        .header h1 {
          font-size: 36px;
          color: #9333ea;
          margin-bottom: 8px;
        }
        
        .header p {
          color: #666;
          font-size: 14px;
        }
        
        .invoice-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }
        
        .info-section h3 {
          font-size: 12px;
          color: #666;
          text-transform: uppercase;
          margin-bottom: 12px;
          font-weight: 600;
        }
        
        .info-section p {
          margin-bottom: 6px;
          font-size: 14px;
        }
        
        .info-section .label {
          color: #666;
          font-size: 13px;
        }
        
        .info-section .value {
          color: #1a1a2e;
          font-weight: 500;
        }
        
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
        }
        
        .status-paid {
          background: #dcfce7;
          color: #166534;
        }
        
        .status-pending {
          background: #fef9c3;
          color: #854d0e;
        }
        
        .status-overdue {
          background: #fee2e2;
          color: #991b1b;
        }
        
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 30px;
        }
        
        .items-table thead {
          background: #f3f4f6;
        }
        
        .items-table th {
          text-align: left;
          padding: 12px;
          font-size: 12px;
          color: #666;
          text-transform: uppercase;
          font-weight: 600;
        }
        
        .items-table th:last-child,
        .items-table td:last-child {
          text-align: right;
        }
        
        .items-table td {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 14px;
        }
        
        .totals {
          margin-left: auto;
          width: 300px;
          margin-bottom: 30px;
        }
        
        .totals-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 14px;
        }
        
        .totals-row.total {
          border-top: 2px solid #1a1a2e;
          padding-top: 12px;
          margin-top: 8px;
          font-size: 18px;
          font-weight: 700;
        }
        
        .totals-row.total .value {
          color: #06b6d4;
        }
        
        .notes-section {
          background: #f9fafb;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        
        .notes-section h3 {
          font-size: 12px;
          color: #666;
          text-transform: uppercase;
          margin-bottom: 8px;
          font-weight: 600;
        }
        
        .notes-section p {
          font-size: 13px;
          line-height: 1.6;
          color: #4b5563;
        }
        
        .footer {
          text-align: center;
          padding-top: 30px;
          border-top: 1px solid #e5e7eb;
          color: #666;
          font-size: 12px;
        }
        
        .wallet-address {
          font-family: 'Courier New', monospace;
          font-size: 11px;
          color: #06b6d4;
          background: #f0f9ff;
          padding: 2px 6px;
          border-radius: 4px;
        }
        
        @media print {
          body {
            padding: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <!-- Header -->
        <div class="header">
          <h1>INVOICE</h1>
          <p>SolPay Express</p>
        </div>
        
        <!-- Invoice Info -->
        <div class="invoice-info">
          <div class="info-section">
            <h3>Invoice Details</h3>
            <p><span class="label">Invoice Number:</span> <strong>${invoice.invoiceNumber}</strong></p>
            <p><span class="label">Issue Date:</span> ${new Date(invoice.issueDate).toLocaleDateString()}</p>
            <p><span class="label">Due Date:</span> ${new Date(invoice.dueDate).toLocaleDateString()}</p>
            <p><span class="label">Status:</span> <span class="status-badge status-${invoice.status}">${invoice.status}</span></p>
          </div>
          
          <div class="info-section">
            <h3>From</h3>
            <p><strong>${invoice.freelancerName}</strong></p>
            <p class="wallet-address">${invoice.freelancerWallet.slice(0, 8)}...${invoice.freelancerWallet.slice(-8)}</p>
          </div>
        </div>
        
        <div class="invoice-info">
          <div class="info-section">
            <h3>Bill To</h3>
            <p><strong>${invoice.clientName}</strong></p>
            ${invoice.clientEmail ? `<p>${invoice.clientEmail}</p>` : ''}
            <p class="wallet-address">${invoice.clientWallet.slice(0, 8)}...${invoice.clientWallet.slice(-8)}</p>
          </div>
          
          ${invoice.paidDate ? `
          <div class="info-section">
            <h3>Payment Info</h3>
            <p><span class="label">Paid Date:</span> ${new Date(invoice.paidDate).toLocaleDateString()}</p>
            ${invoice.transactionSignature ? `<p class="wallet-address">${invoice.transactionSignature.slice(0, 12)}...</p>` : ''}
          </div>
          ` : ''}
        </div>
        
        <!-- Line Items -->
        <table class="items-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${invoice.items.map(item => `
              <tr>
                <td>${item.description}</td>
                <td>${item.quantity}</td>
                <td>${item.rate.toFixed(2)} ${invoice.currency}</td>
                <td>${item.amount.toFixed(2)} ${invoice.currency}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <!-- Totals -->
        <div class="totals">
          <div class="totals-row">
            <span>Subtotal:</span>
            <span class="value">${invoice.subtotal.toFixed(2)} ${invoice.currency}</span>
          </div>
          ${invoice.tax > 0 ? `
          <div class="totals-row">
            <span>Tax (${invoice.tax}%):</span>
            <span class="value">${(invoice.subtotal * invoice.tax / 100).toFixed(2)} ${invoice.currency}</span>
          </div>
          ` : ''}
          <div class="totals-row total">
            <span>Total:</span>
            <span class="value">${invoice.total.toFixed(2)} ${invoice.currency}</span>
          </div>
        </div>
        
        <!-- Terms -->
        ${invoice.terms ? `
        <div class="notes-section">
          <h3>Payment Terms</h3>
          <p>${invoice.terms}</p>
        </div>
        ` : ''}
        
        <!-- Notes -->
        ${invoice.notes ? `
        <div class="notes-section">
          <h3>Notes</h3>
          <p>${invoice.notes}</p>
        </div>
        ` : ''}
        
        <!-- Footer -->
        <div class="footer">
          <p>Powered by SolPay Express - Instant Payments on Solana</p>
          <p style="margin-top: 8px;">Generated on ${new Date().toLocaleDateString()}</p>
        </div>
      </div>
      
      <script>
        // Auto-print when loaded
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}

/**
 * Download invoice as HTML file
 */
export function downloadInvoiceHTML(invoice: Invoice): void {
  const html = generateInvoiceHTML(invoice);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `invoice-${invoice.invoiceNumber}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function generateInvoiceHTML(invoice: Invoice): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Invoice ${invoice.invoiceNumber}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 30px; }
        .info { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        .totals { text-align: right; }
        .total { font-size: 18px; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>INVOICE</h1>
        <p>Invoice #${invoice.invoiceNumber}</p>
      </div>
      
      <div class="info">
        <div>
          <h3>From:</h3>
          <p>${invoice.freelancerName}</p>
          <p>${invoice.freelancerWallet}</p>
        </div>
        <div>
          <h3>Bill To:</h3>
          <p>${invoice.clientName}</p>
          <p>${invoice.clientWallet}</p>
        </div>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          ${invoice.items.map(item => `
            <tr>
              <td>${item.description}</td>
              <td>${item.quantity}</td>
              <td>${item.rate.toFixed(2)}</td>
              <td>${item.amount.toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div class="totals">
        <p>Subtotal: ${invoice.subtotal.toFixed(2)} ${invoice.currency}</p>
        ${invoice.tax > 0 ? `<p>Tax: ${(invoice.subtotal * invoice.tax / 100).toFixed(2)} ${invoice.currency}</p>` : ''}
        <p class="total">Total: ${invoice.total.toFixed(2)} ${invoice.currency}</p>
      </div>
    </body>
    </html>
  `;
}
