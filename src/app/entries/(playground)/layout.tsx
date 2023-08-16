import type { ReactNode } from "react"

import { Playground } from "./Playground"
import { selectAllCriteria } from "~server/db/criteria";


function getData() {
  return selectAllCriteria().execute();
}


export default async function Layout({ children }: { children: ReactNode }) {
  const data = await getData()
  
  return (
      <Playground data={data}>{children}</Playground>
  )
}
