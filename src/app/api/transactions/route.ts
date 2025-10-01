import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { title, amount, category, user_id } = await request.json()

    if (!title || !user_id || !category || amount === undefined) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Get current year and month
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() + 1 // JavaScript months are 0-based

    const transaction = await sql`
      INSERT INTO transactions(user_id, title, amount, category, transaction_year, transaction_month)
      VALUES (${user_id}, ${title}, ${amount}, ${category}, ${currentYear}, ${currentMonth})
      RETURNING *
    `

    return NextResponse.json(transaction[0], { status: 201 })
  } catch (error) {
    console.log("Error creating the transaction", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
