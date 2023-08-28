import type { ReactNode } from "react"

export default function Layout({
  children,
} // auth,
: {
  children: ReactNode
  // auth: ReactNode
}) {
  return (
    <div className="h-screen w-full p-3">
      {/* {auth} */}
      {children}
    </div>
  )
}
