import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params

    // Get current year and month
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() + 1 // JavaScript months are 0-based

    // Check for optional query parameters to get different months
    const url = new URL(request.url)
    const year = url.searchParams.get('year') ? parseInt(url.searchParams.get('year')!) : currentYear
    const month = url.searchParams.get('month') ? parseInt(url.searchParams.get('month')!) : currentMonth

    const transactions = await sql`
      SELECT * FROM transactions 
      WHERE user_id = ${userId} 
        AND transaction_year = ${year} 
        AND transaction_month = ${month}
      ORDER BY created_at DESC
    `

    return NextResponse.json(transactions)
  } catch (error) {
    console.log("Error getting the transactions", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
