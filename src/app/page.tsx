import { redirectIfUnauthorized } from "@server/auth"

export default function Page() {
  redirectIfUnauthorized()
  console.log("ROOT PAGE")
  return <h1>Hello, Next!</h1>
}
