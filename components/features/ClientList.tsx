"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Plus, 
  Trash2, 
  FileText,
  DollarSign,
  Mail,
  Wallet,
  X
} from "lucide-react"
import { Client, Invoice } from "@/types"
import { 
  getAllClients, 
  saveClient, 
  deleteClient,
  getClientStats,
  getAllInvoices
} from "@/lib/invoiceStorage"
import { formatWalletAddress, formatNumber } from "@/lib/utils"
import { isValidPublicKey } from "@/lib/solana"
import toast from "react-hot-toast"

interface ClientListProps {
  onCreateInvoice?: (client: Client) => void
}

export function ClientList({ onCreateInvoice }: ClientListProps) {
  const [clients, setClients] = useState<Client[]>([])
  const [showAddClient, setShowAddClient] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  
  // Form state
  const [name, setName] = useState("")
  const [wallet, setWallet] = useState("")
  const [email, setEmail] = useState("")
  const [notes, setNotes] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    loadClients()
  }, [])

  const loadClients = () => {
    const allClients = getAllClients()
    // Sort by most recent
    allClients.sort((a, b) => b.updatedAt - a.updatedAt)
    setClients(allClients)
  }

  const resetForm = () => {
    setName("")
    setWallet("")
    setEmail("")
    setNotes("")
    setErrors({})
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) {
      newErrors.name = 'Client name is required'
    }

    if (!wallet.trim()) {
      newErrors.wallet = 'Wallet address is required'
    } else if (!isValidPublicKey(wallet)) {
      newErrors.wallet = 'Invalid Solana address'
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveClient = () => {
    if (!validateForm()) {
      toast.error('Please fix the errors')
      return
    }

    const client: Client = {
      id: `client-${Date.now()}`,
      name: name.trim(),
      wallet: wallet.trim(),
      email: email.trim() || undefined,
      notes: notes.trim() || undefined,
      totalPaid: 0,
      invoiceCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    saveClient(client)
    toast.success('Client added successfully')
    resetForm()
    setShowAddClient(false)
    loadClients()
  }

  const handleDeleteClient = (client: Client) => {
    if (confirm(`Are you sure you want to delete ${client.name}?`)) {
      deleteClient(client.id)
      toast.success('Client deleted')
      loadClients()
      if (selectedClient?.id === client.id) {
        setSelectedClient(null)
      }
    }
  }

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.wallet.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (client.email && client.email.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const getClientInvoices = (clientId: string): Invoice[] => {
    return getAllInvoices().filter(inv => inv.clientId === clientId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">My Clients</h2>
        <Button
          onClick={() => setShowAddClient(true)}
          className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Add Client Modal */}
      {showAddClient && (
        <Card className="glass p-6 border-2 border-purple-500/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Add New Client</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setShowAddClient(false)
                resetForm()
              }}
              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-400">Client Name *</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter client name"
                className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 ${
                  errors.name ? 'border-red-500' : ''
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-400 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Label className="text-gray-400">Email (Optional)</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@example.com"
                className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-400 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label className="text-gray-400">Wallet Address *</Label>
              <Input
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                placeholder="Enter Solana address"
                className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 ${
                  errors.wallet ? 'border-red-500' : ''
                }`}
              />
              {errors.wallet && (
                <p className="text-xs text-red-400 mt-1">{errors.wallet}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label className="text-gray-400">Notes (Optional)</Label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this client..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              onClick={handleSaveClient}
              className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0"
            >
              Save Client
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddClient(false)
                resetForm()
              }}
              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Search */}
      <Card className="glass p-4">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search clients..."
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
        />
      </Card>

      {/* Client List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredClients.length === 0 ? (
          <Card className="glass p-12 text-center md:col-span-2">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Clients Found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery
                ? 'Try adjusting your search'
                : 'Add your first client to get started'}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => setShowAddClient(true)}
                className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Client
              </Button>
            )}
          </Card>
        ) : (
          filteredClients.map(client => {
            const stats = getClientStats(client.id)
            return (
              <Card
                key={client.id}
                className="glass p-5 hover:bg-white/10 transition cursor-pointer"
                onClick={() => setSelectedClient(selectedClient?.id === client.id ? null : client)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                      {client.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{client.name}</h3>
                      {client.email && (
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {client.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteClient(client)
                    }}
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Wallet className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">Wallet:</span>
                    <code className="text-cyan-400 text-xs">
                      {formatWalletAddress(client.wallet, 6)}
                    </code>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                  <div>
                    <p className="text-xs text-gray-400">Total Paid</p>
                    <p className="text-lg font-bold text-green-400">
                      ${formatNumber(stats.totalPaid, 2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Invoices</p>
                    <p className="text-lg font-bold text-white">{stats.totalInvoices}</p>
                  </div>
                </div>

                {selectedClient?.id === client.id && (
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                    {client.notes && (
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Notes:</p>
                        <p className="text-sm text-white">{client.notes}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {onCreateInvoice && (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            onCreateInvoice(client)
                          }}
                          className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Create Invoice
                        </Button>
                      )}
                    </div>

                    {/* Recent Invoices */}
                    {stats.totalInvoices > 0 && (
                      <div>
                        <p className="text-xs text-gray-400 mb-2">Recent Invoices:</p>
                        <div className="space-y-1">
                          {getClientInvoices(client.id).slice(0, 3).map(invoice => (
                            <div
                              key={invoice.id}
                              className="text-xs flex items-center justify-between p-2 bg-white/5 rounded"
                            >
                              <span className="text-white">{invoice.invoiceNumber}</span>
                              <Badge
                                variant="outline"
                                className={
                                  invoice.status === 'paid'
                                    ? 'border-green-500/50 bg-green-500/10 text-green-300 text-xs'
                                    : 'border-yellow-500/50 bg-yellow-500/10 text-yellow-300 text-xs'
                                }
                              >
                                {invoice.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
