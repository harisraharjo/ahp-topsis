export class Topsis {
  public static rank(criteria: CriteriaAttribute[], matrix: number[][]) {
    // Validating decision matrix args

    if (!Array.isArray(matrix)) {
      throw TypeError(`The matrix argument must be an array of numbers`)
    }

    if (!matrix.every((row) => row.length === criteria.length)) {
      throw TypeError(
        `The column length of the matrix must be equal to ${criteria.length}`,
      )
    }

    if (matrix.length === 0) {
      return []
    }

    const n = matrix.length
    const m = matrix[0]!.length

    // Calculating normalized decision matrix

    const normalizedMatrix = new Array(n)
      .fill(null)
      .map(() => new Array<number>(m).fill(0))

    for (let j = 0; j < m; j++) {
      const denominator = Math.sqrt(
        new Array(n)
          .fill(0)
          .map((_, i) => Math.pow(matrix[i]![j]!, 2))
          .reduce((p, c) => p + c, 0),
      )

      for (let i = 0; i < n; i++) {
        normalizedMatrix[i]![j] = matrix[i]![j]! / denominator
      }
    }

    // Calculating weighted normalized decision matrix

    const weightedNormalizedMatrix: number[][] = new Array(n)
      .fill(null)
      .map((_, i) =>
        new Array(m)
          .fill(null)
          .map((_, j) => normalizedMatrix[i]![j]! * criteria[j]!.weight),
      )

    // Computing positive ideal solution matrix

    const positiveIdealSolutionMatrix = new Array(m)
      .fill(null)
      .map((_, j) =>
        Math[criteria[j]!.type !== "cost" ? "max" : "min"](
          ...(weightedNormalizedMatrix.map((rows) => rows[j]) as number[]),
        ),
      )

    // Computing negative ideal solution matrix

    const negativeIdealSolutionMatrix = new Array(m)
      .fill(null)
      .map((_, j) =>
        Math[criteria[j]!.type !== "cost" ? "min" : "max"](
          ...(weightedNormalizedMatrix.map((rows) => rows[j]) as number[]),
        ),
      )
    // Calculating alternative distance to positive ideal solution matrix

    const distancePositiveMatrix = new Array(n).fill(null).map((_, i) =>
      Math.sqrt(
        new Array(m)
          .fill(null)
          .map((_, j) =>
            Math.pow(
              weightedNormalizedMatrix[i]![j]! -
                positiveIdealSolutionMatrix[j]!,
              2,
            ),
          )
          .reduce((p, c) => p + c, 0),
      ),
    )

    // Calculating alternative distance to negative ideal solution matrix

    const distanceNegativeMatrix = new Array(n).fill(null).map((_, i) =>
      Math.sqrt(
        new Array(m)
          .fill(null)
          .map((_, j) =>
            Math.pow(
              weightedNormalizedMatrix[i]![j]! -
                negativeIdealSolutionMatrix[j]!,
              2,
            ),
          )
          .reduce((p, c) => p + c, 0),
      ),
    )

    // Calculating relative closeness to the ideal solution for each alternative

    const preferenceValues = new Array(n)
      .fill(null)
      .map(
        (_, i) =>
          distanceNegativeMatrix[i]! /
          (distanceNegativeMatrix[i]! + distancePositiveMatrix[i]!),
      )

    // Assigning preference value with alternatives index and sort by largest value

    const indexedPreferenceValues = preferenceValues.map((v, i) => [i, v])

    // Sorting alternatives by largest it's preference value

    const rankedAlternatives = indexedPreferenceValues.sort(
      ([, a], [, b]) => b! - a!,
    )

    return rankedAlternatives
  }

  public static best(criteria: CriteriaAttribute[], matrix: number[][]) {
    const ranked = this.rank(criteria, matrix)
    return ranked.length ? ranked[0] : null
  }

  public criteria: CriteriaAttribute[]

  constructor(criteria: CriteriaAttribute[]) {
    this.criteria = criteria
  }

  public rank(matrix: number[][]) {
    return Topsis.rank(this.criteria, matrix)
  }

  public best(matrix: number[][]) {
    return Topsis.best(this.criteria, matrix)
  }
}

export type CriteriaAttribute = {
  name?: string
  weight: number
  type?: "benefit" | "cost"
}
