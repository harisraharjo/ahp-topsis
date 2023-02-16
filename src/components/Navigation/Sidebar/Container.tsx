"use client"

import { useRef } from "react"
import useOnClickOutside from "use-onclickoutside"
import type { SidebarContextProviderProps } from "./Provider"

type SidebarProps = SidebarContextProviderProps & { isOpen: boolean }

export const SidebarContainer = ({
  isOpen,
  children,
  handlerRef,
  handler,
}: SidebarProps) => {
  const ref = useRef(null)
  useOnClickOutside(
    ref,
    (event) =>
      void (
        !handlerRef.current?.contains(event.target as Node) &&
        handler(() => false)
      ),
  )

  return (
    <aside
      ref={ref}
      className={`fixed inset-y-0 my-4 block w-full max-w-62.5
      -translate-x-full flex-wrap items-center justify-between overflow-y-auto rounded-2xl bg-white
      p-0 transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-transparent ${
        isOpen ? "translate-x-0 shadow-soft-xl" : ""
      }`}
    >
      {children}
    </aside>
  )
}
