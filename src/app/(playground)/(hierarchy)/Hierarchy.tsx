"use client"

import type { RequiredProps, TreeProps } from "~components"
import { Nodes, useTree } from "~components"

import { HierarchyContextProvider } from "./Provider"
import type { PropsWithChildren } from "react"
import { useState } from "react"

import { hierarchy } from "d3-hierarchy"
import { createEdge } from "./Edges"

export type Document = RequiredProps
export type HierarchyNode = Document & {
  children?: HierarchyNode[]
}

type HierarchyProps<T extends HierarchyNode> = PropsWithChildren<
  Omit<TreeProps<Document, T>, "Edge" | "Node">
>

export const Hierarchy = <T extends HierarchyNode>({
  data,
  children,
}: HierarchyProps<T>) => {

  const [root] = useState(() =>
    hierarchy<HierarchyNode>(data, (d) =>
      d.parentId === null ? null : d.children,
    ),
  )
  // console.log("COUNT: ", root.count())
  // console.log("LEAVES: ", root.leaves())
  

  // console.log("THE HIE: ", root)
  const tree = useTree<HierarchyNode>(
    root,
    (a, b) => {
      return a.parent === b.parent ? 1 : 1.25
    },
    [100, 100],
  )

  const [, setfirst] = useState(false) //useForceUpdate()
  const redraw = () => setfirst((prev) => !prev)
  const edge = createEdge()

  return (
    <>
      {tree.links().map((data, i) => (
        <path
          key={`${data.source.data.id}-${data.target.data.id}-${i}`}
          // @ts-expect-error wrong types from @types/d3-shape
          d={edge(data) as string}
          stroke="rgb(254,110,158,0.6)"
          strokeWidth="1"
          fill="none"
        />
      ))}
      <Nodes<Document, HierarchyNode> nodes={tree.descendants()}/>
      <HierarchyContextProvider value={{ tree, redraw }}>
        {children}
      </HierarchyContextProvider>
    </>
  )
}

