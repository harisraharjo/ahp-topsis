import type { ReactNode } from "react"

import { Playground } from "./Playground"
import { selectAllCriteria } from "~server/db/criteria";


async function getData() {
  const res = await selectAllCriteria().execute();
 
  return res
}


export default async function Layout({ children }: { children: ReactNode }) {
  const data = await getData()
  
  return (
      <Playground data={data}>{children}</Playground>
  )
}
