"use client"

import type { PropsWithChildren } from "react"
import { useMemo } from "react"

import { useZoom } from "../../../components/(use-zoom)"
import { Group } from "~components"
import type { ZoomConfig } from "../../../components/(use-zoom)/Zoom"

// import { MutationDialog } from "../../app/kriteria/(mutation)/MutationDialog"
// import { createPortal } from "react-dom"

type PlaygroundProps = PropsWithChildren<{
  width: number
  height: number
  // dialogContent: ReactNode
}>

const origin = { x: 0, y: 0 }

const ZOOM_TARGET_ID = "zoom_target" as const

export const Surface = ({
  width,
  height,
  children,
}: // dialogContent,
PlaygroundProps) => {
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
      {/* <button onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}>
        Scale
      </button> */}
      {/* <button onClick={zoom.reset}>Reset</button> */}
      <div className="relative h-full w-full overflow-y-hidden" id="svgRoot">
        <svg
          viewBox="0 0 900 900"
          // width="100%"
          // height="auto"
          style={{ touchAction: "none", height: "auto", width: "100%" }}
          preserveAspectRatio="none"
          ref={zoom.containerRef}
        >
          <rect
            // width="100%"
            style={{ height: "auto", width: "100%" }}
            // height="auto"
            // style={{ height: "auto" }}
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
