"use client"

import type { ReactElement } from "react"
import { Suspense } from "react"
import { lazy } from "react"
import { createPortal } from "react-dom"

import type { ModalProps, OverlayElement } from "./Modal"
import type { Close } from "./useModalOverlay"
import { useOverlayTrigger, type Trigger } from "./useOverlayTrigger"

const Modal = lazy(() => import("./Modal"))

export type TriggerElement = {
  triggerElement: (trigger: Close) => ReactElement
}
export type ModalTriggerProps<T extends HTMLElement> = Omit<
  ModalProps<T>,
  "isOpen" | "onClose"
> &
  TriggerElement

export const ModalTrigger = <T extends HTMLElement>({
  children,
  triggerElement,
  // Container,
  ...props
}: ModalTriggerProps<T>) => {
  const { isOpen, toggle } = useOverlayTrigger()

  return (
    <>
      {triggerElement(toggle)}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={toggle} {...props}>
          {children as OverlayElement<HTMLElement>}
        </Modal>
      )}
    </>
  )
}

type Res = Omit<Trigger, "setIsOpen"> & { modal: ReactElement | false }
export const useModalTrigger = <T extends HTMLElement>(
  children: ModalTriggerProps<T>["children"],
  config: Pick<
    ModalTriggerProps<T>,
    "isDismissable" | "isKeyboardDismissDisabled"
  >,
): Res => {
  const { isOpen, toggle } = useOverlayTrigger()

  return {
    toggle,
    modal: isOpen && (
      <Modal isOpen={isOpen} onClose={toggle} {...config}>
        {children as OverlayElement<HTMLElement>}
      </Modal>
    ),
    isOpen,
  }
}
