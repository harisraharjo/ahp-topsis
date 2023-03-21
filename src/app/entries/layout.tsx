import type { ReactNode } from "react"
import { Panel } from "~components/(Playground)/Panel"
import { redirectIfUnauthorized } from "~server/auth"

export default async function Layout({ children }: { children: ReactNode }) {
  await redirectIfUnauthorized()

  return (
    <div>
      LAYOUT
      <Panel>{children}</Panel>
    </div>
  )
}
