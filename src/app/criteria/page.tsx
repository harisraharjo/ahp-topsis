import { createCriteria } from "@server/db/query/criteria"

export default function Page() {
  createCriteria({
    name: "Jawa",
    weight: 32.55,
  })
    .then((r) => {
      console.log("Result:")
      console.log(r)
    })
    .catch((e) => {
      console.log("ERR:")
      console.log(e)
    })
  return <div>Page</div>
}
