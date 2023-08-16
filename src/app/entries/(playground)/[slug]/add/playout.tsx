import type { PropsWithChildren } from "react"

import { MutationDialogTitle } from "../MutationDialogTitle"
import { Input } from "~components/ui/input"
import { Button } from "~components/ui/button"
import { CriteriaTypes } from "../CriteriaTypes"
import { revalidatePath } from "next/cache";
import { createCriteria } from "~server/db/criteria";

type LayoutProps = PropsWithChildren<{ params: { slug: `${string}-${string}-${string}` } }>
export default function Layout({ children, params:{slug} }: LayoutProps) {
    
  async function action(formData: FormData) {
    "use server"

      let [id, parentId, depth] = slug.split("-");
      id = id!, depth = depth!, parentId = parentId!
      
      await createCriteria({ name: formData.get("name") as string, weight: 0, parentId: parseInt(id), isBenefit: 1 });
  
      revalidatePath("/entries")
    }

  return (
    <>
        <MutationDialogTitle type="add" />
        
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form action={action}>
         <div>
          <label htmlFor="name">Nama</label>
          <Input name="name" placeholder="Nama kriteria" />
          <CriteriaTypes />
        </div>
        <Button>Submit</Button>
      </form>
        {children}
    </>
  )
}





