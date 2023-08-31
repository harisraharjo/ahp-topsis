import { Input } from "~components/ui/input"
import { Button } from "~components/ui/button"
import { CriteriaTypes } from "../CriteriaTypes"
import { revalidatePath } from "next/cache"
import { createCriteria } from "~server/db/criteria"
import { auth } from "@clerk/nextjs"
import type { DynamicRoutesProps } from "../layout"

export default function Page({ params: { slug } }: DynamicRoutesProps) {
  const id = slug.split("-")[0] as string

  async function action(formData: FormData) {
    "use server"

    await createCriteria({
      name: formData.get("name") as string,
      weight: 0,
      parentId: Number(id),
      isBenefit: Number(formData.get("type") as string) as 1 | 0,
      userId: auth().userId as string,
    }).executeTakeFirst()

    revalidatePath("/")
  }

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form action={action}>
        <label htmlFor="name">Name</label>
        <Input
          name="name"
          className="text-black"
          placeholder="Nama kriteria"
          required
        />
        <CriteriaTypes />
        <Button className="border border-slate-50">Add</Button>
      </form>
    </>
  )
}
