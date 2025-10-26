"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Search, 
  Eye, 
  Send, 
  CheckCircle, 
  Trash2,
  ExternalLink,
  Copy,
  DollarSign,
  Share2
} from "lucide-react"
import { Invoice } from "@/types"
import { 
  getAllInvoices, 
  deleteInvoice, 
  updateInvoiceStatus,
  updateOverdueInvoices 
} from "@/lib/invoiceStorage"
import { formatWalletAddress, formatNumber, copyToClipboard } from "@/lib/utils"
import { getExplorerUrl } from "@/lib/solana"
import toast from "react-hot-toast"
import { BlinkPreview } from "./BlinkPreview"

interface InvoiceListProps {
  onCreateNew: () => void
  onViewInvoice: (invoice: Invoice) => void
  onEditInvoice: (invoice: Invoice) => void
}

export function InvoiceList({ onCreateNew, onViewInvoice, onEditInvoice }: InvoiceListProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<'all' | Invoice['status']>('all')
  const [selectedInvoiceForBlink, setSelectedInvoiceForBlink] = useState<Invoice | null>(null)

  useEffect(() => {
    loadInvoices()
  }, [])

  useEffect(() => {
    filterInvoices()
  }, [invoices, searchQuery, statusFilter])

  const loadInvoices = () => {
    updateOverdueInvoices()
    const allInvoices = getAllInvoices()
    // Sort by creation date, newest first
    allInvoices.sort((a, b) => b.createdAt - a.createdAt)
    setInvoices(allInvoices)
  }

  const filterInvoices = () => {
    let filtered = invoices

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(inv => inv.status === statusFilter)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(inv =>
        inv.invoiceNumber.toLowerCase().includes(query) ||
        inv.clientName.toLowerCase().includes(query) ||
        inv.clientWallet.toLowerCase().includes(query)
      )
    }

    setFilteredInvoices(filtered)
  }

  const handleDelete = (invoice: Invoice) => {
    if (confirm(`Are you sure you want to delete invoice ${invoice.invoiceNumber}?`)) {
      deleteInvoice(invoice.id)
      toast.success('Invoice deleted successfully')
      loadInvoices()
    }
  }

  const handleMarkAsPaid = (invoice: Invoice) => {
    if (confirm(`Mark invoice ${invoice.invoiceNumber} as paid?`)) {
      updateInvoiceStatus(invoice.id, 'paid')
      toast.success('Invoice marked as paid')
      loadInvoices()
    }
  }

  const handleCopyLink = async (invoice: Invoice) => {
    const link = `${window.location.origin}/invoice/${invoice.id}`
    const success = await copyToClipboard(link)
    if (success) {
      toast.success('Payment link copied to clipboard')
    }
  }

  const getStatusBadge = (status: Invoice['status']) => {
    const styles = {
      draft: 'border-gray-500/50 bg-gray-500/10 text-gray-300',
      pending: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-300',
      paid: 'border-green-500/50 bg-green-500/10 text-green-300',
      overdue: 'border-red-500/50 bg-red-500/10 text-red-300',
      cancelled: 'border-gray-500/50 bg-gray-500/10 text-gray-400',
    }

    return (
      <Badge variant="outline" className={styles[status]}>
        {status.toUpperCase()}
      </Badge>
    )
  }

  const calculateStats = () => {
    const pending = invoices.filter(inv => inv.status === 'pending' || inv.status === 'overdue')
    const paid = invoices.filter(inv => inv.status === 'paid')
    
    const pendingAmount = pending.reduce((sum, inv) => sum + inv.total, 0)
    const paidAmount = paid.reduce((sum, inv) => sum + inv.total, 0)

    return { pendingAmount, paidAmount, pendingCount: pending.length, paidCount: paid.length }
  }

  const stats = calculateStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">My Invoices</h2>
        <Button
          onClick={onCreateNew}
          className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0"
        >
          <FileText className="w-4 h-4 mr-2" />
          New Invoice
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Invoices</p>
              <p className="text-2xl font-bold text-white">{invoices.length}</p>
            </div>
            <FileText className="w-8 h-8 text-purple-400" />
          </div>
        </Card>

        <Card className="glass p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.pendingCount}</p>
              <p className="text-xs text-gray-500">${formatNumber(stats.pendingAmount, 2)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-yellow-400" />
          </div>
        </Card>

        <Card className="glass p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Paid</p>
              <p className="text-2xl font-bold text-green-400">{stats.paidCount}</p>
              <p className="text-xs text-gray-500">${formatNumber(stats.paidAmount, 2)}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </Card>

        <Card className="glass p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Earned</p>
              <p className="text-2xl font-bold text-cyan-400">${formatNumber(stats.paidAmount, 2)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-cyan-400" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="glass p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by invoice number or client..."
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2 flex-wrap">
            {(['all', 'draft', 'pending', 'paid', 'overdue', 'cancelled'] as const).map(status => (
              <Badge
                key={status}
                variant="outline"
                onClick={() => setStatusFilter(status)}
                className={`cursor-pointer ${
                  statusFilter === status
                    ? 'border-purple-500/50 bg-purple-500/10 text-purple-300'
                    : 'border-white/20 text-gray-400 hover:bg-white/10'
                }`}
              >
                {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      {/* Invoice List */}
      <div className="space-y-3">
        {filteredInvoices.length === 0 ? (
          <Card className="glass p-12 text-center">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Invoices Found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Create your first invoice to get started'}
            </p>
            {!searchQuery && statusFilter === 'all' && (
              <Button
                onClick={onCreateNew}
                className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0"
              >
                <FileText className="w-4 h-4 mr-2" />
                Create Invoice
              </Button>
            )}
          </Card>
        ) : (
          filteredInvoices.map(invoice => (
            <Card key={invoice.id} className="glass p-4 hover:bg-white/10 transition">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Invoice Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {invoice.invoiceNumber}
                    </h3>
                    {getStatusBadge(invoice.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">Client: </span>
                      <span className="text-white">{invoice.clientName}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Amount: </span>
                      <span className="text-cyan-400 font-semibold">
                        {formatNumber(invoice.total, 2)} {invoice.currency}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Due: </span>
                      <span className="text-white">
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {invoice.status === 'paid' && invoice.paidDate && (
                    <div className="mt-2 text-xs text-green-400">
                      ✓ Paid on {new Date(invoice.paidDate).toLocaleDateString()}
                      {invoice.transactionSignature && (
                        <a
                          href={getExplorerUrl(invoice.transactionSignature, 'tx')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 hover:underline inline-flex items-center"
                        >
                          View TX <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewInvoice(invoice)}
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>

                  {invoice.status !== 'paid' && invoice.status !== 'cancelled' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedInvoiceForBlink(invoice)}
                        className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 bg-transparent"
                      >
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyLink(invoice)}
                        className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 bg-transparent"
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy Link
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkAsPaid(invoice)}
                        className="border-green-500/50 text-green-400 hover:bg-green-500/10 bg-transparent"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Mark Paid
                      </Button>
                    </>
                  )}

                  {invoice.status === 'draft' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditInvoice(invoice)}
                      className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 bg-transparent"
                    >
                      Edit
                    </Button>
                  )}

                  {invoice.status !== 'paid' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(invoice)}
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Blink Preview Modal */}
      {selectedInvoiceForBlink && (
        <BlinkPreview
          invoice={selectedInvoiceForBlink}
          onClose={() => setSelectedInvoiceForBlink(null)}
        />
      )}
    </div>
  )
}
