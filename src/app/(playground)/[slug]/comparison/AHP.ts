"use server"

import { array, ones } from "vectorious";


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
export async function ff(formData: FormData, length: number): Promise<{isSuccess: boolean, pV: number[]}> {
    
    const { matrix, colsSum } = constructMatrix(formData, length)
    
    //Priority Vector (PV)
    const degree = colsSum.length;
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
    
    const lambdaMax = array(pV).dot(array(colsSum))

    const degreeMinusOne = degree - 1
    const CI = (lambdaMax - degree) / (degreeMinusOne);
    const CR = CI / (RI[degreeMinusOne] as number);

    console.log("Lambda Max: ", lambdaMax)
    console.log("CI: ", CI)
    console.log("CR: ", CR)

    return {
        isSuccess: CR < 0.1 ? true : false,
        pV: CR < 0.1 ? [] : pV
    }


//   cookies.set({
    
//   })
//   redirect(`/entries`)
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
