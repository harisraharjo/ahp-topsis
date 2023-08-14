import type { PropsWithChildren } from "react"

import Mutation from "./Mutation"

type LayoutProps = PropsWithChildren<{ params: { slug: string } }>
export default function Layout({ children }: LayoutProps) {
  
  return (
    <>
      <Mutation>{children}</Mutation>
    </>
  )
}
