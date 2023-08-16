import type { ReactNode } from "react"
// import { Panel } from "~components/(Playground)/Panel"


export default function Layout({ children }: { children: ReactNode }) {
  
  return (
    <div className="h-screen w-full p-3">
      <div>Panel</div>
      {/* <Panel></Panel> */}
      {children}
    </div>
  )
}
