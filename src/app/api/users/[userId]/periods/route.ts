import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params

    // Get all available months and years for this user
    const periodsResult = await sql`
      SELECT DISTINCT transaction_year, transaction_month
      FROM transactions 
      WHERE user_id = ${userId}
      ORDER BY transaction_year DESC, transaction_month DESC
    `

    // Format the periods for easier frontend consumption
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]

    interface PeriodRow {
      transaction_year: number
      transaction_month: number
    }

    const periods = (periodsResult as PeriodRow[]).map((period) => ({
      year: period.transaction_year,
      month: period.transaction_month,
      monthName: monthNames[period.transaction_month - 1],
      display: `${monthNames[period.transaction_month - 1]} ${period.transaction_year}`,
      value: `${period.transaction_year}-${period.transaction_month.toString().padStart(2, '0')}`
    }))

    // Get current month info
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() + 1

    return NextResponse.json({
      periods,
      currentPeriod: {
        year: currentYear,
        month: currentMonth,
        monthName: monthNames[currentMonth - 1],
        display: `${monthNames[currentMonth - 1]} ${currentYear}`,
        value: `${currentYear}-${currentMonth.toString().padStart(2, '0')}`
      }
    })
  } catch (error) {
    console.log("Error getting periods", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}