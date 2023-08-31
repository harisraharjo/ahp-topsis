"use client"

import { type Document, type TreeProps, Nodes } from "~components/Tree"
import { useTree } from "~components/Tree/useTree"

import { useState } from "react"

import { hierarchy } from "d3-hierarchy"
import { createEdge } from "./Edges"

export type HierarchyNode = Document & {
  children?: HierarchyNode[]
}

type HierarchyProps<T extends HierarchyNode> = Pick<
  TreeProps<Document, T>,
  "data"
>

export const Hierarchy = <T extends HierarchyNode>({
  data,
}: HierarchyProps<T>) => {
  const [root] = useState(() =>
    hierarchy<HierarchyNode>(data, (d) =>
      d.parentId === null ? null : d.children,
    ),
  )

  const tree = useTree<HierarchyNode>(
    root,
    (a, b) => {
      return a.parent === b.parent ? 1 : 1.25
    },
    [100, 100],
  )

  const edge = createEdge()

  return (
    <>
      {tree.links().map((data, i) => (
        <path
          className="translate-x-1/2 translate-y-[13%]"
          key={`${data.source.data.id}-${data.target.data.id}-${i}`}
          // @ts-expect-error wrong types from @types/d3-shape
          d={edge(data) as string}
          stroke="rgb(254,110,158,0.6)"
          strokeWidth="1"
          fill="none"
        />
      ))}
      <Nodes<Document, HierarchyNode> nodes={tree.descendants()} />
    </>
  )
}
