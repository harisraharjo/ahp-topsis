import { array, ones } from "vectorious"
import { Comparator, type TableData } from "./Comparator"
import { getSiblings, updateCriteria } from "~server/db/criteria"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { Button } from "~components/ui/button"
import { auth } from "@clerk/nextjs"
import type { DynamicRoutesProps } from "../layout"
import { ButtonLink } from "~components/ButtonLink"

function getData(id: number): Promise<
  {
    id: number
    name: string
    parentId: number | null
    weight: string
    isBenefit: 0 | 1
  }[]
> {
  return getSiblings(id, auth().userId!).execute()
}

export default async function Page({ params }: DynamicRoutesProps) {
  const parentId = params.slug.split("-")[1]

  const siblings = await getData(Number(parentId)),
    hasEnoughCriteria = siblings.length >= 2

  let message: "" | "Not Consistent" = ""

  let tableData: TableData[]

  if (hasEnoughCriteria) {
    const preprocessedData = siblings.map(({ id, name }) => ({
      id,
      name,
    }))

    tableData = siblings
      .map((d) => {
        const result: TableData[] = []
        preprocessedData.shift()
        preprocessedData.forEach((cd) => {
          result.push({
            id: `${d.id}`,
            compareTo: `${d.name} -> ${cd.name}`,
            scale: 1,
          })
        })

        return result
      })
      .flat()
  }

  async function action(formData: FormData) {
    "use server"

    const result = await calculateAHP(formData, siblings)

    if (result) {
      message = ""
      revalidatePath(`/`)
      redirect("/")
    } else {
      revalidatePath(`/`)
      message = "Not Consistent"
    }
  }

  return (
    <div className="max-h-80 overflow-auto rounded-md border">
      {hasEnoughCriteria && (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <form action={action}>
          <Comparator data={tableData! || []}>
            <Button variant="default" className="mb-2 ml-1 border">
              Calculate
            </Button>
          </Comparator>
          {Boolean(message) && <h3 className="text-slate-50">{message}</h3>}
        </form>
      )}
      {!hasEnoughCriteria && (
        <div className="p-3">
          <h3>At least 2 criteria are required</h3>
          <ButtonLink destination="/">Add Criteria</ButtonLink>
        </div>
      )}
    </div>
  )
}

const RI = [0, 0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49] as const

type RawData = {
  id: number
  name: string
  parentId: number | null
  weight: string
  isBenefit: 0 | 1
}[]
// eslint-disable-next-line @typescript-eslint/require-await
export async function calculateAHP(
  formData: FormData,
  raw_data: RawData,
): Promise<boolean> {
  const degree = raw_data.length
  if (degree <= 1) return false

  const { matrix, colsSum } = constructMatrix(formData, degree)

  const rawPV = new Array<number>(degree).fill(0)
  let x, y
  for (x = 0; x < degree; x++) {
    const row = matrix.slice(x, x + 1)
    for (y = 0; y < degree; y++) {
      row.data[y] /= colsSum[y] as number
      rawPV[x] += row.data[y] as number
    }
  }

  const totalRawPV = rawPV.reduce((acc, value) => acc + value, 0)
  const pV = rawPV.map((val) => val / totalRawPV)

  let isSuccess = true

  if (degree > 2) {
    const lambdaMax = array(pV).dot(array(colsSum))
    const degreeMinusOne = degree - 1
    const CI = (lambdaMax - degree) / degreeMinusOne
    const CR = CI / (RI[degreeMinusOne] as number)
    isSuccess = CR < 0.1
  }

  if (isSuccess) {
    await Promise.all(
      raw_data.map((v, i) =>
        updateCriteria({ id: v.id, weight: pV[i] }).execute(),
      ),
    )
  }

  return isSuccess
}

function constructMatrix(formData: FormData, degree: number) {
  const matrix = ones(degree, degree)
  const columns = degree,
    rows = degree

  const formDataValues = formData.values()
  const colsSum = new Array<number>(degree).fill(0)
  let x, y
  for (x = 0; x < rows; x++) {
    const row = matrix.slice(x, x + 1)
    for (y = 0; y < columns; y++) {
      // upper triangle
      if (x < y) {
        row.data[y] = formDataValues.next().value as number
      }

      // lower
      if (x > y) {
        const denominator = matrix.slice(y, y + 1).data[x] as number
        row.data[y] = 1 / denominator
      }

      colsSum[y] += row.data[y] as number
    }
  }

  return { matrix, colsSum }
}
