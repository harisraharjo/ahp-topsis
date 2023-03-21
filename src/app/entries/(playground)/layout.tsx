import type { ReactNode } from "react"

import { Playground } from "./Playground"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1>Playground Layout</h1>
      <Playground />
      {children}
    </div>
  )
}
