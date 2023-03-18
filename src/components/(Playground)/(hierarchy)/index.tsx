// "use client"

// import { LinearGradient } from "@visx/gradient"
// import { LinkHorizontal } from "@visx/shape"
// import { PropsWithChildren, ReactNode, useState } from "react"
// import { lazy } from "react"
// import type { TreeDescendant, TreeEdge, TreeHead, TreeProps } from "~components"

// const Edge: TreeEdge = ({ data }) => (
//   <LinkHorizontal
//     data={data}
//     // percent={stepPercent}
//     stroke="rgb(254,110,158,0.6)"
//     strokeWidth="1"
//     fill="none"
//   />
// )

// const Head: TreeHead = ({ redraw }) => {
//   return (
//     <>
//       <LinearGradient id="links-gradient" from="#fd9b93" to="#fe6e9e" />
//       <circle
//         r={50}
//         fill="url('#links-gradient')"
//         onClick={() => {
//           // node.data.isExpanded = !Boolean(node.data.isExpanded)
//           redraw()
//         }}
//       />
//     </>
//   )
// }

// const Descendant: TreeDescendant = ({ data, redraw }) => {
//   const toggle = usePlaygroundContext()

//   const width = 50,
//     height = width

//   return (
//     <rect
//       // id={`rect-${key}`}
//       height={height}
//       width={width}
//       y={-height / 2}
//       x={-width / 2}
//       fill="#272b4d"
//       stroke={data.children ? "#03c0dc" : "#26deb0"}
//       strokeWidth={1}
//       strokeDasharray={data.children ? "0" : "2,2"}
//       strokeOpacity={data.children ? 1 : 0.6}
//       rx={data.children ? 2 : 15}
//       onClick={() => {
//         toggle?.()
//         // data.isExpanded = !Boolean(data.isExpanded)

//         // const newData = {
//         //   id: 93,
//         //   parentId: data.id,
//         //   name: "NasionalB",
//         //   scale: null,
//         //   weight: 1.23,
//         // }

//         // Array.isArray(data.children)
//         //   ? data.children.push(newData)
//         //   : (data.children = [newData])

//         // redraw()
//       }}
//     />
//   )
// }

export {}
