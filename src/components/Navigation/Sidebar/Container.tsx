import type { PropsWithChildren } from "react"
import { forwardRef } from "react"

type Props = PropsWithChildren<{
  isOpen: boolean
}>

export const SidebarContainer = forwardRef<HTMLElement, Props>(
  ({ isOpen, children }, ref) => (
    <aside
      ref={ref}
      className={`fixed inset-y-0 left-0 w-full max-w-62.5
      flex-wrap items-center justify-between overflow-y-auto rounded-r-2xl
      bg-white transition-transform duration-200 xl:translate-x-0 xl:bg-transparent ${
        isOpen ? "translate-x-0 shadow-soft-xl" : "-translate-x-full"
      }`}
    >
      {children}
    </aside>
  ),
)

SidebarContainer.displayName = "SidebarContainer"
