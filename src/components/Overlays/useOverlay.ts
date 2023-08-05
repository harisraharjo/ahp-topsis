"use client"

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { isElementInChildOfActiveScope } from "@react-aria/focus"
import type { RefObject, KeyboardEvent, PointerEvent } from "react"
import { useRef } from "react"
import { useEffect } from "react"
import { useFocusWithin } from "@react-aria/interactions"
import type { DOMAttributes } from "./useModalOverlay"
import useOnClickOutside from "use-onclickoutside"

export interface AriaOverlayProps {
  /** Whether the overlay is currently open. */
  isOpen?: boolean

  /** Handler that is called when the overlay should close. */
  onClose?: () => void

  /**
   * Whether to close the overlay when the user interacts outside it.
   * @default false
   */
  isDismissable?: boolean

  /** Whether the overlay should close when focus is lost or moves outside it. */
  shouldCloseOnBlur?: boolean

  /**
   * Whether pressing the escape key to close the overlay should be disabled.
   * @default false
   */
  isKeyboardDismissDisabled?: boolean

  /**
   * When user interacts with the argument element outside of the overlay ref,
   * return true if onClose should be called.  This gives you a chance to filter
   * out interaction with elements that should not dismiss the overlay.
   * By default, onClose will always be called on interaction outside the overlay ref.
   */
  shouldCloseOnInteractOutside?: (element: HTMLElement) => boolean
}

export interface OverlayAria<T extends HTMLElement> {
  /** Props to apply to the overlay container element. */
  overlayProps: DOMAttributes
  /** Props to apply to the underlay element, if any. */
  underlayProps: DOMAttributes
  ref: RefObject<T>
}

const visibleOverlays: RefObject<HTMLElement>[] = []

/**
 * Provides the behavior for overlays such as dialogs, popovers, and menus.
 * Hides the overlay when the user interacts outside it, when the Escape key is pressed,
 * or optionally, on blur. Only the top-most overlay will close at once.
 */
export function useOverlay<T extends HTMLElement>(
  props: AriaOverlayProps,
): OverlayAria<T> {
  const {
    onClose,
    shouldCloseOnBlur,
    isOpen,
    isDismissable = false,
    isKeyboardDismissDisabled = false,
    shouldCloseOnInteractOutside,
  } = props

  const ref = useRef<T>(null)
  // Add the overlay ref to the stack of visible overlays on mount, and remove on unmount.
  useEffect(() => {
    if (isOpen) {
      visibleOverlays.push(ref)
    }

    return () => {
      const index = visibleOverlays.indexOf(ref)
      if (index >= 0) {
        visibleOverlays.splice(index, 1)
      }
    }
  }, [isOpen, ref])

  // Only hide the overlay when it is the topmost visible overlay in the stack.
  const onHide = () => {
    if (visibleOverlays[visibleOverlays.length - 1] === ref && onClose) {
      onClose()
    }
  }

  // const onInteractOutsideStart = (e: SyntheticEvent<Element>) => {
  //   if (
  //     !shouldCloseOnInteractOutside ||
  //     shouldCloseOnInteractOutside(e.target as Element)
  //   ) {
  //     if (visibleOverlays[visibleOverlays.length - 1] === ref) {
  //       e.stopPropagation()
  //       e.preventDefault()
  //     }
  //   }
  // }

  // Handle the escape key
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && !isKeyboardDismissDisabled) {
      e.stopPropagation()
      // e.preventDefault()
      onHide()
    }
  }

  const onInteractOutside: Parameters<typeof useOnClickOutside>[1] = (e) => {
    if (
      !shouldCloseOnInteractOutside ||
      shouldCloseOnInteractOutside(e.target as HTMLElement)
    ) {
      if (visibleOverlays[visibleOverlays.length - 1] === ref) {
        e.stopPropagation()
        // e.preventDefault()
      }
      onHide()
    }
  }

  // Handle clicking outside the overlay to close it
  useOnClickOutside(ref, isDismissable ? onInteractOutside : null)
  // useInteractOutside({
  //   ref,
  //   onInteractOutside: isDismissable ? onInteractOutside : null,
  //   onInteractOutsideStart,
  // })

  const { focusWithinProps } = useFocusWithin({
    isDisabled: !shouldCloseOnBlur,
    onBlurWithin: (e) => {
      // If focus is moving into a child focus scope (e.g. menu inside a dialog),
      // do not close the outer overlay. At this point, the active scope should
      // still be the outer overlay, since blur events run before focus.
      if (e.relatedTarget && isElementInChildOfActiveScope(e.relatedTarget)) {
        return
      }

      if (
        !shouldCloseOnInteractOutside ||
        shouldCloseOnInteractOutside(e.relatedTarget as HTMLElement)
      ) {
        onClose?.()
      }
    },
  })

  const onPointerDownUnderlay = (e: PointerEvent) => {
    // fixes a firefox issue that starts text selection https://bugzilla.mozilla.org/show_bug.cgi?id=1675846
    if (e.target === e.currentTarget) {
      e.preventDefault()
    }
  }

  return {
    ref,
    overlayProps: {
      onKeyDown,
      ...focusWithinProps,
    },
    underlayProps: {
      onPointerDown: onPointerDownUnderlay,
    },
  }
}
