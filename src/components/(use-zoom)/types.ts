import type {
  Handler,
  UserHandlers,
  WebKitGestureEvent,
} from "@use-gesture/core/types"
import type {
  RefObject,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
  PointerEvent as ReactPointerEvent,
  WheelEvent as ReactWheelEvent,
} from "react"

export interface IdentityMatrix extends TransformMatrix {
  scaleX: 1
  scaleY: 1
  x: 0
  y: 0
  skewX: 0
  skewY: 0
}

export interface TransformMatrix {
  scaleX: number
  scaleY: number
  x: number
  y: number
  skewX: number
  skewY: number
}

export interface Point {
  x: number
  y: number
}

export type Translate = Pick<TransformMatrix, "x" | "y">

export type Scale = Pick<TransformMatrix, "scaleX" | "scaleY">

export type PinchDelta = (
  params: Parameters<
    Handler<
      "pinch",
      | TouchEvent
      | ReactTouchEvent
      | PointerEvent
      | ReactPointerEvent
      | WheelEvent
      | ReactWheelEvent
      | WebKitGestureEvent
    >
  >[0],
) => Scale

export interface ScaleSignature {
  scaleX: TransformMatrix["scaleX"]
  scaleY?: TransformMatrix["scaleY"]
  point?: Point
}

export interface ProvidedZoom<ElementType extends Element> {
  // /** Sets x/Y to the center defined by width and height. */
  // center: () => void
  /** Applies the specified scaleX + optional scaleY transform relative to the specified point (or center of canvas if unspecified). */
  scale: (scale: ScaleSignature) => void
  /** Multiplies the current transform matrix by the specified translation. */
  translate: (x: Translate["x"], y: Translate["y"]) => void
  /** Resets the transform to the initial transform specified by props. */
  reset: () => void
  /** Callback for a wheel event, updating scale based on props.wheelDelta, relative to the mouse position. */
  handleWheel: (event: ReactWheelEvent | WheelEvent) => void
  /** Callback for a react-use-gesture on pinch event, updating scale based on props.pinchDelta, relative to the pinch position. */
  handlePinch: UserHandlers["onPinch"]
  /** Callback for dragEnd, sets isDragging to false. */
  dragEnd: () => void
  /** Callback for dragMove, results in a scale transform. */
  dragMove: (
    event: ReactMouseEvent | ReactTouchEvent | MouseEvent | TouchEvent,
    options?: { offsetX?: number; offsetY?: number },
  ) => void
  /** Callback for dragStart, sets isDragging to true.  */
  dragStart: (
    event: ReactMouseEvent | ReactTouchEvent | MouseEvent | TouchEvent,
  ) => void
  /** Ref to stick on element to attach all handlers automatically. */
  containerRef: RefObject<ElementType>
}
