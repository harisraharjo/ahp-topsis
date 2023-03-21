"use client"

import type { ReactElement, ReactNode } from "react"
import { useEffect } from "react"
import { useCallback, useState } from "react"

// import { LinkHorizontal } from "@visx/shape"
import { Group } from "../Svg"
import { useTree } from "./useTree"
import type { HierarchyPointLink, HierarchyPointNode } from "d3-hierarchy"
// import { TreeProvider } from "./Provider"
import { usePanelContext } from "~components/(Playground)/PanelProvider"

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
  const redraw = useForceUpdate()

  return (
    <>
      {tree.links().map((link, i) => (
        <Edge
          key={`${link.source.data.id}-${link.target.data.id}-${i}`}
          data={link}
        />
      ))}
      <PanelSubscriber data={tree.data} />
      <Nodes<TreeNode>
        nodes={tree.descendants()}
        Head={Head}
        Descendant={Descendant}
        redraw={redraw}
      />
      {/* <TreeProvider tree={tree}>
      </TreeProvider> */}
      {/* {createPortal(
        <button
          onClick={() => {
            const ada = tree.data
            console.log(ada)
          }}
        >
          Save Me
        </button>,
        document.getElementById("panel") as Element,
      )} */}
    </>
  )
}

type PanelSubscriberProps<T extends TreeNode> = {
  data: T
}
const PanelSubscriber = <T extends TreeNode>({
  data,
}: PanelSubscriberProps<T>) => {
  const [mode] = usePanelContext()

  useEffect(() => {
    console.log("CURRENT MODE:", mode)
    if (mode === "edit") {
      console.log("CURRENT Data:", data)
    }
  }, [mode])

  return null
}

type NodesProps<T extends TreeNode> = Pick<
  TreeProps<T>,
  "Head" | "Descendant"
> & {
  nodes: HierarchyPointNode<T>[]
  redraw: ReturnType<typeof useForceUpdate>
}
const Nodes = <T extends TreeNode>({
  nodes,
  Descendant,
  Head,
  redraw,
}: NodesProps<T>) => {
  return (
    <>
      {nodes.map((node, key) => {
        return (
          <Group top={node.x} left={node.y} key={key}>
            {node.depth === 0 && <Head redraw={redraw} />}
            {node.depth !== 0 && (
              <Descendant redraw={redraw} data={node.data} />
            )}
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
  // TODO: add function to get current data everytime there is an update and append it to global state
  // TODO: add function to edit and add node/nodes and pass it to the dialog

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
