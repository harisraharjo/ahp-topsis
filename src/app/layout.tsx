import { Navigation } from "@components"
import type { ReactNode } from "react"
import "../styles/globals.css"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="m-0 bg-gray-50 font-sans text-base font-normal leading-default text-slate-500 xl:ml-68.5">
        <Navigation />
        {children}
      </body>
    </html>
  )
}
