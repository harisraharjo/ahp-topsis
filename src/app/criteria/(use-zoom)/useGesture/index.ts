"use client"

import { createUseGesture, useRecognizers } from "./recognizers"
import { useState } from "react"
import type {
  GestureHandlers,
  NativeHandlers,
  UserGestureConfig,
} from "@use-gesture/core/types"

export type {
  GestureHandlers,
  UserGestureConfig,
  UserHandlers,
} from "@use-gesture/core/types"

/**
 * @public
 *
 * The most complete gesture hook, allowing support for multiple gestures.
 *
 * @param {GestureHandlers} handlers - an object with on[Gesture] keys containg gesture handlers
 * @param {UseGestureConfig} config - the full config object
 */
export function useGesture(
  handlers: GestureHandlers,
  config?: UserGestureConfig,
) {
  const [
    {
      handlers: _handlers,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      nativeHandlers,
      config: _config,
    },
  ] = useState(() => createUseGesture(handlers, config))

  return useRecognizers(_handlers, _config, nativeHandlers as NativeHandlers)
}
