import { redirectIfUnauthorized } from "~server/auth"

export default async function Page() {
  await redirectIfUnauthorized()

  return <h1>Hello, Next!</h1>
}
