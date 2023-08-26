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

  return (
    <>
      <div>Name: {data?.name}</div>
      <div>Weight: {data?.weight}</div>
      <div className="mb-2">Type: {data?.isBenefit ? "Benefit":"Cost"}</div>

      <ButtonLink destination={`/${slug}/add`}>
        Add
      </ButtonLink>
      <ButtonLink destination={`/${slug}/comparison`}>
        Compare
      </ButtonLink>
    </>
  )
}
