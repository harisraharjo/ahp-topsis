"use client"

import { ReactNode, useState } from "react"
import { Group } from "@visx/group"
import { LinearGradient } from "@visx/gradient"

// import LinkControls from "./LinkControls"
// import getLinkComponent from "./getLinkComponent"
import { LinkHorizontal } from "@visx/shape"
import { useZoom } from "./(use-zoom)"
import { useTree } from "~components/Tree"
import { hierarchy } from "d3-hierarchy"
import { animate } from "motion"
import { localPoint } from "@visx/event"
import { Point } from "./(use-zoom)/types"
import { translateDelta } from "./(use-zoom)/Zoom"

export interface TreeNode {
  name: string
  isExpanded?: boolean
  children?: TreeNode[]
}

// const pointRadial = (x: number, y: number) => {
//   return [(y = +y) * Math.cos((x -= Math.PI / 2)), y * Math.sin(x)]
// }

function useForceUpdate() {
  const [, setValue] = useState<boolean>(false)
  return () => {
    setValue((prev) => !prev)
  }
}

const defaultMargin = { top: 30, left: 30, right: 30, bottom: 70 }

export type LinkTypesProps<T extends TreeNode> = {
  data: T
  width: number
  height: number
  margin?: { top: number; right: number; bottom: number; left: number }
}

export const Playground = <T extends TreeNode>({
  data,
  width: totalWidth,
  height: totalHeight,
  margin = defaultMargin,
}: LinkTypesProps<T>) => {
  // const [layout, setLayout] = useState<string>("cartesian")
  // const [orientation, setOrientation] = useState<string>("horizontal")
  // const [linkType, setLinkType] = useState<string>("diagonal")
  // const [stepPercent, setStepPercent] = useState<number>(0.5)
  const forceUpdate = useForceUpdate()

  const innerWidth = totalWidth - margin.left - margin.right
  const innerHeight = totalHeight - margin.top - margin.bottom

  let origin: { x: number; y: number }
  let sizeWidth: number
  let sizeHeight: number

  // if (layout === "polar") {
  //   origin = {
  //     x: innerWidth / 2,
  //     y: innerHeight / 2,
  //   }
  //   sizeWidth = 2 * Math.PI
  //   sizeHeight = Math.min(innerWidth, innerHeight) / 2
  // } else {
  // }
  // eslint-disable-next-line prefer-const
  origin = { x: 0, y: 0 }
  // if (orientation === "vertical") {
  //   sizeWidth = innerWidth
  //   sizeHeight = innerHeight
  // } else {
  // }
  // eslint-disable-next-line prefer-const
  sizeWidth = innerHeight
  // eslint-disable-next-line prefer-const
  sizeHeight = innerWidth

  // const LinkComponent = getLinkComponent({ layout, linkType, orientation })

  const centerX = totalWidth / 20
  const centerY = totalHeight / 20
  const initialScale = totalWidth / 630

  const tree = useTree(
    hierarchy(data, (d: TreeNode) => (d.isExpanded ? null : d.children)),
    [sizeWidth, sizeHeight],
    (a, b) => (a.parent === b.parent ? 1 : 0.5),
  )

  const { containerRef, ...zoom } = useZoom<SVGSVGElement>({
    target: "#zoom_target",
    width: totalWidth,
    height: totalHeight,
    scaleXMin: initialScale / 2,
    scaleXMax: initialScale * 10,
    scaleYMin: initialScale / 2,
    scaleYMax: initialScale * 10,
    initialTransformMatrix: {
      scaleX: initialScale,
      scaleY: initialScale,
      x: centerX,
      y: centerY,
      skewX: 0,
      skewY: 0,
    },
  })

  return (
    <>
      (
      <>
        {/* <LinkControls
            layout={layout}
            orientation={orientation}
            linkType={linkType}
            stepPercent={stepPercent}
            setLayout={setLayout}
            setOrientation={setOrientation}
            setLinkType={setLinkType}
            setStepPercent={setStepPercent}
          /> */}
        <button onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}>
          Scale
        </button>
        <button onClick={zoom.reset}>Reset</button>
        <svg
          width={totalWidth}
          height={totalHeight}
          ref={containerRef}
          style={{ touchAction: "none" }}
        >
          <LinearGradient id="links-gradient" from="#fd9b93" to="#fe6e9e" />
          <rect
            width={totalWidth}
            height={totalHeight}
            rx={14}
            fill="#272b4d"
            x={0}
            y={0}
            onTouchStart={zoom.dragStart}
            onTouchMove={zoom.dragMove}
            onTouchEnd={zoom.dragEnd}
            onMouseLeave={() => {
              if (zoom.isDragging) zoom.dragEnd()
            }}
          />
          {/* <Group top={margin.top} left={margin.left}> */}
          <Group
            top={origin.y}
            left={origin.x}
            id="zoom_target"
            // onMouseDown={zoom.dragStart}
            // onMouseMove={zoom.dragMove}
            // onMouseUp={zoom.dragEnd}
          >
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
                      // onTouchStart={zoom.dragStart}
                      // onTouchMove={(e) => {
                      //   const point = localPoint(e) as Point
                      //   const { dx, dy } = translateDelta(point, e).value
                      //   animate(`#rect-${key}`, {
                      //     x: dx + 300,
                      //     y: dy + 300,
                      //   })
                      //   forceUpdate()
                      // }}
                      // onTouchEnd={zoom.dragEnd}
                      // onMouseLeave={() => {
                      //   if (zoom.isDragging) zoom.dragEnd()
                      // }}
                      onClick={() => {
                        node.data.isExpanded = !Boolean(node.data.isExpanded)
                        console.log("MOVE", node.x)
                        node.x = node.x + 300
                        console.log("MOVE2", node.x)
                        forceUpdate()
                      }}
                    />
                  )}
                  {/* <rect
                    height={30}
                    width={30}
                    y={-height / 2}
                    x={-width / 2}
                    fill="#272b4d"
                    stroke={"#03c0dc"}
                    strokeWidth={1}
                    strokeDasharray={"0"}
                    strokeOpacity={1}
                    rx={2}
                    onClick={() => {
                      console.log("ADD ME")
                    }}
                  /> */}
                  <Text depth={node.depth} child={Boolean(node.children)}>
                    {node.data.name}
                  </Text>
                </Group>
              )
            })}
          </Group>
          {/* </Group> */}
        </svg>
      </>
      )
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
}) => {
  return (
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
}
