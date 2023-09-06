/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect } from "react"
import type {
  UserGestureConfig,
  GestureHandlers,
  Target,
} from "@use-gesture/core/types"

import {
  dragAction,
  pinchAction,
  registerAction,
  wheelAction,

} from "@use-gesture/core/actions"
import type { Controller } from "@use-gesture/core"
import { parseMergedHandlers } from "@use-gesture/core"

const actions = [
  dragAction,
  pinchAction,
  wheelAction,
]
export function createUseGesture<
  Config extends UserGestureConfig = UserGestureConfig,
>(_handlers: GestureHandlers, _config?: Config) {
  actions.forEach(registerAction)

  return parseMergedHandlers(_handlers, _config || {})
}

export function useRecognizers({
  ctrl,
  target,
}: {
  ctrl: Controller
  target: Target | undefined
}) {
  useEffect(ctrl.effect.bind(ctrl))

  useEffect(() => {
    return ctrl.clean.bind(ctrl)
  }, [])

  // When target is undefined we return the bind function of the controller which
  // returns prop handlers.
  if (target === undefined) {
    return ctrl.bind.bind(ctrl)
  }

  return undefined
}
