import type { PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  className?: Pick<HTMLDialogElement, "className">["className"]
}>

export const ModalDialog = ({ children, className }: Props) => (
  <dialog
    open
    className={`fixed inset-0 rounded border border-solid border-gray-400 bg-slate-900 shadow-lg ${className}`}
  >
    {children}
  </dialog>
)
