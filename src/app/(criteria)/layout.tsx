import { selectAllCriteria } from "~server/db/criteria"
import { Playground } from "./Playground"
import type { ReactNode } from "react"
import { auth } from "@clerk/nextjs"

function getData() {
  const id = auth().userId
  return (id && selectAllCriteria(id).execute()) || undefined
}

type Props = {
  modal: ReactNode
  auth: ReactNode
}

export default async function Page({ modal, auth }: Props) {
  const data = await getData()

  return (
    <>
      {modal}
      {auth}
      <Playground data={data} />
    </>
  )
}
