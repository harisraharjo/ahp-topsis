"use client"

import type { PropsWithChildren } from "react"
import { useDialog } from "@react-aria/dialog"
import type { OverlayProps, OverlayRef } from "~components/Overlays/Modal"

const config = { role: "dialog" } as const

export type Props = PropsWithChildren<{
  className?: string | "border border-solid border-gray-400"
  overlayRef: OverlayRef<HTMLElement>
  overlayProps: OverlayProps
}>

const Dialog = ({
  overlayProps,
  children,
  className = "border border-solid border-gray-400",
  overlayRef,
}: Props) => {
  const { dialogProps } = useDialog(config, overlayRef)

  return (
    <div
      {...overlayProps}
      {...dialogProps}
      ref={overlayRef as OverlayRef<HTMLDivElement>}
      className={className}
    >
      {children}
    </div>
  )
}

export default Dialog
