"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { SummaryCards } from "@/app/components/summary-cards"
import { RecentTransactions } from "@/app/components/recent-transactions"
import { AddTransactionButton } from "@/app/components/add-transaction-button"
import { MonthSelector } from "@/app/components/month-selector"

export default function DashboardPage() {
  const { user, isLoaded } = useUser()
  
  // Get current date
  const now = new Date()
  const [currentYear, setCurrentYear] = useState(now.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(now.getMonth() + 1)

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!user) {
    redirect("/sign-in")
  }

  const handlePeriodChange = (year: number, month: number) => {
    setCurrentYear(year)
    setCurrentMonth(month)
  }

  return (
    <div className="px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track your financial overview</p>
        </div>
        <AddTransactionButton />
      </div>

      {/* Month Selector */}
      <MonthSelector 
        userId={user.id} 
        onPeriodChange={handlePeriodChange}
        currentYear={currentYear}
        currentMonth={currentMonth}
      />
      
      {/* Summary Cards */}
      <SummaryCards 
        userId={user.id} 
        year={currentYear} 
        month={currentMonth} 
      />
      
      {/* Recent Transactions */}
      <div className="mt-8">
        <RecentTransactions 
          userId={user.id} 
          year={currentYear} 
          month={currentMonth} 
        />
      </div>
    </div>
  )
}
