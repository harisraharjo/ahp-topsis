import { getServerAuthSession } from "@server/auth"
import { redirect } from "next/navigation"
import { SignIn } from "./handler"

export default async function Page() {
  const ses = await getServerAuthSession()
  if (ses) redirect("/")

  return (
    <div className="grid place-items-center">
      <SignIn />
    </div>
  )
}
