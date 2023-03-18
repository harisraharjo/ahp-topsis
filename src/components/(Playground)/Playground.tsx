"use client"

import type { ReactNode, PropsWithChildren } from "react"
import { useMemo } from "react"

import { useZoom } from "../(use-zoom)"
import { Group } from "~components"
import type { ZoomConfig } from "../(use-zoom)/Zoom"
import { MutationDialog } from "../../app/criteria/(mutation)/MutationDialog"
import { createPortal } from "react-dom"

type PlaygroundProps = PropsWithChildren<{
  width: number
  height: number
  dialogContent: ReactNode
}>

const origin = { x: 0, y: 0 }

const ZOOM_TARGET_ID = "zoom_target" as const

export const Playground = ({
  width,
  height,
  children,
  dialogContent,
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
      <button onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}>
        Scale
      </button>
      <button onClick={zoom.reset}>Reset</button>
      <svg
        width={width}
        height={height}
        style={{ touchAction: "none", position: "relative" }}
        ref={zoom.containerRef}
        id="svgRoot"
      >
        <rect
          width={width}
          height={height}
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
          <MutationDialog
            dialogContent={dialogContent}
            container={(modalDialog) =>
              createPortal(
                <foreignObject width={width} height={height}>
                  {modalDialog}
                </foreignObject>,
                zoom.containerRef.current as SVGSVGElement,
              )
            }
          >
            {children}
          </MutationDialog>
        </Group>
      </svg>
    </>
  )
}
