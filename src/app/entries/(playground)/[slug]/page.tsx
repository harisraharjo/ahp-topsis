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
        Tambah
      </ButtonLink>
      <ButtonLink destination={`/${params.slug}/edit`} className="bg-red-700">
        Edit
      </ButtonLink>
      <ButtonLink
        destination={`/${params.slug}/comparison`}
        className="bg-yellow-700"
      >
        Komparasi
      </ButtonLink>
    </>
  )
}
// TODO: Configure Criteria CRUD
