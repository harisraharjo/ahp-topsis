import type { PropsWithChildren } from "react"

import { array, ones } from "vectorious";
import { MutationDialogTitle } from "../MutationDialogTitle"
import { Comparator, type TableData } from "./Comparator"
import { selectAllCriteria, updateCriteria } from "~server/db/criteria"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { updateRow } from "~server/db/query/utils";

function getData(id: number): Promise<{
    id: number;
    name: string;
    parentId: number | null;
    weight: string;
    isBenefit: 0 | 1;
}[]> {
  return selectAllCriteria().where("parentId", "=", id).execute()
}

let message = ""
type LayoutProps = PropsWithChildren<{ params: { slug: `${string}-${string}-${string}` } }>
export default async function Layout({ children, params }: LayoutProps) {
  const [, parentId] = params.slug.split("-")

  const siblings = await getData(parseInt(parentId!));
  
  async function action(formData: FormData) {
    "use server"

    const result = await calculateAHP(formData, siblings.length, siblings)

    if (result) {
      message = "";
      revalidatePath(`/entries`)
      redirect("/entries")
    } else {
      revalidatePath(`/entries`)
      message = "Tidak Konsisten"
    }

  }

  const temp_data = siblings.map(({id,name}) => ({
    id,
    name,
  }))
  
  const tableData = siblings
    .map((d) => {
      const result: TableData[] = []
      temp_data.shift()
      temp_data.forEach((cd) => {
        result.push({
          id: `${d.id}`,
          compareTo: `${d.name} terhadap ${cd.name}`,
          scale: 1,
        })
      })

      return result
    })
    .flat()

  return (
    <>
      <MutationDialogTitle type="komparasi" />
      <div className="max-h-80 overflow-auto rounded-md border">
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form action={action}>
          <Comparator data={tableData} />
          {message}
        </form>
      </div>
        {children}
    </>
  )
}



const RI = [
    0,
  0,
  0.58,
  0.9,
  1.12,
  1.24,
  1.32,
  1.41,
  1.45,
  1.49,
] as const

// eslint-disable-next-line @typescript-eslint/require-await
export async function calculateAHP(formData: FormData, degree: number, raw_data: {
    id: number;
    name: string;
    parentId: number | null;
    weight: string;
    isBenefit:  0 | 1;
}[]): Promise<boolean> {

  if (degree <= 1) return false
    
  const { matrix, colsSum } = constructMatrix(formData, degree)

  //Priority Vector (PV)
  const rawPV = new Array<number>(degree).fill(0)
    let x, y;
    for (x = 0; x < degree; x++) {
        const row = matrix.slice(x, x + 1);
        for (y = 0; y < degree; y++) { 
          row.data[y] /= colsSum[y] as number
          
          rawPV[x] += row.data[y] as number 
        }
      }
      
    const totalRawPV = rawPV.reduce((acc, value) => (acc + value), 0)
    const pV = rawPV.map((val) => val / totalRawPV)
    
    let isSuccess = true
  
    if (degree > 2) {
      const lambdaMax = array(pV).dot(array(colsSum))

      const degreeMinusOne = degree - 1
      const CI = (lambdaMax - degree) / (degreeMinusOne);
      const CR = CI / (RI[degreeMinusOne] as number);

    console.log("Lambda Max: ", lambdaMax)
    console.log("CI: ", CI)
    console.log("CR: ", CR)
      isSuccess = CR < 0.1;
    }
  

  if (isSuccess) {  
    const updatedData = raw_data.map((v, i) => ({ id: v.id, weight: pV[i] }));
    await Promise.all(updatedData.map((value) => updateCriteria(value).execute()))
  }

  return isSuccess
}

function constructMatrix(formData: FormData, degree: number) {
    const matrix = ones(degree, degree)
    const columns = degree, rows = degree
    
    
    const formDataValues = formData.values()
    const colsSum = new Array<number>(degree).fill(0)
    let x, y;
    for (x = 0; x < rows; x++) {
        const row = matrix.slice(x, x + 1);
        for (y = 0; y < columns; y++) {
            
            // upper triangle
            if (x < y) {
                row.data[y] = (formDataValues.next().value as number)
            }
            
            // lower
            if (x > y ) {
                const pembagi = matrix.slice(y, y+1).data[x] as number
                row.data[y] = 1 / (pembagi)
            }

            colsSum[y] += row.data[y] as number
        }
    }

  return {matrix, colsSum}
}
