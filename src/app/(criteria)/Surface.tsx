"use client"

import type { PropsWithChildren } from "react"
import {  useMemo } from "react"

import { useZoom } from "~components/(use-zoom)"
import { Group } from "~components/Tree"
import type { ZoomConfig } from "~components/(use-zoom)/Zoom"


type PlaygroundProps = PropsWithChildren

const origin = { x: 0, y: 0 }

const ZOOM_TARGET_ID = "zoom_target" as const
const VIEW_BOX = "0 0 1000 1000" as const

export const Surface = ({
  children,
}: PlaygroundProps) => {
  const zoomConfig = useMemo<ZoomConfig>(() => {
    const initialScale = 0
    const TARGET = `#${ZOOM_TARGET_ID}` as const

    return {
      target: TARGET,
      scaleXMin: initialScale,
      scaleXMax: initialScale + 100,
      scaleYMin: initialScale,
      scaleYMax: initialScale + 100,
      initialTransformMatrix: {
        scaleX: initialScale,
        scaleY: initialScale,
        x: 0,
        y: 0,
        skewX: 0,
        skewY: 0,
      },
    }
  }, [])

  const zoom = useZoom<SVGSVGElement>(zoomConfig)

  return (
        <svg
          viewBox={VIEW_BOX}
          className="touch-none h-auto w-full"
          preserveAspectRatio="none"
          ref={zoom.containerRef}
    >
          <rect
            className="h-auto w-full"
            viewBox={VIEW_BOX}
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
          <Group id={ZOOM_TARGET_ID} top={origin.y} left={origin.x}>
            {children}
      </Group>
      
        </svg>
  )
}
