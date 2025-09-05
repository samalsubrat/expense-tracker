import type React from "react"
import { Navigation } from "@/app/components/navigation"
import MaxWidthWrapper from "../components/MaxWidthWrapper"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MaxWidthWrapper>
      <Navigation />
      {children}
    </MaxWidthWrapper>
  )
}
