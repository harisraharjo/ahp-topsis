import type { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      LAYOUT
      {children}
    </div>
  )
}
