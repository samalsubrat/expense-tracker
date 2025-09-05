import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { TransactionsList } from "@/app/components/transactions-list"
import { AddTransactionButton } from "@/app/components/add-transaction-button"

export default async function TransactionsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="">
      <div className="mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
              <p className="text-muted-foreground mt-1">Manage all your income and expenses</p>
            </div>
            <AddTransactionButton />
          </div>

          {/* Transactions List */}
          <TransactionsList userId={userId} />
      </div>
    </div>
  )
}
