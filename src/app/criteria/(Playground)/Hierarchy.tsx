"use client"

import type { ReactNode } from "react"
import { useState } from "react"

// import LinkControls from "./LinkControls"
// import getLinkComponent from "./getLinkComponent"
import { LinkHorizontal } from "@visx/shape"
import { Group, useTree } from "~components"

export type TreeNode = {
  id: number
  name: string
  isExpanded?: boolean
  children?: TreeNode[]
  parentId: number | null
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
  // const [layout, setLayout] = useState<string>("cartesian")
  // const [orientation, setOrientation] = useState<string>("horizontal")
  // const [linkType, setLinkType] = useState<string>("diagonal")
  // const [stepPercent, setStepPercent] = useState<number>(0.5)
  const forceUpdate = useForceUpdate()

  let sizeWidth: number
  let sizeHeight: number

  // if (orientation === "vertical") {
  //   sizeWidth = width
  //   sizeHeight = height
  // } else {
  // }
  // eslint-disable-next-line prefer-const
  sizeWidth = height
  // eslint-disable-next-line prefer-const
  sizeHeight = width

  // const LinkComponent = getLinkComponent({ layout, linkType, orientation })

  const tree = useTree<TreeNode>(
    data,
    (d) => (d.isExpanded ? null : d.children),
    [sizeWidth, sizeHeight],
    (a, b) => (a.parent === b.parent ? 1 : 0.5),
  )

  return (
    <>
      {tree.links().map((link, i) => (
        <LinkHorizontal
          key={i}
          data={link}
          // percent={stepPercent}
          stroke="rgb(254,110,158,0.6)"
          strokeWidth="1"
          fill="none"
        />
      ))}
      {tree.descendants().map((node, key) => {
        const width = 30
        const height = 30

        let top: number
        let left: number
        // if (layout === "polar") {
        //   const [radialX = 0, radialY = 0] = pointRadial(
        //     node.x,
        //     node.y,
        //   )
        //   top = radialY
        //   left = radialX
        // } else if (orientation === "vertical") {
        //   top = node.y
        //   left = node.x
        // } else {
        // }
        // eslint-disable-next-line prefer-const
        top = node.x
        // eslint-disable-next-line prefer-const
        left = node.y

        //  {
        //    /* <LinkControls
        //     layout={layout}
        //     orientation={orientation}
        //     linkType={linkType}
        //     stepPercent={stepPercent}
        //     setLayout={setLayout}
        //     setOrientation={setOrientation}
        //     setLinkType={setLinkType}
        //     setStepPercent={setStepPercent}
        //   /> */
        //  }
        return (
          <Group top={top} left={left} key={key}>
            {node.depth === 0 && (
              <circle
                r={50}
                fill="url('#links-gradient')"
                onClick={() => {
                  node.data.isExpanded = !Boolean(node.data.isExpanded)
                  forceUpdate()
                }}
              />
            )}
            {node.depth !== 0 && (
              <rect
                // id={`rect-${key}`}
                height={height}
                width={width}
                y={-height / 2}
                x={-width / 2}
                fill="#272b4d"
                stroke={node.data.children ? "#03c0dc" : "#26deb0"}
                strokeWidth={1}
                strokeDasharray={node.data.children ? "0" : "2,2"}
                strokeOpacity={node.data.children ? 1 : 0.6}
                rx={node.data.children ? 2 : 15}
                onClick={() => {
                  node.data.isExpanded = !Boolean(node.data.isExpanded)

                  const newData = {
                    id: 93,
                    parentId: node.data.id,
                    name: "NasionalB",
                    scale: null,
                    weight: 1.23,
                  }
                  Array.isArray(node.data.children)
                    ? node.data.children.push(newData)
                    : (node.data.children = [newData])

                  // console.log("MOVE2", node.x)
                  forceUpdate()
                }}
              />
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

function useForceUpdate() {
  const [, setValue] = useState<boolean>(false)
  return () => {
    setValue((prev) => !prev)
  }
}
