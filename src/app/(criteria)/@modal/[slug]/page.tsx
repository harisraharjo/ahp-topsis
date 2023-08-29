import type { PropsWithChildren } from "react"
import { ButtonLink } from "./ButtonLink"
import { selectCriteria, deleteCriteria } from "~server/db/criteria"
import { Button } from "~components/ui/button"
// import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { GOAL_ID } from "~utils/helper"

function getData(id: number) {
  return selectCriteria(id).executeTakeFirst()
}

type PageProps = PropsWithChildren<{
  params: { slug: `${string}-${string}-${string}` }
}>
export default async function Page({ params: { slug } }: PageProps) {
  const id = parseInt(slug.split("-")[0] as string)

  const data = await getData(id)
  const isHead = id === GOAL_ID

  async function remove() {
    "use server"

    if (isHead) return

    await deleteCriteria(id).execute()

    redirect("/")
  }

  return (
    <>
      {!isHead && (
        <>
          <div>Name: {data?.name}</div>
          <div>Weight: {data?.weight}</div>
          <div className="mb-2">
            Type: {data?.isBenefit ? "Benefit" : "Cost"}
          </div>
        </>
      )}

      <div className="flex justify-between">
        <ButtonLink destination={`/${slug}/add`}>Add</ButtonLink>

        {!isHead && (
          <>
            <ButtonLink destination={`/${slug}/comparison`}>Compare</ButtonLink>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form action={remove}>
              <Button variant="destructive">Delete</Button>
            </form>
          </>
        )}
      </div>
    </>
  )
}
