import type { PropsWithChildren } from "react"
import { ButtonLink } from "@components/ButtonLink"
import { selectCriteria, deleteCriteria } from "@server/db/criteria"
import { Button } from "@components/ui/button"
// import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// It will get deduped with the one in Layout
function getData(id: number) {
  return selectCriteria(id).executeTakeFirst()
}

type PageProps = PropsWithChildren<{
  params: { slug: `${string}-${string}` }
}>
export default async function Page({ params: { slug } }: PageProps) {
  let [id, parentId] = slug.split("-") as [string | number, string | number]
  id = Number(id)
  parentId = Number(parentId)
  const data = await getData(id)

  async function remove() {
    "use server"

    await Promise.all(
      deleteCriteria(id as number, parentId as number).map((mutation) =>
        mutation.execute(),
      ),
    )

    redirect("/")
  }

  return (
    <>
      <div>Name: {data!.name}</div>
      <div>Weight: {data!.weight}</div>
      <div className="mb-2">Type: {data!.isBenefit ? "Benefit" : "Cost"}</div>
      <div className="flex justify-between">
        <ButtonLink destination={`/${slug}/add`}>Add</ButtonLink>
        <ButtonLink destination={`/${slug}/comparison`}>Compare</ButtonLink>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form action={remove}>
          <Button variant="destructive">Delete</Button>
        </form>
      </div>
    </>
  )
}
