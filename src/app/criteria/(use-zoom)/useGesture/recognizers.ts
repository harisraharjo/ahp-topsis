import { useEffect, useState } from "react"
import type {
  GenericOptions,
  GestureKey,
  InternalHandlers,
  NativeHandlers,
  UserGestureConfig,
  GestureHandlers,
} from "@use-gesture/core/types"

import {
  dragAction,
  pinchAction,
  registerAction,
  wheelAction,
  moveAction,
  // scrollAction,
  // hoverAction,
} from "@use-gesture/core/actions"
import { Controller, parseMergedHandlers } from "@use-gesture/core"

const actions = [
  dragAction,
  pinchAction,
  wheelAction,
  moveAction,
  // scrollAction,
  // hoverAction,
]
export function createUseGesture<
  Config extends UserGestureConfig = UserGestureConfig,
>(_handlers: GestureHandlers, _config?: Config) {
  actions.forEach(registerAction)

  return parseMergedHandlers(_handlers, _config || {})
}

/**
 * Utility hook called by all gesture hooks and that will be responsible for
 * the internals.
 *
 * @param {InternalHandlers} handlers
 * @param {GenericOptions} config
 * @param {GestureKey} gestureKey
 * @param {NativeHandler} nativeHandlers
 * @returns nothing when config.target is set, a binding function when not.
 */
export function useRecognizers<Config extends GenericOptions>(
  handlers: InternalHandlers,
  config: Config = {} as Config,
  nativeHandlers?: NativeHandlers,
  gestureKey?: GestureKey,
) {
  const [ctrl] = useState(() => {
    const c = new Controller(handlers)
    c.applyHandlers(handlers, nativeHandlers)
    c.applyConfig(config, gestureKey)

    return c
  })

  useEffect(ctrl.effect.bind(ctrl))

  useEffect(() => {
    return ctrl.clean.bind(ctrl)
  }, [])

  // When target is undefined we return the bind function of the controller which
  // returns prop handlers.

  if (config.target === undefined) {
    return ctrl.bind.bind(ctrl)
  }

  return undefined
}
