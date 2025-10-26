"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Trash2, FileText } from "lucide-react"
import { Invoice, InvoiceLineItem, Client } from "@/types"
import { 
  saveInvoice, 
  generateInvoiceNumber, 
  getSettings, 
  getAllClients,
  getClientByWallet,
  saveClient 
} from "@/lib/invoiceStorage"
import { isValidPublicKey } from "@/lib/solana"
import { useWallet } from "@solana/wallet-adapter-react"
import toast from "react-hot-toast"

interface CreateInvoiceProps {
  onBack: () => void
  onSuccess: (invoice: Invoice) => void
  editInvoice?: Invoice | null
}

export function CreateInvoice({ onBack, onSuccess, editInvoice }: CreateInvoiceProps) {
  const { publicKey } = useWallet()
  const settings = getSettings()
  
  const [invoiceNumber, setInvoiceNumber] = useState("")
  const [clientName, setClientName] = useState("")
  const [clientWallet, setClientWallet] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0])
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  )
  const [items, setItems] = useState<InvoiceLineItem[]>([
    { id: '1', description: '', quantity: 1, rate: 0, amount: 0 }
  ])
  const [tax, setTax] = useState(settings.defaultTax || 0)
  const [currency, setCurrency] = useState<'SOL' | 'USDC'>('USDC')
  const [notes, setNotes] = useState('')
  const [terms, setTerms] = useState(settings.defaultTerms || '')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [clients, setClients] = useState<Client[]>([])
  const [showClientDropdown, setShowClientDropdown] = useState(false)

  useEffect(() => {
    if (editInvoice) {
      setInvoiceNumber(editInvoice.invoiceNumber)
      setClientName(editInvoice.clientName)
      setClientWallet(editInvoice.clientWallet)
      setClientEmail(editInvoice.clientEmail || '')
      setIssueDate(new Date(editInvoice.issueDate).toISOString().split('T')[0])
      setDueDate(new Date(editInvoice.dueDate).toISOString().split('T')[0])
      setItems(editInvoice.items)
      setTax(editInvoice.tax)
      setCurrency(editInvoice.currency)
      setNotes(editInvoice.notes || '')
      setTerms(editInvoice.terms || '')
    } else {
      setInvoiceNumber(generateInvoiceNumber())
    }
    setClients(getAllClients())
  }, [editInvoice])

  const addLineItem = () => {
    const newId = String(items.length + 1)
    setItems([...items, { id: newId, description: '', quantity: 1, rate: 0, amount: 0 }])
  }

  const removeLineItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  const updateLineItem = (id: string, field: keyof InvoiceLineItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value }
        if (field === 'quantity' || field === 'rate') {
          updated.amount = updated.quantity * updated.rate
        }
        return updated
      }
      return item
    }))
  }

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.amount, 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    return subtotal + (subtotal * tax / 100)
  }

  const selectClient = (client: Client) => {
    setClientName(client.name)
    setClientWallet(client.wallet)
    setClientEmail(client.email || '')
    setShowClientDropdown(false)
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!clientName.trim()) {
      newErrors.clientName = 'Client name is required'
    }

    if (!clientWallet.trim()) {
      newErrors.clientWallet = 'Client wallet address is required'
    } else if (!isValidPublicKey(clientWallet)) {
      newErrors.clientWallet = 'Invalid Solana address'
    }

    if (!issueDate) {
      newErrors.issueDate = 'Issue date is required'
    }

    if (!dueDate) {
      newErrors.dueDate = 'Due date is required'
    } else if (new Date(dueDate) < new Date(issueDate)) {
      newErrors.dueDate = 'Due date must be after issue date'
    }

    const hasValidItems = items.some(item => 
      item.description.trim() && item.quantity > 0 && item.rate > 0
    )

    if (!hasValidItems) {
      newErrors.items = 'At least one valid line item is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = (status: 'draft' | 'pending') => {
    if (!validateForm()) {
      toast.error('Please fix the errors before saving')
      return
    }

    if (!publicKey) {
      toast.error('Please connect your wallet')
      return
    }

    const subtotal = calculateSubtotal()
    const total = calculateTotal()

    // Check if client exists, if not create one
    let client = getClientByWallet(clientWallet)
    if (!client) {
      client = {
        id: `client-${Date.now()}`,
        name: clientName,
        wallet: clientWallet,
        email: clientEmail || undefined,
        totalPaid: 0,
        invoiceCount: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
      saveClient(client)
    }

    const invoice: Invoice = {
      id: editInvoice?.id || `inv-${Date.now()}`,
      invoiceNumber,
      clientId: client.id,
      clientName,
      clientWallet,
      clientEmail: clientEmail || undefined,
      freelancerName: settings.name || 'Freelancer',
      freelancerWallet: publicKey.toBase58(),
      items: items.filter(item => item.description.trim()),
      subtotal,
      tax,
      total,
      currency,
      notes: notes || undefined,
      terms: terms || undefined,
      status,
      issueDate: new Date(issueDate).getTime(),
      dueDate: new Date(dueDate).getTime(),
      createdAt: editInvoice?.createdAt || Date.now(),
      updatedAt: Date.now(),
    }

    saveInvoice(invoice)
    toast.success(`Invoice ${status === 'draft' ? 'saved as draft' : 'created'} successfully!`)
    onSuccess(invoice)
  }

  const subtotal = calculateSubtotal()
  const total = calculateTotal()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onBack}
            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h2 className="text-2xl font-bold text-white">
            {editInvoice ? 'Edit Invoice' : 'Create New Invoice'}
          </h2>
        </div>
        <Badge variant="outline" className="border-purple-500/50 bg-purple-500/10 text-purple-300">
          <FileText className="w-3 h-3 mr-1" />
          {invoiceNumber}
        </Badge>
      </div>

      <Card className="glass p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Invoice Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Invoice Details</h3>
            
            <div>
              <Label className="text-gray-400">Invoice Number</Label>
              <Input
                value={invoiceNumber}
                readOnly
                className="bg-white/5 border-white/10 text-gray-400"
              />
            </div>

            <div>
              <Label className="text-gray-400">Issue Date</Label>
              <Input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className={`bg-white/5 border-white/10 text-white ${
                  errors.issueDate ? 'border-red-500' : ''
                }`}
              />
              {errors.issueDate && (
                <p className="text-xs text-red-400 mt-1">{errors.issueDate}</p>
              )}
            </div>

            <div>
              <Label className="text-gray-400">Due Date</Label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={`bg-white/5 border-white/10 text-white ${
                  errors.dueDate ? 'border-red-500' : ''
                }`}
              />
              {errors.dueDate && (
                <p className="text-xs text-red-400 mt-1">{errors.dueDate}</p>
              )}
            </div>

            <div>
              <Label className="text-gray-400">Currency</Label>
              <div className="flex gap-2 mt-2">
                <Badge
                  variant="outline"
                  onClick={() => setCurrency('SOL')}
                  className={`cursor-pointer ${
                    currency === 'SOL'
                      ? 'border-purple-500/50 bg-purple-500/10 text-purple-300'
                      : 'border-white/20 text-gray-400'
                  }`}
                >
                  SOL
                </Badge>
                <Badge
                  variant="outline"
                  onClick={() => setCurrency('USDC')}
                  className={`cursor-pointer ${
                    currency === 'USDC'
                      ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300'
                      : 'border-white/20 text-gray-400'
                  }`}
                >
                  USDC
                </Badge>
              </div>
            </div>
          </div>

          {/* Client Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Bill To</h3>
              {clients.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowClientDropdown(!showClientDropdown)}
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent text-xs"
                >
                  Select Client
                </Button>
              )}
            </div>

            {showClientDropdown && (
              <Card className="glass p-3 mb-4 max-h-40 overflow-y-auto">
                {clients.map(client => (
                  <div
                    key={client.id}
                    onClick={() => selectClient(client)}
                    className="p-2 hover:bg-white/10 rounded cursor-pointer text-sm text-white"
                  >
                    {client.name}
                  </div>
                ))}
              </Card>
            )}

            <div>
              <Label className="text-gray-400">Client Name</Label>
              <Input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Enter client name"
                className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 ${
                  errors.clientName ? 'border-red-500' : ''
                }`}
              />
              {errors.clientName && (
                <p className="text-xs text-red-400 mt-1">{errors.clientName}</p>
              )}
            </div>

            <div>
              <Label className="text-gray-400">Wallet Address</Label>
              <Input
                value={clientWallet}
                onChange={(e) => setClientWallet(e.target.value)}
                placeholder="Enter Solana address"
                className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 ${
                  errors.clientWallet ? 'border-red-500' : ''
                }`}
              />
              {errors.clientWallet && (
                <p className="text-xs text-red-400 mt-1">{errors.clientWallet}</p>
              )}
            </div>

            <div>
              <Label className="text-gray-400">Email (Optional)</Label>
              <Input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="client@example.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Line Items */}
      <Card className="glass p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Line Items</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={addLineItem}
            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>

        {errors.items && (
          <p className="text-xs text-red-400 mb-4">{errors.items}</p>
        )}

        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item.id} className="grid grid-cols-12 gap-3 items-start">
              <div className="col-span-5">
                <Input
                  value={item.description}
                  onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                  placeholder="Description"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateLineItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                  placeholder="Qty"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.rate}
                  onChange={(e) => updateLineItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                  placeholder="Rate"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="col-span-2">
                <Input
                  value={item.amount.toFixed(2)}
                  readOnly
                  className="bg-white/5 border-white/10 text-gray-400"
                />
              </div>
              <div className="col-span-1 flex items-center justify-center">
                {items.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeLineItem(item.id)}
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal:</span>
                <span className="text-white">{subtotal.toFixed(2)} {currency}</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>Tax (%):</span>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={tax}
                  onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
                  className="w-20 bg-white/5 border-white/10 text-white text-right"
                />
              </div>
              <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-white/10">
                <span>Total:</span>
                <span className="text-cyan-400">{total.toFixed(2)} {currency}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Notes & Terms */}
      <Card className="glass p-6">
        <div className="space-y-4">
          <div>
            <Label className="text-gray-400">Notes (Optional)</Label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes..."
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <Label className="text-gray-400">Payment Terms</Label>
            <textarea
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              placeholder="Payment terms and conditions..."
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <Button
          variant="outline"
          onClick={() => handleSave('draft')}
          className="border-white/20 text-white hover:bg-white/10 bg-transparent"
        >
          Save as Draft
        </Button>
        <Button
          onClick={() => handleSave('pending')}
          className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0"
        >
          Create Invoice & Generate Link
        </Button>
      </div>
    </div>
  )
}
