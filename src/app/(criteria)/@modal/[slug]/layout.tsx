import { notFound } from "next/navigation"
import type { PropsWithChildren } from "react"

import { ModalDialog } from "~components/ModalDialog"
import type { DynamicRoutesParam } from "~customTypes"

export type DynamicRoutesProps = PropsWithChildren<{
  params: { slug: DynamicRoutesParam }
}>

export default function Layout({
  children,
  params: { slug },
}: DynamicRoutesProps) {
  const [id, parentId] = slug.split("-")

  if (Number.isNaN(Number(id)) || Number.isNaN(Number(parentId))) notFound()

  return <ModalDialog>{children}</ModalDialog>
}
