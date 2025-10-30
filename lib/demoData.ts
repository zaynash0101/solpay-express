// Demo data for interactive demo page - Production-ready realistic data
// Provides complete sample data for users to explore without wallet connection

export interface DemoClient {
  id: string;
  name: string;
  email: string;
  walletAddress: string;
  phone?: string;
  company: string;
  address?: string;
  createdAt: Date;
  totalPaid: number;
  invoiceCount: number;
}

export interface DemoInvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface DemoInvoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientWallet: string;
  items: DemoInvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'paid' | 'pending' | 'overdue';
  createdAt: Date;
  dueDate: Date;
  paidAt?: Date;
  notes?: string;
  paymentTerms?: string;
}

export const DEMO_CLIENTS: DemoClient[] = [
  {
    id: 'client-1',
    name: 'Acme Corporation',
    email: 'john@acmecorp.com',
    walletAddress: 'Demo8xK9vP2QZmH4jF6tL3nU5wR1bV7cY9dA2eS4fG',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corporation',
    address: '123 Business Ave, New York, NY 10001',
    createdAt: new Date('2024-01-15'),
    totalPaid: 12500,
    invoiceCount: 8,
  },
  {
    id: 'client-2',
    name: 'Sarah Johnson',
    email: 'sarah@techstartup.io',
    walletAddress: 'Demo5mN7pQ3wK8xL1jH4tF6vU9rY2bC5dG8aE1sT7z',
    phone: '+1 (555) 987-6543',
    company: 'Tech Startup Inc',
    address: '456 Innovation Blvd, San Francisco, CA 94102',
    createdAt: new Date('2024-02-01'),
    totalPaid: 8750,
    invoiceCount: 5,
  },
  {
    id: 'client-3',
    name: 'Global Enterprises',
    email: 'billing@globalent.com',
    walletAddress: 'Demo3kL6nP9vM2xJ8wF5tH1rU4bY7cG3dA9eS6fT2q',
    phone: '+44 20 7123 4567',
    company: 'Global Enterprises Ltd',
    address: '789 Commerce St, London, UK',
    createdAt: new Date('2024-01-20'),
    totalPaid: 15600,
    invoiceCount: 12,
  },
];

export const DEMO_INVOICES: DemoInvoice[] = [
  {
    id: 'inv-001',
    invoiceNumber: 'INV-001',
    clientId: 'client-1',
    clientName: 'Acme Corporation',
    clientEmail: 'john@acmecorp.com',
    clientWallet: 'Demo8xK9vP2QZmH4jF6tL3nU5wR1bV7cY9dA2eS4fG',
    items: [
      {
        id: 'item-1',
        description: 'Website Design & Development',
        quantity: 1,
        rate: 5000,
        amount: 5000,
      },
      {
        id: 'item-2',
        description: 'UI/UX Consultation (10 hours)',
        quantity: 10,
        rate: 150,
        amount: 1500,
      },
    ],
    subtotal: 6500,
    tax: 0,
    total: 6500,
    status: 'paid',
    createdAt: new Date('2024-10-15'),
    dueDate: new Date('2024-10-30'),
    paidAt: new Date('2024-10-18'),
    notes: 'Thank you for your business!',
    paymentTerms: 'Payment due within 15 days',
  },
  {
    id: 'inv-002',
    invoiceNumber: 'INV-002',
    clientId: 'client-2',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah@techstartup.io',
    clientWallet: 'Demo5mN7pQ3wK8xL1jH4tF6vU9rY2bC5dG8aE1sT7z',
    items: [
      {
        id: 'item-3',
        description: 'Mobile App Development',
        quantity: 1,
        rate: 8500,
        amount: 8500,
      },
    ],
    subtotal: 8500,
    tax: 0,
    total: 8500,
    status: 'pending',
    createdAt: new Date('2024-10-28'),
    dueDate: new Date('2024-11-15'),
    notes: 'Milestone 1: Initial development phase',
    paymentTerms: 'Net 15',
  },
  {
    id: 'inv-003',
    invoiceNumber: 'INV-003',
    clientId: 'client-3',
    clientName: 'Global Enterprises',
    clientEmail: 'billing@globalent.com',
    clientWallet: 'Demo3kL6nP9vM2xJ8wF5tH1rU4bY7cG3dA9eS6fT2q',
    items: [
      {
        id: 'item-4',
        description: 'Smart Contract Development',
        quantity: 1,
        rate: 12000,
        amount: 12000,
      },
      {
        id: 'item-5',
        description: 'Security Audit',
        quantity: 1,
        rate: 3000,
        amount: 3000,
      },
    ],
    subtotal: 15000,
    tax: 0,
    total: 15000,
    status: 'paid',
    createdAt: new Date('2024-10-10'),
    dueDate: new Date('2024-10-25'),
    paidAt: new Date('2024-10-12'),
    notes: 'Blockchain development services',
    paymentTerms: 'Payment due within 15 days',
  },
  {
    id: 'inv-004',
    invoiceNumber: 'INV-004',
    clientId: 'client-1',
    clientName: 'Acme Corporation',
    clientEmail: 'john@acmecorp.com',
    clientWallet: 'Demo8xK9vP2QZmH4jF6tL3nU5wR1bV7cY9dA2eS4fG',
    items: [
      {
        id: 'item-6',
        description: 'Monthly Retainer - November',
        quantity: 1,
        rate: 4000,
        amount: 4000,
      },
    ],
    subtotal: 4000,
    tax: 0,
    total: 4000,
    status: 'pending',
    createdAt: new Date('2024-11-01'),
    dueDate: new Date('2024-11-10'),
    notes: 'Monthly retainer services',
    paymentTerms: 'Due on the 10th of each month',
  },
  {
    id: 'inv-005',
    invoiceNumber: 'INV-005',
    clientId: 'client-2',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah@techstartup.io',
    clientWallet: 'Demo5mN7pQ3wK8xL1jH4tF6vU9rY2bC5dG8aE1sT7z',
    items: [
      {
        id: 'item-7',
        description: 'Logo Design',
        quantity: 1,
        rate: 1200,
        amount: 1200,
      },
    ],
    subtotal: 1200,
    tax: 0,
    total: 1200,
    status: 'overdue',
    createdAt: new Date('2024-10-05'),
    dueDate: new Date('2024-10-20'),
    notes: 'Brand identity design',
    paymentTerms: 'Net 15',
  },
];

export const DEMO_STATS = {
  totalInvoices: 5,
  pendingInvoices: 2,
  paidInvoices: 2,
  overdueInvoices: 1,
  totalEarned: 30000,
  thisMonth: 22000,
  walletBalance: {
    sol: 2.5,
    usdc: 5000,
  },
};
