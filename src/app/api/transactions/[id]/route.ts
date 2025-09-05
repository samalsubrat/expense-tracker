import { sql } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    if (isNaN(Number.parseInt(id))) {
      return NextResponse.json({ message: "Invalid transaction ID" }, { status: 400 })
    }

    const result = await sql`
      DELETE FROM transactions WHERE id = ${id} RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ message: "Transaction not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Transaction deleted successfully" })
  } catch (error) {
    console.log("Error deleting the transaction", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
