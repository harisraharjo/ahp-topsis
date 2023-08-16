"use client"

import { useRef } from "react"

type ConstantResult<T> = { v: T }

export default function useConstant<T>(fn: () => T): T {
  const ref = useRef<ConstantResult<T>>()

  if (!ref.current) {
    ref.current = { v: fn() }
  }

  return ref.current.v
}
