import type { ReactNode } from "react"


export default function Layout({ children }: { children: ReactNode }) {
  
  return (
    <div className="h-screen w-full p-3">
      {children}
    </div>
  )
}
