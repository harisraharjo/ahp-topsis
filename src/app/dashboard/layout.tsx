import type { ReactNode } from "react"
import { redirectIfUnauthorized } from "~server/auth"

async function Layout({ children }: { children: ReactNode }) {
  await redirectIfUnauthorized()

  return <div>Layout {children}</div>
}

export default Layout
