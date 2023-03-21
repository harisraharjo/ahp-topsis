"use client"

import type { PropsWithChildren } from "react"
import type { OverlayProps, OverlayRef } from "~components/Overlays/Modal"
import { useDialog } from "./useDialog"

export type Props = PropsWithChildren<{
  className?: string | "border border-solid border-gray-400"
  overlayRef: OverlayRef<HTMLElement>
  overlayProps: OverlayProps
}>

const Dialog = ({
  overlayProps,
  children,
  className = "",
  overlayRef,
}: Props) => {
  const { dialogProps } = useDialog(overlayRef)

  return (
    <div
      {...overlayProps}
      {...dialogProps}
      ref={overlayRef as OverlayRef<HTMLDivElement>}
      className={`rounded border border-solid border-gray-400 shadow-lg ${className}`}
    >
      {children}
    </div>
  )
}

export default Dialog
