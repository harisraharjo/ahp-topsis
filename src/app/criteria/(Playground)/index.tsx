"use client"

import type { PropsWithChildren } from "react"

import { LinearGradient } from "@visx/gradient"

import { useZoom } from "../(use-zoom)"
import { Group as Surface } from "~components"

type Props = PropsWithChildren<{
  width: number
  height: number
}>

export const Playground = ({ width, height, children }: Props) => {
  const centerX = width / 20
  const centerY = height / 20
  const initialScale = width / 630

  const zoom = useZoom<SVGSVGElement>({
    target: "#zoom_target",
    width,
    height,
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

  const origin = { x: 0, y: 0 }

  return (
    <>
      <button onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}>
        Scale
      </button>
      <button onClick={zoom.reset}>Reset</button>
      <svg
        width={width}
        height={height}
        ref={zoom.containerRef}
        style={{ touchAction: "none" }}
      >
        <LinearGradient id="links-gradient" from="#fd9b93" to="#fe6e9e" />
        <rect
          width={width}
          height={height}
          rx={14}
          fill="#272b4d"
          x={0}
          y={0}
        />
        <Surface
          top={origin.y}
          left={origin.x}
          id="zoom_target"
          onTouchStart={zoom.dragStart}
          onTouchMove={zoom.dragMove}
          onTouchEnd={zoom.dragEnd}
          onMouseLeave={() => {
            if (zoom.isDragging) zoom.dragEnd()
          }}
        >
          {children}
        </Surface>
      </svg>
    </>
  )
}
