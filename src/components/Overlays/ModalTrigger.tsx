"use client"

import type { ReactElement, ReactNode, ReactPortal } from "react"

import { lazy } from "react"

import type { ModalProps, OverlayElement } from "./Modal"
import type { Close } from "./useModalOverlay"
import { useOverlayTrigger } from "./useOverlayTrigger"

const Modal = lazy(() => import("./Modal"))

export type TriggerElement = {
  triggerElement: (trigger: Close) => ReactElement
}
export type ModalTriggerProps<T extends HTMLElement> = Omit<
  ModalProps<T>,
  "isOpen" | "onClose"
> &
  TriggerElement & {
    // portalContainer: Element | DocumentFragment
    modalContainer: (modalDialog: ReactElement) => ReactElement
    WrapperElement: <Props extends { children: ReactNode }>(
      arg: Props,
    ) => ReactElement | ReactPortal
  }

export const ModalTrigger = <T extends HTMLElement>({
  children,
  triggerElement,
  WrapperElement,
  modalContainer,
  ...props
}: ModalTriggerProps<T>) => {
  const { isOpen, toggle } = useOverlayTrigger()

  return (
    <>
      {triggerElement(toggle)}
      {isOpen &&
        modalContainer(
          <Modal isOpen={isOpen} onClose={toggle} {...props}>
            {children as OverlayElement<HTMLElement>}
          </Modal>,
        )}
    </>
  )
}

export const useModalTrigger = <T extends HTMLElement>(
  children: ModalTriggerProps<T>["children"],
  config: Pick<
    ModalTriggerProps<T>,
    "isDismissable" | "isKeyboardDismissDisabled"
  >,
) => {
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
