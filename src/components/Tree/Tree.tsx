import { LinearGradient } from "@visx/gradient"
import type { LegacyRef, ReactNode, SVGProps, ReactElement } from "react"

import type { HierarchyPointLink, HierarchyPointNode } from "d3-hierarchy"
import Link from "next/link"
import type { DynamicRoutesParam } from "../../types"

export type Head = "head"
export type NodeId = number | string
type RequiredProps = {
  id: NodeId
  name: string
  parentId: NodeId | null
  isBenefit: 0 | 1
  weight: string | number
}
export type Document = RequiredProps
export type TreeNodeData<Node extends Document> = Node & {
  children?: TreeNodeData<Node>[]
}

export type TreeEdge = <
  Node extends Document,
  T extends TreeNodeData<Node>,
>(props: {
  data: HierarchyPointLink<T>
}) => ReactElement

export type TreeProps<
  Node extends Document,
  Data extends TreeNodeData<Node>,
> = {
  data: Data
  height: number
  width: number
  Edge: TreeEdge
}

type NodesProps<Node extends Document, T extends TreeNodeData<Node>> = {
  nodes: HierarchyPointNode<T>[]
}
export const Nodes = <Node extends Document, T extends TreeNodeData<Node>>({
  nodes,
}: NodesProps<Node, T>) => (
  <>
    {nodes.map((node, key) => {
      const depth = node.depth

      const data = node.data
      const isHead = depth === 0,
        href: DynamicRoutesParam | Head = !isHead
          ? `${data.id}-${data.parentId}`
          : "head"

      return (
        <g key={key} className="translate-x-1/2 translate-y-[13%]">
          <Group top={node.y} left={node.x}>
            <Link href={href}>
              {isHead && <Head />}
              {!isHead && <Descendant hasChild={Boolean(data.children)} />}
            </Link>
            <Text depth={depth} hasChild={Boolean(node.children)}>
              {node.data.name}
            </Text>
          </Group>
        </g>
      )
    })}
  </>
)

const Head = () => {
  return (
    <>
      <LinearGradient id="links-gradient" from="#fd9b93" to="#fe6e9e" />
      <circle r={30} fill="url('#links-gradient')" />
    </>
  )
}

const Descendant = ({ hasChild }: { hasChild: boolean }) => {
  const width = 50,
    height = width

  return (
    <rect
      id="descendant"
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

export const ID_HEAD = 0 as const

type Goal<Data extends Document> = {
  id: typeof ID_HEAD
  parentId: -1
  name: "Goal" | "Click Me"
  children: TreeNodeData<Data>[]
  isBenefit: 0
  weight: string | number
}

export function constructHierarchy<Data extends Document[]>(
  data?: Data,
): Goal<Data[number]> {
  type IDMap = Record<Document["id"], number>

  const nodes = [] as TreeNodeData<Data[number]>[]
  const result: Goal<Data[number]> = {
    id: 0,
    parentId: -1,
    name: "Click Me",
    children: nodes,
    isBenefit: 0,
    weight: "0.0",
  }

  if (!data) return result

  const idMapping = data.reduce((acc, el, i) => {
    acc[el.id] = i

    return acc
  }, {} as IDMap)

  let i
  const length = data.length
  for (i = 0; i < length; i++) {
    const el = data[i] as Document
    const isRoot = el.parentId === 0
    if (isRoot) {
      nodes.push(el)
      continue
    }

    const parentId = el.parentId

    // parentId will never be null because the query is filtered
    const arrayIndex = idMapping[parentId!]

    const parentEl = data[arrayIndex as number] as
      | TreeNodeData<Data[number]>
      | undefined

    if (!parentEl) continue

    Array.isArray(parentEl.children)
      ? parentEl.children.push(el)
      : (parentEl.children = [el])
  }

  result.children = nodes
  result.name = "Goal"

  return result
}
