import type { PropsWithChildren } from "react"

import { ModalDialog } from "~components/ModalDialog"

type LayoutProps = PropsWithChildren<{ params: { slug: string } }>
export default function Layout({ children }: LayoutProps) {
  return <ModalDialog className="z-10">{children}</ModalDialog>
}
