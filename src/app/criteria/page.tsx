// import { createCriteria } from "@server/db/query/criteria"

import { AddCriteria } from "./AddCriteria"

export default function Page() {
  // createCriteria({
  //   name: "Jawa",
  //   weight: 32.55,
  // })
  //   .then((r) => {
  //     console.log("Result:")
  //     console.log(r)
  //   })
  //   .catch((e) => {
  //     console.log("ERR:")
  //     console.log(e)
  //   })
  return (
    <div>
      <AddCriteria operation="Add" />
      <br />
      <AddCriteria operation="Delete" />
    </div>
  )
}
