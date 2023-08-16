import type { PropsWithChildren } from "react"

import { MutationDialogTitle } from "../MutationDialogTitle"
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

    await createCriteria({ name: formData.get("name") as string, weight: 0, parentId: parseInt(id!), isBenefit: parseInt(formData.get("type") as string) });
  
    revalidatePath("/entries")
  }

  return (
    <>
     <MutationDialogTitle type="add" />
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form action={action}>
         <div>
          <label htmlFor="name">Nama</label>
          <Input name="name" placeholder="Nama kriteria" required/>
          <CriteriaTypes />
        </div>
        <Button>Submit</Button>
      </form>
    </>
  )
}


