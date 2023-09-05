import type { ReactNode } from "react"

import { ClerkProvider } from "@clerk/nextjs"
import "../styles/globals.css"
import { Navbar } from "~components/Navbar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  colorScheme: "dark",
  title: "Sistem Penunjang Keputusan",
} as const

function RootLayout({ children }: { children: ReactNode; auth: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="leading-default m-0 bg-slate-900 font-sans text-base font-normal text-slate-50 antialiased">
          <Navbar />
          <main className="relative">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout
