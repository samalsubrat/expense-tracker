"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"
import { AddTransactionButton } from "./add-transaction-button"

interface Transaction {
  id: number
  title: string
  amount: number
  category: string
  created_at: string
}

interface TransactionsListProps {
  userId: string
}

const categories = [
  "All Categories",
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Education",
  "Travel",
  "Income",
  "Other",
]

export function TransactionsList({ userId }: TransactionsListProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("All Categories")

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`/api/users/${userId}/transactions`)
      if (response.ok) {
        const data = await response.json()
        setTransactions(data)
        setFilteredTransactions(data)
      }
    } catch (error) {
      console.error("Error fetching transactions:", error)
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  useEffect(() => {
    if (selectedCategory === "All Categories") {
      setFilteredTransactions(transactions)
    } else {
      setFilteredTransactions(transactions.filter((transaction) => transaction.category === selectedCategory))
    }
  }, [selectedCategory, transactions])

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        setTransactions(transactions.filter((t) => t.id !== id))
      }
    } catch (error) {
      console.error("Error deleting transaction:", error)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(Math.abs(amount))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <Card className="rounded-2xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse w-48" />
                  <div className="h-3 bg-muted rounded animate-pulse w-32" />
                </div>
                <div className="h-6 bg-muted rounded animate-pulse w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="rounded-2xl border-0 shadow-sm">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <CardTitle>All Transactions</CardTitle>
        <div className="flex items-center gap-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-muted-foreground/20 rounded-lg" />
            </div>
            <p className="text-lg font-medium text-foreground mb-2">
              {selectedCategory === "All Categories" ? "No transactions yet" : `No transactions in ${selectedCategory}`}
            </p>
            <p className="text-muted-foreground mb-6 text-sm sm:text-base">
              {selectedCategory === "All Categories"
                ? "Start tracking your finances by adding your first transaction"
                : "Try selecting a different category or add a new transaction"}
            </p>
            <AddTransactionButton onTransactionAdded={fetchTransactions} />
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors group"
              >
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-medium text-foreground mb-1 text-sm sm:text-base">{transaction.title}</p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <Badge variant="secondary" className="text-xs rounded-lg">
                          {transaction.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{formatDate(transaction.created_at)}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <p
                        className={`font-semibold text-base sm:text-lg ${
                          transaction.amount > 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </p>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity rounded-lg"
                          >
                            <div className="w-1 h-1 bg-current rounded-full" />
                            <div className="w-1 h-1 bg-current rounded-full" />
                            <div className="w-1 h-1 bg-current rounded-full" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl">
                          <DropdownMenuItem
                            onClick={() => handleDelete(transaction.id)}
                            className="text-red-600 focus:text-red-600 rounded-lg"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
