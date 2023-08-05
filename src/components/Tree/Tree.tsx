"use client"

import type { ReactElement, ReactNode } from "react"
// import { useEffect } from "react"
import { useCallback, useState } from "react"

// import { LinkHorizontal } from "@visx/shape"
import { Group } from "../Svg"
// import type { Accessor } from "./useTree"
// import { useTree } from "./useTree"
import type { HierarchyPointLink, HierarchyPointNode } from "d3-hierarchy"
// import { hierarchy } from "d3-hierarchy"

// import { usePanelContext } from "~components/(Playground)/PanelProvider"

// export type NodeWithChildren<T extends Generic,D extends RequiredProps> = {
//   children?: T<D>[]
// }

export type Id = number | string
export type RequiredProps = {
  id: number | string
  name: string
  parentId: Id | null
}
export type TreeNodeData<Node extends RequiredProps> = Node & {
  isExpanded?: boolean
} & {
  children?: TreeNodeData<Node>[]
}
// type A = {speed: number, id: number | string
//   name: string
//   parentId: Id | null}

// const am: TreeNodeData<A> = {
//   id:1,name:"D",parentId: 1, speed: 44, isExpanded: false, children: [{}]
// }

export type TreeEdge = <
  Node extends RequiredProps,
  T extends TreeNodeData<Node>,
>(props: {
  data: HierarchyPointLink<T>
}) => ReactElement

// export type TreeHead = <
//   Node extends RequiredProps,
//   Data extends TreeNodeData<Node>,
// >(props: {
//   data: Data
// }) => ReactElement

// export type TreeDescendant = <
//   Node extends RequiredProps,
//   Data extends TreeNodeData<Node>,
// >(props: {
//   redraw: ReturnType<typeof useForceUpdate>
//   data: Data
//   depth: number
// }) => ReactElement

export type TreeNode = <
  Node extends RequiredProps,
  Data extends TreeNodeData<Node>,
>(props: {
  // redraw: ReturnType<typeof useForceUpdate>
  data: Data
  depth: number
}) => ReactElement

export type TreeProps<
  Node extends RequiredProps,
  Data extends TreeNodeData<Node>,
> = {
  data: Data
  height: number
  width: number
  Edge: TreeEdge
  Node: TreeNode
}

// export const Tree = <Node extends RequiredProps, T extends TreeNodeData<Node>>({
//   data,
//   height,
//   width,
//   Edge,
//   Head,
//   Descendant,
// }: TreeProps<Node, T>) => {
//   // const [layout, setLayout] = useState<string>("cartesian")
//   // const [orientation, setOrientation] = useState<string>("horizontal")
//   // const [linkType, setLinkType] = useState<string>("diagonal")
//   // const [stepPercent, setStepPercent] = useState<number>(0.5)

//   // if (orientation === "vertical") {
//   //   sizeWidth = width
//   //   sizeHeight = height
//   // } else {
//   // }

//   // const LinkComponent = getLinkComponent({ layout, linkType, orientation })

//   const tree = useTree<T>(
//     hierarchy(data, ((d) =>
//       d.parentId === null ? null : d.children) as Accessor<T>),
//     (a, b) => (a.parent === b.parent ? 1 : 0.5),
//     [width, height],
//   )
//   const redraw = useForceUpdate()

//   return (
//     <>
//       {tree.links().map((link, i) => (
//         <Edge
//           key={`${link.source.data.id}-${link.target.data.id}-${i}`}
//           data={link}
//         />
//       ))}
//       {/* <PanelSubscriber data={tree.data} /> */}
//       <Nodes<Node, T>
//         nodes={tree.descendants()}
//         Head={Head}
//         Descendant={Descendant}
//         redraw={redraw}
//       />
//     </>
//   )
// }

// type PanelSubscriberProps<Node extends RequiredProps,T extends TreeNodeData<Node>> = {
//   data: T
// }
// const PanelSubscriber = <Node extends RequiredProps,T extends TreeNodeData<Node>>({
//   data,
// }: PanelSubscriberProps<T>) => {
//   const [mode] = usePanelContext()

//   useEffect(() => {
//     console.log("CURRENT MODE:", mode)
//     if (mode === "edit") {
//       console.log("CURRENT Data:", data)
//     }
//   }, [mode])

//   return null
// }

type NodesProps<
  Node extends RequiredProps,
  T extends TreeNodeData<Node>,
> = Pick<TreeProps<Node, T>, "Node"> & {
  nodes: HierarchyPointNode<T>[]
}
export const Nodes = <
  Node extends RequiredProps,
  T extends TreeNodeData<Node>,
>({
  nodes,
  Node,
}: NodesProps<Node, T>) => (
  <>
    {nodes.map((node, key) => {
      const depth = node.depth

      return (
        <Group top={node.y} left={node.x} key={key}>
          <Node data={node.data} depth={depth} />
          {/* {depth === 0 && <Head data={node.data} />}
              {depth !== 0 && (
                <Descendant depth={depth} redraw={redraw} data={node.data} />
              )} */}
          <Text depth={depth} hasChild={Boolean(node.children)}>
            {node.data.name}
          </Text>
        </Group>
      )
    })}
  </>
)

function useForceUpdate() {
  const [, setValue] = useState<boolean>(false)
  // TODO: add function to get current data everytime there is an update and append it to global state
  // TODO: add function to edit and add node/nodes and pass it to the dialog

  return useCallback(() => {
    setValue((prev) => !prev)
  }, [])
}

export const Text = ({
  depth,
  hasChild,
  children,
}: {
  depth: number
  hasChild: boolean
  children: ReactNode
}) => {
  type TextColor = "#71248e" | "#fafafa" | "#26deb0"
  const txtColor: TextColor =
    depth === 0 ? "#71248e" : hasChild ? "#fafafa" : "#26deb0"

  return (
    <text
      dy=".33em"
      fontSize={9}
      fontFamily="Arial"
      textAnchor="middle"
      style={{ pointerEvents: "none" }}
      fill={txtColor}
    >
      {children}
    </text>
  )
}
