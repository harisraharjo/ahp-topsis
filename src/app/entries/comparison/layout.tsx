import type { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1>Comparison Layout</h1>
      {children}
    </div>
  )
}
