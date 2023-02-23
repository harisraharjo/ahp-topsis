import type { RawQueryValue } from "~server/db/utils"
import { Playground } from "./Playground"
// import { GeoCustom } from "./geo"

type AD = Awaited<RawQueryValue<"Criteria", "update">[]>

type Dat<T extends AD> = T[number]
type Re<T extends AD> = Dat<T> & {
  children?: Re<T>[]
}

const data: AD = [
  { id: 56, parentId: 3, name: "Provinsi", scale: null, weight: 1.53 },
  { id: 81, parentId: 80, name: "Pengetahuan", scale: null, weight: 1.23 },
  { id: 1, parentId: 0, name: "Mata Pelajaran", scale: null, weight: 1.23 },
  { id: 76, parentId: 80, name: "Ketarampilan", scale: null, weight: 1.23 },
  { id: 63, parentId: 3, name: "Kecamatan", scale: null, weight: 1.23 },
  {
    id: 2,
    parentId: 0,
    name: "Sikap",
    scale: { value: ["A", "B", "C", "D"] } as unknown as AD[number]["scale"],
    weight: 1.18,
  },
  { id: 80, parentId: 1, name: "Bahasa Jawa", scale: null, weight: 1.23 },
  { id: 90, parentId: 3, name: "Nasional", scale: null, weight: 1.23 },
  { id: 92, parentId: 3, name: "NasionalA", scale: null, weight: 1.23 },
  { id: 94, parentId: 3, name: "NasionalC", scale: null, weight: 1.23 },
  { id: 95, parentId: 3, name: "NasionalD", scale: null, weight: 1.23 },
  { id: 93, parentId: 3, name: "NasionalB", scale: null, weight: 1.23 },
  { id: 96, parentId: 3, name: "NasionalE", scale: null, weight: 1.23 },
  { id: 97, parentId: 3, name: "NasionalG", scale: null, weight: 1.23 },
  { id: 98, parentId: 3, name: "NasionalH", scale: null, weight: 1.23 },
  { id: 3, parentId: 0, name: "Prestasi", scale: null, weight: 1.23 },
  {
    id: 62,
    parentId: 1,
    name: "Ilmu Pengetahuan Alam",
    scale: null,
    weight: 1.23,
  },
  {
    id: 86,
    parentId: 1,
    name: "Ilmu Pengetahuan Sosial",
    scale: null,
    weight: 1.23,
  },
  {
    id: 87,
    parentId: 62,
    name: "Pengetahuan",
    scale: null,
    weight: 1.23,
  },
  {
    id: 88,
    parentId: 62,
    name: "Keterampilan",
    scale: null,
    weight: 1.23,
  },
  {
    id: 89,
    parentId: 86,
    name: "Pengetahuan",
    scale: null,
    weight: 1.23,
  },
  {
    id: 91,
    parentId: 86,
    name: "Keterampilan",
    scale: null,
    weight: 1.23,
  },
]

// const criterias = selectAllCriteria().execute()
export const Criterias = () => {
  const da = destructure(data)

  return (
    <>
      {/* <GeoCustom height={900} width={900} /> */}
      <Playground data={da} height={900} width={900} />
      {/* {data.map((criteria) => {
        return (
          // <div key={criteria.id}>
          //   {criteria.id}
          //   {criteria.name}
          //   {criteria.parentId}
          // </div>
        )
      })} */}
    </>
  )
}

const destructure = (data: AD) => {
  const idMapping = data.reduce<{ [x in AD[number]["id"]]: number }>(
    (acc, el, i) => {
      acc[el.id] = i

      return acc
    },
    {},
  )

  const baseNodes: AD = []
  data.forEach((el) => {
    // Handle the root element
    if (el.parentId === 0) {
      baseNodes.push(el)
      return
    }

    // Use our mapping to locate the parent element in our data array
    // parentId will never be null because the query is filtered
    const arrayIndex = idMapping[el.parentId as number] as AD[number]["id"]
    const parentEl = data[arrayIndex] as Re<AD>
    // Add our current el to its parent's `children` array
    parentEl.children = [...(parentEl.children || []), el]
  })

  return {
    id: 0,
    parentId: -1,
    name: "Siswa Teladan",
    scale: null,
    weight: 0,
    children: baseNodes,
  }
}
