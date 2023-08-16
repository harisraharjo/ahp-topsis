import { selectAllCriteria } from "~server/db/criteria";

import { hierarchy } from "d3-hierarchy";
import type { HierarchyNode } from "./entries/(playground)/(hierarchy)/Hierarchy";
import { constructHierarchy } from "~utils/helper";
import { EntriesTable } from "./EntriesTable";
import topsis2 from "topsis2"
import { Leaderboard } from "./Leaderboard";
import { revalidatePath } from "next/cache";

function getData() {
  return selectAllCriteria().execute();
}

let leaderboard: {id: string, name:string}[] = []

const defaultColumns = [{ header: "Nama Siswa", accessorKey: "name" }];
export default async function Page() {
  const data = await getData()
  const das = constructHierarchy(data)
  const root = hierarchy<HierarchyNode>(das)

  const leavesColumns = [defaultColumns[0]]
  root.children!.forEach((node) => {
    const name = node.data.name
    const result: {
      header: string, accessorKey?: string, columns?: { header: string, accessorKey: string }[]
    } = {
      header: name,
      accessorKey: name.replaceAll(" ", ""),
    }
    
    const subNode = node.children
    if (subNode) {
      result.accessorKey = undefined;
      const subNodeData:{
        header: string, accessorKey: string
      }[] = []
      
      subNode.forEach((sNode) => {
        const name = sNode.data.name
        subNodeData.push({header: name, accessorKey: name.replaceAll(" ", "")})
      })

      result["columns"] = subNodeData
    }

    // @ts-expect-error it's ok
    leavesColumns.push(result)
  })

  const leaves = root.leaves()
  const fieldNames = leaves.reduce((acc, leaf) => {
    const property = leaf.data.name.replaceAll(" ", "");
    // @ts-expect-error it's ok
    acc[property] = "";
    
    return acc
  }, {});

  // @ts-expect-error it's ok
  fieldNames["name"] = ""

  const totalWeight: {weight: number, type: "cost" | "benefit"}[] = leaves.map(leaf => {
    // @ts-expect-error it's ok
    const myWeight = Number(leaf.data.weight);

    const type: "cost" | "benefit" = leaf.data.isBenefit ? "benefit" : "cost";
    if (leaf.data.parentId === 0) {
      return {weight: myWeight, type}
    }

    // @ts-expect-error it's ok
    const parentWeight = Number(leaf.parent!.data.weight)
    
    const zero = myWeight * parentWeight
    if (zero) { 
      return {weight: (myWeight + parentWeight), type}
    }
    
     return {weight: 0, type}
    })

  // eslint-disable-next-line @typescript-eslint/require-await
  async function action(formData: FormData) {
    "use server"


    const matrix: number[][] = []
    // let counter = 0;
    for (const [key, value] of formData.entries()) {
      const spl = key.split("-");
      // @ts-expect-error it's ok
      if (!(spl[1]?.replaceAll(" ", "") in fieldNames)) continue;

      const k = Number(spl[0]);
      
      if (!Array.isArray(matrix[k])) {
        matrix[k] = []
        continue;
      }
    
      // @ts-expect-error it's ok
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      matrix[k].push(value);
      }
    
    const rank = topsis2.rank(totalWeight, matrix);//.sort((a,b) => b-a);
    leaderboard = rank.map(([id, value]) => ({id: id!.toString(), name: formData.get(`${id}-name`)!.toString(), value}))


    revalidatePath("/")
  }


  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form action={action}>
      {/* @ts-expect-error it's ok */}
        <EntriesTable columns={leavesColumns} fieldNames={fieldNames} />
      </form>
      <Leaderboard key={Math.random()} data={leaderboard}/>
    </>
  )
}
