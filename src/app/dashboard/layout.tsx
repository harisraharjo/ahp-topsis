import type { ReactNode } from "react"
import { redirectIfUnauthorized } from "@server/auth"

function Layout({ children }: { children: ReactNode }) {
  redirectIfUnauthorized()

  return <div>Layout {children}</div>
}

export default Layout
