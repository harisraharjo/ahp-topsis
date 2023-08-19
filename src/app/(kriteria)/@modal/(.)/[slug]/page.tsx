import { MutationDialogTitle } from "./MutationDialogTitle"
import type { PropsWithChildren } from "react"
import { ButtonLink } from "./ButtonLink"
import { selectCriteria } from "~server/db/criteria";


function getData(id: number) {
  return selectCriteria(id).executeTakeFirst();
}


type PageProps = PropsWithChildren<{ params: { slug: `${string}-${string}-${string}` } }>
export default async function Page({ params: {slug} }: PageProps) {
  let [id,,depth] = slug.split("-")
  id = id!, depth = depth!
  
  
  const data = await getData(parseInt(id))
  const addAble = parseInt(depth) === 1  && parseInt(id) !== 2

  return (
    <>
      <MutationDialogTitle type="detail" />
      <div>Nama: {data?.name}</div>
      <div>Bobot: {data?.weight}</div>
      <div>Tipe: {data?.isBenefit ? "Benefit":"Cost"}</div>
      {
        addAble && <ButtonLink destination={`/${slug}/add`} className="bg-blue-700">
        Tambah
      </ButtonLink>
      }
      <ButtonLink
        destination={`/${slug}/comparison`}
        className="bg-yellow-700"
      >
        Komparasi
      </ButtonLink>
    </>
  )
}
