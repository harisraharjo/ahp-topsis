import type { PropsWithChildren } from "react"

type Props = PropsWithChildren

export const ModalDialog = ({ children }: Pick<Props, "children">) => {
  return (
    <dialog
      open
      className="fixed inset-0 rounded border border-solid bg-slate-900 border-gray-400 shadow-lg "
    >
      {children}
    </dialog>
  )
}

