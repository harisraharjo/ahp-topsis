import type { ReactNode } from "react"
import { redirectIfUnauthorized } from "@server/auth"

export default function Layout({ children }: { children: ReactNode }) {
  redirectIfUnauthorized()

  return (
    <div>
      LAYOUT
      {children}
    </div>
  )
}
