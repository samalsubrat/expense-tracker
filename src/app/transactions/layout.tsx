import type React from "react"
import { Navigation } from "@/app/components/navigation"
import MaxWidthWrapper from "../components/MaxWidthWrapper"

export default function TransactionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MaxWidthWrapper className="">
      <Navigation />
      {children}
    </MaxWidthWrapper>
  )
}
