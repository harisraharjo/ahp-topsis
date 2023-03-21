"use client"

import type { ReactElement, RefObject } from "react"
import { useRef } from "react"
import type { OverlayAria } from "@react-aria/overlays"
import { useOverlay } from "@react-aria/overlays"

import type { ModalOverlayConfig, Close } from "./useModalOverlay"
// import { useModalOverlay } from "./useModalOverlay"
import { Overlay } from "./Overlay"

export type OverlayProps = OverlayAria["overlayProps"]
export type OverlayRef<T extends HTMLElement> = RefObject<T>
export type OverlayElement<T extends HTMLElement> = (
  overlayProps: OverlayProps,
  overlayRef: OverlayRef<T>,
  close: Close,
) => ReactElement

export type ModalProps<T extends HTMLElement> = ModalOverlayConfig & {
  children: OverlayElement<T>
}

const Modal = <T extends HTMLElement>({
  children,
  ...props
}: ModalProps<T>) => {
  const ref = useRef<T>(null)
  const { overlayProps: _overlayProps, underlayProps } = useOverlay(props, ref)

  // usePreventScroll()

  return (
    <Overlay>
      <div
        className="fixed inset-0 z-100 grid place-items-center bg-black/30"
        {...underlayProps}
      >
        {children(_overlayProps, ref, props.onClose)}
      </div>
    </Overlay>
  )
}

export default Modal
