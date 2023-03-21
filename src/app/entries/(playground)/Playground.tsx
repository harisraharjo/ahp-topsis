import type { RawQueryValue } from "~server/db/utils"

import { Surface } from "./Surface"
import { Hierarchy } from "./Hierarchy"
// import { PropsWithChildren } from "react"
// import { MutationDialogContent } from "./(mutation)/(MutationDialogContent)"

type Criterias = Awaited<RawQueryValue<"Criteria", "update">[]>

// type Accessor = ((d: TreeNode) => Iterable<TreeNode> | null | undefined) | undefined

const structure = {
  height: 900,
  width: 900,
  margin: { top: 20, left: 30, right: 30, bottom: 20 },
} as const

// const criterias = selectAllCriteria().execute()
export const Playground = () => {
  console.log("QRUI:")
  const criteriasTree = destructure(dummyData)

  return (
    <>
      <Surface
        height={900}
        width={900}
        // dialogContent={<MutationDialogContent />}
      >
        <Hierarchy
          width={
            structure.width - structure.margin.left - structure.margin.right
          }
          height={
            structure.height - structure.margin.top - structure.margin.bottom
          }
          data={criteriasTree}
        />
      </Surface>
    </>
  )
}

type Id = string | number
type Document = { id: Id; parentId: Id | null; name: string }
type Node<T extends Document> = Document & { children?: Node<T>[] }

function destructure<Data extends Document[]>(
  data: Data,
  goal = "Siswa Teladan",
): Node<{
  id: 0
  parentId: -1
  name: string
  children: Node<Data[number]>[]
}> {
  type IDMap = Record<Document["id"], number>
  const idMapping = data.reduce((acc, el, i) => {
    acc[el.id] = i

    return acc
  }, {} as IDMap)

  const descendants = [] as Node<Data[number]>[]
  data.forEach((el) => {
    // Handle the root element
    if (el.parentId === 0) {
      descendants.push(el)
      //continue
      return
    }

    // Use our mapping to locate the parent element in our data array
    // parentId will never be null because the query is filtered
    const arrayIndex = idMapping[el.parentId as Id] as number
    const parentEl = data[arrayIndex] as Node<Data[number]>
    // Add our current el to its parent's `children` array
    parentEl.children = [...(parentEl.children || []), el]
  })

  return {
    id: 0,
    parentId: -1,
    name: goal,
    children: descendants,
  }
}

const dummyData: Criterias = [
  { id: 56, parentId: 3, name: "Provinsi", scale: null, weight: 1.53 },
  { id: 81, parentId: 80, name: "Pengetahuan", scale: null, weight: 1.23 },
  { id: 1, parentId: 0, name: "Mata Pelajaran", scale: null, weight: 1.23 },
  { id: 76, parentId: 80, name: "Ketarampilan", scale: null, weight: 1.23 },
  { id: 63, parentId: 3, name: "Kecamatan", scale: null, weight: 1.23 },
  {
    id: 2,
    parentId: 0,
    name: "Sikap",
    scale: {
      value: ["A", "B", "C", "D"],
    } as unknown as Criterias[number]["scale"],
    weight: 1.18,
  },
  { id: 80, parentId: 1, name: "Bahasa Jawa", scale: null, weight: 1.23 },
  { id: 90, parentId: 3, name: "Nasional", scale: null, weight: 1.23 },
  { id: 92, parentId: 3, name: "NasionalA", scale: null, weight: 1.23 },
  { id: 94, parentId: 3, name: "NasionalC", scale: null, weight: 1.23 },
  { id: 95, parentId: 3, name: "NasionalD", scale: null, weight: 1.23 },
  // { id: 93, parentId: 3, name: "NasionalB", scale: null, weight: 1.23 },
  // { id: 96, parentId: 3, name: "NasionalE", scale: null, weight: 1.23 },
  // { id: 97, parentId: 3, name: "NasionalG", scale: null, weight: 1.23 },
  // { id: 98, parentId: 3, name: "NasionalH", scale: null, weight: 1.23 },
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
