export const DEMO_CLIENTS = [
  {
    id: '1',
    name: 'Acme Corporation',
    email: 'client@acme.com',
    walletAddress: 'Demo1xyz...abc123',
    totalPaid: 5000,
    invoiceCount: 12
  },
  {
    id: '2',
    name: 'Tech Startup Inc',
    email: 'billing@techstartup.io',
    walletAddress: 'Demo2abc...xyz789',
    totalPaid: 3200,
    invoiceCount: 8
  },
  {
    id: '3',
    name: 'Digital Agency Ltd',
    email: 'payments@digitalagency.com',
    walletAddress: 'Demo3def...uvw456',
    totalPaid: 4500,
    invoiceCount: 10
  }
];

export const DEMO_INVOICES = [
  {
    id: 'INV-001',
    invoiceNumber: 'INV-001',
    clientName: 'Acme Corporation',
    clientEmail: 'client@acme.com',
    amount: 1500,
    status: 'paid' as const,
    date: '2025-01-10',
    dueDate: '2025-01-15',
    description: 'Website Development & Design',
    items: [
      { description: 'Website Development', quantity: 1, rate: 1200 },
      { description: 'Design Work', quantity: 1, rate: 300 }
    ]
  },
  {
    id: 'INV-002',
    invoiceNumber: 'INV-002',
    clientName: 'Tech Startup Inc',
    clientEmail: 'billing@techstartup.io',
    amount: 800,
    status: 'pending' as const,
    date: '2025-01-12',
    dueDate: '2025-01-20',
    description: 'Logo Design Services',
    items: [
      { description: 'Logo Design', quantity: 1, rate: 800 }
    ]
  },
  {
    id: 'INV-003',
    invoiceNumber: 'INV-003',
    clientName: 'Digital Agency Ltd',
    clientEmail: 'payments@digitalagency.com',
    amount: 2500,
    status: 'paid' as const,
    date: '2025-01-08',
    dueDate: '2025-01-12',
    description: 'Mobile App Development',
    items: [
      { description: 'React Native Development', quantity: 20, rate: 100 },
      { description: 'API Integration', quantity: 5, rate: 100 }
    ]
  }
];

export const DEMO_STATS = {
  totalRevenue: 12700,
  pendingAmount: 800,
  paidInvoices: 10,
  totalInvoices: 12,
  averageInvoiceValue: 1058
};
