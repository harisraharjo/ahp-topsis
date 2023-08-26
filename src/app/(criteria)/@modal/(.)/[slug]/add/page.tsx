import type { PropsWithChildren } from "react"

import { Input } from "~components/ui/input"
import { Button } from "~components/ui/button"
import { CriteriaTypes } from "../CriteriaTypes"
import { revalidatePath } from "next/cache";
import { createCriteria } from "~server/db/criteria";

type LayoutProps = PropsWithChildren<{ params: { slug: `${string}-${string}-${string}` } }>
export default function Page({ params: { slug } }: LayoutProps) {
  let [id] = slug.split("-");
  id = id!

  async function action(formData: FormData) {
    "use server"

    await createCriteria({ name: formData.get("name") as string, weight: 0, parentId: parseInt(id!), isBenefit: parseInt(formData.get("type") as string) as 1 | 0 });
  
    revalidatePath("/")
  }

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form action={action}>
          <label htmlFor="name">Name</label>
          <Input name="name" className="text-black" placeholder="Nama kriteria" required/>
          <CriteriaTypes />
        <Button className="border border-slate-50">Submit</Button>
      </form>
    </>
  )
}


