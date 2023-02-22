import { redirectIfUnauthorized } from "~server/auth"
import { Zoom } from "./test"

export default async function Page() {
  await redirectIfUnauthorized()

  return (
    <>
      <Zoom />
      <h1>Hello, Next!</h1>
    </>
  )
}
