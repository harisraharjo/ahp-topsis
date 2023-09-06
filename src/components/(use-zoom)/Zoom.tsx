"use client"

import { useRef, useCallback } from "react"
import type {
  WheelEvent as ReactWheelEvent,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
  PointerEvent as ReactPointerEvent,
} from "react"

import { localPoint } from "@visx/event"

import type {
  GestureHandlers,
  UserGestureConfig,
  UserHandlers,
} from "./useGesture"
import { useGesture } from "./useGesture"

import type {
  TransformMatrix,
  Point,
  Translate,
  Scale,
  ScaleSignature,
  ProvidedZoom,
  PinchDelta,
} from "./types"
import type { ElementOrSelector, MotionKeyframesDefinition } from "motion"
import { animate } from "motion"

const defaultWheelDelta = (event: ReactWheelEvent | WheelEvent) =>
  -event.deltaY > 0
    ? { scaleX: 1.1, scaleY: 1.1 }
    : { scaleX: 0.9, scaleY: 0.9 }

const defaultPinchDelta: PinchDelta = ({
  offset: [s],
  lastOffset: [lastS],
}) => {
  const result = s - lastS < 0 ? 0.9 : 1.5

  return {
    scaleX: result,
    scaleY: result,
  }
}

export type ZoomConfig = {
  /**
   * A function that returns { scaleX,scaleY } factors to scale the matrix by.
   * Scale factors greater than 1 will increase (zoom in), less than 1 will decrease (zoom out).
   */
  wheelDelta?: (event: ReactWheelEvent | WheelEvent) => Scale
  target: ElementOrSelector
  /**
   *
   * A function that returns { scaleX, scaleY, point } factors to scale the matrix by.
   * Scale factors greater than 1 will increase (zoom in), less than 1 will decrease (zoom out), the point is used to find where to zoom.
   * The state parameter is from react-use-gestures onPinch handler
   */
  pinchDelta?: PinchDelta
  /** Minimum x scale value for transform. */
  scaleXMin?: number
  /** Maximum x scale value for transform. */
  scaleXMax?: number
  /** Minimum y scale value for transform. */
  scaleYMin?: number
  /** Maximum y scale value for transform. */
  scaleYMax?: number
  /** Initial transform matrix to apply. */
  initialTransformMatrix?: TransformMatrix
}

type ZoomState = {
  initialTransformMatrix: TransformMatrix
  transformMatrix: TransformMatrix
  isDragging: boolean
}

const useGestureHandlers: GestureHandlers = {}
const useGestureConfig: UserGestureConfig = {
  eventOptions: { passive: false },
  drag: { filterTaps: true },
}

const defaultValue = {
  point: { x: 0, y: 0 },
  translate: { x: 240, y: 1700 },
  matrix: {
    scaleX: 1,
    scaleY: 1,
    x: 0,
    y: 0,
    skewX: 0,
    skewY: 0,
  },
}

export function useZoom<Container extends Element>({
  scaleXMin = 0,
  scaleXMax = 100,
  scaleYMin = 0,
  scaleYMax = 100,
  initialTransformMatrix = defaultValue.matrix,
  wheelDelta,
  pinchDelta,
  target,
}: 
ZoomConfig): ProvidedZoom<Container> & ZoomState {
  const containerRef = useRef<Container>(null)
  const matrixStateRef = useRef<TransformMatrix>(initialTransformMatrix)

  const isDragging = useRef(false)
  const startTranslate = useRef<Translate>({x: initialTransformMatrix.x, y: initialTransformMatrix.y})
  const startPoint = useRef<Point>(defaultValue.point)
  
  
  const dragEnd = useCallback(() => {
    startPoint.current.x = 0
    startPoint.current.y = 0
    startTranslate.current.x = 0
    startTranslate.current.y = 0
    isDragging.current = false
  }, [])

  const applyTransformMatrix = useCallback(
    ({ scaleX, scaleY: maybeScaleY }: ScaleSignature) => {
      const scaleY = maybeScaleY || scaleX

      animate(
        target,
        {
          scaleX: (matrixStateRef.current.scaleX = scaleConstraint(
            scaleX,
            matrixStateRef.current.scaleX,
            scaleYMax,
            scaleYMin,
          )),
          scaleY: (matrixStateRef.current.scaleY = scaleConstraint(
            scaleY,
            matrixStateRef.current.scaleY,
            scaleXMax,
            scaleXMin,
          )),
        },
        {
          easing: "ease-out",
        },
      )
    },
    [scaleXMax, scaleXMin, scaleYMax, scaleYMin, target],
  )

  const scale = useCallback(
    (scale: ScaleSignature) => {
      applyTransformMatrix(scale)
      if (isDragging.current) {
        scale.point &&
          ((startPoint.current.x = scale.point.x),
          (startPoint.current.y = scale.point.y))

        startTranslate.current.x = matrixStateRef.current.x
        startTranslate.current.y = matrixStateRef.current.y
      }
    },
    [applyTransformMatrix],
  )

  const handlePinch: UserHandlers["onPinch"] = useCallback(
    (state) => {
      const {
        origin,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        memo,
      } = state

      let currentMemo = memo as {
        top: number
        left: number
      }
      if (containerRef.current) {
        const { top, left } =
          currentMemo ?? containerRef.current.getBoundingClientRect()

        currentMemo = currentMemo ?? { top, left }
        const [ox, oy] = origin
        scale({
          ...(pinchDelta || defaultPinchDelta)(state),
          point: { x: ox - left, y: oy - top },
        })
      }

      return currentMemo
    },
    [scale, pinchDelta],
  )

  const handleWheel = useCallback(
    (event: ReactWheelEvent | WheelEvent) => {
      event.preventDefault()
      const res = (wheelDelta || defaultWheelDelta)(event) as Scale & {
        point: Point | undefined
      }
      res.point = localPoint(event) || undefined
      scale(res)
    },
    [scale, wheelDelta],
  )

  useGestureHandlers["onDrag"] = ({ event, pinching, cancel }) => {
    if (pinching) {
      cancel()
      dragEnd()
    } else if (!(event instanceof KeyboardEvent)) {
      dragMove(event)
    }
  }

  useGestureHandlers["onPinch"] = handlePinch
  useGestureHandlers["onWheel"] = ({ event, active }) => {
    // currently onWheelEnd emits one final wheel event which causes 2x scale
    // updates for the last tick. ensuring that the gesture is active avoids this
    void (active && handleWheel(event))
  }
  useGestureHandlers["onDragStart"] = ({ event }) =>
    !(event instanceof KeyboardEvent) && dragStart(event)
  useGestureHandlers["onDragEnd"] = dragEnd

  useGestureConfig["target"] = containerRef

  useGesture(useGestureHandlers, useGestureConfig)

  const dragStart = (
    event:
      | ReactMouseEvent
      | ReactTouchEvent
      | MouseEvent
      | TouchEvent
      | ReactPointerEvent,
  ) => {
    isDragging.current = true

    const { x, y } = localPoint(event) as Point
    startPoint.current.x = x
    startPoint.current.y = y

    startTranslate.current.x = matrixStateRef.current.x
    startTranslate.current.y = matrixStateRef.current.y
  }

  const translate = (x: Translate["x"], y: Translate["y"]) => {
    animate(
      target,
      {
        x: (matrixStateRef.current.x = x),
        y: (matrixStateRef.current.y = y),
      },
      {
        easing: "linear",
      },
    )
  }

  const dragMove = (
    event:
      | ReactMouseEvent
      | ReactTouchEvent
      | MouseEvent
      | TouchEvent
      | ReactPointerEvent,
    options?: { offsetX?: number; offsetY?: number },
  ) => {
    if (!isDragging.current || !startPoint.current) return

    const { dx, dy } = translateDelta(startPoint.current, event).value

    translate(
      startTranslate.current.x + dx + (options?.offsetX ?? 0),
      startTranslate.current.y + dy + (options?.offsetY ?? 0),
    )
  }

  const reset = useCallback(() => {
    animate(
      target,
      (matrixStateRef.current =
        initialTransformMatrix) as MotionKeyframesDefinition,
      {
        easing: "linear",
      },
    )
  }, [initialTransformMatrix, target])

  return {
    initialTransformMatrix,
    transformMatrix: matrixStateRef.current,
    isDragging: isDragging.current,
    scale,
    translate,
    handleWheel,
    handlePinch,
    dragMove,
    dragStart,
    containerRef,
    dragEnd,
    reset,
  }
}

const translateDelta = <P extends Point>(
  startPoint: P,
  event:
    | ReactMouseEvent
    | ReactTouchEvent
    | MouseEvent
    | TouchEvent
    | ReactPointerEvent,
) => ({
  currentPoint: localPoint(event) as Point,
  get value() {
    return {
      dx: -(startPoint.x - this.currentPoint.x),
      dy: -(startPoint.y - this.currentPoint.y),
    }
  },
})

const scaleConstraint = (
  newScale: TransformMatrix["scaleY"],
  prevScale: TransformMatrix["scaleY"],
  scaleMax: number,
  scaleMin: number,
) => {

  const shouldConstrainScaleY = newScale > scaleMax || newScale < scaleMin
  return shouldConstrainScaleY ? prevScale : newScale
}
