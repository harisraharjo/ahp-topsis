"use client"

import type { PropsWithChildren } from "react"
import { useMemo } from "react"

import { useZoom } from "~components/(use-zoom)"
import { Group } from "~components/Tree"
import type { ZoomConfig } from "~components/(use-zoom)/Zoom"


type PlaygroundProps = PropsWithChildren<{
  width: number
  height: number
}>

const origin = { x: 0, y: 0 }

const ZOOM_TARGET_ID = "zoom_target" as const

export const Surface = ({
  width,
  height,
  children,
}: PlaygroundProps) => {
  const zoomConfig = useMemo<ZoomConfig>(() => {
    const initialScale = width / 630
    const TARGET = `#${ZOOM_TARGET_ID}` as const

    return {
      target: TARGET,
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
      <div className="relative h-full w-full overflow-y-hidden" id="svgRoot">
        <svg
          viewBox="0 0 900 900"
          style={{ touchAction: "none", height: "auto", width: "100%" }}
          preserveAspectRatio="none"
          ref={zoom.containerRef}
        >
          <rect
            style={{ height: "auto", width: "100%" }}
            viewBox="0 0 900 900"
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
          <Group top={origin.y} left={origin.x} id={ZOOM_TARGET_ID}>
            {children}
          </Group>
        </svg>
      </div>
    </>
  )
}
