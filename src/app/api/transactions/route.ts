import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { title, amount, category, user_id } = await request.json()

    if (!title || !user_id || !category || amount === undefined) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    const transaction = await sql`
      INSERT INTO transactions(user_id, title, amount, category)
      VALUES (${user_id}, ${title}, ${amount}, ${category})
      RETURNING *
    `

    return NextResponse.json(transaction[0], { status: 201 })
  } catch (error) {
    console.log("Error creating the transaction", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
