import type { ReactNode } from "react"

import { Playground } from "./Playground"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Playground>{children}</Playground>
    </>
  )
}
