import type { Link } from "d3-shape"
import { linkVertical } from "d3-shape"

function createEdge() {
  const edge = linkVertical()
  edge.x(getX)
  edge.y(getY)
  // edge.source(getSource)
  // edge.target(getTarget)

  return edge
}

export function getX(l?: { x?: unknown }) {
  return typeof l?.x === "number" ? l.x : 0
}

export function getY(l?: { y?: unknown }) {
  return typeof l?.y === "number" ? l.y : 0
}

export function getSource<This, LinkDatum, NodeDatum>(
  l: Parameters<Link<This, LinkDatum, NodeDatum>["source"]>[0],
) {
  return l?.source
}

export function getTarget(l: any) {
  return l?.target
}
