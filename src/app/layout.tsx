import type { ReactNode } from "react"
import { Suspense } from "react"

import "../styles/globals.css"
import { getServerAuthSession } from "@server/auth"
import Loading from "./loading"
// import { TRPCProvider, getQueryClient } from "@components/TRPC"
import { Navigation } from "@components"

async function RootLayout({ children }: { children: ReactNode }) {
  const session = getServerAuthSession()

  return (
    <html lang="en">
      <body className="m-0 bg-gray-50 font-sans text-base font-normal leading-default text-slate-500 xl:ml-68.5">
        <Suspense fallback={<Loading />}>
          {(await session) && <Navigation />}
        </Suspense>
        {/* <TRPCProvider fn={getQueryClient}>
        </TRPCProvider> */}
        {children}
      </body>
    </html>
  )
}

export default RootLayout
