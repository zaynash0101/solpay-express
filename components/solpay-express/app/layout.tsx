import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "SolPay Express - Instant Solana Payments",
  description: "Send money at the speed of Solana. Instant USDC payments for freelancers worldwide.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased bg-gradient-to-b from-[#0F0F23] to-[#1A1A2E]`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
