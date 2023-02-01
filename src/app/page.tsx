import { redirectIfUnauthorized } from "@server/auth"

export default function Page() {
  redirectIfUnauthorized()

  return <h1>Hello, Next!</h1>
}
