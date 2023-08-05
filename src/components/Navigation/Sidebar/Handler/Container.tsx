"use client"
import type { ReactNode } from "react"

import { useSidebarContext } from "../Provider"

type HandlerContainerProps = {
  children: ReactNode
}
export function HandlerContainer({ children }: HandlerContainerProps) {
  const { handler, ref } = useSidebarContext()

  return (
    <button
      ref={ref}
      className="w-4.5 cursor-pointer overflow-hidden"
      onClick={() => handler((prev) => !prev)}
    >
      {children}
    </button>
  )
}
