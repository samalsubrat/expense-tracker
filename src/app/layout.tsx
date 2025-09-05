import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { Suspense } from "react"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your income and expenses with ease",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${dmSans.className} antialiased`}>
          <Suspense fallback={null}>{children}</Suspense>
        </body>
      </html>
    </ClerkProvider>
  )
}
