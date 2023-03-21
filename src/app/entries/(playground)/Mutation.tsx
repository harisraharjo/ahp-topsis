"use client"

// import { usePreventScroll } from "@react-aria/overlays"
import { useRouter } from "next/navigation"
import type { PropsWithChildren } from "react"
import { Suspense, lazy } from "react"

import { Modal } from "~components/Overlays"
import Portal from "~components/Portal"

const Dialog = lazy(() => import("~components/Dialog"))

type Props = PropsWithChildren
const Mutation = ({ children }: Props) => (
  <Portal id="svgRoot">
    <foreignObject width={900} height={900}>
      <ModalDialog>{children}</ModalDialog>
    </foreignObject>
  </Portal>
)

const ModalDialog = ({ children }: Pick<Props, "children">) => {
  const router = useRouter()
  // usePreventScroll()
  return (
    <Modal isOpen={true} onClose={() => router.push("/entries")} isDismissable>
      {(overlayProps, overlayRef) => (
        <Suspense fallback={<></>}>
          <Dialog
            overlayRef={overlayRef}
            overlayProps={overlayProps}
            className="bg-white p-4"
          >
            {children}
          </Dialog>
        </Suspense>
      )}
    </Modal>
  )
}

export default Mutation
