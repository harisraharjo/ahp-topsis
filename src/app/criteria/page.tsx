import Link from "next/link"
import { Suspense } from "react"
import { AddCriteria } from "./AddCriteria"
import { Criterias } from "./Criterias"

import Loading from "./loading"

export default function Page() {
  return (
    <div>
      <AddCriteria operation="Add" />
      <br />
      <Link href="/criteria/create">Create</Link>
      <Suspense fallback={<Loading />}>
        <Criterias />
      </Suspense>
      <br />
    </div>
  )
}
