import { linkVertical } from "d3-shape"

export function getX(l?: { x?: unknown }) {
  return typeof l?.x === "number" ? l.x : 0
}

export function getY(l?: { y?: unknown }) {
  return typeof l?.y === "number" ? l.y : 0
}

export function createEdge() {
  const edge = linkVertical()
  // @ts-expect-error wrong types from @types/d3-shape
  edge.x((l) => (typeof l?.x === "number" ? l.x : 0) as number)
  // @ts-expect-error wrong types from @types/d3-shape
  edge.y((l) => (typeof l?.y === "number" ? l.y : 0) as number)
  return edge
}
