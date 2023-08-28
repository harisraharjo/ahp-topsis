import { selectAllCriteria } from "~server/db/criteria"
import { Playground } from "./Playground"
import type { ReactNode } from "react"

function getData() {
  return selectAllCriteria().execute()
}

export default async function Page({
  modal,
  auth,
}: {
  // children: ReactNode
  modal: ReactNode
  auth: ReactNode
}) {
  const data = await getData()

  return (
    <>
      <Playground data={data}>
        {auth}
        {modal}
      </Playground>
    </>
  )
}
