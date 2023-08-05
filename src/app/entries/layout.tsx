import type { ReactNode } from "react"
// import { Panel } from "~components/(Playground)/Panel"
import { redirectIfUnauthorized } from "~server/auth"

export default async function Layout({ children }: { children: ReactNode }) {
  await redirectIfUnauthorized()

  return (
    <div className="h-screen w-full p-3">
      <div>Panel</div>
      {/* <Panel></Panel> */}
      {children}
    </div>
  )
}
