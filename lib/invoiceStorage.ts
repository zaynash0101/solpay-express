import { Invoice, Client, PaymentRequest, FreelancerSettings } from '@/types';

const STORAGE_KEYS = {
  INVOICES: 'solpay_invoices',
  CLIENTS: 'solpay_clients',
  PAYMENT_REQUESTS: 'solpay_payment_requests',
  SETTINGS: 'solpay_freelancer_settings',
};

// Default settings
const DEFAULT_SETTINGS: FreelancerSettings = {
  name: '',
  wallet: '',
  email: '',
  defaultTerms: 'Payment due within 7 days. Late payments may incur additional fees.',
  defaultTax: 0,
  invoicePrefix: 'INV',
  nextInvoiceNumber: 1,
};

// Helper to check if we're in browser
const isBrowser = typeof window !== 'undefined';

// Generic storage functions
function getFromStorage<T>(key: string, defaultValue: T): T {
  if (!isBrowser) return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from storage:`, error);
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to storage:`, error);
  }
}

// Invoice Functions
export function getAllInvoices(): Invoice[] {
  return getFromStorage<Invoice[]>(STORAGE_KEYS.INVOICES, []);
}

export function getInvoiceById(id: string): Invoice | null {
  const invoices = getAllInvoices();
  return invoices.find(inv => inv.id === id) || null;
}

export function getInvoiceByNumber(invoiceNumber: string): Invoice | null {
  const invoices = getAllInvoices();
  return invoices.find(inv => inv.invoiceNumber === invoiceNumber) || null;
}

export function saveInvoice(invoice: Invoice): void {
  const invoices = getAllInvoices();
  const index = invoices.findIndex(inv => inv.id === invoice.id);
  
  if (index >= 0) {
    invoices[index] = { ...invoice, updatedAt: Date.now() };
  } else {
    invoices.push(invoice);
  }
  
  saveToStorage(STORAGE_KEYS.INVOICES, invoices);
}

export function deleteInvoice(id: string): void {
  const invoices = getAllInvoices();
  const filtered = invoices.filter(inv => inv.id !== id);
  saveToStorage(STORAGE_KEYS.INVOICES, filtered);
}

export function updateInvoiceStatus(id: string, status: Invoice['status'], transactionSignature?: string): void {
  const invoice = getInvoiceById(id);
  if (!invoice) return;
  
  invoice.status = status;
  invoice.updatedAt = Date.now();
  
  if (status === 'paid') {
    invoice.paidDate = Date.now();
    if (transactionSignature) {
      invoice.transactionSignature = transactionSignature;
    }
  }
  
  saveInvoice(invoice);
  
  // Update client stats if paid
  if (status === 'paid' && invoice.clientId) {
    const client = getClientById(invoice.clientId);
    if (client) {
      client.totalPaid += invoice.total;
      saveClient(client);
    }
  }
}

// Client Functions
export function getAllClients(): Client[] {
  return getFromStorage<Client[]>(STORAGE_KEYS.CLIENTS, []);
}

export function getClientById(id: string): Client | null {
  const clients = getAllClients();
  return clients.find(client => client.id === id) || null;
}

export function getClientByWallet(wallet: string): Client | null {
  const clients = getAllClients();
  return clients.find(client => client.wallet === wallet) || null;
}

export function saveClient(client: Client): void {
  const clients = getAllClients();
  const index = clients.findIndex(c => c.id === client.id);
  
  if (index >= 0) {
    clients[index] = { ...client, updatedAt: Date.now() };
  } else {
    clients.push(client);
  }
  
  saveToStorage(STORAGE_KEYS.CLIENTS, clients);
}

export function deleteClient(id: string): void {
  const clients = getAllClients();
  const filtered = clients.filter(c => c.id !== id);
  saveToStorage(STORAGE_KEYS.CLIENTS, filtered);
}

// Payment Request Functions
export function getAllPaymentRequests(): PaymentRequest[] {
  return getFromStorage<PaymentRequest[]>(STORAGE_KEYS.PAYMENT_REQUESTS, []);
}

export function getPaymentRequestById(id: string): PaymentRequest | null {
  const requests = getAllPaymentRequests();
  return requests.find(req => req.id === id) || null;
}

export function savePaymentRequest(request: PaymentRequest): void {
  const requests = getAllPaymentRequests();
  const index = requests.findIndex(req => req.id === request.id);
  
  if (index >= 0) {
    requests[index] = request;
  } else {
    requests.push(request);
  }
  
  saveToStorage(STORAGE_KEYS.PAYMENT_REQUESTS, requests);
}

export function updatePaymentRequestStatus(
  id: string,
  status: PaymentRequest['status'],
  transactionSignature?: string
): void {
  const request = getPaymentRequestById(id);
  if (!request) return;
  
  request.status = status;
  if (status === 'paid') {
    request.paidAt = Date.now();
    if (transactionSignature) {
      request.transactionSignature = transactionSignature;
    }
  }
  
  savePaymentRequest(request);
}

// Settings Functions
export function getSettings(): FreelancerSettings {
  return getFromStorage<FreelancerSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
}

export function saveSettings(settings: FreelancerSettings): void {
  saveToStorage(STORAGE_KEYS.SETTINGS, settings);
}

export function updateSettings(updates: Partial<FreelancerSettings>): void {
  const settings = getSettings();
  const updated = { ...settings, ...updates };
  saveSettings(updated);
}

// Utility Functions
export function generateInvoiceNumber(): string {
  const settings = getSettings();
  const number = settings.nextInvoiceNumber;
  const invoiceNumber = `${settings.invoicePrefix}-${String(number).padStart(3, '0')}`;
  
  // Increment for next invoice
  updateSettings({ nextInvoiceNumber: number + 1 });
  
  return invoiceNumber;
}

export function getInvoiceStats() {
  const invoices = getAllInvoices();
  
  const pending = invoices.filter(inv => inv.status === 'pending' || inv.status === 'overdue');
  const paid = invoices.filter(inv => inv.status === 'paid');
  
  const pendingAmount = pending.reduce((sum, inv) => sum + inv.total, 0);
  const paidAmount = paid.reduce((sum, inv) => sum + inv.total, 0);
  
  // Calculate this month's paid amount
  const now = Date.now();
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();
  const paidThisMonth = paid
    .filter(inv => inv.paidDate && inv.paidDate >= monthStart)
    .reduce((sum, inv) => sum + inv.total, 0);
  
  return {
    totalInvoices: invoices.length,
    pendingInvoices: pending.length,
    paidInvoices: paid.length,
    pendingAmount,
    paidAmount,
    paidThisMonth,
  };
}

export function getClientStats(clientId: string) {
  const invoices = getAllInvoices().filter(inv => inv.clientId === clientId);
  const paid = invoices.filter(inv => inv.status === 'paid');
  
  return {
    totalInvoices: invoices.length,
    totalPaid: paid.reduce((sum, inv) => sum + inv.total, 0),
    pendingInvoices: invoices.filter(inv => inv.status === 'pending' || inv.status === 'overdue').length,
  };
}

// Check for overdue invoices
export function updateOverdueInvoices(): void {
  const invoices = getAllInvoices();
  const now = Date.now();
  
  invoices.forEach(invoice => {
    if (invoice.status === 'pending' && invoice.dueDate < now) {
      invoice.status = 'overdue';
      invoice.updatedAt = now;
    }
  });
  
  saveToStorage(STORAGE_KEYS.INVOICES, invoices);
}

// Initialize demo data (for first-time users)
export function initializeDemoData(walletAddress: string): void {
  const settings = getSettings();
  
  // Only initialize if no data exists
  if (settings.wallet || getAllInvoices().length > 0) return;
  
  // Set up settings
  saveSettings({
    ...DEFAULT_SETTINGS,
    name: 'Freelancer',
    wallet: walletAddress,
    nextInvoiceNumber: 4,
  });
  
  // Create demo clients
  const demoClients: Client[] = [
    {
      id: 'client-1',
      name: 'Acme Corp',
      wallet: '9mNPqRsTuVwXyZ1aBcDeFgHiJkLmNoPqRsTuVwXyZ1aB',
      email: 'contact@acmecorp.com',
      totalPaid: 1500,
      invoiceCount: 3,
      createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
      updatedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    },
    {
      id: 'client-2',
      name: 'Tech Studio',
      wallet: '2kMNpQrStUvWxYz1AbCdEfGhIjKlMnOpQrStUvWxYz1A',
      email: 'hello@techstudio.io',
      totalPaid: 800,
      invoiceCount: 2,
      createdAt: Date.now() - 20 * 24 * 60 * 60 * 1000,
      updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    },
    {
      id: 'client-3',
      name: 'Design Agency',
      wallet: '3lNoPqRsTuVwXyZ1aBcDeFgHiJkLmNoPqRsTuVwXyZ1a',
      totalPaid: 0,
      invoiceCount: 1,
      createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
      updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    },
    {
      id: 'client-4',
      name: 'Startup Inc',
      wallet: '4mNoPqRsTuVwXyZ1aBcDeFgHiJkLmNoPqRsTuVwXyZ1a',
      email: 'team@startup.com',
      totalPaid: 2400,
      invoiceCount: 4,
      createdAt: Date.now() - 60 * 24 * 60 * 60 * 1000,
      updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    },
  ];
  
  demoClients.forEach(client => saveClient(client));
  
  // Create demo invoices
  const now = Date.now();
  const demoInvoices: Invoice[] = [
    // Paid invoices
    {
      id: 'inv-1',
      invoiceNumber: 'INV-001',
      clientId: 'client-1',
      clientName: 'Acme Corp',
      clientWallet: '9mNPqRsTuVwXyZ1aBcDeFgHiJkLmNoPqRsTuVwXyZ1aB',
      freelancerName: 'Freelancer',
      freelancerWallet: walletAddress,
      items: [
        { id: '1', description: 'Web Design', quantity: 1, rate: 500, amount: 500 },
      ],
      subtotal: 500,
      tax: 0,
      total: 500,
      currency: 'USDC',
      status: 'paid',
      issueDate: now - 20 * 24 * 60 * 60 * 1000,
      dueDate: now - 13 * 24 * 60 * 60 * 1000,
      paidDate: now - 15 * 24 * 60 * 60 * 1000,
      createdAt: now - 20 * 24 * 60 * 60 * 1000,
      updatedAt: now - 15 * 24 * 60 * 60 * 1000,
    },
    {
      id: 'inv-2',
      invoiceNumber: 'INV-002',
      clientId: 'client-2',
      clientName: 'Tech Studio',
      clientWallet: '2kMNpQrStUvWxYz1AbCdEfGhIjKlMnOpQrStUvWxYz1A',
      freelancerName: 'Freelancer',
      freelancerWallet: walletAddress,
      items: [
        { id: '1', description: 'Logo Design', quantity: 1, rate: 300, amount: 300 },
        { id: '2', description: 'Brand Guidelines', quantity: 1, rate: 200, amount: 200 },
      ],
      subtotal: 500,
      tax: 0,
      total: 500,
      currency: 'USDC',
      status: 'paid',
      issueDate: now - 15 * 24 * 60 * 60 * 1000,
      dueDate: now - 8 * 24 * 60 * 60 * 1000,
      paidDate: now - 10 * 24 * 60 * 60 * 1000,
      createdAt: now - 15 * 24 * 60 * 60 * 1000,
      updatedAt: now - 10 * 24 * 60 * 60 * 1000,
    },
    {
      id: 'inv-3',
      invoiceNumber: 'INV-003',
      clientId: 'client-4',
      clientName: 'Startup Inc',
      clientWallet: '4mNoPqRsTuVwXyZ1aBcDeFgHiJkLmNoPqRsTuVwXyZ1a',
      freelancerName: 'Freelancer',
      freelancerWallet: walletAddress,
      items: [
        { id: '1', description: 'Website Development', quantity: 1, rate: 2000, amount: 2000 },
      ],
      subtotal: 2000,
      tax: 0,
      total: 2000,
      currency: 'USDC',
      status: 'paid',
      issueDate: now - 10 * 24 * 60 * 60 * 1000,
      dueDate: now - 3 * 24 * 60 * 60 * 1000,
      paidDate: now - 5 * 24 * 60 * 60 * 1000,
      createdAt: now - 10 * 24 * 60 * 60 * 1000,
      updatedAt: now - 5 * 24 * 60 * 60 * 1000,
    },
    // Pending invoices
    {
      id: 'inv-4',
      invoiceNumber: 'INV-004',
      clientId: 'client-3',
      clientName: 'Design Agency',
      clientWallet: '3lNoPqRsTuVwXyZ1aBcDeFgHiJkLmNoPqRsTuVwXyZ1a',
      freelancerName: 'Freelancer',
      freelancerWallet: walletAddress,
      items: [
        { id: '1', description: 'UI/UX Consultation', quantity: 4, rate: 100, amount: 400 },
      ],
      subtotal: 400,
      tax: 0,
      total: 400,
      currency: 'USDC',
      status: 'pending',
      issueDate: now - 3 * 24 * 60 * 60 * 1000,
      dueDate: now + 4 * 24 * 60 * 60 * 1000,
      createdAt: now - 3 * 24 * 60 * 60 * 1000,
      updatedAt: now - 3 * 24 * 60 * 60 * 1000,
    },
    {
      id: 'inv-5',
      invoiceNumber: 'INV-005',
      clientId: 'client-1',
      clientName: 'Acme Corp',
      clientWallet: '9mNPqRsTuVwXyZ1aBcDeFgHiJkLmNoPqRsTuVwXyZ1aB',
      freelancerName: 'Freelancer',
      freelancerWallet: walletAddress,
      items: [
        { id: '1', description: 'Mobile App Design', quantity: 1, rate: 800, amount: 800 },
      ],
      subtotal: 800,
      tax: 0,
      total: 800,
      currency: 'USDC',
      status: 'pending',
      issueDate: now - 1 * 24 * 60 * 60 * 1000,
      dueDate: now + 6 * 24 * 60 * 60 * 1000,
      createdAt: now - 1 * 24 * 60 * 60 * 1000,
      updatedAt: now - 1 * 24 * 60 * 60 * 1000,
    },
  ];
  
  demoInvoices.forEach(invoice => saveInvoice(invoice));
}
