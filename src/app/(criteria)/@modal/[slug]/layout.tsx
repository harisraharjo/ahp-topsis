import { notFound } from "next/navigation"
import type { PropsWithChildren } from "react"

import { ModalDialog } from "../../../../components/ModalDialog"
import type { DynamicRoutesParam } from "../../../../types"
import { selectCriteria } from "../../../../server/db/criteria"

export type DynamicRoutesProps = PropsWithChildren<{
  params: { slug: DynamicRoutesParam }
}>

function getData(id: number) {
  return selectCriteria(id).executeTakeFirst()
}

export default async function Layout({
  children,
  params: { slug },
}: DynamicRoutesProps) {
  const ids = slug.split("-")
  const id = Number(ids[0])

  if (ids.length !== 2 || Number.isNaN(id) || Number.isNaN(Number(ids[1])))
    notFound()

  !(await getData(id)) && notFound()

  return <ModalDialog className="p-3">{children}</ModalDialog>
}
