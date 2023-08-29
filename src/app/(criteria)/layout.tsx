import { selectAllCriteria } from "~server/db/criteria"
import { Playground } from "./Playground"
import type { ReactNode } from "react"

function getData() {
  return selectAllCriteria().execute()
}

export default async function Page({
  modal,
}: {
  modal: ReactNode
  auth: ReactNode
}) {
  const data = await getData()

  return (
    <>
      {modal}
      <Playground data={data} />
    </>
  )
}
