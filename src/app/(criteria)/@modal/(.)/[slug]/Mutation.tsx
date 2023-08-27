import type { PropsWithChildren } from "react"

type Props = PropsWithChildren

export const ModalDialog = ({ children }: Pick<Props, "children">) => (
  <dialog
    open
    className="fixed inset-0 rounded border border-solid border-gray-400 bg-slate-900 shadow-lg "
  >
    {children}
  </dialog>
)
