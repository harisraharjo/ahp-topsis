"use client"

import { LinearGradient } from "@visx/gradient"
import Link from "next/link"

import type { RequiredProps, TreeNode, TreeProps } from "~components"
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

  // console.log("THE HIE: ", root)
  const tree = useTree<HierarchyNode>(
    root,
    (a, b) => {
      return a.parent === b.parent ? 1 : 1.25
    },
    [100, 100],
  )
  // console.log("THE Tree: ", tree)

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
        // <Edge
        //   key={`${data.source.data.id}-${data.target.data.id}-${i}`}
        //   data={data}
        // />
      ))}
      <Nodes<Document, HierarchyNode> nodes={tree.descendants()} Node={Node} />
      <HierarchyContextProvider value={{ tree, redraw }}>
        {children}
      </HierarchyContextProvider>
    </>
  )
}

const Node: TreeNode = ({ data, depth }) => {
  const isFixedNode = depth <= 1
  const isHead = depth === 0

  return (
    <Link href={`/entries/${data.id}`}>
      {isHead && <Head />}
      {!isHead && <Descendant hasChild={Boolean(data.children)} />}
    </Link>
  )
}

const Head = () => {
  return (
    <>
      <LinearGradient id="links-gradient" from="#fd9b93" to="#fe6e9e" />
      <circle r={50} fill="url('#links-gradient')" />
    </>
  )
}

const Descendant = ({ hasChild }: { hasChild: boolean }) => {
  const width = 50,
    height = width

  return (
    // <Link
    //   href={{
    //     pathname: `/entries/${data.id}`,
    //     query: {
    //       depth,

    //     }
    //   }}
    //   scroll={false}
    // >
    <rect
      height={height}
      width={width}
      y={-height / 2}
      x={-width / 2}
      fill="#272b4d"
      stroke={hasChild ? "#03c0dc" : "#26deb0"}
      strokeWidth={1}
      strokeDasharray={hasChild ? "0" : "2,2"}
      strokeOpacity={hasChild ? 1 : 0.6}
      rx={hasChild ? 2 : 15}
      onClick={() => {
        // context?.openDialog("add", (d) => {
        //   console.log(d)
        // })
        // TODO: Add middleware to purify data passed from dialog
        // TODO: flow: <rect/> pass callback to dialog -> dialog pass the string or data to middleware -> middleware purify the input and execute the callback with purified data
        // TODO: Even better: <rect/> doesn't know about the logic and only know to open the dialog. So DialogPRovider -> Tree -> TreeProvider -> <rect/>
        // data.isExpanded = !Boolean(data.isExpanded)
        // const newData = {
        //   id: 93,
        //   parentId: data.id,
        //   name: "NasionalB",
        //   scale: null,
        //   weight: 1.23,
        // }
        // Array.isArray(data.children)
        //   ? data.children.push(newData)
        //   : (data.children = [newData])
        // redraw()
      }}
    />
    // </Link>
  )
}

// function useForceUpdate() {
//   const [, setValue] = useState<boolean>(false)
//   // TODO: add function to get current data everytime there is an update and append it to global state
//   // TODO: add function to edit and add node/nodes and pass it to the dialog

//   return useCallback(() => {
//     setValue((prev) => !prev)
//   }, [])
// }
