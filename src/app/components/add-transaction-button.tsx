"use client"

import { AddTransactionDialog } from "./add-transaction-dialog"

interface AddTransactionButtonProps {
  onTransactionAdded?: () => void
}

export function AddTransactionButton({ onTransactionAdded }: AddTransactionButtonProps) {
  return <AddTransactionDialog onTransactionAdded={onTransactionAdded} />
}
