import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { Suspense } from "react"
import { PWAInstallPrompt } from "./components/pwa-install-prompt"
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
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Expense Tracker",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Expense Tracker",
    title: "Expense Tracker",
    description: "Track your income and expenses with ease",
  },
  twitter: {
    card: "summary",
    title: "Expense Tracker",
    description: "Track your income and expenses with ease",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta name="application-name" content="Expense Tracker" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Expense Tracker" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#000000" />
          <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-192x192.png" />
        </head>
        <body className={`${dmSans.className} antialiased`}>
          <Suspense fallback={null}>{children}</Suspense>
          <PWAInstallPrompt />
        </body>
      </html>
    </ClerkProvider>
  )
}
