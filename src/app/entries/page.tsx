import { selectAllCriteria } from "~server/db/criteria"

import { hierarchy } from "d3-hierarchy"
import type { HierarchyNode } from "../(criteria)/Hierarchy"
import { GOAL_ID, constructHierarchy } from "~utils/helper"
import { EntriesTable } from "./EntriesTable"
import topsis2 from "topsis2"
import { Leaderboard } from "./Leaderboard"
import { revalidatePath } from "next/cache"
import { Button } from "~components/ui/button"
import type { HierarchyNode as D3HierarchyNode } from "d3-hierarchy"
import { auth } from "@clerk/nextjs"

function getData() {
  const id = auth().userId
  return (id && selectAllCriteria(id).execute()) || undefined
}

type FieldsNames = Record<string, "">
type Columns = {
  header: string
  accessorKey: string
}[]
type Criteria = { weight: number; type: "cost" | "benefit" }[]

const defaultColumn = { header: "Name", accessorKey: "name" }
export default async function Page() {
  const rawData = await getData(),
    data = constructHierarchy(rawData),
    root = hierarchy<HierarchyNode>(data),
    leaves = root.leaves()

  const columns: Columns = [],
    fieldNames: FieldsNames = {}

  const leavesCount = leaves.length,
    hasEnoughCriteria = leavesCount >= 2

  let criteria: Criteria
  if (hasEnoughCriteria) {
    let i
    for (i = 0; i < leavesCount; i++) {
      const leaf = leaves[i] as D3HierarchyNode<HierarchyNode>
      const name = leaf.data.name,
        compactName = name.replaceAll(" ", "")

      columns.push({ accessorKey: compactName, header: name })
      fieldNames[compactName] = ""
    }
    fieldNames[defaultColumn.accessorKey] = ""
    criteria = collectAncestorsData(leaves)
  }

  let leaderboard: { id: string; name: string }[] = []

  // eslint-disable-next-line @typescript-eslint/require-await
  async function action(formData: FormData) {
    "use server"

    if (!hasEnoughCriteria) return

    const matrix: number[][] = []

    for (const [key, value] of formData.entries()) {
      const noise = key.split("-")

      // somehow nextJS has some "noise" data passed to this formData so we have to filter it
      // @ts-expect-error it's ok
      if (!(noise[1]?.replaceAll(" ", "") in fieldNames)) continue

      const k = Number(noise[0])

      if (!Array.isArray(matrix[k])) {
        matrix[k] = []
        continue
      }

      // @ts-expect-error it's ok
      matrix[k].push(value)
    }

    const rank = topsis2.rank(criteria || [], matrix)
    leaderboard = rank.map(([id, value]) => ({
      id: id!.toString(),
      name: formData.get(`${id}-name`)!.toString(),
      value,
    }))

    revalidatePath("/")
  }

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form action={action}>
        {!hasEnoughCriteria && <h3>Not enough Criteria</h3>}
        <EntriesTable columns={columns} fieldNames={fieldNames} />
        {hasEnoughCriteria && (
          <Button className="border border-slate-50">Calculate</Button>
        )}
      </form>

      {Boolean(leaderboard.length) && (
        <Leaderboard key={Math.random()} data={leaderboard} />
      )}
    </>
  )
}

function collectAncestorsData(criteria: D3HierarchyNode<HierarchyNode>[]) {
  let i
  const length = criteria.length
  const result: Criteria = []
  for (i = 0; i < length; i++) {
    const criterion = criteria[i] as D3HierarchyNode<HierarchyNode>
    const ancestors = traceAncenstors(criterion),
      leaf = ancestors.pop() as Criteria[number]

    const ancestorsWeights = ancestors.reduce(
      (acc, current) => acc + current.weight,
      0,
    )

    leaf.weight += ancestorsWeights
    result.push(leaf)
  }

  return result
}

function traceAncenstors(criterion: D3HierarchyNode<HierarchyNode>) {
  const data = criterion.data
  const result: Criteria[0] = {
    // @ts-expect-error it's ok (fix the type later)
    weight: Number(data.weight),
    type: data.isBenefit ? "benefit" : "cost",
  }

  const greatGrandfather = data.parentId === GOAL_ID

  let ancestorsData: { weight: number; type: "benefit" | "cost" }[]
  if (!greatGrandfather) {
    ancestorsData = traceAncenstors(criterion.parent!)
  }

  return [...(ancestorsData! || []), result]
}
