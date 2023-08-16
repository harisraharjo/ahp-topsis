"use client"

import type { PropsWithChildren } from "react"
import Portal from "~components/Portal"

type Props = PropsWithChildren
const Mutation = ({ children }: Props) => (
  <Portal id="svgRoot">
    {/* <foreignObject width={900} height={900}> */}
    <ModalDialog>{children}</ModalDialog>
    {/* </foreignObject> */}
  </Portal>
)

const ModalDialog = ({ children }: Pick<Props, "children">) => {
  return (
    <dialog
      // ref={ref}
      open
      // [&::backdrop]:bg-red-500
      className="fixed inset-0 rounded border border-solid border-gray-400 shadow-lg "
    >
      {/* <div className={`rounded border border-solid border-gray-400 shadow-lg`}>
        {children}
      </div> */}
      {children}
    </dialog>
  )
}

export default Mutation
