import { Navigation } from "./(Navigation)"
import type { ReactNode } from "react"

import "../styles/globals.css"
import { getServerAuthSession } from "@server/auth"

async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getServerAuthSession()

  return (
    <html lang="en">
      <body className="m-0 bg-gray-50 font-sans text-base font-normal leading-default text-slate-500 xl:ml-68.5">
        <>
          {session && <Navigation />}
          {children}
        </>
      </body>
    </html>
  )
}

export default RootLayout
