import { selectAllCriteria } from "~server/db/criteria"
import { Playground } from "./Playground"
import type { ReactNode } from "react"
import { auth } from "@clerk/nextjs"

function getData() {
  const id = auth().userId
  return (id && selectAllCriteria(id).execute()) || undefined
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
