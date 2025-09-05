import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params

    const transactions = await sql`
      SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
    `

    return NextResponse.json(transactions)
  } catch (error) {
    console.log("Error getting the transactions", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
