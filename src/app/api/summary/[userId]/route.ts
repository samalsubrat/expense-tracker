import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params

    // Get year and month from query parameters or use current date
    const url = new URL(request.url)
    const queryYear = url.searchParams.get('year')
    const queryMonth = url.searchParams.get('month')
    
    const now = new Date()
    const currentYear = queryYear ? parseInt(queryYear) : now.getFullYear()
    const currentMonth = queryMonth ? parseInt(queryMonth) : now.getMonth() + 1 // JavaScript months are 0-based

    const balanceResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as balance 
      FROM transactions 
      WHERE user_id = ${userId} 
        AND transaction_year = ${currentYear} 
        AND transaction_month = ${currentMonth}
    `

    const incomeResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as income 
      FROM transactions
      WHERE user_id = ${userId} 
        AND transaction_year = ${currentYear} 
        AND transaction_month = ${currentMonth}
        AND amount > 0
    `

    const expensesResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as expenses 
      FROM transactions
      WHERE user_id = ${userId} 
        AND transaction_year = ${currentYear} 
        AND transaction_month = ${currentMonth}
        AND amount < 0
    `

    // Get month name for display
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]
    const currentMonthName = monthNames[currentMonth - 1]

    return NextResponse.json({
      balance: Number.parseFloat(balanceResult[0].balance),
      income: Number.parseFloat(incomeResult[0].income),
      expenses: Math.abs(Number.parseFloat(expensesResult[0].expenses)),
      currentMonth: currentMonthName,
      currentYear: currentYear,
      period: `${currentMonthName} ${currentYear}`
    })
  } catch (error) {
    console.log("Error getting the summary", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
