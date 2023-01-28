"use client"

import type { ComponentPropsWithRef, ReactNode } from "react"
import { forwardRef } from "react"
import { useSidebarContext } from "../Provider"

type HandlerButtonProps = Pick<
  ComponentPropsWithRef<"button">,
  "ref" | "onClick" | "children"
>
const HandlerButton = forwardRef<HTMLButtonElement, HandlerButtonProps>(
  ({ onClick, children }, ref) => (
    <button
      ref={ref}
      className="w-4.5 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {children}
    </button>
  ),
)

HandlerButton.displayName = "HandlerButton"

type HandlerContainerProps = {
  children: ReactNode
}
export function HandlerContainer({ children }: HandlerContainerProps) {
  const { handler, ref } = useSidebarContext()

  return (
    <HandlerButton onClick={() => handler((prev) => !prev)} ref={ref}>
      {children}
    </HandlerButton>
  )
}
