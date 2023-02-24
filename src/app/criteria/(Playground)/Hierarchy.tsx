"use client"

import { LinkHorizontal } from "@visx/shape"
import type { TreeDescendant, TreeEdge, TreeHead } from "~components"
import { Tree } from "~components"

export type TreeNode = {
  id: number | string
  name: string
  isExpanded?: boolean
  children?: TreeNode[]
  parentId: number | string | null
}

export type LinkTypesProps<T extends TreeNode> = {
  data: T
  height: number
  width: number
}

export const Hierarchy = <T extends TreeNode>({
  data,
  height,
  width,
}: LinkTypesProps<T>) => {
  return (
    <Tree
      height={height}
      width={width}
      data={data}
      Edge={Edge}
      Head={Head}
      Descendant={Descendant}
    />
  )
}

const Edge: TreeEdge = ({ data }) => (
  <LinkHorizontal
    data={data}
    // percent={stepPercent}
    stroke="rgb(254,110,158,0.6)"
    strokeWidth="1"
    fill="none"
  />
)

const Head: TreeHead = ({ redraw }) => {
  return (
    <circle
      r={50}
      fill="url('#links-gradient')"
      onClick={() => {
        // node.data.isExpanded = !Boolean(node.data.isExpanded)
        redraw()
      }}
    />
  )
}

const Descendant: TreeDescendant = ({ data, redraw }) => {
  const width = 50,
    height = width

  return (
    <rect
      // id={`rect-${key}`}
      height={height}
      width={width}
      y={-height / 2}
      x={-width / 2}
      fill="#272b4d"
      stroke={data.children ? "#03c0dc" : "#26deb0"}
      strokeWidth={1}
      strokeDasharray={data.children ? "0" : "2,2"}
      strokeOpacity={data.children ? 1 : 0.6}
      rx={data.children ? 2 : 15}
      onClick={() => {
        // data.isExpanded = !Boolean(data.isExpanded)

        const newData = {
          id: 93,
          parentId: data.id,
          name: "NasionalB",
          scale: null,
          weight: 1.23,
        }

        Array.isArray(data.children)
          ? data.children.push(newData)
          : (data.children = [newData])

        redraw()
      }}
    />
  )
}
