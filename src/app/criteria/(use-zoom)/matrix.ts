import type { TransformMatrix, Point, IdentityMatrix } from "./types"

export function identityMatrix(): IdentityMatrix {
  return {
    scaleX: 1,
    scaleY: 1,
    x: 0,
    y: 0,
    skewX: 0,
    skewY: 0,
  }
}

export function createMatrix({
  scaleX = 1,
  scaleY = 1,
  x = 0,
  y = 0,
  skewX = 0,
  skewY = 0,
}: Partial<TransformMatrix | IdentityMatrix>): TransformMatrix {
  return {
    scaleX,
    scaleY,
    x,
    y,
    skewX,
    skewY,
  }
}

export function inverseMatrix({
  scaleX,
  scaleY,
  x,
  y,
  skewX,
  skewY,
}: TransformMatrix) {
  const denominator = scaleX * scaleY - skewY * skewX
  return {
    scaleX: scaleY / denominator,
    scaleY: scaleX / denominator,
    x: (scaleY * x - skewX * y) / -denominator,
    y: (skewY * x - scaleX * y) / denominator,
    skewX: skewX / -denominator,
    skewY: skewY / -denominator,
  }
}

/**
 * @public
 *
 * Applies the current transform matrix to the specified point.
 *
 * @param {TransformMatrix} matrix - transform matrix value
 * @param {Point} point - target area
 */
export function applyMatrixToPoint(
  matrix: TransformMatrix,
  { x, y }: Point,
): Point {
  return {
    x: matrix.scaleX * x + matrix.skewX * y + matrix.x,
    y: matrix.skewY * x + matrix.scaleY * y + matrix.y,
  }
}

/**
 * @public
 *
 * Applies the inverse of the current transform matrix to the specified point.
 *
 * @param {TransformMatrix} matrix - transform matrix value
 * @param {Point} point - target area
 */
export function applyInverseMatrixToPoint(
  matrix: TransformMatrix,
  point: Point,
): Point {
  return applyMatrixToPoint(inverseMatrix(matrix), point)
}

export function scaleMatrix(
  scaleX: TransformMatrix["scaleX"],
  maybeScaleY: TransformMatrix["scaleY"] | undefined = undefined,
) {
  const scaleY = maybeScaleY || scaleX
  return createMatrix({ scaleX, scaleY })
}

export function translateMatrix(
  x: TransformMatrix["x"],
  y: TransformMatrix["y"],
) {
  return createMatrix({ x, y })
}

export function multiplyMatrices(
  matrix1: TransformMatrix,
  matrix2: TransformMatrix,
) {
  return {
    scaleX: matrix1.scaleX * matrix2.scaleX + matrix1.skewX * matrix2.skewY,
    scaleY: matrix1.skewY * matrix2.skewX + matrix1.scaleY * matrix2.scaleY,
    x: matrix1.scaleX * matrix2.x + matrix1.skewX * matrix2.y + matrix1.x,
    y: matrix1.skewY * matrix2.x + matrix1.scaleY * matrix2.y + matrix1.y,
    skewX: matrix1.scaleX * matrix2.skewX + matrix1.skewX * matrix2.scaleY,
    skewY: matrix1.skewY * matrix2.scaleX + matrix1.scaleY * matrix2.skewY,
  }
}
type NonEmptyArray<T> = [T, ...T[]]
export function composeMatrices(
  ...matrices: NonEmptyArray<TransformMatrix>
): TransformMatrix {
  if (!matrices[1]) return matrices[0]

  const [matrix1, matrix2, ...restMatrices] = matrices
  const matrix = multiplyMatrices(matrix1, matrix2)
  matrices.length = 0

  return restMatrices.length ? composeMatrices(matrix, ...restMatrices) : matrix
}
