import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params

    const balanceResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${userId}
    `

    const incomeResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as income FROM transactions
      WHERE user_id = ${userId} AND amount > 0
    `

    const expensesResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as expenses FROM transactions
      WHERE user_id = ${userId} AND amount < 0
    `

    return NextResponse.json({
      balance: Number.parseFloat(balanceResult[0].balance),
      income: Number.parseFloat(incomeResult[0].income),
      expenses: Math.abs(Number.parseFloat(expensesResult[0].expenses)),
    })
  } catch (error) {
    console.log("Error getting the summary", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
