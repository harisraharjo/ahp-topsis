import type { ReactNode } from "react"
import { redirectIfUnauthorized } from "~server/auth"

export default async function Layout({ children }: { children: ReactNode }) {
  await redirectIfUnauthorized()

  return (
    <div>
      LAYOUT
      {children}
    </div>
  )
}
