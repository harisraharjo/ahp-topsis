import { MutationDialogTitle } from "./MutationDialogTitle"
import type { PropsWithChildren } from "react"
import { ButtonLink } from "./ButtonLink"
import { selectCriteria } from "~server/db/criteria";


async function getData(id: number) {
  const res = await selectCriteria(id).executeTakeFirst();

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data')
  // }
 
  return res
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
      {/* <ButtonLink destination={`/${id}/edit`} className="bg-red-700">
        Edit
      </ButtonLink> */}
      <ButtonLink
        destination={`/${slug}/comparison`}
        className="bg-yellow-700"
      >
        Komparasi
      </ButtonLink>
    </>
  )
}
