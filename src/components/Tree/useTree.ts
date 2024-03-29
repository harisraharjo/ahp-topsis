"use client"

import type {
  HierarchyNode,
  HierarchyPointNode,
  HierarchyPointLink,
} from "d3-hierarchy"

import { tree as d3Tree } from "d3-hierarchy"
import { useState } from "react"

export type NodeComponentProps<Datum> = { node: HierarchyPointNode<Datum> }
export type LinkComponentProps<Datum> = { link: HierarchyPointLink<Datum> }

export type Accessor<Datum> =
  | ((d: Datum) => Iterable<Datum> | null | undefined)
  | undefined
export type Size = [number, number]
export type NodeSize = [number, number]
export type Separation<Datum> = (
  a: HierarchyPointNode<Datum>,
  b: HierarchyPointNode<Datum>,
) => number

export type UseTreeProps<Datum> = {
  /** The root hierarchy node from which to derive the tree layout. */
  root: HierarchyNode<Datum>
  /**
   * Sets this tree layout’s size to the specified two-element array of numbers `[width, height]`.
   * This is an arbitrary coordinate system, e.g., for a radial layout, a size of `[360, radius]`
   * corresponds to a breadth of 360° and a depth of radius.
   */
  size?: Size
  /**
   * Sets this tree layout’s node size to the specified two-element array of numbers `[width, height]`.
   * If unset, layout size is used instead.  When a node size is specified, the root node is always
   * positioned at `⟨0, 0⟩`.
   */
  nodeSize?: NodeSize
  /**
   * Sets the layout's separation accessor used to determine the separation of neighboring nodes.
   * See https://github.com/d3/d3-hierarchy/blob/master/README.md#tree_separation for more.
   */
  separation?: Separation<Datum>
}

export function useTree<Datum>(
  root: HierarchyNode<Datum>,
  separation?: Separation<Datum>,
  nodeSize?: NodeSize,
  size?: Size,
) {
  const [tree] = useState(() => d3Tree<Datum>())

  size && tree.size(size as [number, number])
  separation &&
    tree.separation(separation as Parameters<(typeof tree)["separation"]>[0])
  nodeSize && tree.nodeSize(nodeSize as [number, number])

  return tree(root)
}
