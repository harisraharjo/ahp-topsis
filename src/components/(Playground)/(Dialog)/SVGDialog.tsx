"use client"

import { type PropsWithChildren, type SVGProps } from "react"

import type { OverlayElement } from "~components/Overlays/Modal"

import Dialog from "~components/Dialog"

export type ForeignObject = Omit<
  SVGProps<SVGForeignObjectElement>,
  "ref" | "refX" | "refY"
>

type OverlayElementParams<T extends HTMLElement> = Parameters<OverlayElement<T>>
type Props<T extends HTMLElement> = PropsWithChildren<
  ForeignObject & {
    overlayProps: OverlayElementParams<T>["0"]
    overlayRef: OverlayElementParams<T>["1"]
  }
>

const SVGDialog = <T extends HTMLElement>({
  overlayProps,
  overlayRef,
  children,
  ...props
}: Props<T>) => (
  <Dialog overlayRef={overlayRef} overlayProps={overlayProps}>
    {children}
  </Dialog>
  // <foreignObject {...props}>
  // </foreignObject>
)

export default SVGDialog
