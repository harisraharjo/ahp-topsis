"use client"

import { createUseGesture, useRecognizers } from "./recognizers"
import { useState } from "react"
import type {
  GestureHandlers,
  NativeHandlers,
  UserGestureConfig,
} from "@use-gesture/core/types"
import { Controller } from "@use-gesture/core"

export type {
  GestureHandlers,
  UserGestureConfig,
  UserHandlers,
} from "@use-gesture/core/types"

/**
 * @public
 *
 *
 * @param {GestureHandlers} handlers - an object with on[Gesture] keys containg gesture handlers
 * @param {UseGestureConfig} config - the full config object
 */
export function useGesture(
  handlers: GestureHandlers,
  config?: UserGestureConfig,
) {
  const [state] = useState(() => {
    const {
      handlers: _handlers,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      nativeHandlers,
      config: _config,
    } = createUseGesture(handlers, config)
    const ctrl = new Controller(_handlers)
    ctrl.applyHandlers(_handlers, nativeHandlers as NativeHandlers)
    ctrl.applyConfig(_config)

    return { ctrl, target: _config.target }
  })

  return useRecognizers(state)
}
