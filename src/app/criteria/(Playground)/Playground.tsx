"use client"

import type { PropsWithChildren } from "react"
import { useMemo } from "react"

import { LinearGradient } from "@visx/gradient"

import { useZoom } from "../(use-zoom)"
import { Group as Surface } from "~components"
import type { ZoomConfig } from "../(use-zoom)/Zoom"

type Props = PropsWithChildren<{
  width: number
  height: number
}>

const origin = { x: 0, y: 0 }

export const Playground = ({ width, height, children }: Props) => {
  const zoomConfig = useMemo<ZoomConfig>(() => {
    const initialScale = width / 630

    return {
      target: "#zoom_target",
      scaleXMin: initialScale / 2,
      scaleXMax: initialScale * 10,
      scaleYMin: initialScale / 2,
      scaleYMax: initialScale * 10,
      initialTransformMatrix: {
        scaleX: initialScale,
        scaleY: initialScale,
        x: width / 20,
        y: height / 20,
        skewX: 0,
        skewY: 0,
      },
    }
  }, [width, height])

  const zoom = useZoom<SVGSVGElement>(zoomConfig)

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
