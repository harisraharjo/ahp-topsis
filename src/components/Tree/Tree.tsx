"use client"

// TODO: COBA SERVER SIDE RENDER
import { LinearGradient } from "@visx/gradient"
import type { LegacyRef, ReactNode, SVGProps, ReactElement } from "react"

import type { HierarchyPointLink, HierarchyPointNode } from "d3-hierarchy"
import Link from "next/link"

export type Id = number | string
export type RequiredProps = {
  id: number | string
  name: string
  parentId: Id | null
  isBenefit: 0 | 1
}
export type TreeNodeData<Node extends RequiredProps> = Node & {
  isExpanded?: boolean
} & {
  children?: TreeNodeData<Node>[]
}

export type TreeEdge = <
  Node extends RequiredProps,
  T extends TreeNodeData<Node>,
>(props: {
  data: HierarchyPointLink<T>
}) => ReactElement

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
  // Node: TreeNode
}

type NodesProps<
  Node extends RequiredProps,
  T extends TreeNodeData<Node>,
> = {
  nodes: HierarchyPointNode<T>[]
}
export const Nodes = <
  Node extends RequiredProps,
  T extends TreeNodeData<Node>,
>({
  nodes,
}: NodesProps<Node, T>) => (
  <>
    {nodes.map((node, key) => {
      const depth = node.depth

      const isHead = depth === 0
      const data = node.data

      return (
        <Group top={node.y} left={node.x} key={key}>
          <Link href={`/entries/${data.id}-${data.parentId}-${depth}`}>
            {isHead && <Head />}
            {!isHead && <Descendant hasChild={Boolean(data.children)} />}
          </Link>
          <Text depth={depth} hasChild={Boolean(node.children)}>
            {node.data.name}
          </Text>
        </Group>
      )
    })}
  </>
)

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
    />
  )
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

type GroupProps = {
  /** Top offset applied to `<g/>`. */
  top?: number
  /** Left offset applied to `<g/>`. */
  left?: number
  /** Override `top` and `left` to provide the entire `transform` string. */
  transform?: string
  children?: ReactNode
  /** ref to underlying `<g/>`. */
  innerRef?: LegacyRef<SVGGElement>
}

export const Group = ({
  top = 0,
  left = 0,
  transform,
  children,
  innerRef,
  ...restProps
}: GroupProps & Omit<SVGProps<SVGGElement>, "ref">) => (
  <g
    ref={innerRef}
    transform={transform || `translate(${left}, ${top})`}
    {...restProps}
  >
    {children}
  </g>
)