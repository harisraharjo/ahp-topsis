"use client"

// import { usePreventScroll } from "@react-aria/overlays"
// import { useRouter } from "next/navigation"
import type { PropsWithChildren } from "react"
// import { Suspense, lazy } from "react"

// import { Modal } from "~components/Overlays/Modal"
import Portal from "~components/Portal"

// const Dialog = lazy(() => import("~components/Dialog"))

type Props = PropsWithChildren
const Mutation = ({ children }: Props) => (
  <Portal id="svgRoot">
    {/* <foreignObject width={900} height={900}> */}
    <ModalDialog>{children}</ModalDialog>
    {/* </foreignObject> */}
  </Portal>
)

const ModalDialog = ({ children }: Pick<Props, "children">) => {
  // const router = useRouter()
  // usePreventScroll()
  // const ref = useRef<HTMLDialogElement>(null)
  // useLayoutEffect(() => {
  // console.log("dialog rendered")

  // const dialog = ref.current as HTMLDialogElement
  // dialog.showModal()

  // return () => {
  //   dialog.close()
  // }
  // }, [])

  return (
    <dialog
      // ref={ref}
      open
      // [&::backdrop]:bg-red-500
      className="fixed inset-0 rounded border border-solid border-gray-400 bg-yellow-400 shadow-lg "
    >
      {/* <div className={`rounded border border-solid border-gray-400 shadow-lg`}>
        {children}
      </div> */}
      {children}
    </dialog>
  )
}

export default Mutation
