"use client"

import type { PropsWithChildren } from "react"
import { useDialog } from "@react-aria/dialog"
import type { OverlayProps, OverlayRef } from "~components/Overlays/Modal"

const config = { role: "dialog" } as const

export type Props = PropsWithChildren<{
  className?: Pick<HTMLDivElement, "className">["className"]
  overlayRef: OverlayRef<HTMLElement>
  overlayProps: OverlayProps
}>

const Dialog = ({ overlayProps, children, className, overlayRef }: Props) => {
  const { dialogProps } = useDialog(config, overlayRef)

  return (
    <div
      {...overlayProps}
      {...dialogProps}
      ref={overlayRef as OverlayRef<HTMLDivElement>}
      className={className || "border border-solid border-gray-400 bg-red-800"}
    >
      {children}
    </div>
  )
}

export default Dialog
