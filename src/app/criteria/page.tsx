// import { createCriteria } from "@server/db/query/criteria"

import { Suspense } from "react"
import { AddCriteria } from "./AddCriteria"
import { Criterias } from "./Criterias"
import Loading from "./loading"

export default function Page() {
  return (
    <div>
      <AddCriteria operation="Add" />
      <Suspense fallback={<Loading />}>
        {/* @ts-expect-error Server Component */}
        <Criterias />
      </Suspense>
      <br />
      <AddCriteria operation="Delete" />
    </div>
  )
}
