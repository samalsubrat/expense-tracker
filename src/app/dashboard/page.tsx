import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { SummaryCards } from "@/app/components/summary-cards"
import { RecentTransactions } from "@/app/components/recent-transactions"
import { AddTransactionButton } from "@/app/components/add-transaction-button"

export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
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
      {/* Summary Cards */}
      <SummaryCards userId={userId} />
      {/* Recent Transactions */}
      <div className="mt-8">
        <RecentTransactions userId={userId} />
      </div>
    </div>
  )
}
