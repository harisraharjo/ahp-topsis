import type { ReactNode } from "react"

import {ClerkProvider} from "@clerk/nextjs"
import "../styles/globals.css"
import { Navbar } from "~components/Navbar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  colorScheme: "light",
  title: "Sistem Penunjang Keputusan",
} as const

function RootLayout({ children, }: { children: ReactNode }) {
  
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="m-0 bg-gray-50 font-sans text-base font-normal leading-default text-slate-500 antialiased">
          <Navbar />
          {children}
          {/* {modal} */}
        </body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout
