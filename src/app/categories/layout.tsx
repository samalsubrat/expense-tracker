import type React from "react"
import { Navigation } from "@/app/components/navigation"

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <Navigation />
      {children}
    </div>
  )
}
