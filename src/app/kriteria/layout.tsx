import type { ReactNode } from "react"
// import { Panel } from "~components/(Playground)/Panel"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1>Kriteria</h1>
      {children}
      {/* <Panel>{children}</Panel> */}
    </div>
  )
}
