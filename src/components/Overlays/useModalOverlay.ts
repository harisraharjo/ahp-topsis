"use client"

import type {
  AriaAttributes,
  AriaRole,
  CSSProperties,
  DOMAttributes as ReactDOMAttributes,
} from "react"
import type { AriaModalOverlayProps } from "@react-aria/overlays"
import { usePreventScroll } from "@react-aria/overlays"

export interface FocusableElement extends Element, HTMLOrSVGElement {}

/** All DOM attributes supported across both HTML and SVG elements. */
export interface DOMAttributes<T = FocusableElement>
  extends AriaAttributes,
    ReactDOMAttributes<T> {
  id?: string | undefined
  role?: AriaRole | undefined
  tabIndex?: number | undefined
  style?: CSSProperties | undefined
  className?: string | undefined
}

export type ModalOverlay = {
  /** Props for the modal element. */
  modalProps: DOMAttributes
  /** Props for the underlay element. */
  underlayProps: DOMAttributes
}

export type Close = () => void
export type ModalOverlayState = {
  /** Whether the overlay is currently open. */
  readonly isOpen: boolean
  /** Closes the overlay. */
  onClose: Close
}

export type ModalOverlayConfig = AriaModalOverlayProps & ModalOverlayState

/**
 * Provides the behavior and accessibility implementation for a modal component.
 * A modal is an overlay element which blocks interaction with elements outside it.
 */
export function useModalOverlay(
  preventScroll: boolean,
  // config: ModalOverlayConfig,
) {
  usePreventScroll({
    isDisabled: !preventScroll,
  })

  // return {
  //   // modalProps: mergeProps(overlayProps),
  //   modalProps,
  //   underlayProps,
  // }
}
