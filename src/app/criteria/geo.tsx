// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// "use client"

// import { useState } from "react"
// import * as topojson from "topojson-client"

// import { CustomProjection, Graticule } from "@visx/geo"
// import type { Projection } from "@visx/geo/lib/types"

// import {
//   geoConicConformal,
//   geoTransverseMercator,
//   geoNaturalEarth1,
//   geoConicEquidistant,
//   geoOrthographic,
//   geoStereographic,
// } from "d3-geo"
// import topology from "./topo.json"
// import { useZoom } from "./(use-zoom)"

// export type GeoCustomProps = {
//   width: number
//   height: number
//   events?: boolean
// }

// interface FeatureShape {
//   type: "Feature"
//   id: string
//   geometry: { coordinates: [number, number][][]; type: "Polygon" }
//   properties: { name: string }
// }

// export const background = "#252b7e"
// const purple = "#201c4e"
// const PROJECTIONS: { [projection: string]: Projection } = {
//   geoConicConformal,
//   geoTransverseMercator,
//   geoNaturalEarth1,
//   geoConicEquidistant,
//   geoOrthographic,
//   geoStereographic,
// }

// // @ts-expect-error it works
// const world = topojson.feature(topology, topology.objects.units) as {
//   type: "FeatureCollection"
//   features: FeatureShape[]
// }

// export function GeoCustom({ width, height, events = true }: GeoCustomProps) {
//   const [projection, setProjection] =
//     useState<keyof typeof PROJECTIONS>("geoConicConformal")

//   const centerX = width / 2
//   const centerY = height / 2
//   const initialScale = (width / 630) * 100

//   const zoom = useZoom<SVGSVGElement>({
//     width: width,
//     height: height,
//     scaleXMin: 100,
//     scaleXMax: 1000,
//     scaleYMin: 100,
//     scaleYMax: 1000,
//     initialTransformMatrix: {
//       scaleX: initialScale,
//       scaleY: initialScale,
//       x: centerX,
//       y: centerY,
//       skewX: 0,
//       skewY: 0,
//     },
//   })

//   return (
//     <>
//       <svg
//         width={width}
//         height={height}
//         ref={zoom.containerRef}
//         style={{ touchAction: "none" }}
//       >
//         <rect
//           x={0}
//           y={0}
//           width={width}
//           height={height}
//           fill={background}
//           rx={14}
//         />
//         <CustomProjection<FeatureShape>
//           projection={PROJECTIONS[projection]}
//           data={world.features}
//           scale={150}
//           // translate={[
//           //   zoom.transformMatrix.x,
//           //   zoom.transformMatrix.y,
//           // ]}
//           className="customP"
//         >
//           {(customProjection) => (
//             <g className="theG" onClick={() => console.log("YAHO")}>
//               <Graticule
//                 graticule={(g) => customProjection.path(g) || ""}
//                 stroke={purple}
//               />
//               <>
//                 {customProjection.features.map(
//                   ({ feature, path, projection: { scale } }, i) => (
//                     <path
//                       key={`map-feature-${i}`}
//                       d={path || ""}
//                       fill={"yellow"}
//                       className="kolotoure"
//                       stroke={background}
//                       strokeWidth={0.5}
//                       onClick={() => {
//                         if (events)
//                           alert(
//                             `Clicked: ${feature.properties.name} (${feature.id})`,
//                           )
//                       }}
//                     />
//                   ),
//                 )}
//               </>
//             </g>
//           )}
//         </CustomProjection>

//         {/** intercept all mouse events */}
//         <rect
//           x={0}
//           y={0}
//           width={width}
//           height={height}
//           rx={14}
//           fill="transparent"
//           onTouchStart={zoom.dragStart}
//           onTouchMove={zoom.dragMove}
//           onTouchEnd={zoom.dragEnd}
//           onMouseDown={zoom.dragStart}
//           onMouseMove={zoom.dragMove}
//           onMouseUp={zoom.dragEnd}
//           onMouseLeave={() => {
//             if (zoom.isDragging) zoom.dragEnd()
//           }}
//         />
//       </svg>
//       {events && (
//         <div className="controls">
//           <button
//             className="btn btn-zoom"
//             onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}
//           >
//             +
//           </button>
//           <button
//             className="btn btn-zoom btn-bottom"
//             onClick={() => zoom.scale({ scaleX: 0.8, scaleY: 0.8 })}
//           >
//             -
//           </button>
//           <button className="btn btn-lg" onClick={zoom.reset}>
//             Reset
//           </button>
//         </div>
//       )}
//       <label>
//         projection:{" "}
//         <select onChange={(event) => setProjection(event.target.value)}>
//           {Object.keys(PROJECTIONS).map((projectionName) => (
//             <option key={projectionName} value={projectionName}>
//               {projectionName}
//             </option>
//           ))}
//         </select>
//       </label>
//     </>
//   )
// }

export {}
