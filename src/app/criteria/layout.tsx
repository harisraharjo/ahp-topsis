// import { AddCriteria } from "./AddCriteria"

import type { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* <AddCriteria /> */}
      Criterias
      {children}
    </div>
  )
}