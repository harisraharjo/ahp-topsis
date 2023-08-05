import { MutationDialogTitle } from "./MutationDialogTitle"
import type { PropsWithChildren } from "react"
import { ButtonLink } from "./ButtonLink"

type PageProps = PropsWithChildren<{ params: { slug: string } }>
export default function Page({ params }: PageProps) {
  return (
    <>
      <MutationDialogTitle type="detail" />
      <div>Detail Content</div>
      <ButtonLink destination={`/${params.slug}/add`} className="bg-blue-700">
        AddE
      </ButtonLink>
      <ButtonLink destination={`/${params.slug}/edit`} className="bg-red-700">
        Edit
      </ButtonLink>
    </>
  )
}
// TODO: Configure Criteria CRUD
