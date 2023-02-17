import { getServerAuthSession } from "~server/auth"
import { redirect } from "next/navigation"
import { SignIn } from "~components/SigninHandler"

export default async function Page() {
  const session = await getServerAuthSession()
  if (session) redirect("/")

  return (
    <div className="grid place-items-center">
      <SignIn />
    </div>
  )
}
