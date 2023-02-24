"use client"

import type { ReactElement, ReactNode } from "react"
import { useCallback, useState } from "react"

// import { LinkHorizontal } from "@visx/shape"
import { Group } from "../Svg"
import { useTree } from "./useTree"
import type { HierarchyPointLink } from "d3-hierarchy"

export type TreeNode = {
  id: number | string
  name: string
  isExpanded?: boolean
  children?: TreeNode[]
  parentId: number | string | null
}

export type TreeEdge = <T extends TreeNode>(props: {
  data: HierarchyPointLink<T>
}) => ReactElement
export type TreeHead = (props: {
  redraw: ReturnType<typeof useForceUpdate>
}) => ReactElement
export type TreeDescendant = <T extends TreeNode>(props: {
  redraw: ReturnType<typeof useForceUpdate>
  data: T
}) => ReactElement

export type TreeProps<T extends TreeNode> = {
  data: T
  height: number
  width: number
  Edge: TreeEdge
  Head: TreeHead
  Descendant: TreeDescendant
}

export const Tree = <T extends TreeNode>({
  data,
  height,
  width,
  Edge,
  Head,
  Descendant,
}: TreeProps<T>) => {
  // const [layout, setLayout] = useState<string>("cartesian")
  // const [orientation, setOrientation] = useState<string>("horizontal")
  // const [linkType, setLinkType] = useState<string>("diagonal")
  // const [stepPercent, setStepPercent] = useState<number>(0.5)
  const redraw = useForceUpdate()

  // if (orientation === "vertical") {
  //   sizeWidth = width
  //   sizeHeight = height
  // } else {
  // }

  // const LinkComponent = getLinkComponent({ layout, linkType, orientation })

  const tree = useTree<TreeNode>(
    data,
    (d) => (d.isExpanded ? null : d.children),
    [width, height],
    (a, b) => (a.parent === b.parent ? 1 : 0.5),
  )

  return (
    <>
      {tree.links().map((link, i) => (
        <Edge
          key={`${link.source.data.id}-${link.target.data.id}-${i}`}
          data={link}
        />
      ))}
      {tree.descendants().map((node, key) => {
        return (
          <Group top={node.x} left={node.y} key={key}>
            {node.depth === 0 && <Head redraw={redraw} />}
            {node.depth !== 0 && (
              <Descendant redraw={redraw} data={node.data} />
            )}
            {/* <g>
                    <rect height="10" width="10" fill="red" />
                    <text>Add</text>
                  </g> */}
            {/* <button>Add</button> */}
            <Text depth={node.depth} child={Boolean(node.children)}>
              {node.data.name}
            </Text>
          </Group>
        )
      })}
    </>
  )
}

function useForceUpdate() {
  const [, setValue] = useState<boolean>(false)

  return useCallback(() => {
    setValue((prev) => !prev)
  }, [])
}

const Text = ({
  depth,
  child,
  children,
}: {
  depth: number
  child: boolean
  children: ReactNode
}) => (
  <text
    dy=".33em"
    fontSize={9}
    fontFamily="Arial"
    textAnchor="middle"
    style={{ pointerEvents: "none" }}
    fill={depth === 0 ? "#71248e" : child ? "white" : "#26deb0"}
  >
    {children}
  </text>
)
