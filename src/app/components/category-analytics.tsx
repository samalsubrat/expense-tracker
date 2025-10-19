"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"

interface Transaction {
  id: number
  title: string
  amount: number
  category: string
  created_at: string
}

interface CategoryData {
  category: string
  total: number
  count: number
  percentage: number
}

interface CategoryAnalyticsProps {
  userId: string
}

export function CategoryAnalytics({ userId }: CategoryAnalyticsProps) {
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/transactions`)
        if (response.ok) {
          const transactions: Transaction[] = await response.json()

          // Process transactions by category
          const categoryMap = new Map<string, { total: number; count: number }>()
          let totalExpenses = 0

          transactions.forEach((transaction: Transaction) => {
            if (transaction.amount < 0) {
              // Only expenses
              const amount = Math.abs(transaction.amount)
              totalExpenses += amount

              const existing = categoryMap.get(transaction.category) || { total: 0, count: 0 }
              categoryMap.set(transaction.category, {
                total: existing.total + amount,
                count: existing.count + 1,
              })
            }
          })

          // Convert to array and calculate percentages
          const categoryData = Array.from(categoryMap.entries())
            .map(([category, data]) => ({
              category,
              total: data.total,
              count: data.count,
              percentage: totalExpenses > 0 ? (data.total / totalExpenses) * 100 : 0,
            }))
            .sort((a, b) => b.total - a.total)

          setCategories(categoryData)
        }
      } catch (error) {
        console.error("Error fetching category data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryData()
  }, [userId])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(amount)
  }

  const getCategoryColor = (index: number) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-orange-500",
      "bg-teal-500",
      "bg-cyan-500",
    ]
    return colors[index % colors.length]
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="rounded-2xl border-0 shadow-sm">
          <CardHeader>
            <div className="h-6 bg-muted rounded animate-pulse w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 bg-muted rounded-xl animate-pulse" />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-0 shadow-sm">
          <CardHeader>
            <div className="h-6 bg-muted rounded animate-pulse w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-xl animate-pulse" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Category Breakdown */}
      <Card className="rounded-2xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Expense Categories</CardTitle>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No expense data available</p>
              <p className="text-sm text-muted-foreground mt-1">Add some expenses to see category breakdown</p>
            </div>
          ) : (
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getCategoryColor(index)}`} />
                      <span className="font-medium text-sm sm:text-base">{category.category}</span>
                      <Badge variant="secondary" className="text-xs rounded-lg">
                        {category.count} transactions
                      </Badge>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-semibold text-sm sm:text-base">{formatCurrency(category.total)}</p>
                      <p className="text-xs text-muted-foreground">{category.percentage.toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getCategoryColor(index)}`}
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Categories */}
      <Card className="rounded-2xl border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Top Spending Categories</CardTitle>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No data to display</p>
            </div>
          ) : (
            <div className="space-y-4">
              {categories.slice(0, 5).map((category, index) => (
                <div
                  key={category.category}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm sm:text-base">{category.category}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{category.count} transactions</p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-semibold text-base sm:text-lg">{formatCurrency(category.total)}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {category.percentage.toFixed(1)}% of expenses
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
