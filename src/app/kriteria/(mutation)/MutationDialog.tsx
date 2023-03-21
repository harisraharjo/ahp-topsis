"use client"

import type { PropsWithChildren, ReactElement, ReactNode } from "react"
import { Suspense } from "react"
import { lazy } from "react"
import { useOverlayTrigger } from "~components/Overlays"

import { MutationDialogContextProvider } from "./contexts"
import { useMutationDialog } from "./useMutationDialog"

type ContainerProps = PropsWithChildren<{
  dialogContent: ReactNode
  container: (modalDialog: ReactElement) => ReactElement
  className?: string
}>

const Modal = lazy(() => import("~components/Overlays/Modal"))
const Dialog = lazy(() => import("~components/Dialog"))

export const MutationDialog = ({
  children,
  dialogContent,
  container,
  className,
}: ContainerProps) => {
  const { isOpen, toggle } = useOverlayTrigger()
  const mutationDialog = useMutationDialog(toggle, "add")

  return (
    <MutationDialogContextProvider value={mutationDialog}>
      {children}
      {isOpen &&
        container(
          <Suspense fallback={<></>}>
            <Modal isOpen={isOpen} onClose={toggle} isDismissable>
              {(overlayProps, overlayRef) => (
                <Suspense fallback={<></>}>
                  <Dialog
                    overlayRef={overlayRef}
                    overlayProps={overlayProps}
                    className={className}
                  >
                    <h4 className="capitalize">
                      {mutationDialog.dialogType} Criteria
                    </h4>
                    {dialogContent}
                  </Dialog>
                </Suspense>
              )}
            </Modal>
          </Suspense>,
        )}
    </MutationDialogContextProvider>
  )
}
