import type { ReactNode } from "react"
import { Suspense } from "react"

import "../styles/globals.css"
import { getServerAuthSession } from "~server/auth"
import Loading from "./aloading"
import { Navigation } from "~components/Navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  colorScheme: "light",
  title: "Sistem Penunjang Keputusan",
} as const

async function RootLayout({ children }: { children: ReactNode }) {
  const session = getServerAuthSession()

  return (
    <html lang="en">
      {/* xl:ml-68.5 */}
      <body className="m-0 bg-gray-50 font-sans text-base font-normal leading-default text-slate-500 antialiased">
        <Suspense fallback={<Loading />}>
          {(await session) && <Navigation />}
        </Suspense>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
