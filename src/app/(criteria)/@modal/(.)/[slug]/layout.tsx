import type { PropsWithChildren } from "react"

import {ModalDialog} from "./Mutation"

type LayoutProps = PropsWithChildren<{ params: { slug: string } }>
export default function Layout({ children }: LayoutProps) {
  
  return (
      <ModalDialog>{children}</ModalDialog>
  )
}
