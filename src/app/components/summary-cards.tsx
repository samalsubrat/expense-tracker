"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

interface SummaryData {
  balance: number
  income: number
  expenses: number
  currentMonth: string
  currentYear: number
  period: string
}

interface SummaryCardsProps {
  userId: string
  year?: number
  month?: number
}

export function SummaryCards({ userId, year, month }: SummaryCardsProps) {
  const [summary, setSummary] = useState<SummaryData>({
    balance: 0,
    income: 0,
    expenses: 0,
    currentMonth: "",
    currentYear: new Date().getFullYear(),
    period: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        let url = `/api/summary/${userId}`
        if (year && month) {
          url += `?year=${year}&month=${month}`
        }
        
        const response = await fetch(url)
        if (response.ok) {
          const data = await response.json()
          setSummary(data)
        }
      } catch (error) {
        console.error("Error fetching summary:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSummary()
  }, [userId, year, month])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="rounded-2xl border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="h-4 bg-muted rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Period Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Financial Summary
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {summary.period || "Current Month"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Balance Card */}
        <Card className="rounded-2xl border-0 shadow-sm bg-white dark:bg-gray-900 border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency(summary.balance)}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Current month balance</p>
          </CardContent>
        </Card>

        {/* Income Card */}
        <Card className="rounded-2xl border-0 shadow-sm bg-white dark:bg-gray-900 border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency(summary.income)}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Money earned this month</p>
          </CardContent>
        </Card>

        {/* Expenses Card */}
        <Card className="rounded-2xl border-0 shadow-sm bg-white dark:bg-gray-900 border-l-4 border-l-red-500 sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency(summary.expenses)}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Money spent this month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
