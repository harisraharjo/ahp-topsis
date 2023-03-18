import type { PropsWithChildren } from "react"

type MutationDialogContentProps = PropsWithChildren
export const MutationDialogContent = ({
  children,
}: MutationDialogContentProps) => {
  return <div>{children}</div>
}
